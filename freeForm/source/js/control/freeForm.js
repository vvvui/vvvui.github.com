$( function() {
	var 
		window = typeof window !== "undefined" ? window : this,
		doucument = window.document,
		/* dirList */
		jsDir  = '../js/',
		cssDir = '../css/',
		vvFileList = [
			/* css */
			// cssDir + 'src/freeForm.css',
			/* js  */
			jsDir + 'com/jqExt.js',
			jsDir + 'com/vvAnimate.js',
			jsDir + 'src/paramSetter.js',
			jsDir + 'src/referenceSys.js',
			jsDir + 'src/freeForm.js'
		];
		/* dirList end */
		
		vv.size = {
			winW: $( document.body ).width(),
			winH: $( document.body ).height()
		}
		
	vv.load( function() {
		
		if (vv.check.isIe) {
			$('.setIcon, .delIcon, .resizeIcon, .setClose').css({
				'background-image' : 'none'
			});
		}
		
		function stop() {
			return false;
		}
		// document.oncontextmenu = stop;
		
		var formObj = new freeForm();
		
	}, vvFileList );
	
});