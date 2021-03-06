
( function( window ) {
	var
		document = window.document,
		theme = 0;
		
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
			param.actionDistance = param.actionDistance || parseInt( vv.size.magH/10 );
			var contentArr = $( param.domId ).find( '.sp' );
			
			$( contentArr[param.showId] ).css({
				display: 'block',
				left: 0,
				top: 0
			});
			
			$( contentArr[param.preId] ).css({
				display: 'block',
				left: 0,
				top: -vv.size.magH
			});
			
			$( contentArr[param.nextId] ).css({
				display: 'block',
				left: 0,
				top: vv.size.magH
			});
			
		}
		
		this.themeSetMovePos = function( changeY ) {
			
			var param = this.param;
			var contentArr = $( param.domId ).find( '.sp' );
			var addplus = changeY > 0 ? 1 : -1;
			
			$( contentArr[param.showId] ).css({
				'top' : param.sT + ( Math.abs( changeY ) < vv.size.magH ? changeY : vv.size.magH * addplus )
			});
			
			$( contentArr[param.preId] ).css({
				'top' : param.sTPre + ( Math.abs(changeY) < vv.size.magH ? changeY : vv.size.magH * addplus )
			});
			
			$( contentArr[param.nextId] ).css({
				'top' : param.sTNext + ( Math.abs(changeY) < vv.size.magH ? changeY : vv.size.magH * addplus )
			});
			
		}
		
		this.themeSetEndPos = function() {
			
			var param = this.param;
			var derection = this.checkMoveDerectionY();
			param.endT = param.sT + vv.size.magH * derection;
			if( param.acLock ) {
				return;
			}
			param.acLock = 1;
			
			var that = this;
			var contentArr = $( param.domId ).find( '.sp' );
			var aStart = parseInt( $( contentArr[param.showId] ).css( 'top' ), 10 );
			var aEnd   = param.endT;
			var tEnd  = 500 / ( 1000/80 );
			var aData = vvGetAnimateData( aStart, aEnd, tEnd, vvTween.Sine.easeOut );
			
			new vvSchedule( function( acNum, eo ) {
				
				if( acNum >= aData.length ) {
					
					param.acLock = 0;
					param.pageLock = 0;
					param.scrollLock = 0;
					if(param.callBack){
						param.callBack(param.showId);
					}
					param.showId -= derection;
					param.showId = param.showId < 0 ? param.contentLen - 1 : param.showId;
					param.showId = param.showId > param.contentLen - 1 ? 0 : param.showId;
					that.setId();
					that.themeInitPos();
					clearInterval(eo);
					
				} else {
					
					$( contentArr[param.showId] ).css({
						top: aData[acNum]
					});
					$( contentArr[param.preId] ).css({
						top: aData[acNum] - vv.size.magH
					});
					$( contentArr[param.nextId] ).css({
						top: aData[acNum] + vv.size.magH
					});
					
				}
				
			}, 100 );
			
		}
		
		this.themeShowPreFrame = function() {
			var param = this.param;
			param.sY = 0;
			param.eY = param.sY + 100;
		}
		
		this.themeShowNextFrame = function() {
			var param = this.param;
			param.sY = 0;
			param.eY = param.sY - 100;
		}
		
		this.themeSlideTo = function( toId ) {
			
			var param = this.param;
			if( toId == param.showId  || param.pageLock ) {
				return;
			}
			param.pageLock = 1;
			var that = this;
			var contentArr = $( param.domId ).find( '.sp' );
			for( var i = 0; i < param.contentLen; i++ ) {
				$( contentArr[i] ).css({
					'left': 0,
					'opacity': 1,
					'display': 'block',
					'top': ( i - param.showId ) * vv.size.magH
				});
			}
			
			var aStart = parseInt( $(contentArr[param.showId] ).css( 'top' ), 10 );
			var aEnd   = ( param.showId - toId ) * vv.size.magH;
			var tEnd  = 1000 / ( 1000/60 );
			var aData = vvGetAnimateData( aStart, aEnd, tEnd, vvTween.Quart.easeOut );
			
			new vvSchedule( function( acNum, eo ) {
				
				if( acNum >= aData.length ){
					
					param.pageLock = 0;
					param.scrollLock = 0;
					param.showId = toId;
					that.refresh();
					clearInterval(eo);
					
				} else {
					
					for( var i = 0; i < param.contentLen; i++ ) {
						$( contentArr[i] ).css({
							'top': aData[acNum] + ( i - param.showId ) * vv.size.magH
						});
					}
					
				}
				
			});
			
		}
		
	}
	
})( window );
