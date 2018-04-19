const path = require('path');
const mod = require('../modules');
const fs = require('fs');

class Request {
    
    async postPastebin(obj, src) {
        //const ext = mod.getFullNameFromExt(path.parse(src).ext);
        return obj.createPasteFromFile(src, src, null, 1, "10M");
    }

    async getPastebin(obj, url) {
        return obj.getPaste(url);
    }

    async getUserPastes(obj) {
        return obj.listUserPastes();
    }
}

module.exports = Request;