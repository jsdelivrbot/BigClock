// JS Imports
// –– Vue
import Vuex from 'vuex'


// App state global
const state {
    url: "https://zoho-timesheet-dev.herokuapp.com/v1",
    user: {
        id: null
        username: null,
        tokens: [],
        settings: {
            clock: {
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
            },
        },
        integrations: [],
        logs: [],
    },
}

// App accessors
const mutations = {
    UPDATE_SETTINGS (state, new_settings) {
        for(var property in new_settings) {
            // exclude base object properties
            if( new_settings.hasOwnProperty(property) ) {
                // copy to state
                if( state.user.settings.clock.hasOwnProperty(property) ) {
                    state.user.settings.clock[property] = new_settings[property]
                }
            }
        }
    }
}

// Create store instance for Vue components
const store = new Vuex.Store({
    state,
    mutations
})


// {
//     url: "https://zoho-timesheet-dev.herokuapp.com/v1",
//     user: {
//         id: 1
//         username: 'dash',
//         tokens: [
//             {
//                 id: 1-1-1-1,
//                 name: 'test',
//                 value: '$$$$$$',
//                 created: moment(val),
//             },
//             ...
//         ]
//         settings: {
//             clock: {LINK THIS TO ROOT},
//             ...
//         },
//         integrations: [
//             {
//                 id: 1
//                 name: 'projects'
//                 maps: {}
//             },
//             ...
//         ],
//         logs: [
//             {
//                 id: 1,
//                 project_id: 2,
//                 task: 'Something I did...',
//                 start: moment(val),
//                 end: moment(val),
//                 notes: 'Extra info...',
//                 integration_id: 1
//             },
//             ...
//         ],
//     },
//     settings: {
//         dim: false,
//         time: moment(),
//         sunrise: moment().hour(6).minutes(0).seconds(0),
//         sunset:  moment().hour(20).minutes(0).seconds(0),
//         colours: {
//             sunrise_primary:   '#FFFFFC',
//             sunrise_secondary: '#969685',
//             sunset_primary:    '#333',
//             sunset_secondary:  '#D6D6D4',
//         },
//         mode: 'digital',
//         snap: 600,
//         lock: false,
//         notes: "",
//     }
// }
