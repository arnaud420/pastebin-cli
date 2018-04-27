#!/usr/bin/env node

const PastebinAPI = require('pastebin-js');
const inquirer = require("inquirer");
const { API_KEY, API_USER_NAME, API_USER_PASSWORD } = require('./config.js');
const { Key, Request, File } = require('./models');
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

    inquirer.prompt(questions.post).then(answers => {
            if (!files.length) {
                Request.postPastebin(pastebin, file, answers.privacy, answers.expire);
            }
            else {
                files.push(file);
                for (let i = 0; i < files.length; i++) {
                    Request.postPastebin(pastebin, files[i], answers.privacy, answers.expire);
                }
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

    if (pasteId && args.length === 1) {
        Request.getPastebin(pastebin, pasteId ,arg.dir)
    }
    else if (args.length > 1) {
        arg.files.push(pasteId);

        for (let i = 0; i < arg.files.length; i++) {
            Request.getPastebin(pastebin, arg.files[i], arg.dir)
        }
    }
    else {
        console.log(`ERROR: No args found. You need to specify a path. (EX: pastebin -d ${pasteId} ./save)`)
    }
}

else if (key.options.list) {
    let pastes;

    async function askQuestions() {
        const answer = await inquirer.prompt(questions.userList);

        if (answer.action === 'Delete one paste') {
            QuestionPasteDelete();
        }
        else if (answer.action === 'Download all my pastes') {
            downloadAllFiles();
        }
        else {
            process.exit();
        }
    }

    async function QuestionPasteDelete() {
        const result = await inquirer.prompt(questions.deleteChoice(pastes));
        deletePaste(result.delete);
    }

    async function deletePaste(pasteId) {
        try {
            await pastebin.deletePaste(pasteId);
            console.log('SUCCESS: Paste deleted !');
            main();
        }
        catch (e) {
            console.error(e.message);
        }
    }

    async function downloadAllFiles() {
        const answer = await inquirer.prompt(questions.downloadFiles());
        pastes.forEach( (el) => {
            Request.getPastebin(pastebin, el.key, answer.directory);
        });
        main();
    }

    async function main() {
        pastes = await Request.getUserPastes(pastebin, API_USER_NAME);
        if (pastes === undefined) {
            process.exit(1);
        }
        else {
            setTimeout( () => {
                askQuestions();
            }, 1500);
        }
    }
    main();
}