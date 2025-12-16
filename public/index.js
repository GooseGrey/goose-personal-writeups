/*
 * Name: Goose
 * Date: December 15, 2025
 *
 * This is the global JavaScript file for my write-ups website.
 */

"use strict";
(function() {

  window.addEventListener("load", init);

  /**
   * sets up necessary functionality when page loads
   */
  function init() {
    qs("input[name='search']").addEventListener("input", filterMenu);

    id("search-button").addEventListener("click", () => {
        qs("input[name='search']").value = "";
        filterMenu();
    });

    id("back-button").addEventListener("click", clearDisplayArea);

    buildMenu();
  }

  /**
   * Hides the display area.
   */
  function clearDisplayArea() {
    id("display").classList.add("hidden");
    id("writeups-menu").classList.remove("hidden");
  }

  /**
   * Filters the menu items based on the search input.
   * Handles 3 levels: Platform (div) -> Category (details) -> Challenge (li)
   */
  function filterMenu() {
    const query = qs("input[name='search']").value.toLowerCase().trim();
    const platforms = qsa("#writeups-menu > .category");
    const searchButton = id("search-button");

    if (query.length > 0) {
        searchButton.classList.remove("hidden");
    } else {
        searchButton.classList.add("hidden");
    }

    platforms.forEach(platform => {
      const platformName = platform.querySelector("h2")?.textContent.toLowerCase() || "";
      const isPlatformMatch = platformName.includes(query);

      let platformHasVisibleChildren = false;
      const categories = platform.querySelectorAll("details");

      categories.forEach(category => {
        const categoryName = category.querySelector("summary")?.textContent.toLowerCase() || "";
        const isCategoryMatch = isPlatformMatch || categoryName.includes(query);

        let categoryHasVisibleChildren = false;
        const challenges = category.querySelectorAll("li");

        challenges.forEach(challenge => {
          const challengeName = challenge.querySelector("p")?.textContent.toLowerCase() || "";
          const isChallengeMatch = isCategoryMatch || challengeName.includes(query);

          if (isChallengeMatch) {
            challenge.classList.remove("hidden");
            categoryHasVisibleChildren = true;
          } else {
            challenge.classList.add("hidden");
          }
        });

        if (categoryHasVisibleChildren) {
          category.classList.remove("hidden");

          category.open = query.length > 0;

          platformHasVisibleChildren = true;
        } else {
          category.classList.add("hidden");
        }
      });

      if (platformHasVisibleChildren) {
        platform.classList.remove("hidden");
      } else {
        platform.classList.add("hidden");
      }
    });
  }

  /**
   * Recursively generates the HTML structure from the JSON object.
   * @param {object} data - The nested object representing the file structure.
   * @param {string} idPrefix - A prefix for generating unique IDs.
   * @returns {HTMLElement} - The root HTML element (div, details, or ul/li).
   */
  function createMenuElement(data, idPrefix = '') {
    const keys = Object.keys(data);

    if (keys.length === 0) {
        return document.createDocumentFragment();
    }

    if (data[keys[0]] === null) {
      const ul = document.createElement('ul');
      for (const challengeName of keys) {
        const li = document.createElement('li');
        li.classList.add('challenge-item');

        const p = document.createElement('p');
        const formattedName = challengeName.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        p.textContent = formattedName;

        let path = idPrefix ? `${idPrefix}/${challengeName}` : challengeName;
        p.addEventListener('click', () => {
          loadWriteup(path);
        });

        li.appendChild(p);
        ul.appendChild(li);
      }

      return ul;

    } else {
      const fragment = document.createDocumentFragment();

      for (const [key, nestedData] of Object.entries(data)) {

        const currentId = (idPrefix ? `${idPrefix}/` : '') + key.replace(/[^a-z0-9]/gi, '-')

        if (!idPrefix) {
          const div = document.createElement('div');
          div.id = currentId;
          div.classList.add('category');

          const h2 = document.createElement('h2');
          h2.textContent = key;
          div.appendChild(h2);

          const subContent = createMenuElement(nestedData, key);
          div.appendChild(subContent);
          fragment.appendChild(div);
        }

        else {
          const details = document.createElement('details');
          details.classList.add(currentId);

          const summary = document.createElement('summary');
          summary.textContent = key;
          details.appendChild(summary);

          const subContent = createMenuElement(nestedData, currentId);
          details.appendChild(subContent);
          fragment.appendChild(details);
        }
      }
      return fragment;
    }
  }


  /**
   * Builds the write-ups menu by fetching the JSON data and generating the HTML structure.
   */
  async function buildMenu() {
      const menuContainer = id("writeups-menu");

      try {
          const response = await fetch('/write-ups/');
          let res = await statusCheck(response);
          const data = await res.json();

          menuContainer.innerHTML = '';

          const menuFragment = createMenuElement(data);

          menuContainer.appendChild(menuFragment);

      } catch (error) {
          console.error('Could not fetch or build menu:', error);
          menuContainer.innerHTML = '<p style="color: red;">Error loading write-ups. Please check the server.</p>';
      }
  }

  /**
   * Loads and displays a write-up markdown file.
   * @param {string} path - the path to the markdown file (without .md extension).
   */
  async function loadWriteup(path) {
    const contentArea = id("display");
    id("writeups-menu").classList.add("hidden");
    contentArea.classList.remove("hidden");
    contentArea.innerHTML = '<p>Loading write-up for ' + path + '...</p>';

    try {
        const response = await fetch(`./writeups/${path}.md`);

        const res = await statusCheck(response);

        const markdownText = await res.text();

        const htmlContent = marked.parse(markdownText);
        contentArea.innerHTML = htmlContent;

        let backButton = document.createElement("button");
        backButton.id = "back-button";
        backButton.classList.add("reset-button");
        backButton.textContent = "Back";
        backButton.addEventListener("click", clearDisplayArea);
        contentArea.prepend(backButton);
    } catch (error) {
        contentArea.innerHTML = `
            <h3>Error Loading Content</h3>
            <p>Could not load the write-up for "${path}". Please check the file path and console for errors.</p>
            <p>Error details: ${error.message}</p>
        `;
        console.error('Failed to load markdown:', error);
    }
  }

  /**
   * Fetches the presence of a wargame from the server and displays the result.
   */
  async function fetchResponseWargamePresence() {
    try {
      let wargameName = qs("input[name='site']").value.trim();
      let res = await fetch("/wargames/" + wargameName);
      await statusCheck(res);
      let text = await res.text();
      displayWargamePresence(text);
    } catch (error) {
      handleErrorWargamePresence(error, "Sorry, we couldn't check that wargame at this time.");
    }
  }

  /**
   * Handles errors that occur during the wargame presence fetch process.
   * @param {Error} error - the error that occurred when checking the wargame presence.
   */
  function handleErrorWargamePresence(error) {
    let displayArea = id("display");
    displayArea.innerHTML = "";
    console.error("Error checking wargame presence:", error);
    let newParagraph = document.createElement("p");
    newParagraph.id = "wargame-presence-response";
    newParagraph.textContent = "Sorry, we couldn't check that wargame at this time.";
    displayArea.appendChild(newParagraph);
  }

  /**
   * Displays the presence of a wargame on the page.
   * @param {string} text - the presence text to display.
   */
  function displayWargamePresence(text) {
    qs("input[name='site']").classList.add("hidden");
    let section = id("intro");
    let displayResponse = document.createElement("p");
    displayResponse.id = "wargame-presence-response";
    displayResponse.textContent = text;
    id("wargame-button").classList.remove("hidden");
    section.appendChild(displayResponse);
  }

  // Tools Functions

  /**
   * Checks the response status of a fetch request.
   * @param {Response} res - fetch response object.
   * @returns {Response} - the original response object if successful.
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Removes the specified element from the DOM.
   * @param {*} element - the element to remove.
   */
  function rm(element) {
    element.parentNode.removeChild(element);
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns first element matching selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} - DOM object associated selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} query - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }
})();
