var name

function sleep(d) {
	if (!d) {
		d = Math.random() * 1000 + 1000;
		// d = Math.random() * 1500;
	}
	for (var t = Date.now(); Date.now() - t <= d;);
}

function start(name){
	$(document).ready(function(){
		var input = $("#keyword");
		var btn = $("#btn_query");
		input.val(name);
		setTimeout("$('#btn_query').click()",1000);
	})
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if (request.type=="content"){
		name = request.name;
		start(name);
		sendResponse("ok");
	}
});
