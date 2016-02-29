<?php

/* Debug Vars
———————————————————————————————————————*/
$mode = 'debug';

?>
<!DOCTYPE html>
<html lang="en-gb">
	<head>
		<!-- title -->
		<title>Big Clock</title>

		<!-- metas -->
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />

		<!-- favicon -->
		<link rel="icon" type="image/png" href="static/images/clock.ico"/>

		<!-- font imports -->
		<style type="text/css">
			@import url(https://fonts.googleapis.com/css?family=PT+Mono);
		</style>

		<!-- main css -->
		<link rel="stylesheet" href="static/main-<?php echo $mode; ?>.css" />
	</head>
	<body>
		<div id="loading-placeholder" class="spinner" data-bind="visible:loading">
			<div class="rect1"></div>
			<div class="rect2"></div>
			<div class="rect3"></div>
			<div class="rect4"></div>
			<div class="rect5"></div>
		</div>

		<!-- ko if:component -->
		<div class="main" data-bind="component:{name:component,params:component_params}"></div>
		<!-- /ko -->

		<script src="static/bower_components/requirejs/require.js" data-main="static/main-<?php echo $mode; ?>"></script>
	</body>
</html>
