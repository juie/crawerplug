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
// chrome.extension.onConnect.addListener(function(port) {
//   alert(port.name);
//   port.onMessage.addListener(function(msg) {
//     if (msg.type == "content"){
//       start("中国工商银行股份有限公司");}
//     else if (msg.type == "match"){
//       alert("00000");}
//   });
// });
