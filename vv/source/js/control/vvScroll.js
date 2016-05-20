$(function() {
	var 
		window = typeof window !== "undefined" ? window : this,
		doucument = window.document,
		/* dirList */
		jsDir  = '../js/',
		cssDir = '../css/',
		vvFileList = [
			/* css */
			cssDir + 'src/vvScroll.css',
			/* js  */
			jsDir + 'com/jqExt.js',
			jsDir + 'com/vvAnimate.js',
			jsDir + 'src/vvScroll.js'
		];
		/* dirList end */
		
	vv.load( function() {
		
		vv.delay( function() {
			$('#loadingLayer').remove();
		}, 500 );
		
		var clicklLock;
		var scroll = new vvScroll({
			domId: '#vvScroll',
			acd: 0,
			clickCallBack: function(id) {
				if( clicklLock ) {
					return;
				}
				clicklLock = 1;
				id = '#' + id;
				$(id).css({
					transform: 'rotateY(180deg)',
					'-webkit-transform': 'rotateY(180deg)'
				});
				$(id).attr('rotateY',180);
				$(id).vvAnimate({
					rotateY: 0
				},function(){
					clicklLock = 0;
				});
			}
		});
		
	}, vvFileList );
	
});