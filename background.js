var detail_link                        // 最后的详情连接
var close_id                           // 关闭的标签id
var data_tab_id
var serverdata



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
	chrome.tabs.sendMessage(tabId, {
		type: type,
		rule: rule,
		name: name
	},function(response){console.log(response)});
}

//回调函数,用于省略
function page(tabs){
}

//启动函数，用于创建标签（首页）
function start(){
	var url = "http://www.gsxt.gov.cn/index.html";
	chrome.tabs.create({"url" : url},page);
}

// 从服务器获取字段
function getdata_from_server(tabId){
	$.get("http://localhost:8080/api/two",function(data,status){
		alert(data);
		serverdata = data;
		alert(serverdata);
		sendMsg(tabId,"content","",serverdata);
	});
}

//icon监听函数
chrome.browserAction.onClicked.addListener(function() {
	start();
});

// 标签监听函数
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab) {
		var link = changeInfo.url;
		if (link=="http://www.gsxt.gov.cn/corp-query-search-1.html"){
			close_id = tabId;
			chrome.tabs.executeScript(tabId,{file:"match.js"});
		}else if (link=="http://www.gsxt.gov.cn/index.html"){
			getdata_from_server(tabId);
			// sendMsg(tabId,"content","","中国工商银行股份有限公司");
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
		// $.get("http://localhost:8080/api/one?data="+request.data,function(data,status){
			// alert(status);
		// });
		$.ajax({
						url : 'http://localhost:8080/api/one',
	          data:{data:request.data},
	          cache : false,
	          async : false,
	          type : "POST",
	          dataType : 'json/xml/html',
	          success : function (data,status){
	              console.log(status);
	              }
	          });
		if (data_tab_id){
			chrome.tabs.remove(data_tab_id);
			sleep();
			// start();
		}
	}
});
