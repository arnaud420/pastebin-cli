# pastebin-cli

## Introduction

Script utilisant l'api de pastebin. Il permet de :

* Créer un ou plusieurs paste et le poster sur pastebin

* Récupérer les données d'un paste et le ranger dans un dossier spécifique

* Lister les pastes d'un utilisateur


## Installation

```
git clone https://github.com/arnaud420/pastebin-cli.git
cd pastebin-cli
npm i
pastebin -h
```

## Config

Pour profiter de tous les avantages de ce script, **il est nécessaire de posséder un compte pastebin.**

Un compte de test a déjà été crée.

Pour le modifier se rendre dans le fichier ./config.js et editer les champs ci dessous.

```
const API_KEY = 'YOUR_API_KEY';
const API_USER_NAME = 'YOUR_USER_NAME';
const API_USER_PASSWORD = 'YOUR_USER_PASSWORD';
```


## Commandes

### Usage: pastebin [options]

  Usage: pastebin [options]

  Options:

    -V, --version                       output the version number
    -p, --post [filePath]               Post one or more paste files
    -d, --download [pastebinId] [path]  Download at minimum one raw paste data and put it in a specific path
    -l, --list                          List user pastes
    -f, --fatpost [name] [path]         Find all files in directory then post a single fat paste
    -h, --help                          output usage information


### Exemples

    pastebin -p file01.js file02.js
```
? How many times before paste(s) expire ? 10 minutes
? How privacy level do you want ? Private, user
SUCCESS: Your pastebin for file01.js is here => https://pastebin.com/cch8Lkea
SUCCESS: Your pastebin for file02.js is here => https://pastebin.com/0x3DmMP2
```

    pastebin -d cch8Lkea ./save 
```
SUCCESS: Paste cch8Lkea created in ./save/02-05-18 !
```

    pastebin -p my_fat_paste_name ./modules ./models
```
? How many times before paste(s) expire ? 1 week
? How privacy level do you want ? Private, user
SUCCESS: Your fat paste is here => https://pastebin.com/AtN32F5X

```