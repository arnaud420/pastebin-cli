function getFullNameFromExt(ext) {
	switch(ext) {
		case '.js':
	        return 'javascript';
		case '.py':
			return 'python';
		case '.java':
			return 'java';
		case '.php':
			return 'php';
		case '.css':
			return 'css';
		case '.html':
			return 'html5';
		case '.sql':
			return 'sql';
		case '.json':
			return 'json';
	    default:
	        return 'text';
	}
}

module.exports = {
	getFullNameFromExt
};