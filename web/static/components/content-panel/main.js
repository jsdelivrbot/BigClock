define([
		"jquery",
		"knockout",
		"moment",
		"text!./main-tmpl.html"
	],
	function($, ko, moment, main_tmpl){

		function ContentPanel(params){
			this.app = params.app;

			this.current_time = ko.observable();
			this.dim_face     = ko.observable(false);

			window.moment = moment;
		}

		ContentPanel.prototype.init = function() {
			// start clock
            this.get_time();
            setInterval(this.get_time.bind(this), 1000);

			// setup binding for window resize event
            $(window).bind( "resize."+this.panel_name, this.set_heights.bind(this) );
            // call once manually
            this.set_heights();

            // stop loading screen
	        this.app.loading(false);

            // evaluate time of day
            if( moment().hours() > 20 ) this.dim_face(true);
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

            var face        = $(".clock"),
            	face_height = face.height(),
            	padding = (window_height/2) - (face_height/2);

            face.css("padding-top", padding);
		};

		ContentPanel.prototype.get_time = function() {
			var now = moment().format("h:mm:ss a").toUpperCase();
			document.title = now;
			this.current_time(now);
		};

		ContentPanel.prototype.toggle_dimmer = function() {
			this.dim_face( !this.dim_face() );
		};

		return {
			template: main_tmpl,
			viewModel: ContentPanel
		};
	}
);