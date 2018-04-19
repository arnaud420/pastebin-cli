#!/usr/bin/env node

const PastebinAPI = require('pastebin-js');
const API_KEY = require('./config.js');
const { File, Key, Request } = require('./models');

pastebin = new PastebinAPI(API_KEY);

key = new Key(process.argv)

const main = () => {
  if (key.options.post) {
    req = new Request()
    req.postPastebin(pastebin, key.options.post, 'javascript', '10M'); 
  }
  else if (key.options.get) {
    req = new Request()
    req.getPastebin(pastebin, key.options.get)
  }
  else if (key.options.download) {
  	if (key.options.download && key.options.args.length) {
  		console.log(key.options.download + " " + key.options.args)
  	}
  	else {
  		console.log("No args found " + key.options.download)
  	}
  }
}
  
main();