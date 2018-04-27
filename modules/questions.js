const post = [
    {
        type: 'list',
        name: 'expire',
        message: 'How many times before paste(s) expire ?',
        choices: [
            {
                name: 'Never',
                value: 'N'
            },
            {
                name: '10 minutes',
                value: '10M'
            },
            {
                name: '1 hour',
                value: '1H'
            },
            {
                name: '1 day',
                value: '1D'
            },
            {
                name: '1 week',
                value: '1W'
            },
            {
                name: '2 weeks',
                value: '2W'
            },
            {
                name: '1 month',
                value: '1M'
            },
            {
                name: '6 months',
                value: '6M'
            },
            {
                name: '1 year',
                value: '1Y'
            }
        ]
    },
    {
        type: 'list',
        name: 'privacy',
        message: 'How privacy level do you want ?',
        choices: [
            {
                name: 'Public, anonymous',
                value: 0
            },
            {
                name: 'Unlisted, anonymous',
                value: 1
            },
            {
                name: 'Private, user',
                value: 2
            },
            {
                name: 'Public, user',
                value: 3
            }
        ],
    }
];

const userList = [
    {
        type: 'list',
        name: 'action',
        message: "What do you want to do ?",
        choices: [
            'Delete one paste',
            'Download all my pastes',
            'Leave'
        ]
    }
];

const deleteChoice = (pastes) => {
    return [
        {
            type: 'list',
            name: 'delete',
            message: "Which paste do you want to delete ?",
            choices: function () {
                let choices = [];
                pastes.forEach((el) => {
                    choices.push({
                        name: el.title,
                        value: el.key
                    });
                });
                return choices;
            }
        }
    ]
};

const downloadFiles = () => {
    return [
        {
            type: 'input',
            name: 'directory',
            message: 'Where do you want to save your pastes ?'
        }
    ]
};

module.exports = {
    post,
    userList,
    deleteChoice,
    downloadFiles
};