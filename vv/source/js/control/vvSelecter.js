$(function() {
	var 
		window = typeof window !== "undefined" ? window : this,
		doucument = window.document,
		/* dirList */
		jsDir  = '../js/',
		cssDir = '../css/',
		vvFileList = [
			/* css */
			cssDir + 'src/vvSelecter.css',
			/* js  */
			jsDir + 'com/jqExt.js',
			jsDir + 'com/vvAnimate.js',
			jsDir + 'src/vvSelecter.js',
			jsDir + 'src/vvDateSelecter.js'
		];
		/* dirList end */
		
	vv.load( function() {
		
		new vvDateSelecter({
			domId: '#vvDateSelecter',
			timeBegin: timeBegin || 0,
			timeEnd: timeEnd || 0,
			callBack: function() {
				console.log(1);
			}
		});
		
	}, vvFileList );
	
});