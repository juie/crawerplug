function btnclick(){
	$(document).ready(function(){
		// setTimeout("$('#btn_print').click()",1000);
		var btn = $("#btn_print");
		alert(btn);
		alert(btn.text());
		btn.click();
		// document.getElementById("btn_print").click();
	})
}

function getcontent(port){
	var url = "http://www.gsxt.gov.cn"+$('#f-form').attr('action');
  	// setTimeout('document.getElementById("btn_print").click()',1000);
  	// document.getElementById("btn_print").click();
  	btnclick();
  	setTimeout(function(){
              if (window.location.href!=url) {
              	port.postMessage({page: "content",url:window.location.href,type:"getcontent",status:"failed"})
              }
            },20000);
  	port.postMessage({page: "content",url:url,type:"getcontent",status:"success"});
}

function getstart(){
	var port3 = chrome.extension.connect({name: "contenttobk"});
	port3.postMessage({page: "content",url:window.location.href,type:"getcontent",status:"begen"});
	port3.onMessage.addListener(function(msg) {
		if (msg.cmd =="getcontent"){
			getcontent(port3);
			// port.postMessage({page: "zoop",url:window.location.href,type:"full",status:"complete"});
		}else if (msg.cmd=="over") {
			port3.postMessage({page: "content",url:window.location.href,type:"getcontent",status:"over"});
		}
	});
}

getstart();