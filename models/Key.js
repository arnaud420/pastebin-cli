const program = require('commander');

class Key {
	constructor(arg) {
		this.options = program.version('0.1.0')
			.option('-p, --post [filePath]', 'Post one or more pastebin files')
			.option('-d, --download [pastebinId] [path]', 'Download a raw paste data and put it in a specific path')
			.option('-l, --list', 'List user pastebins')
            .parse(arg);
        this.optionActions()
	}

	optionActions() {
		if (this.options.post) {
			console.log('post');
		}
	}
	

}

module.exports = Key;