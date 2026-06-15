/*
 * Name: Goose
 * Date: December 15, 2025
 *
 * This is the global JavaScript file for all pages of my write-ups website.
 * It implement the quote fetching and translation functionality.
 */

"use strict";

(function() {

  window.addEventListener("load", init);

  let currentQuote = [];
  let isFrench = true;

  /**
   * sets up necessary functionality when page loads
   */
  function init() {
    id("translation").addEventListener("click", translateQuote);
    fetchQuote();
  }

  /**
   * Translates the quote between French and English.
   */
  function translateQuote() {
    let frenchQuote = currentQuote.fr;
    let englishQuote = currentQuote.en;
    let quoteDisplay = qs("blockquote > p");
    if (isFrench) {
      quoteDisplay.textContent = englishQuote;
      quoteDisplay.classList.add("english-quote-font");
      isFrench = false;
    } else {
      quoteDisplay.textContent = frenchQuote;
      quoteDisplay.classList.remove("english-quote-font");
      isFrench = true;
    }
  }

  /**
   * Fetches a new quote from the server and displays it.
   */
  async function fetchQuote() {
    // Server version (disabled)
    // try {
    //   let response = await fetch("/quotes");
    //   await statusCheck(response);
    //   currentQuote = await response.json();
    //   displayQuote(currentQuote);
    // } catch (error) {
    //   handleErrorQuote(error, "Sorry, we couldn't load a quote at this time.");
    // }

    // Client-side version

    try {
      let response = await fetch('quotes.json');
      await statusCheck(response);
      const data = await response.json();
      const quotes = data.quotes;
      let randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex];
      currentQuote = randomQuote;
      displayQuote(currentQuote);
    } catch (error) {
      handleErrorQuote(error, "Sorry, we couldn't load a quote at this time.");
    }

  }

  /**
   * Displays the given quote on the page.
   * @param {Object} quote - the quote object to display.
   */
  function displayQuote(quote) {
    let quoteDisplay = qs("blockquote > p");
    let authorDisplay = qs("blockquote > footer");
    quoteDisplay.textContent = quote.fr;
    authorDisplay.textContent = quote.author;
  }

  /**
   * Displays the fetched quote on the page.
   * @param {Error} error - the error that occurred when getting the quote.
   * @param {string} displayedError - the error message to display.
   */
  function handleErrorQuote(error, displayedError) {
    console.error("Error getting quote:", error);
    let quoteDisplay = qs("blockquote > p");
    let authorDisplay = qs("blockquote > footer");
    authorDisplay.textContent = "";
    quoteDisplay.textContent = displayedError;
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

