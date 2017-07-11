function fetch(port){
	$(document).ready(function(){
	  var html = $(":root").html();
	  port.postMessage({page: "fetch",url:window.location.href,type:"fetch",status:"success",data:html});
	})
}

function fetchstart(){
	var port4 = chrome.extension.connect({name: "fetchtobk"});
	port4.postMessage({page: "fetch",url:window.location.href,type:"fetch",status:"begen"});
	port4.onMessage.addListener(function(msg) {
		if (msg.cmd =="fetch"){
			fetch(port4);
		}
	});
}

fetchstart();