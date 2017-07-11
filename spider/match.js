function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g,"");
}

function ree(str){
	return str.replace("（","(").replace("）", ")");
}

function match(name,port){
  var alist = document.getElementsByTagName("h1");
  if (alist.length<=0){
  		port.postMessage({page: "match",url:window.location.href,type:"match",status:"failed"});
  }else{
	  for (var i=0; i<alist.length; i++){
	    if(ree(alist[i].innerText)==name){
	      port.postMessage({page: "match",url:alist[i].parentNode.href,type:"match",status:"success"});
	      alist[i].click();
	      break;
	    }
	  }
	  if (i>=alist.length){
	  	 port.postMessage({page: "match",url:window.location.href,type:"match",status:"failed"});
	  }
	}
}

function matchstart(){
	var port2 = chrome.extension.connect({name: "matchtobk"});
	port2.postMessage({page: "match",url:window.location.href,type:"match",status:"begen"});
	port2.onMessage.addListener(function(msg) {
		if (msg.cmd =="match"){
			match(msg.companyname,port2);
		}else if (msg.cmd=="over") {
			port2.postMessage({page: "match",url:window.location.href,type:"match",status:"over"});
			// port2.disconnect();
		}

	});
}

matchstart();