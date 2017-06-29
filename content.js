jQuery.fn.simulateKeyPress = function(character) {    
  // 内部调用jQuery.event.trigger    
  // 参数有 (Event, data, elem). 最后一个参数是非常重要的的！    
  jQuery(this).trigger({ type: 'keypress', which: character.charCodeAt(0) });    
}; 

$(document).ready(function(){
	var input = $("#keyword");
	var btn = $("#btn_query");
	input.val("重庆强渝科技");
	// setTimeout(function(){
		// btn.click();
	// },1000);	 
})
