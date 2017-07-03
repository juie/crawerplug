function sleep(d) {
	if (!d) {
		d = Math.random() * 1000 + 1000;
		// d = Math.random() * 1500;
	}
	for (var t = Date.now(); Date.now() - t <= d;);
}

//发送消息函数
function sendMsg(tabId, type, rule, name) {
	sleep();
	alert("开始通信");
	chrome.tabs.sendMessage(tabId, {
		type: type,
		rule: rule,
		name: name
	},function(response){alert(response)});
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

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab) {
		var link = changeInfo.url;
		// alert(link);
		if (link=="http://www.gsxt.gov.cn/corp-query-search-1.html"){
			// chrome.tabs.executeScript(tabId,{file:"match.js"});
			// sendMsg(tabId,"match","","中国工商银行股份有限公司");
			// alert(tabId);
			sendMsg(tabId,"match","","中国工商银行股份有限公司");
		}else if (link=="http://www.gsxt.gov.cn/index.html"){
			alert(tabId);
			sendMsg(tabId,"content","","中国工商银行股份有限公司");
		};
});
