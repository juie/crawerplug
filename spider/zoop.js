
function full(name,port){
	$(document).ready(function(){
		var input = $("#keyword");
		var btn = $("#btn_query");
		input.val(name);
		setTimeout("$('#btn_query').click()",1000);
		setTimeout(function(){
              if (window.location.href=="http://www.gsxt.gov.cn/index.html") {
              	port.postMessage({page: "zoop",url:window.location.href,type:"full",status:"failed"})
              }
            },15000); 
	})
}

function start(){
	var port1 = chrome.extension.connect({name: "zooptobk"});
	port1.postMessage({page: "zoop",url:window.location.href,type:"full",status:"begen"});
	port1.onMessage.addListener(function(msg) {
		if (msg.cmd =="full"){
			full(msg.companyname,port1);
			port1.postMessage({page: "zoop",url:window.location.href,type:"full",status:"complete"});
		}else if(msg.cmd =="over"){
			// port1.disconnect();
		}

	});
}

start();