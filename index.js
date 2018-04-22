#!/usr/bin/env node

const PastebinAPI = require('pastebin-js');
const moment = require('moment');
const { API_KEY, API_USER_NAME, API_USER_PASSWORD } = require('./config.js');
const { File, Key, Request } = require('./models');

const pastebin = new PastebinAPI({
  'api_dev_key': API_KEY,
  'api_user_name' : API_USER_NAME,
  'api_user_password': API_USER_PASSWORD
  });

const key = new Key(process.argv);

if (key.options.post) {

    const req = new Request();
    const file = key.options.post;
    const files = key.options.args;
    const promises = [];

    const sendFile = (file) => {
        return req.postPastebin(pastebin, file);
    };

    async function postOnePastebin() {
        try {
            await sendFile(file);
        }
        catch (e) {
            console.error(e.message);
        }
    }

    async function postMultiplePastebin() {
        try {
            await Promise.all(promises.map( (callback) => callback() ));
        }
        catch (e) {
            console.error(e.message);
        }
    }

    const postAllFiles = () => {
        postOnePastebin();
        postMultiplePastebin();
    };

    if (!files.length) {
        postOnePastebin();
    }
    else {
        for (let i = 0; i < files.length; i++) {
            promises.push( () => {
                sendFile(files[i])
            });
        }
        postAllFiles();
    }

}

else if (key.options.download) {

    const pasteId = key.options.download;
    const dir = key.options.args[0];
    const req = new Request();

    if (key.options.download && key.options.args.length) {

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
        console.log(`ERROR: No args found. You need to specify a path. (EX: pastebin -d ${pasteId} ./save)`)
    }
}

else if (key.options.list) {
    const req = new Request();
    async function getUserPastes() {
        try {
            const pastes = await req.getUserPastes(pastebin);
            const pastesL = pastes.length;

            if (!pastesL) {
                console.log("ERROR: You have no pastebin yet.");
            }
            else {
                console.log(`You have ${pastesL} pastebin` + (pastesL > 1 ? 's' : ''));
                console.log(pastes);
                for (let i = 0; i < pastesL; i++) {

                    const title = pastes[i].paste_title;
                    const url = pastes[i].paste_url;
                    const date = pastes[i].paste_date;
                    const dateTimeString = moment.unix(date).format("DD-MM-YYYY");

                    console.log((title === '' ? 'Untitled =>' : title + ' =>') + ' ' + url + ' added ' + dateTimeString)
                }
            }
        }
        catch (e) {
            console.error(e.message);
        }
    }
    getUserPastes();
}
