var baseinfo = {};
$(document).ready(function(){
  var html = $(":root").html();
  // alert(html);
  chrome.extension.sendMessage({data:html},function(response){});
})
// $(document).ready(function(){
//   var tds = $("table.detail-info tbody td");
//   alert(tds.length);
//   for (var i=0;i<=tds.length;i++){
//     alert(tds[i].html());
//   }
// })
