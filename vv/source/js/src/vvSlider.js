( function( window ) {
	
	var themeDir = vv.fileDir( 'src/vvSlider.js' );
	themeDir += 'sliderTheme/';
	window.sliderTheme = [];
	
	var vvSlider = function ( param ) {
		this.param = param;
		this.param.domId  = this.param.domId  || '#vvSlider';
		this.param.addPos = this.param.addPos || 30;
		this.param.theme  = this.param.theme  || 0;
		this.param.loop   = this.param.loop   || 1;
		this.param.acd    = this.param.acd    || 0;
		this.param.speed  = this.param.speed  || ( vv.check.isIe ? 10 : 20 );
		this.param.loadedTheme = [];
		this.themeInit( 1 );
	}
	
	vvSlider.prototype = {
		
		themeInit: function( ac ) {
			var param = this.param;
			if( param.loadedTheme && param.loadedTheme[param.theme] ) {
				this.initialize( ac );
				return;
			}
			var themeRequire = vv.require( themeDir + 'sliderTheme' + param.theme + '.js' );
			var that = this;
			themeRequire.onload = function() {
				that.initialize(ac);
			}
			param.loadedTheme[param.theme] = 1;
		},
		
		initialize: function( ac ) {
			var param = this.param;
			sliderTheme[param.theme].call( vvSlider.prototype );
			switch( ac ) {
				case 1:
					this.init();
				break;
				default:
					this.refresh();
				break;
			}
			if( this.param.isShowNext ) {
				this.showNextFrame( {}, this );
				this.param.isShowNext = 0;
			}
		},
		
		init: function() {
			var param = this.param;
			var dom = $(param.domId).find('.sp');
			param.width  = dom.width();
			param.height = dom.height();
			this.domInit();
			this.setId();
			this.themeInitPos();
			this.actionInit();
			param.acLock = 0;
		},
		
		refresh: function() {
			this.domInit();
			this.setId();
			this.themeInitPos();
		},
		
		domInit: function() {
			var param = this.param;
			this.themeDomInit();
			param.contentLen = $( param.domId ).find( '.sp' ).length;
		},
		
		setId: function() {
			var param = this.param;
			param.showId = param.showId || 0;
			param.preId  = param.showId - 1 < 0 ? param.contentLen - 1 : param.showId - 1;
			param.nextId = param.showId + 1 > param.contentLen - 1 ? 0 : param.showId + 1;
		},
		
		actionInit: function() {
			var param = this.param;
			param.preDomId  = param.preDomId  || '#preFrame';
			var preDom = $( param.preDomId );
			param.nextDomId = param.nextDomId || '#nextFrame';
			var nextDom = $( param.nextDomId );
			// bind
			preDom.bindTouch( this.showPreFrame, this );
			nextDom.bindTouch( this.showNextFrame, this );
			$( param.domId ).touchGroup( this );
			var that = this;
			if( !vv.check.isMobile ) {
				$( window ).bind( 'mouseup', function() {
					that.touchEnd();
				} );
			}
			$( window ).bind( 'resize', function() {
				that.refresh();
			} );
		},
		
		showPreFrame: function( e, that ) {
			if( that.param.pageLock || that.param.scrollLock ) {
				return;
			}
			that.param.scrollLock = 1;
			that.setStartPos();
			that.themeShowPreFrame();
			that.themeSetEndPos();
		},
		
		showNextFrame: function( e, that ) {
			if( that.param.pageLock || that.param.scrollLock ){
				return;
			}
			that.param.scrollLock = 1;
			that.setStartPos();
			that.themeShowNextFrame();
			that.themeSetEndPos();
		},
		
		setStartPos: function() {
			var param = this.param;
			var contentArr = $(param.domId).find('.sp');
			param.sT = contentArr[param.showId].offsetTop;
			param.sTPre = contentArr[param.preId].offsetTop;
			param.sTNext = contentArr[param.nextId].offsetTop;
			param.sL = contentArr[param.showId].offsetLeft;
			param.sLPre = contentArr[param.preId].offsetLeft;
			param.sLNext = contentArr[param.nextId].offsetLeft;
		},
		
		setMovePos: function( changeX, changeY ) {
			var param = this.param;
			if( param.acd == 0 ) {
				
				if( !param.loop && ( ( param.showId == param.contentLen - 1 && changeY < 0 ) || ( param.showId == 0 && changeY > 0 ) ) ) {
					return;
				}
				if( Math.abs( changeY ) < 20 ) {
					return;
				}
				this.themeSetMovePos( changeY );
				
			} else {
				
				if( !param.loop && ( ( param.showId == param.contentLen - 1 && changeX < 0 ) || ( param.showId == 0 && changeX > 0 ) ) ) {
					return;
				}
				if( Math.abs( changeX ) < 20 ) {
					return;
				}
				this.themeSetMovePos( changeX );
				
			}
		},
		
		checkMoveDerectionX: function() {
			var param = this.param;
			var derection;
			if( Math.abs( param.sX-param.eX ) < param.actionDistance ) {
				derection = 0;
			} else if( param.sX > param.eX ) {
				derection = -1;
				if( !param.loop && param.showId == param.contentLen - 1 ) {
					derection = 0;
				}
			} else {
				derection = 1;
				if( !param.loop && param.showId == 0 ) {
					derection = 0;
				}
			}
			return derection;
		},
		
		checkMoveDerectionY: function() {
			var param = this.param;
			var derection;
			if( Math.abs( param.sY-param.eY ) < param.actionDistance ) {
				derection = 0;
			} else if ( param.sY > param.eY ) {
				derection = -1;
				if( !param.loop && param.showId == param.contentLen - 1 ) {
					derection = 0;
				}
			} else {
				derection = 1;
				if( !param.loop && param.showId == 0 ) {
					derection = 0;
				}
			}
			return derection;
		},
		
		touchStart: function( event ) {
			var param = this.param;
			if( param.acLock || param.scrollLock || param.menuLock ) {
				return;
			}
			vv.event.preventDefault( event );
			param.sX = event.pageX || event.x;
			param.sY = event.pageY || event.y;
			if( param.lockTop && param.sY > param.lockTop ) {
				return;
			}
			param.mX = 0;
			param.mY = 0;
			param.scrollLock = 1;
			param.moveLock = true;
			this.setStartPos();
		},
		
		touchMove: function( event ) {
			var param = this.param;
			var that  = this;
			if( param.it ) {
				clearTimeout( param.it );
			}
			param.it = setTimeout( function() {
				that.touchEnd();
				clearTimeout( param.it );
			}, 300 );
			if( !param.moveLock ) {
				return;
			}
			param.scrollLock = 0;
			param.mX = event.pageX || event.x;
			var changeX = param.mX - param.sX;
			param.mY = event.pageY || event.y;
			var changeY = param.mY - param.sY;
			this.setMovePos( changeX, changeY );
		},
		
		touchEnd: function( event ) {
			var param = this.param;
			if( !param.moveLock ) {
				return;
			}
			param.moveLock = false;
			if( param.scrollLock ) {
				param.scrollLock = 0;
				return;
			}
			if( param.mX == undefined || param.mY == undefined ) {
				param.sX = 0;
				param.eX = -param.actionDistance - 1;
				param.sY = 0;
				param.eY = -param.actionDistance - 1;
			} else {
				param.eX = param.mX || param.sX;
				param.eY = param.mY || param.sY;
			}
			this.themeSetEndPos();
		}
		
	}
	
	/* control bar */
	vvSlider.prototype.setSlideControl = function() {
		var param = this.param;
		param.controlId = param.controlId || '#FrameCode';
		var cLen = $( param.controlId ).find( '.sliderFrameId' ).length;
		var that = this;
		for( var i=0; i < cLen; i++ ) {
			( function( id ) {
				$( '#page' + id ).bindTouch( function(e,that){
					param.scrollLock = 1;
					var toId = Math.abs( parseInt( id ) % param.contentLen );
					that.themeSlideTo( toId );
				}, that );
			} )( i );
		}
	}
	
	window.vvSlider = vvSlider;
	
})( typeof window !== "undefined" ? window : this );