/*
 * Name: Goose
 * Date: December 15, 2025
 * This is the node.js application for my write-ups API.
 */

'use strict';

// Module imports
const express = require('express');
const app = express();

const fs = require("fs").promises;
const fsSync = require("fs");
const path = require('path');
const multer = require("multer");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());

const INVALID_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;

const WRITEUPS_ROOT = path.join(__dirname, 'public', 'writeups');

app.get('/write-ups/', async (req, res) => {
    try {
        const fileStructure = buildDirectoryStructure(WRITEUPS_ROOT);
        res.type('json')
          .json(fileStructure);
    } catch (error) {
        console.error('Error reading write-up directory:', error);
        res.status(INTERNAL_SERVER_ERROR)
          .type('json')
          .json({ error: 'Failed to read file structure' });
    }
});

// app.get('/quotes', async (req, res) => {
//   try {
//     let data = await readQuotesFile();
//     let quotes = data.quotes;
//     let randomQuote = getOneRandomQuote(quotes);
//     res.type('json').json(randomQuote);
//   } catch (error) {
//     if (error.code === "ENOENT") {
//       res.type('text')
//         .status(INTERNAL_SERVER_ERROR)
//         .send("File of quotes does not exist");
//     } else {
//       res.type('text')
//         .status(INTERNAL_SERVER_ERROR)
//         .send("something went wrong on server side");
//     }
//   }
// });

// Helper functions
/**
 * Recursively reads a directory and builds a nested object structure.
 * @param {string} currentPath The path to the directory to read.
 * @returns {object} The nested object representing the file structure.
 */
function buildDirectoryStructure(currentPath) {
    const structure = {};
    const items = fsSync.readdirSync(currentPath);

    for (const item of items) {
        const fullPath = path.join(currentPath, item);
        const stats = fsSync.statSync(fullPath);

        if (stats.isDirectory()) {
            structure[item] = buildDirectoryStructure(fullPath);
        } else if (stats.isFile() && item.endsWith('.md')) {
            const fileName = path.basename(item, '.md');
            structure[fileName] = null;
        }
    }

    return structure;
}

/**
 * Reads and parses the quotes.json file.
 * @returns {Promise} - a promise that resolves to the list of quotes
 */
async function readQuotesFile() {
  try {
    let quotesData = await fs.readFile('quotes.json', 'utf8');
    return JSON.parse(quotesData);
  } catch (error) {
    throw error;
  }
}

/**
 * Selects and returns one random quote from the list.
 * @param {JSON} quotes - the list of quotes
 * @returns {JSON} - a random quote
 */
function getOneRandomQuote(quotes) {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

// Serve static files from the "public" directory
app.use(express.static('public'));

// Start the server
const PORT_NUMBER = 8000;
const PORT = process.env.PORT || PORT_NUMBER;
app.listen(PORT);