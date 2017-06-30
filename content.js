
function start(name){
	$(document).ready(function(){
		var input = $("#keyword");
		var btn = $("#btn_query");
		input.val(name);
		setTimeout("$('#btn_query').click()",1000);
	})
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
	if (request.type=="content"){
		start(request.name);
	}
});
