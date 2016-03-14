{
    url: "https://zoho-timesheet-dev.herokuapp.com/v1",
    user: {
        id: 1
        username: 'dash',
        tokens: [
            {
                id: 1-1-1-1,
                name: 'test',
                value: '$$$$$$',
                created: moment(val),
            },
            ...
        ]
        settings: {
            clock: {LINK THIS TO ROOT},
            ...
        },
        integrations: [
            {
                id: 1
                name: 'projects'
                maps: {}
            },
            ...
        ],
        logs: [
            {
                id: 1,
                project_id: 2,
                task: 'Something I did...',
                start: moment(val),
                end: moment(val),
                notes: 'Extra info...',
                integration_id: 1
            },
            ...
        ],
    },
    settings: {
        dim: false,
        time: moment(),
        sunrise: moment().hour(6).minutes(0).seconds(0),
        sunset:  moment().hour(20).minutes(0).seconds(0),
        colours: {
            sunrise_primary:   '#FFFFFC',
            sunrise_secondary: '#969685',
            sunset_primary:    '#333',
            sunset_secondary:  '#D6D6D4',
        },
        mode: 'digital',
        snap: 600,
        lock: false,
        notes: "",
    }
}
