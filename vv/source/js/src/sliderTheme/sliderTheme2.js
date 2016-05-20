
( function( window ) {
	
	var theme = 2;
	
	sliderTheme[theme] = function(){
		
		this.themeDomInit = function() {
			
			var param = this.param;
			$( param.domId ).find( '.sp' ).css({
				'display': 'none',
				'position': 'absolute',
				'overflow': 'hidden',
				'top': vv.size.magH,
				'left': 0,
				'width': vv.size.magW,
				'height': vv.size.magH,
				opacity: 1,
				transition: 'none',
				'-webkit-transition': 'none',
				transform: 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(0deg) translateX(0px)',
				'-webkit-transform': 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(0deg) translateX(0px)'
			});
			
			$( '#slideFrames' ).css({
				overflow: 'visible'
			});
			
		}
		
		this.themeInitPos = function() {
			
			var param = this.param;
			var contentArr = $( param.domId ).find( '.sp' );
			param.actionDistance = param.actionDistance || parseInt( vv.size.magW/10 );
			
			$( contentArr[param.showId] ).css({
				'display': 'block',
				left: 0,
				top: 0,
				opacity: 1,
				transform: 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(0deg)',
				'-webkit-transform': 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(0deg)'
			});
			
			$( contentArr[param.preId] ).css({
				'display': 'block',
				left: 0,
				top: 0,
				opacity: 0,
				transform: 'rotateX(0deg) scale(1) rotateY(-90deg) rotateZ(0deg)',
				'-webkit-transform': 'rotateX(0deg) scale(1) rotateY(-90deg) rotateZ(0deg)'
			});
			
			$( contentArr[param.nextId] ).css({
				'display': 'block',
				left: 0,
				top: 0,
				opacity: 0,
				transform: 'rotateX(0deg) scale(1) rotateY(90deg) rotateZ(0deg)',
				'-webkit-transform': 'rotateX(0deg) scale(1) rotateY(90deg) rotateZ(0deg)'
			});
			
		}
		
		this.themeSetMovePos = function( changeX ){
			
			var param = this.param;
			var contentArr = $( param.domId ).find( '.sp' );
			contentArr.css({
				transition: 'none',
				'-webkit-transition': 'none'
			});
			
			var sChangeX = changeX;
			var changeX = Math.abs( changeX );
			var rotate = ( changeX / ( vv.size.magW ) ) * 90;
			rotate = rotate > 90 ? 90 : rotate;
			
			if( sChangeX > 0 ) {
				
				$( contentArr[param.showId] ).css({
					opacity: 1 - ( changeX / (vv.size.magW) ) < 0 ? 0 : 1 - ( changeX / ( vv.size.magW ) ),
					transform: 'rotateX(-10deg) scale(1) rotateY(' + rotate + 'deg) rotateZ(0deg)',
					'-webkit-transform': 'rotateX(-10deg) scale(1) rotateY(' + rotate + 'deg) rotateZ(0deg)'
				});
				
				$( contentArr[param.preId] ).css({
					opacity: ( changeX / (vv.size.magW) ),
					transform: 'rotateX(10deg) scale(1) rotateY(' + ( 90 - rotate ) + 'deg) rotateZ(0deg)',
					'-webkit-transform': 'rotateX(10deg) scale(1) rotateY(' + ( 90 - rotate ) + 'deg) rotateZ(0deg)'
				});
				
			} else {
				
				$( contentArr[param.showId] ).css({
					opacity: 1 - ( changeX / ( vv.size.magW ) ) < 0 ? 0 : 1 - ( changeX / ( vv.size.magW ) ),
					transform: 'rotateX(-10deg) scale(1) rotateY(' + ( - rotate ) + 'deg) rotateZ(0deg)',
					'-webkit-transform': 'rotateX(-10deg) scale(1) rotateY(' + ( - rotate ) + 'deg) rotateZ(0deg)'
				});
				
				$( contentArr[param.nextId] ).css({
					opacity: ( changeX / ( vv.size.magW ) ),
					transform: 'rotateX(10deg) scale(1) rotateY(' + ( -90 +  rotate ) + 'deg) rotateZ(0deg)',
					'-webkit-transform': 'rotateX(10deg) scale(1) rotateY(' + ( -90 + rotate ) + 'deg) rotateZ(0deg)'
				});
				
			}
			
		}
		
		this.themeSetEndPos = function() {
			
			var param = this.param;
			var contentArr = $( param.domId ).find( '.sp' );
			var derection = this.checkMoveDerectionX();
			
			if( derection == 1 ) {
				
				$( contentArr[param.showId] ).css({
					opacity: 0,
					transition: '1s all cubic-bezier(.09,.25,.15,.8)',
					'-webkit-transition': '1s all cubic-bezier(.09,.25,.15,.8)',
					transform: 'rotateX(0deg) scale(1) rotateY(90deg) rotateZ(0deg)',
					'-webkit-transform': 'rotateX(0deg) scale(1) rotateY(90deg) rotateZ(0deg)'
				});
				
				$( contentArr[param.preId] ).css({
					opacity: 1,
					transition: '1s all cubic-bezier(.09,.25,.15,.8)',
					'-webkit-transition': '1s all cubic-bezier(.09,.25,.15,.8)',
					transform: 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(0deg)',
					'-webkit-transform': 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(0deg)'
				});
				
				$( contentArr[param.nextId] ).css({
					opacity: 0,
					transition: '1s all cubic-bezier(.09,.25,.15,.8)',
					'-webkit-transition': '1s all cubic-bezier(.09,.25,.15,.8)'
				});
				
			} else if( derection == -1 ) {
				
				$( contentArr[param.showId] ).css({
					opacity: 0,
					transition: '1s all cubic-bezier(.09,.25,.15,.8)',
					'-webkit-transition': '1s all cubic-bezier(.09,.25,.15,.8)',
					transform: 'rotateX(0deg) scale(1) rotateY(-90deg) rotateZ(0deg)',
					'-webkit-transform': 'rotateX(0deg) scale(1) rotateY(-90deg) rotateZ(0deg)'
				});
				
				$( contentArr[param.nextId] ).css({
					opacity: 1,
					transition: '1s all cubic-bezier(.09,.25,.15,.8)',
					'-webkit-transition': '1s all cubic-bezier(.09,.25,.15,.8)',
					transform: 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(0deg)',
					'-webkit-transform': 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(0deg)'
				});
				
				$( contentArr[param.preId] ).css({
					opacity: 0,
					transition: '1s all cubic-bezier(.09,.25,.15,.8)',
					'-webkit-transition': '1s all cubic-bezier(.09,.25,.15,.8)'
				});
				
			} else {
				
				$( contentArr[param.showId] ).css({
					opacity: 0,
					transition: '1s all cubic-bezier(.09,.25,.15,.8)',
					'-webkit-transition': '1s all cubic-bezier(.09,.25,.15,.8)',
					transform: 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(0deg)',
					'-webkit-transform': 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(0deg)'
				});
				
			}
			
			var that = this;
			param.scrollLock = 1;
			var to = setTimeout( function() {
				
				param.scrollLock = 0;
				param.pageLock = 0;
				param.showId -= derection;
				param.showId = param.showId < 0 ? param.contentLen - 1 : param.showId;
				param.showId = param.showId > param.contentLen - 1 ? 0 : param.showId;
				that.setId();
				that.themeInitPos();
				if( param.callBack ) {
					param.callBack( param.showId );
				}
				
			}, 500 );
			
		}
		
		this.themeShowPreFrame = function() {
			var param = this.param;
			param.sX = 0;
			param.eX = param.sX + 100;
		}
		
		this.themeShowNextFrame = function() {
			var param = this.param;
			param.sX = 0;
			param.eX = param.sX - 100;
		}
		
		this.themeSlideTo = function(toId) {
			
			var param = this.param;
			var contentArr = $( param.domId ).find( '.sp' );
			if( param.showId == toId || param.pageLock ) {
				return;
			}
			
			param.pageLock = 1;
			contentArr.css({
				top: 0,
				left: 0,
				opacity: 0,
				transition: '1s opacity cubic-bezier(.09,.25,.15,.8)',
				'-webkit-transition': '1s opacity cubic-bezier(.09,.25,.15,.8)',
				transform: 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(0deg)',
				'-webkit-transform': 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(0deg)'
			});
			
			var that = this;
			param.showId = toId - 1 < 0 ? param.contentLen - 1 : toId - 1;
			that.deg = 0;
			var to = setTimeout( function() {
				param.pageLock = 0;
				param.scrollLock = 0;
				that.refresh();
				that.showNextFrame( 0, that );
				clearTimeout( to );
			}, 1000 );
			
		}
		
	}
	
})( window );
