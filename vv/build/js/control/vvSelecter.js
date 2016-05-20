$(function() {
	var 
		window = typeof window !== "undefined" ? window : this,
		doucument = window.document;
		
	new vvDateSelecter({
		domId: '#vvDateSelecter',
		timeBegin: timeBegin || 0,
		timeEnd: timeEnd || 0,
		callBack: function() {
			console.log(1);
		}
	});
	
});