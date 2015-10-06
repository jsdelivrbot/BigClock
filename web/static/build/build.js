({
    baseUrl: "../../static",
    paths: {
        'text':               'bower_components/text/text',
        'augment':            'bower_components/augment.js/augment',
        'knockout':           'bower_components/knockout/dist/knockout',
        'jquery':             'bower_components/jquery/dist/jquery.min',
        'moment':             'bower_components/moment/min/moment.min' 
    },
    shim: {
        'notifyjs': {
            deps: ['jquery']
        }
    },
    packages:[
        {
            name: 'content-panel',
            location: 'components/content-panel'
        }
    ],
    name: "main-debug",
    out: "../main-built.js"
})