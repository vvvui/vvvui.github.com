
( function( window ) {
	
	var theme = 4;
	
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
			
			this.theme4InitData();
			
		}
		
		this.themeInitPos = function() {
			
			var param = this.param;
			var contentArr = $( param.domId ).find( '.sp' );
			param.actionDistance = param.actionDistance || parseInt( vv.size.magW/10, 10 );
			
			var
				w = vv.size.magW,
				h = vv.size.magH,
				d = 0,
				bo = param.theme4MoveData[ parseInt(d,10).toString() ];
				
			$( contentArr[param.preId] ).css({
				display: 'block',
				left: -bo.mx + bo.pa,
				top: 0,
				opacity: 0.5,
				transform: 'rotateX(' + bo.rx + 'deg) scale(1) rotateY(' + ( 270 + d ) + 'deg) rotateZ(0deg) translateX('+( -w/2 + bo.tx )+'px)',
				'-webkit-transform' : 'rotateX(' + bo.rx + 'deg) scale(1) rotateY(' + ( 270 + d ) + 'deg) rotateZ(0deg) translateX('+( -w/2 + bo.tx )+'px)'
			});
			
			$( contentArr[param.showId] ).css({
				display: 'block',
				left: 0  + bo.pa,
				top: 0,
				opacity: 1,
				transform: 'rotateX(' + bo.rx + 'deg) scale(1) rotateY(' + ( d ) + 'deg) rotateZ(0deg) ',
				'-webkit-transform': 'rotateX(' + bo.rx + 'deg) scale(1) rotateY(' + ( d ) + 'deg) rotateZ(0deg) '
			});
			
			$( contentArr[param.nextId] ).css({
				display: 'block',
				left: bo.mx + bo.pa,
				top: 0,
				opacity: 0.5,
				'transform': 'rotateX(' + bo.rx + 'deg) scale(1) rotateY(' + ( 90 + d ) + 'deg) rotateZ(0deg) translateX('+ ( w/2 + bo.tx ) +'px)',
				'-webkit-transform': 'rotateX(' + bo.rx + 'deg) scale(1) rotateY(' + ( 90 + d ) + 'deg) rotateZ(0deg) translateX('+( w/2 + bo.tx )+'px)'
			});
			
		}
		
		this.themeSetMovePos = function( changeX ) {
			
			var param = this.param;
			var contentArr = $( param.domId ).find( '.sp' );
			
			if( !changeX ) {
				return;
			}
			
			var w = vv.size.magW;
			var h = vv.size.magH;
			changeX = changeX > w ? w : changeX;
			var
				changeD = ( changeX * 90 )/w,
				d = changeD,
				bo = param.theme4MoveData[parseInt(d,10).toString()],
				showAlpha = Math.abs( ( changeX * 0.5 )/w ),
				preAlpha,
				nextAlpha;
				
			param.deg4 = d;
			if( changeX > 0 ) {
				preAlpha = showAlpha;
				nextAlpha = showAlpha - 0.6;
			} else {
				preAlpha = showAlpha - 0.6;
				nextAlpha = showAlpha;
			}
			
			var sa = ( ( Math.abs( changeX ) * 0.1 ) / w ) > 0.05 ? 0.1 - ( ( Math.abs( changeX ) * 0.1 ) / w ) : ( ( Math.abs(changeX) * 0.1) / w );
			var showScale = 1 - sa;
			
			$( contentArr[param.preId] ).css({
				left: ( -bo.mx + bo.pa ) * showScale,
				top: 0,
				opacity: 0.5 + preAlpha,
				transition: 'none',
				'-webkit-transition': 'none',
				transform: 'rotateX(' + bo.rx + 'deg) scale('+ showScale +') rotateY(' + (270 + d) + 'deg) rotateZ(0deg) translateX(' + ( -w/2 + bo.tx ) + 'px)',
				'-webkit-transform': 'rotateX(' + bo.rx + 'deg) scale(' + showScale + ') rotateY(' + ( 270 + d ) + 'deg) rotateZ(0deg) translateX(' + ( -w/2 + bo.tx ) + 'px)'
			});
			
			$(contentArr[param.showId]).css({
				left: 0  + (bo.pa) * showScale,
				top: 0,
				opacity: 0.5 + showAlpha,
				transition: 'none',
				'-webkit-transition': 'none',
				transform: 'rotateX(' + bo.rx + 'deg) scale(' + showScale + ') rotateY(' + ( d ) + 'deg) rotateZ(0deg) ',
				'-webkit-transform': 'rotateX(' + bo.rx + 'deg) scale(' + showScale + ') rotateY(' + ( d ) + 'deg) rotateZ(0deg) '
			});
			
			$( contentArr[param.nextId] ).css({
				left: ( bo.mx + bo.pa ) * showScale,
				top: 0,
				opacity: 0.5 + nextAlpha,
				transition: 'none',
				'-webkit-transition': 'none',
				'transform': 'rotateX(' + bo.rx + 'deg) scale(' + showScale + ') rotateY(' + ( 90 + d ) + 'deg) rotateZ(0deg) translateX('+ ( w/2 + bo.tx ) + 'px)',
				'-webkit-transform' : 'rotateX(' + bo.rx + 'deg) scale(' + showScale + ') rotateY(' + ( 90 + d ) + 'deg) rotateZ(0deg) translateX(' + ( w/2 + bo.tx ) + 'px)'
			});
			
		}
		
		this.themeSetEndPos = function() {
			
			var param = this.param;
			var derection = this.checkMoveDerectionX();
			if( parseInt( param.deg4 ) == -90 || parseInt( param.deg4 ) == 90 ) {
				return;
			}
			
			var that = this;
			param.deg4 = param.deg4 || 0;
			if( param.eo ) {
				clearInterval( param.eo );
			}
			
			new vvSchedule( function( acNum, eo ) {
				
				if( !param.eo ) {
					param.eo = eo;
				}
				
				if( param.deg4 >= 87 || param.deg4 <= -87 ) {
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
					clearInterval( eo );
				} else {
					if( derection > 0 ) {
						param.deg4 += 3 ;
					} else {
						param.deg4 -= 3 ;
					}
					that.theme4Animate();
				}
				
			});
			
		}
		
		this.theme4InitData = function() {
			var param = this.param;
			var dataBegin = -90;
			param.theme4MoveData = {};
			while( dataBegin <= 90 ) {
				param.theme4MoveData[dataBegin.toString()] = this.theme4Formula( dataBegin );
				dataBegin ++;
			}
		}
		
		this.theme4Formula = function(d) {
			
			var
				w = vv.size.magW,
				h = vv.size.magH,
				rx, pa, a, d2, d3, d4, d6, tx1, txh, tx2, tx, mx, backObj;
			
			backObj = {};
			rx = d == 0 || d == 90 ? 0 : 0;
			pa = d/90 * ( w/2 );
			a = Math.sin( Math.PI/180 * ( d/2 ) ) * ( w/2 ) * 2;
			d2 = 90 - ( d/2 );
			d3 = 180 - d2;
			d4 = 90 - d2;
			d6 = d3 - d2;
			tx1 = Math.cos( Math.PI/180 * d4 ) * a;
			txh = Math.sin( Math.PI/180 * d4 ) * a;
			tx2 = Math.tan( Math.PI/180 * d6 ) * txh;
			tx = tx1 + tx2;
			mx = Math.sqrt( tx * tx + ( w/2 ) * ( w/2 ) );
			
			backObj.tx = tx;
			backObj.mx = mx;
			backObj.rx = rx;
			backObj.pa = pa;
			return backObj;
			
		}
		
		this.theme4Animate = function() {
			
			var
				param = this.param,
				contentArr = $( param.domId ).find( '.sp' ),
				w = vv.size.magW,
				h = vv.size.magH,
				bo = param.theme4MoveData[ parseInt( param.deg4,10 ).toString() ],
				d = param.deg4,
				showScale = 0.9 + Math.abs( ( d * 0.1 )/90 ),
				pop = d < 0 ? 0 : $( contentArr[param.showId] ).css( 'opacity' ),
				nop = d > 0 ? 0 : $( contentArr[param.showId] ).css( 'opacity' );
				
			bo.rx = bo.rx > 0 ? 0 : bo.rx;
			$( contentArr[param.preId] ).css({
				left: (-bo.mx + bo.pa) * (showScale),
				top: 0,
				opacity: pop,
				transform: 'rotateX(' + bo.rx + 'deg) scale(' + ( showScale ) + ') rotateY(' + ( 270 + d ) + 'deg) rotateZ(0deg) translateX(' + ( -w/2 + bo.tx ) + 'px)',
				'-webkit-transform': 'rotateX(' + bo.rx + 'deg) scale('+ ( showScale ) +') rotateY(' + ( 270 + d) + 'deg) rotateZ(0deg) translateX(' + ( -w/2 + bo.tx ) + 'px)'
			});
			
			$( contentArr[param.showId] ).css({
				left: 0  + bo.pa * ( showScale ),
				top: 0,
				opacity: d < 0 ? nop : pop,
				transform: 'rotateX(' + bo.rx + 'deg) scale(' + ( showScale ) + ') rotateY(' + ( d ) + 'deg) rotateZ(0deg) ',
				'-webkit-transform': 'rotateX(' + bo.rx + 'deg) scale(' + ( showScale ) + ') rotateY(' + ( d ) + 'deg) rotateZ(0deg) '
			});
			
			$( contentArr[param.nextId] ).css({
				left: ( bo.mx + bo.pa ) * ( showScale ),
				top: 0,
				opacity: nop,
				'transform': 'rotateX(' + bo.rx + 'deg) scale(' + ( showScale ) + ') rotateY(' + ( 90 + d ) + 'deg) rotateZ(0deg) translateX(' + ( w/2 + bo.tx ) + 'px)',
				'-webkit-transform' : 'rotateX(' + bo.rx + 'deg) scale(' + ( showScale ) + ') rotateY(' + ( 90 + d ) + 'deg) rotateZ(0deg) translateX(' + ( w/2 + bo.tx ) + 'px)'
			});
			
		}
		
		this.themeShowPreFrame = function() {
			var param = this.param;
			param.deg4 = 0;
			param.sX = 0;
			param.eX = param.sX + 100;
		}
		
		this.themeShowNextFrame = function() {
			var param = this.param;
			param.deg4 = 0;
			param.sX = 0;
			param.eX = param.sX - 100;
		}
		
		this.themeSlideTo = function( toId ) {
			
			var param = this.param;
			var contentArr = $( param.domId ).find( '.sp' );
			if( param.showId == toId || param.pageLock ) {
				return;
			}
			
			param.pageLock = 1;
			param.showId = toId - 1 < 0 ? param.contentLen - 1 : toId - 1;
			this.refresh();
			var that = this;
			param.deg4 = 0;
			that.sX = 0;
			that.eX = that.actionDistance + 1;
			
			var to = setTimeout( function() {
				param.pageLock = 0;
				param.scrollLock = 0;
				that.showNextFrame( 0, that );
				clearTimeout( to );
			}, 1 );
			
		}
	}
	
})( window );
