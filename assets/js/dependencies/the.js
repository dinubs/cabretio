$(document).ready(function() {
	$(".url").hide();
	$("#isUrl").change(function() {
		$(".url").slideToggle('fast');
	});
});