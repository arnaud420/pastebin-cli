const program = require('commander');

class Key {
	constructor(arg) {
		this.options = program.version('0.1.0')
			.option('-p, --post [filePath]', 'Post one or more paste files')
			.option('-d, --download [pastebinId] [path]', 'Download at minimum one raw paste data and put it in a specific path')
			.option('-l, --list', 'List user pastes')
			.option('-f, --fatpost [name] [path]', 'Find all files in directory then post a single fat paste')
            .parse(arg);
	}
}

module.exports = Key;