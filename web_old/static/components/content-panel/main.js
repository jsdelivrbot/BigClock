define([
		"jquery",
		"knockout",
		"moment",
		"text!./main-tmpl.html"
	],
	function($, ko, moment, main_tmpl){

		function ContentPanel(params){
			this.app = params.app;

			// window vars
			window.moment = moment;
			window.panel  = this;

			// clock
			this.current_time = ko.observable( moment() );

            // data items
            this.current_item   = ko.observable();
            this.previous_items = ko.observableArray();

			// dimmer vars
			this.dim_face     = ko.observable(false);
			this.morning      = ko.observable();
			this.evening  	  = ko.observable();

			// settings vars
			this.settings_visible         = ko.observable(false);
			this.settings_day_hours       = ko.observable();
			this.settings_day_minutes     = ko.observable();
			this.settings_night_hours     = ko.observable();
			this.settings_night_minutes   = ko.observable();

			// update morning dimmer hours
			this.settings_day_hours.subscribe(function(value){
				this.set_morning( value, this.settings_day_minutes() );
			},this);
			this.settings_day_minutes.subscribe(function(value){
				this.set_morning( this.settings_day_hours(), value );
			},this);

			// update evening dimmer hours
			this.settings_night_hours.subscribe(function(value){
				this.set_evening( value, this.settings_night_minutes() );
			},this);
			this.settings_night_minutes.subscribe(function(value){
				this.set_evening( this.settings_night_hours(), value );
			},this);

			// update document title
			this.current_time.subscribe(function(value){
				document.title = value.format("hh:mm:ss a").toUpperCase();
			},this);

			// clock units
			this.hours   = ko.computed(function(){
				return this.current_time().format("hh");
			},this);
			this.minutes = ko.computed(function(){
				return this.current_time().format("mm");
			},this);
			this.seconds = ko.computed(function(){
				return this.current_time().format("ss");
			},this);
			this.period  = ko.computed(function(){
				return this.current_time().format("a").toUpperCase();
			},this);
		}

		ContentPanel.prototype.init = function() {
			// start clock
            setInterval(this.get_time.bind(this), 1000);

            // set default evening dimmer
			this.evening( moment().hour(20).minutes(0).seconds(0) );
			this.settings_night_hours(20);
			this.settings_night_minutes(0);
			// set default morning dimmer
			this.morning( moment().hour(6).minutes(0).seconds(0) );
			this.settings_day_hours(6);
			this.settings_day_minutes(0);

			// setup binding for window resize event
            $(window).bind( "resize."+this.panel_name, this.set_heights.bind(this) );
            // call once manually
            this.set_heights();

            // stop loading screen
	        this.app.loading(false);

            // evaluate time of day on load after hiding loading screen
            if( moment().hours() > 20 || moment().hours() < 6 ) this.dim_face(true);
		};

		ContentPanel.prototype.dispose = function() {
			// unbind from window resizing
            $( window ).unbind("resize."+this.panel_name);

            // start loading screen
	        this.app.loading(true);
		};

		ContentPanel.prototype.set_heights = function() {
			// for dynamically scaling elements put element height calculations here
            var panel          = $(".content-panel"),
                panel_height   = panel.outerHeight(),
                window_height  = $(window).height();

            var face        = $(".clock-body"),
            	face_height = face.height(),
            	padding = (window_height/2) - (face_height/2);

            //face.css("padding-top", padding);
		};

		ContentPanel.prototype.get_time = function() {
			// set time
			this.current_time( moment() );

			// re-evaluate time for diming screen
            if( this.current_time().isSame(this.morning(),'seconds') ) {
            	this.dim_face(false);
            }
            else if( this.current_time().isSame(this.evening(),'seconds') ) {
            	this.dim_face(true);
            }
		};

		ContentPanel.prototype.set_morning = function(hour,minutes) {
			this.morning().hour(hour).minutes(minutes);
		};

		ContentPanel.prototype.set_evening = function(hour,minutes) {
			this.evening().hour(hour).minutes(minutes);
		};

		ContentPanel.prototype.toggle_settings = function() {
			this.settings_visible( !this.settings_visible() );
		};

		ContentPanel.prototype.toggle_dimmer = function(value) {
			this.settings_visible(false);
			this.dim_face( !this.dim_face() );
		};

        ContentPanel.prototype.add_data_point = function() {
            if(!this.current_item()) return;

            // create display object
            var point = {
                content: this.current_item(),
                  stamp: this.current_time()
            };
            // add data point
            this.previous_items.push(point);
            // clear
            this.current_item(null);
        };

        ContentPanel.prototype.remove_data_point = function(index) {
            // remove data point
            var i = index();
            var removed = this.previous_items.splice(i,1);
        };

		return {
			template: main_tmpl,
			viewModel: ContentPanel
		};
	}
);
