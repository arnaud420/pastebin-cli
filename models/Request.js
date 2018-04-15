class Request {
	
	postToPastebin(obj, src) {
		obj.createPasteFromFile(src, src, null, 1, "N")
		.then(function (data) {
			console.log(`You can find your pastebin link here => ${data}`);
	    })
	    .fail(function (err) {
	        console.error(err);
	    });
    }

	getPastebin(obj, url) {
		obj.getPaste(url)
		.then( (data) => {
			console.log(data)
		})
		.fail( (err) => {
			console.error(err)
		})
	}
}

module.exports = Request;