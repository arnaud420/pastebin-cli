const path = require('path');
const mod = require('../modules');
const moment = require('moment');
const File = require('./File');

class Request {

    // Post a file in pastebin with good extension and filename
    static async postPastebin(obj, src, privacy, time) {
        const fileExt = mod.getFullNameFromExt(path.parse(src).ext);
        const fileName = path.basename(src);

        try {
            const res = await obj.createPasteFromFile(src, fileName, fileExt, privacy, time);
            console.log(`SUCCESS: Your pastebin for ${src} is here => ${res}`)
        }
        catch (e) {
            console.error(e.message);
        }
    }

    // Get a paste raw then create a file and save it in a directory
    static async getPastebin(obj, pasteId, dir) {
        try {
            const pasteContent = await obj.getPaste(pasteId);
            const file = new File(pasteId, dir);

            file.save(pasteContent);
        }
        catch (e) {
            console.error(e.message);
        }
    }

    // Then get all pastes of user and return an array with paste key and title
    static async getUserPastes(obj, username) {
        try {
            let pastesData = [];
            const pastes = await obj.listUserPastes();
            const pastesL = pastes.length;

            if (!pastesL) {
                console.log("ERROR: You have no pastebin yet.");
            }
            else {
                console.log(`${pastesL} pastebin` + (pastesL > 1 ? 's' : '') + ` found for ${username} `);
                for (let i = 0; i < pastesL; i++) {

                    const key = pastes[i].paste_key;
                    const title = pastes[i].paste_title;
                    const url = pastes[i].paste_url;
                    const date = pastes[i].paste_date;
                    const dateTimeString = moment.unix(date).format("DD-MM-YYYY");

                    pastesData.push({
                        key,
                        title: title === '' ? 'Untitled' : title
                    });

                    console.log((title === '' ? 'Untitled =>' : title + ' =>') + ' ' + url + ' added ' + dateTimeString)
                }
                return pastesData;
            }
        }
        catch (e) {
            console.error(e.message);
        }
    }

}

module.exports = Request;