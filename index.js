#!/usr/bin/env node

const PastebinAPI = require('pastebin-js');
const inquirer = require("inquirer");
const { API_KEY, API_USER_NAME, API_USER_PASSWORD } = require('./config.js');
const { Key, Request } = require('./models');
const questions = require('./modules/questions');

const pastebin = new PastebinAPI({
  'api_dev_key': API_KEY,
  'api_user_name' : API_USER_NAME,
  'api_user_password': API_USER_PASSWORD
  });

const key = new Key(process.argv);

if (key.options.post) {
    const file = key.options.post;
    const files = key.options.args;
    const promises = [];

    inquirer.prompt(questions.post).then(answers => {
            if (!files.length) {
                Request.postOnePastebin(pastebin, file, answers.privacy, answers.expire);
            }
            else {
                files.push(file);
                for (let i = 0; i < files.length; i++) {
                    promises.push( () => {
                        Request.postPastebin(pastebin, files[i], answers.privacy, answers.expire);
                    });
                }
                Request.postOrGetMultiplePastebin(promises);
            }
        });
}

else if (key.options.download) {
    const pasteId = key.options.download;
    const args = key.options.args;
    const arg = {
        dir: args.slice(-1)[0],
        files: args.slice(0, -1)
    };
    const promises = [];

    if (pasteId && args.length === 1) {
        Request.getPastebin(pastebin, pasteId ,arg.dir)
    }
    else if (args.length > 1) {
        arg.files.push(pasteId);

        for (let i = 0; i < arg.files.length; i++) {
            promises.push( () => {
                Request.getPastebin(pastebin, arg.files[i], arg.dir);
            })
        }
        Request.postOrGetMultiplePastebin(promises);
    }
    else {
        console.log(`ERROR: No args found. You need to specify a path. (EX: pastebin -d ${pasteId} ./save)`)
    }
}

else if (key.options.list) {
    let pastes;

    Request.getUserPastes(pastebin, API_USER_NAME)
        .then( (res) => {
            pastes = res;
            inquirer.prompt(questions.userList)
                .then( (answers) => {
                    if (answers.action === 'Delete one paste') {
                        inquirer.prompt(questions.deleteChoice(pastes))
                            .then( (answer) => {
                                pastebin.deletePaste(answer.delete)
                                    .then( (res) =>
                                        console.log(`SUCCESS: Paste deleted !`)
                                    )
                                    .catch( (err) =>
                                        console.error(err)
                                    )
                            })
                    }
                    else {
                        console.log('else')
                    }
                })
        })
}