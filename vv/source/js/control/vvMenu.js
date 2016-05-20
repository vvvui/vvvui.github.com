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
			cssDir + 'src/vvMenu.css',
			/* js  */
			jsDir + 'com/jqExt.js',
			jsDir + 'com/vvAnimate.js',
			jsDir + 'src/vvScroll.js',
			jsDir + 'src/vvMenu.js'
		];
		/* dirList end */
		
	vv.load( function() {
		
		vv.delay( function() {
			$('#loadingLayer').remove();
		}, 500 );
		
		new vvMenu();
		
		var pageClicklLock;
		var pageScroll = new vvScroll({
			domId: '#pageScroll',
			acd: 0,
			cHeight: $('#pageScroll').find('.content').width() * (1280/720),
			clickCallBack: function(id) {
				if( pageClicklLock ) {
					return;
				}
				pageClicklLock = 1;
				id = '#' + id;
				$(id).css({
					transform: 'rotateY(180deg)',
					'-webkit-transform': 'rotateY(180deg)'
				});
				$(id).attr('rotateY',180);
				$(id).vvAnimate({
					rotateY: 0
				},function(){
					pageClicklLock = 0;
				});
			}
		});
		
		var pageSetClicklLock;
		var pageSetScroll = new vvScroll({
			domId: '#pageSetScroll',
			acd: 0,
			cHeight: $('#pageSetScroll').find('.content').width() * (1280/720),
			clickCallBack: function(id) {
				if( pageSetClicklLock ) {
					return;
				}
				pageSetClicklLock = 1;
				id = '#' + id;
				$(id).css({
					transform: 'rotateY(180deg)',
					'-webkit-transform': 'rotateY(180deg)'
				});
				$(id).attr('rotateY',180);
				$(id).vvAnimate({
					rotateY: 0
				},function(){
					pageSetClicklLock = 0;
				});
			}
		});
		
		var bgClicklLock;
		var bgScroll = new vvScroll({
			domId: '#bgScroll',
			acd: 0,
			clickCallBack: function(id) {
				if( bgClicklLock ) {
					return;
				}
				bgClicklLock = 1;
				id = '#' + id;
				$(id).css({
					transform: 'rotateY(180deg)',
					'-webkit-transform': 'rotateY(180deg)'
				});
				$(id).attr('rotateY',180);
				$(id).vvAnimate({
					rotateY: 0
				},function(){
					bgClicklLock = 0;
				});
			}
		});
		
		var effectClicklLock;
		var effectScroll = new vvScroll({
			domId: '#effectScroll',
			acd: 0,
			clickCallBack: function(id) {
				if( effectClicklLock ) {
					return;
				}
				effectClicklLock = 1;
				id = '#' + id;
				$(id).css({
					transform: 'rotateY(180deg)',
					'-webkit-transform': 'rotateY(180deg)'
				});
				$(id).attr('rotateY',180);
				$(id).vvAnimate({
					rotateY: 0
				},function(){
					effectClicklLock = 0;
				});
			}
		});
		
	}, vvFileList );
	
});