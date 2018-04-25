const fs = require('fs');
const moment = require('moment');

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

    createTodayDir(pasteContent) {
        if (fs.existsSync(this.path + '/' + this.today)) {
            this.writeFile(pasteContent);
        }
        else {
            fs.mkdir(this.path + '/' + this.today, (err) => {
                if (err) {
                    console.error(err.message);
                }
                else {
                    this.writeFile(pasteContent);
                }
            });
        }
    }

    save(pasteContent) {
	    if (fs.existsSync(this.path)) {
            this.createTodayDir(pasteContent);
        }
        else {
            fs.mkdir(this.path, (err) => {
                if (err) {
                    console.error(err.message);
                }
                else {
                    this.createTodayDir(pasteContent)
                }
            });
        }
	}
}

module.exports = File;