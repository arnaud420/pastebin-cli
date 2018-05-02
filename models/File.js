const fs = require('fs');
const moment = require('moment');
const mkdirp = require('mkdirp');

class File {
	constructor(pasteName, path) {
        this.pasteName = pasteName;
        this.path = path;
        this.today = moment().format("DD-MM-YY");
    }

    writeFile(pasteContent) {
	    const time = moment().format("HH:mm:ss");

        fs.writeFileSync(`${this.path}/${this.today}/${time}_${this.pasteName}`, pasteContent);
        console.log(`SUCCESS: Paste ${this.pasteName} created in ${this.path}/${this.today} !`)
    }

    save(pasteContent) {
        const path = this.path + '/' + this.today;

        if (fs.existsSync(path)) {
            this.writeFile(pasteContent);
        }
        else {
            mkdirp(path, (err) => {
                if (err) {
                    console.error(err.message);
                    process.exit(1);
                }
                else {
                    this.writeFile(pasteContent);
                }
            })
        }
    }
}

module.exports = File;