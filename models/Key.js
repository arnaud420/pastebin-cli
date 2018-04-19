const program = require('commander');

class Key {
	constructor(arg) {
		this.options = program.version('0.1.0')
			.option('-p, --post [filePath]', 'Post a pastebin file')
			.option('-g, --get [filePath]', 'Display a pastebin file content in console')
			.option('-d, --download [pastebin] [path]', 'Download a pastebin and put it in a specific path')
            .parse(arg);
        this.optionActions()
	}

	optionActions() {
		if (this.options.post) {
			console.log('post');
		}
		else if (this.options.get) {
			console.log("get");
		}
	}
	

}

module.exports = Key;