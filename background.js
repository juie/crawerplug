function pageLoaded(tab){
	//body
}

function start(){
	var url = "http://www.gsxt.gov.cn/index.html";
	chrome.tabs.create({"url" : url}, pageLoaded);
}

start();