const path = require('path');
const mod = require('../modules');

class Request {
    
    async postPastebin(obj, src) {
        const fileExt = mod.getFullNameFromExt(path.parse(src).ext);
        const fileName = path.basename(src);
        return obj.createPasteFromFile(src, fileName, fileExt, 1, "10M");
    }

    async getPastebin(obj, url) {
        return obj.getPaste(url);
    }

    async getUserPastes(obj) {
        return obj.listUserPastes();
    }
}

module.exports = Request;