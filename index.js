#!/usr/bin/env node

const PastebinAPI = require('pastebin-js');
const { API_KEY, API_USER_NAME, API_USER_PASSWORD } = require('./config.js');
const { File, Key, Request } = require('./models');
const fs = require('fs');

const pastebin = new PastebinAPI({
  'api_dev_key': API_KEY,
  'api_user_name' : API_USER_NAME,
  'api_user_password': API_USER_PASSWORD
  });

const key = new Key(process.argv);

if (key.options.post) {

    const req = new Request();
    const file = key.options.post;

    async function postToPastebin() {
        try {
            const paste = await req.postPastebin(pastebin, file);
            console.log(`SUCCESS: Your pastebin is here => ${paste}`);
        }
        catch (e) {
            console.error(e.message);
        }
    }
    postToPastebin();
}

else if (key.options.download) {

    if (key.options.download && key.options.args.length) {
        const pasteId = key.options.download;
        const dir = key.options.args[0];
        const req = new Request();

        async function getPastebin() {
            try {
                const pasteContent = await req.getPastebin(pastebin, key.options.download);
                const file = new File(pasteId, dir);
                file.save(pasteContent);
            }
            catch (e) {
                console.error(e.message);
            }
        }
        getPastebin();
    }

    else {
        console.log(`ERROR: No args found. You need to specify a path. (EX: ./save)`)
    }
}

else if (key.options.list) {
    const req = new Request();

    async function getUserPastes() {
        try {
            const pastes = req.getUserPastes(pastebin);
            if (!pastes.length) {
                console.log("ERROR: You have no pastebin.");
            }
            else {
                console.log(pastes);
            }
        }
        catch (e) {
            console.error(e.message);
        }
    }
    getUserPastes();
}
