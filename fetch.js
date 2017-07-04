var baseinfo = {};
// $(document).ready(function(){
//   var html = $(":root").html();
//   alert(html);
// })
$(document).ready(function(){
  var tds = $("table.detail-info tbody td");
  for (var i=0;i<=tds.length;i++){
    alert(tds.[i].html());
  }
})
