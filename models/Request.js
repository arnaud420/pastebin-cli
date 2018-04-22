const path = require('path');
const mod = require('../modules');
const moment = require('moment');
const File = require('./File');

class Request {

    // Prepare to post a file in pastebin with good extension and filename
    static async postPastebin(obj, src) {
        const fileExt = mod.getFullNameFromExt(path.parse(src).ext);
        const fileName = path.basename(src);
        return obj.createPasteFromFile(src, fileName, fileExt, 1, "10M")
            .then( (res) =>
                console.log(`SUCCESS: Your pastebin for ${src} is here => ${res}`)
            );
    }

    // Post only one file to pastebin
    static async postOnePastebin(obj, src) {
        try {
            await this.postPastebin(obj, src)
        }
        catch (e) {
            console.error(e.message);
        }
    }

    // Post multiples files to pastebin
    static async postMultiplePastebin(promises) {
        try {
            await Promise.all(promises.map( (callback) => callback() ));
        }
        catch (e) {
            console.error(e.message);
        }
    }

    // Fetch a pastebin raw by it id
    static async fetchPastebin(obj, pasteId) {
        return obj.getPaste(pasteId);
    }

    // Then create a file with pastebin raw and save it in a directory
    static async getPastebin(obj, pasteId, dir) {
        try {
            const pasteContent = await this.fetchPastebin(obj, pasteId);
            const file = new File(pasteId, dir);
            file.save(pasteContent);
        }
        catch (e) {
            console.error(e.message);
        }
    }

    // Fetch list of user pastes
    static async fetchUserPastes(obj) {
        return obj.listUserPastes();
    }

    // Then get all pastes of user
    static async getUserPastes(obj, username) {
        try {
            const pastes = await this.fetchUserPastes(obj);
            const pastesL = pastes.length;

            if (!pastesL) {
                console.log("ERROR: You have no pastebin yet.");
            }
            else {
                console.log(`${pastesL} pastebin` + (pastesL > 1 ? 's' : '') + ` found for ${username} `);
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

}

module.exports = Request;