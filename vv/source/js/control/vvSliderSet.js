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
			
			$('#vvMenu').css({
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
			
			$('#vvMenu').css({
				width: vv.size.magW,
				height: vv.size.winH
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
		
		var menu = new vvMenu({
			slider: slider
		});
		
		// sliderSet
		var sliderSet = {
			// setObject
			slider: slider,
			// setBg
			setBg: function( bgUrl ) {
				$('#vvSlider').css({
					'background-image': 'url(' + bgUrl + ')',
					'background-size': vv.size.magW + 'px auto',
					'background-repeat': 'no-repeat'
				});
			},
			setEffect: function( id ) {
				var param = this.slider.param;
				param.theme = id;
				param.isShowNext = 1;
				switch( param.theme ) {
					case 0:
						param.acd = 0;
					break;
					default:
						param.acd = 1;
					break;
				}
				this.slider.themeInit(0);
			},
			setSinglePic: function( id ) {
				console.log(id);
			}
		}
		
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
		
		var componentClicklLock;
		var componentScroll = new vvScroll({
			domId: '#componentScroll',
			acd: 0,
			clickCallBack: function(id) {
				if( componentClicklLock ) {
					return;
				}
				switch (id) {
					case 'singlePic':
					case 'multiPic':
					break;
					default:
						return;
					break;
				}
				componentClicklLock = 1;
				id = '#' + id;
				$(id).css({
					transform: 'rotateY(180deg)',
					'-webkit-transform': 'rotateY(180deg)'
				});
				$(id).attr('rotateY',180);
				$(id).vvAnimate({
					rotateY: 0
				},function(){
					componentClicklLock = 0;
				});
				vv.delay( changeComponent, 500 );
				// change action
				function changeComponent() {
					$('.openArea').hide();
					switch (id) {
						case '#singlePic':
							$('#singlePicArea').show();
							showOpenContent();
						break;
						case '#multiPic':
							$('#multiPicArea').show();
							showOpenContent();
						break;
					}
				}
				function showOpenContent() {
					$('#openContent,.componentMenu,.contentAreaOpen').show();
					$('#openContent').css({
						left: '100%',
						top: $('#menuContent').css("top")
					});
					$('#openContent').vvAnimate({
						left: 0
					},function(){
						menu.param.menuLock = 1;
					},{
						acTime: 800
					});
				}
			}
		});
		
		var singlePageClicklLock;
		var componentSinglePageScroll = new vvScroll({
			domId: '#componentSinglePageScroll',
			acd: 0,
			cHeight: $('#componentSinglePageScroll').find('.content').width() * (1280/720),
			clickCallBack: function(id) {
				var reg = /list/;
				if( singlePageClicklLock || !reg.test( $( '#' + id ).attr('class') ) ) {
					return;
				}
				singlePageClicklLock = 1;
				id = '#' + id;
				$(id).css({
					transform: 'rotateY(180deg)',
					'-webkit-transform': 'rotateY(180deg)'
				});
				$(id).attr('rotateY',180);
				$(id).vvAnimate({
					rotateY: 0
				},function(){
					singlePageClicklLock = 0;
					sliderSet.setSinglePic(id);
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
				});
				vv.delay( function(){
					bgClicklLock = 0;
					var bgUrl = $(id).find('img')[0].src;
					sliderSet.setBg( bgUrl );
				}, 500 );
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
				});
				vv.delay( function(){
					effectClicklLock = 0;
					id = id.replace('#setEffect','');
					sliderSet.setEffect( parseInt( id, 10 ) );
				}, 500 );
			}
		});
		
	}, vvFileList );
	
});