const path = require('path');
const mod = require('../modules');

class Request {
    
    static async postPastebin(obj, src) {
        const fileExt = mod.getFullNameFromExt(path.parse(src).ext);
        const fileName = path.basename(src);
        return obj.createPasteFromFile(src, fileName, fileExt, 1, "10M")
            .then( (res) =>
                console.log(`SUCCESS: Your pastebin for ${src} is here => ${res}`)
            );
    }

    static async getPastebin(obj, url) {
        return obj.getPaste(url);
    }

    static async getUserPastes(obj) {
        return obj.listUserPastes();
    }

}

module.exports = Request;