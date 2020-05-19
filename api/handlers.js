'use strict'

const fs = require('fs');
const path = require('path');
const config = require('../config');
const util = require('util');

// define FILES_DIR
const FILES_DIR = path.join(__dirname, '../', config.FILES_DIR);

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const readDir = util.promisify(fs.readdir);
const unLink = util.promisify(fs.unlink);

// declare the handlers
const handlers = {

    home: async(req, res) => {
        try {
            return await res.json('this is home welcome ... It works!');
        } catch {
            return await res.json({ status: 'error', message: 'Something went wrong...' });
        };
    },
    listFiles: async(req, res) => {
        try {
            const list = await readDir(FILES_DIR);
            return await res.json(list); //list all files
        } catch {
            console.log(FILES_DIR);
            return await res.json({ status: 'error', message: 'Something went wrong...' });
        };
    },
    fetchAndLoadFile: async(req, res) => {
        const fileName = req.params.name;
        const filePath = `${FILES_DIR}/${fileName}`;
        try {
            let text = await readFile(filePath, 'utf-8');
            console.log(text);
            return await res.json({ name: `${fileName}`, text: `${text}` });
        } catch {
            return await res.json({ status: 'error', message: 'File does not exist.' });
        }
    },
    saveFile: async function(req, res) {
        const fileName = req.params.name;
        const fileText = req.body.text;
        try {
            const newFile = await writeFile(`${FILES_DIR}/${fileName}`, fileText);
            console.log(newFile);
            return await res.redirect(303, '/api/files');

        } catch {
            return await res.json({ status: 'error', message: 'Something went wrong...' });
        };
    },

    deleteFile: async function(req, res) {
        const fileName = req.params.name;
        try {
            let removeFile = await unLink(`${FILES_DIR}/${fileName}`);
            console.log(removeFile);
            return await res.redirect(303, "/api/files");

        } catch {
            return await res.json({ status: 'error', message: 'Something went wrong...' });
        };
    }
};
//export handler
module.exports = handlers;