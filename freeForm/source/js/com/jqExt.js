( function( window ) {
	
	$.fn.extend({
		vvAnimate: function( param, vvCallBack, acParam, eo ){
			return new vvAnimate( this.selector, param, vvCallBack, acParam, eo );
		}
	});
	
	$.fn.extend({
		touch: function(callBack) {
			if( vv.check.isMobile ) {
				this.unbind( 'touchstart', callBack );
				this.bind( 'touchstart', callBack );
			} else {
				this.unbind( 'mousedown', callBack );
				this.bind( 'mousedown', callBack );
			}
		}
	});
	
	$.fn.extend({
		bindTouch: function( callBack, that ) {
			if( vv.check.isMobile ) {
				this.bind( 'touchstart', function(event){
					vv.event.preventDefault(event);
					callBack(event,that);
				} );
			} else {
				this.click( function(event) {
					callBack(event,that);
				} );
			}
		}
	});
	
	$.fn.extend({
		touchGroup: function( object , moveLock ) {
			var touchObj = this[0];
			if( vv.check.isMobile ) {
				/* touch start */
				touchObj.addEventListener( 'touchstart', function( event ) {
					vv.event.preventDefault( event );
					object.touchStart( event.targetTouches[0] );
				}, false );
				/* touch move */
				document.addEventListener( 'touchmove', function( event ) {
					object.touchMove( event.targetTouches[0] );
				}, false );
				/* touch end */
				touchObj.addEventListener( 'touchend', function( event ) {
					object.touchEnd( event );
				}, false );
			} else {
				if( window.attachEvent ) { /* ie */
					touchObj.attachEvent( 'onmousedown', function( event ) {
						vv.event.preventDefault(event);
						object.touchStart( event );
					});
					if (moveLock) {
						touchObj.attachEvent( 'onmousemove', function( event ) {
							object.touchMove( event );
						}, false );
					} else {
						document.attachEvent( 'onmousemove', function( event ) {
							object.touchMove( event );
						}, false );
					}
					touchObj.attachEvent( 'onmouseup', function( event ) {
						object.touchEnd( event );
					});
				} else { /* webkit */
					touchObj.addEventListener( 'mousedown', function( event ) {
						vv.event.preventDefault(event);
						object.touchStart(event);
					}, false );
					if (moveLock) {
						touchObj.addEventListener( 'mousemove', function( event ) {
							object.touchMove( event );
						}, false );
					} else {
						document.addEventListener( 'mousemove', function( event ) {
							object.touchMove( event );
						}, false );
					}
					touchObj.addEventListener( 'mouseup', function( event ) {
						object.touchEnd( event );
					}, false );
				}
			}
		}
	});
	
})( typeof window !== "undefined" ? window : this );