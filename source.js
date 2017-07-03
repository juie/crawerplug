function sleep(d) {
	if (!d) {
		d = Math.random() * 1000 + 1000;
		// d = Math.random() * 1500;
	}
	for (var t = Date.now(); Date.now() - t <= d;);
}

function print(){
  setTimeout('document.getElementById("btn_print").click()',1000);
  // setTimeout('$("#btn_print").click()',1000);
  // setTimeout(function(){console.log('$("#btn_print").click()');},1000)
}

print();
