$( function() {
	var 
		window = typeof window !== "undefined" ? window : this,
		doucument = window.document,
		/* dirList */
		jsDir  = '../js/',
		cssDir = '../css/',
		vvFileList = [
			/* css */
			cssDir + 'src/vvSlider.css',
			/* js  */
			jsDir + 'com/jqExt.js',
			jsDir + 'com/vvAnimate.js',
			jsDir + 'src/vvSlider.js'
		];
		/* dirList end */
		
		vv.size = {
			winW: $( document.body ).width(),
			winH: $( document.body ).height()
		}
		
		if( !vv.check.isMobile ) {
			vv.size.magW = 320;
			vv.size.magH = 568;
			$( '#loadingLayer' ).css({
				width: vv.size.magW,
				height: vv.size.magH
			});
			$( '#slideFrames' ).css({
				position: 'relative',
				width: vv.size.magW,
				height: vv.size.magH
			});
		} else {
			var scale = vv.size.winW / 320;
			vv.size.magW = vv.size.winW;
			vv.size.magH = 568 * scale;
			$( '#loadingLayer' ).css({
				width: vv.size.winW,
				height: vv.size.winH
			});
			$('#slideFrames').css({
				position: 'relative',
				width: vv.size.magW,
				height: vv.size.magH,
				left: ( vv.size.winW - vv.size.magW ) / 2,
				top: ( vv.size.winH - vv.size.magH ) / 2
			});
			$( '#slideFrames' ).find( '.sliderContent' ).css({
				left: ( vv.size.magW - 320 ) / 2,
				top: ( vv.size.magH - 480 ) / 2,
				transform: 'rotateX(0deg) scale(' + scale + ') rotateY(0deg) rotateZ(0deg) translateX(0px)',
				'-webkit-transform'  : 'rotateX(0deg) scale(' + scale + ') rotateY(0deg) rotateZ(0deg) translateX(0px)'
			});
		}
		
	vv.load( function() {
		
		vv.delay( function() {
			$( '#loadingLayer' ).remove();
		}, 500 );
		
		var slider = new vvSlider({
			theme: 0,
			acd: 0
		});
		slider.setSlideControl();
		
		// console.log(slider);
		
	}, vvFileList );
	
});