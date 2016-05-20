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
			cssDir + 'src/vvScroll.css',
			cssDir + 'src/vvMenu.css',
			cssDir + 'control/vvFrontEndShare.css',
			/* js  */
			jsDir + 'com/jqExt.js',
			jsDir + 'com/vvAnimate.js',
			jsDir + 'src/vvSlider.js',
			jsDir + 'src/vvScroll.js',
			jsDir + 'src/vvMenu.js'
		];
		/* dirList end */
		
		vv.size = {
			winW: $( document.body ).width(),
			winH: $( document.body ).height()
		}
		
		$('#mainArea').css({
			position: 'absolute',
			width: 800,
			height: 600,
			left: '50%',
			'margin-left': -295,
			top: '50%',
			'margin-top': -300
		});
		
		if( !vv.check.isMobile ) {
			vv.size.magW = 800;
			vv.size.magH = 600;
			$( '#loadingLayer' ).css({
				width: vv.size.magW,
				height: vv.size.magH
			});
			$( '#slideFrames' ).css({
				position: 'relative',
				width: vv.size.magW,
				height: vv.size.magH
			});
			
			$('#vvMenu').css({
				width: vv.size.magW,
				height: vv.size.magH
			});
			
		} else {
			var scale = vv.size.winW / 800;
			vv.size.magW = vv.size.winW;
			vv.size.magH = 600 * scale;
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
				left: ( vv.size.magW - 800 ) / 2,
				top: ( vv.size.magH - 600 ) / 2,
				transform: 'rotateX(0deg) scale(' + scale + ') rotateY(0deg) rotateZ(0deg) translateX(0px)',
				'-webkit-transform'  : 'rotateX(0deg) scale(' + scale + ') rotateY(0deg) rotateZ(0deg) translateX(0px)'
			});
			
			$('#vvMenu').css({
				width: vv.size.magW,
				height: vv.size.winH
			});
			
		}
		
		var tInner = '';
		for( var i=1; i <= 17; i++ ) {
			tInner += '<div class="thumbPic" id="t' + i + '">';
			tInner += 	'<img src="../images/vvFrontEndShare/p' + i + '.jpg">';
			tInner += '</div>';
		}
		$('#thumbList').html(tInner);
		
	vv.load( function() {
		
		vv.delay( function() {
			$( '#loadingLayer' ).remove();
			// slider.themeSlideTo( 1 );
		}, 500 );
		
		var slider = new vvSlider({
			theme: 2,
			acd: 1,
			callBack: function(id){
				$( '.thumbPic' ).find('img').css({
					border: '1px solid #dddddd'
				});
				$( '#t' + ( id + 1 ) ).find('img').css({
					border: '1px solid #ff0000'
				});
				if( thumbScroll ) {
					thumbScroll.scrollTo( 0, -(id * 150) );
				}
			}
		});
		slider.setSlideControl();
		
		// console.log(slider);
		
		new vvMenu({
			slider: slider
		});
		
		var pageClicklLock;
		var pageScroll = new vvScroll({
			domId: '#pageScroll',
			acd: 0,
			cHeight: $('#pageScroll').find('.content').width() * (600/800),
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
			cHeight: $('#pageSetScroll').find('.content').width() * (600/800),
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
		
		var thumbClicklLock;
		var thumbScroll = new vvScroll({
			domId: '#thumbList',
			acd: 0,
			clickCallBack: function(id) {
				if( thumbClicklLock ) {
					return;
				}
				var toId = id.replace('t','');
				toId = parseInt(toId - 1);
				slider.themeSlideTo( toId );
				thumbClicklLock = 1;
				id = '#' + id;
				$(id).css({
					transform: 'rotateY(180deg)',
					'-webkit-transform': 'rotateY(180deg)'
				});
				$(id).attr('rotateY',180);
				$(id).vvAnimate({
					rotateY: 0
				},function(){
					thumbClicklLock = 0;
				});
			}
		});
		
	}, vvFileList );
	
});