function sleep(d) {
	if (!d) {
		d = Math.random() * 1000 + 1000;
		// d = Math.random() * 1500;
	}
	for (var t = Date.now(); Date.now() - t <= d;);
}
function getpage(){
	while(true){
		var img = $(".print_img");
		if (img.length>0){
			alert("000000000");
		}
	}
}

function print(){
  setTimeout('document.getElementById("btn_print").click()',1000);
  chrome.extension.sendMessage({status:"complete"},function(response){alert(response)});
}

print();

// chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
// 	if (request.cmd && request.cmd=="fetch"){
// 		alert("yes");
// 	}
// });
