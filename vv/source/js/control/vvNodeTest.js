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
		
		// $.ajax({
			// url: 'http://127.0.0.1:8000/',
			 // dataType: "jsonp",////////
			// data: '{"data": "TEST"}',
			// type: 'POST',
			// jsonpCallback: 'callback', // this is not relevant to the POST anymore
			// success: function (data) {
				// var ret = jQuery.parseJSON(data);
				// console.log(ret.msg);
				// console.log('Success: ')
			// },
			// error: function (xhr, status, error) {
				// console.log('Error: ' + error.message);
				// $('#lblResponse').html('Error connecting to the server.');
			// },
		// });
		
		$.ajax({
			url: 'http://127.0.0.1:8000/',
			data: {
				t1: 1,
				t2: 2,
				t3: 3,
				t4: 8888
			},
			type: 'post',
			cache: false,
			dataType: 'json',
			success: function(data) {
				console.log(data);
			},
			error: function() {
				alert("异常！");
			}
		});
		
	}, vvFileList );
	
});