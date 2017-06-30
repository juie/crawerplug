

function getname(){
  var h1s = document.getElementsByTagName("h1");
  for (var i=0; i<h1s.length; i++){
    alert(h1s[i].innerText);
  }
}

getname();
