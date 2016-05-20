
( function( window ) {
	
	var theme = 1;
	
	sliderTheme[theme] = function() {
		
		this.themeDomInit = function() {
			
			var param = this.param;
			$( param.domId ).find( '.sp' ).css({
				'display': 'none',
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
				overflow: 'hidden'
			});
			
		}
		
		this.themeInitPos = function() {
			
			var param = this.param;
			var contentArr = $( param.domId ).find( '.sp' );
			param.actionDistance = param.actionDistance || parseInt(vv.size.magW/10);
			
			$( contentArr[param.showId] ).css({
				display: "block",
				left: 0,
				top: 0
			});
			
			$( contentArr[param.preId] ).css({
				display: "block",
				left: -vv.size.magW,
				top: 0
			});
			
			$( contentArr[param.nextId] ).css({
				display: "block",
				left: vv.size.magW,
				top: 0
			});
			
		}
		
		this.themeSetMovePos = function( changeX ) {
			
			var param = this.param;
			var contentArr = $( param.domId ).find( '.sp' );
			var addplus = changeX > 0 ? 1 : -1;
			
			$( contentArr[param.showId] ).css({
				"left": param.sL + ( Math.abs( changeX ) < vv.size.magW ? changeX : vv.size.magW * addplus )
			});
			
			$(contentArr[param.preId]).css({
				"left": param.sLPre + ( Math.abs( changeX ) < vv.size.magW ? changeX : vv.size.magW * addplus )
			});
			
			$(contentArr[param.nextId]).css({
				"left": param.sLNext + ( Math.abs( changeX ) < vv.size.magW ? changeX : vv.size.magW * addplus )
			});
			
		}
		
		this.themeSetEndPos = function() {
			
			var param = this.param;
			var contentArr = $( param.domId ).find( '.sp' );
			var derection = this.checkMoveDerectionX();
			param.endL = param.sL + vv.size.magW * derection;
			var that = this;
			if( param.acLock ) {
				return;
			}
			
			param.acLock = 1;
			var aStart = parseInt( $( contentArr[param.showId] ).css( "left" ), 10 );
			var aEnd   = param.endL;
			var tEnd  = 500 / ( 1000/80 );
			var aData = vvGetAnimateData( aStart, aEnd, tEnd, vvTween.Sine.easeOut );
			var sWidth = parseInt( $( contentArr[param.showId] ).css( "width" ), 10 );
			
			new vvSchedule( function( acNum, eo ) {
				
				if( acNum >= aData.length ) {
					
					param.acLock = 0;
					param.pageLock = 0;
					param.scrollLock = 0;
					if( param.callBack ) {
						param.callBack( param.showId );
					}
					param.showId -= derection;
					param.showId = param.showId < 0 ? param.contentLen - 1 : param.showId;
					param.showId = param.showId > param.contentLen - 1 ? 0 : param.showId;
					that.setId();
					that.themeInitPos();
					clearInterval( eo );
					
				} else {
					
					$( contentArr[param.showId] ).css({
						left: aData[acNum]
					});
					$( contentArr[param.preId] ).css({
						left: aData[acNum] - sWidth
					});
					$( contentArr[param.nextId] ).css({
						left: aData[acNum] + sWidth
					});
					
				}
				
			}, 100 );
			
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
		
		this.themeSlideTo = function( toId ) {
			
			var param = this.param;
			var contentArr = $( param.domId ).find( '.sp' );
			if( toId == param.showId || param.pageLock ) {
				return;
			}
			
			param.pageLock = 1;
			var that = this;
			for( var i = 0; i < param.contentLen; i++ ) {
				$( contentArr[i] ).css({
					"left": ( i - param.showId ) * vv.size.magW,
					"opacity": 1,
					"display": "block",
					"top": 0
				});
			}
			
			var aStart = parseInt( $( contentArr[param.showId] ).css( "left" ), 10 );
			var aEnd   = ( param.showId - toId ) * vv.size.magW;
			var tEnd  = 1000 / ( 1000/60 );
			var aData = vvGetAnimateData( aStart, aEnd, tEnd, vvTween.Quart.easeOut );
			
			new vvSchedule( function( acNum, eo ) {
				
				if( acNum >= aData.length ) {
					
					param.scrollLock = 0;
					param.pageLock = 0;
					param.showId = toId;
					that.refresh();
					clearInterval( eo );
					
				} else {
					
					for( var i=0; i < param.contentLen; i++ ) {
						$( contentArr[i] ).css({
							left: aData[acNum] + ( i - param.showId ) * vv.size.magW
						});
					}
					
				}
				
			});
		}
	}
	
})( window );
