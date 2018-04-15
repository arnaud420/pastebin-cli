const program = require('commander');

class Key {
	constructor(arg) {
		this.options = program.version('0.1.0')
			.option('-p, --post [file]', 'Post a pastebin file')
			.option('-g, --get [file]', 'Display a pastebin file content in console')
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