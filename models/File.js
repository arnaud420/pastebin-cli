const fs = require('fs');

class File {
	constructor(pasteName, path) {
        this.pasteName = pasteName;
        this.path = path;
    }

    writeFile(pasteContent) {
        fs.writeFileSync(`${this.path}/pastebin_${this.pasteName}`, pasteContent);
        console.log(`SUCCESS: Paste ${this.pasteName} created in ${this.path} !`)
    }

    save(pasteContent) {
	    if (fs.existsSync(this.path)) {
	        this.writeFile(pasteContent);
        }
        else {
            fs.mkdir(this.path, (err) => {
                if (err) {
                    console.error(err.message);
                }
                else {
                    this.writeFile(pasteContent);
                }
            });
        }
	}
}

module.exports = File;