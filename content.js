
function start(name){
	$(document).ready(function(){
		var input = $("#keyword");
		var btn = $("#btn_query");
		input.val(name);
		setTimeout("$('#btn_query').click()",1000);
	})
}

function getname(){
  var h1s = document.getElementsByTagName("h1");
  for (var i=0; i<h1s.length; i++){
    alert(h1s[i].innerText);
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if (request.type=="content"){
		start(request.name);
		sendResponse("ok");
	}else if(request.type=="match"){
		alert(request);
		sendResponse("0000000");
	};
});

// chrome.tabs.onUpdated.addListener(function(tabId,changeInfo) {
// 	alert("update")
// });
