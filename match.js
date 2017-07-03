var url

function getname(name){
  var alist = document.getElementsByTagName("h1");
  for (var i=0; i<alist.length; i++){
    if(alist[i].innerText==name){
      url = alist[i].parentNode.href;
      chrome.tabs.sendMessage({link:url},function(response){});
      alist[i].click();
    }
  }
}

getname(name);
