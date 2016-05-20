(function( window ) {
	
	var vvScroll = function ( param ) {
		this.param = param;
		this.param.domId   = this.param.domId   || '#vvScroll';
		this.param.addPos  = this.param.addPos  || 30;
		this.param.cHeight = this.param.cHeight || 0;
		this.param.acd     = this.param.acd     || 0;
		this.param.speed   = this.param.speed   || ( vv.check.isIe ? 10 : 20 );
		this.param.limitHeight = this.param.limitHeight || this.param.limitHeight == 0 ? this.param.limitHeight : 1;
		this.init();
	}
	
	vvScroll.prototype = {
		
		init: function() {
			var param = this.param;
			if( param.limitHeight ) {
				$( param.domId ).find( '.content' ).css({
					height: param.cHeight || $( param.domId ).find( '.content' ).width()
				});
			}
			var scrollDiv = document.createElement( 'div' );
			var scrollDom = $( scrollDiv );
			var inner = $( param.domId ).html();
			scrollDom.html( inner );
			$( param.domId ).html( scrollDom );
			$( param.domId ).css({
				'position': param.position || 'relative',
				'overflow': 'hidden'
			});
			scrollDom.css({
				top: 0,
				left: 0,
				position: 'absolute',
				width: param.contentWidth || '100%'
			});
			param.scrollDomId = param.domId + "_scroll";
			scrollDom.attr( "id", param.scrollDomId.substr(1) );
			scrollDom.addClass( 'unSelect' );
			var domId = param.domId;
			$( domId ).touchGroup( this );
			var that = this;
			if( !vv.check.isMobile ) {
				$( window ).bind( 'mouseup', function( e ) {
					that.touchEnd( e );
				} );
			}
		},
		
		touchStart: function( event ) {
			var param = this.param;
			if( param.animate ) {
				clearInterval( param.animate );
				delete param.animate;
				param.animate = null;
			}
			param.moveLock = true;
			param.isMove = 0;
			param.sX = event.pageX || event.x;
			param.sY = event.pageY || event.y;
			if( param.acd ) {
				param.sL = parseInt( $( param.scrollDomId ).css( "left" ) , 10 );
				param.lastPosX  = param.sX;
				param.sLastPosX = param.sX;
			} else {
				param.sT = parseInt( $( param.scrollDomId ).css( "top" ) , 10 );
				param.lastPosY  = param.sY;
				param.sLastPosY = param.sY;
			}
		},
		
		touchMove: function( event ) {
			var param = this.param;
			if( !param.moveLock ) {
				return;
			}
			if( param.acd ) {
				// horizontal
				param.mX = event.pageX || event.x;
				if( Math.abs( param.mX - param.sX ) >= 10 ) {
					param.isMove = 1;
				}
				param.sLastPosX = param.lastPosX;
				param.lastPosX = param.mX;
				var changeX = param.mX - param.sX;
				$( param.scrollDomId ).css({
					"left": param.sL + changeX
				});
				
			} else {
				// vertical
				param.mY = event.pageY || event.y;
				if( Math.abs( param.mY - param.sY ) >= 10 ) {
					param.isMove = 1;
				}
				param.sLastPosY = param.lastPosY;
				param.lastPosY = param.mY;
				var changeY = param.mY - param.sY;
				$(param.scrollDomId).css({
					"top" : param.sT + changeY
				});
			}
			/* move outSide */
			var that = this;
			if( vv.check.isMobile || vv.check.isIe ) {
				if( param.it ) {
					clearTimeout( param.it );
				}
				param.it = setTimeout( function() {
					that.touchEnd( event );
					clearTimeout( param.it );
				}, 300 );
			}
		},
		
		touchEnd: function( event ) {
			var param = this.param;
			if( !param.moveLock ) {
				return;
			}
			param.moveLock = false;
			if( !param.isMove ) {
				if( param.clickCallBack ) {
					var id = vv.event.getTarget( event ).id;
					param.clickCallBack( id );
				}
			}
			
			if( param.acd ) {
				// horizontal
				var addRate = Math.abs( param.lastPosX - param.sLastPosX ) > 2 ? param.lastPosX - param.sLastPosX : 0;
				var oX = parseInt( $( param.scrollDomId ).css( "left" ) , 10 );
				oX += parseInt( param.addPos * addRate, 10 );
				// limit
				var moveX;
				var maxLeftPos = -( parseInt( $( param.scrollDomId ).width(), 10 ) - parseInt( $( param.domId ).width(), 10 ) );
				moveX = oX > maxLeftPos ? oX : maxLeftPos;
				moveX = moveX < 0 ? moveX : 0;
				
				var moveY = parseInt( $( param.scrollDomId ).css( "top" ) , 10 );
				this.scrollTo( moveX, moveY );
				
			} else {
				// vertical
				var addRate = Math.abs( param.lastPosY - param.sLastPosY ) > 2 ? param.lastPosY - param.sLastPosY : 0;
				var oY = parseInt( $( param.scrollDomId ).css( "top" ) , 10 );
				oY += parseInt( param.addPos * addRate, 10 );
				// limit
				var moveY;
				var maxTopPos = -( parseInt( $( param.scrollDomId ).height(), 10 ) - parseInt( $( param.domId ).height(), 10 ) );
				moveY = oY > maxTopPos ? oY : maxTopPos;
				moveY = moveY < 0 ? moveY : 0;
				var moveX = parseInt( $( param.scrollDomId ).css( "left" ) , 10 );
				this.scrollTo( moveX, moveY );
				
			}
			
		},
		
		scrollTo: function( toX, toY ) {
			var param = this.param;
			$( param.scrollDomId ).vvAnimate({
				left : toX,
				top  : toY
			}, function() {
				if( param.callBack ) {
					param.callBack();
				}
			}, {}, param );
		}
		
	}
	
	window.vvScroll = vvScroll;
	
})( typeof window !== 'undefined' ? window : this );