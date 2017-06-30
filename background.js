//发送消息函数
function sendMsg(tabId, type, rule, name) {
	chrome.tabs.sendMessage(tabId, {
		type: type,
		rule: rule,
		name: name
	});
}

//回调函数,用于省略
function page(tabs){
	// alert("yes");
}

//启动函数，用于创建标签（首页）
function start(){
	var url = "http://www.gsxt.gov.cn/index.html";
	chrome.tabs.create({"url" : url},page);
}

// chrome.tabs.create({"url" :"http://www.gsxt.gov.cn/index.html"});
start();

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo) {
		var link = changeInfo.url;
		if (link=="http://www.gsxt.gov.cn/corp-query-search-1.html"){
			chrome.tabs.executeScript(tabId,{file:"match.js"});
		}else if (link=="http://www.gsxt.gov.cn/index.html"){
			alert("start");
			sendMsg(tabId,"content","","重庆三峡银行");
		};
});
