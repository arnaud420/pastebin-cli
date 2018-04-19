function getFullNameFromExt(ext) {
	switch(ext) {
	    case '.js':
	        return 'javascript';
	        break;
	    default:
	        return 'text';
	}
}

module.exports = {
	getFullNameFromExt
};