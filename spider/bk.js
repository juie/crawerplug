var name;

function getdata_from_server(){
  $.get("http://localhost:8080/api/two",function(data,status){
    name = data;
  });
}

function postdata_to_server(data){
  $.ajax({
            url : 'http://localhost:8080/api/one',
            data:{data:data},
            cache : false,
            async : false,
            type : "POST",
            dataType : 'json/xml/html',
            success : function (data,status){
                return status;
                }
            });
}

//回调函数,用于省略
function page(tab){

}

function checktab(url){
    chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT},function(tabs){
          tabs.forEach(function(tab, index) {
              if (tab.url==url){
                  chrome.tabs.remove(tab.id);
              }
          });

      });
    chrome.tabs.create({"url" : url},page);
}


function removetab(url){
    chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT},function(tabs){
          tabs.forEach(function(tab, index) {
              if (tab.url==url){
                  chrome.tabs.remove(tab.id);
              }
          });
      });

}

//启动函数，用于创建标签（首页）
function start(){
	var url = "http://www.gsxt.gov.cn/index.html"; 
	checktab(url);
  getdata_from_server();
}

chrome.browserAction.onClicked.addListener(function() {
	start();
});


// 标签监听函数
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab) {
              var url = changeInfo.url;
              if (url=="http://www.gsxt.gov.cn/corp-query-search-1.html"){

                  chrome.tabs.executeScript(tabId,{file:"match.js"});
              }
});

chrome.extension.onConnect.addListener(function(port) {
  if (port.name == "zooptobk"){
    // console.assert(port.name == "zooptobk","failed");
      port.onMessage.addListener(function(msg) {
      if (msg.page == "zoop" && msg.type=="full" && msg.status=="begen"){
          port.postMessage({cmd:"full",companyname:name});
      }else if (msg.page == "zoop" && msg.type=="full" && msg.status=="complete"){
          port.postMessage({cmd:"over",url:"http://www.gsxt.gov.cn/corp-query-search-1.html"});
                       
      }else if (msg.page == "zoop" && msg.type=="full" && msg.status=="failed") {
            alert("full failed");
            removetab(msg.url);
            start();
      }
    });
  }else if (port.name=="matchtobk"){
      port.onMessage.addListener(function(msg){
        if (msg.page == "match" && msg.type=="match" && msg.status=="begen"){
            port.postMessage({cmd:"match",companyname:name});
        }else if (msg.page == "match" && msg.type=="match" && msg.status=="failed") {
            alert("match failed");
            removetab(msg.url);
            start();
        }else if (msg.page == "match" && msg.type=="match" && msg.status=="success") {
            port.postMessage({cmd:"over",url:msg.url});
            chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab) {
              var url = changeInfo.url;
              if (url==msg.url){
                  chrome.tabs.executeScript(tabId,{file:"jquery.min.js"});
                  chrome.tabs.executeScript(tabId,{file:"content.js"});
              }
            });
        }else if (msg.page == "match" && msg.type=="match" && msg.status=="over") {
            removetab(msg.url);
        }
      });
  }else if (port.name=="contenttobk") {
      port.onMessage.addListener(function(msg){
        if (msg.page == "content" && msg.type=="getcontent" && msg.status=="begen"){
            port.postMessage({cmd:"getcontent",companyname:name});
        }else if (msg.page == "content" && msg.type=="getcontent" && msg.status=="success") {
            port.postMessage({cmd:"over",url:msg.url});
            chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab) {
              var url = changeInfo.url;
              if (url==msg.url){
                  chrome.tabs.executeScript(tabId,{file:"jquery.min.js"});
                  chrome.tabs.executeScript(tabId,{file:"fetch.js"});
              }
            });
        }else if (msg.page == "content" && msg.type=="getcontent" && msg.status=="over") {
            // port.disconnect();
            // console.log('getcontent over');
        }else if (msg.page == "content" && msg.type=="getcontent" && msg.status=="failed") {
            alert("getcontent failed");
            removetab(msg.url);
            start();
        }
      });
  }else if (port.name=="fetchtobk") {
      port.onMessage.addListener(function(msg){
        if (msg.page == "fetch" && msg.type=="fetch" && msg.status=="begen"){
            port.postMessage({cmd:"fetch",companyname:name});
        }else if (msg.page == "fetch" && msg.type=="fetch" && msg.status=="success") {
            postdata_to_server(msg.data);
            removetab(msg.url);
            start();
            // port.disconnect();
        }
      });
  }
});