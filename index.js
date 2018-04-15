#!/usr/bin/env node

const PastebinAPI = require('pastebin-js');
const API_KEY = require('./config.js');
const { File, Key, Request } = require('./models');

pastebin = new PastebinAPI(API_KEY);

key = new Key(process.argv)

const main = () => {
  if (key.options.post) {
    req = new Request()
    req.postToPastebin(pastebin, key.options.post); 
  }
  else if (key.options.get) {
    req = new Request()
    req.getPastebin(pastebin, key.options.get)
  }
}
  
main();