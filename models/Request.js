const path = require('path');
const mod = require('../modules');

class Request {
	
	postPastebin(obj, src) {
		
		const ext = mod.getFullNameFromExt(path.parse(src).ext);

		try {
			obj.createPasteFromFile(src, src, ext, 1, "10M")
			.then(function (data) {
				console.log(`You can find your pastebin link here => ${data}`);
	    	})
		    .fail(function (err) {
		        console.error(err);
		    });
		}
		catch(error) {
			console.error(error);
		}
    }

	getPastebin(obj, url) {
		try {
			obj.getPaste(url)
			.then( (data) => {
				console.log(data);
			})
			.fail( (err) => {
				console.error(err);
			})
		}
		catch(error) {
			console.error(error);
		}
	
	}
}

module.exports = Request;