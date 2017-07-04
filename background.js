// 最后的详情连接
var detail_link
// 关闭的标签id
var close_id
var data_tab_id
// 休眠函数
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

start();

// 标签监听函数
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab) {
		var link = changeInfo.url;
		if (link=="http://www.gsxt.gov.cn/corp-query-search-1.html"){
			close_id = tabId;
			chrome.tabs.executeScript(tabId,{file:"match.js"});
		}else if (link=="http://www.gsxt.gov.cn/index.html"){
			sendMsg(tabId,"content","","中国工商银行股份有限公司");
		}else if (detail_link && link==detail_link){
			data_tab_id = tabId;
			chrome.tabs.executeScript(tabId,{file:"jquery-2.0.0.min.js"});
			chrome.tabs.executeScript(tabId,{file:"source.js"});
		}else if (data_tab_id && tabId==data_tab_id && link){
			chrome.tabs.executeScript(tabId,{file:"jquery-2.0.0.min.js"});
			// chrome.tabs.sendMessage(tabId,{cmd:"fetch"},function(response){});
			chrome.tabs.executeScript(tabId,{file:"fetch.js"})
		}
});

// 消息监听函数
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if (request.link){
		detail_link = request.link;
	}else if (request.status && close_id) {
		chrome.tabs.remove(close_id);
		sendResponse("ok");
	}else if (request.data){
		alert(request.data);
		$.ajax({
			type: "GET",
			url: "http://localhost:5566/Service1.svc/GetTestList",
			dataType: "json",
			contenttype: "text/json; charset=utf-8",
			async: false,
			success:function(data){},
			error: function (xhr, text, msg) {
					alert(text);
				}
		});
	}
});
