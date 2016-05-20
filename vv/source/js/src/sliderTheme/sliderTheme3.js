
( function( window ) {
	
	var theme = 3;
	
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
				overflow: 'visible'
			});
			
		}
		
		this.theme3Formula = function( d ) {
			
			var l, t, w, h, backObj;
			w = vv.size.magW;
			h = vv.size.magH;
			backObj = {};
			
			l = Math.cos( Math.PI/180 * d ) * w;
			l = Math.round(l) + w;
			t = Math.sqrt( ( w/2 )*( w/2 ) + ( h/2 ) * ( h/2 ) ) - Math.sin( Math.PI/180 * d ) * w;
			t = Math.round( Math.sqrt( ( w/2 ) * ( w/2 ) + ( h/2 ) * ( h/2 ) ) - t );
			
			backObj.l = l;
			backObj.t = t;
			backObj.d = d;
			return backObj;
			
		}	
		
		this.themeInitPos = function() {
			
			var param = this.param;
			var contentArr = $( param.domId ).find( '.sp' );
			if( param.eo ) {
				clearInterval( param.eo );
			}
			
			contentArr.css({
				display: 'none',
				transform: 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(0deg)',
				'-webkit-transform': 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(0deg)'
			});
			
			contentArr.attr( 'rotateZ', 0 );
			param.actionDistance = param.actionDistance || parseInt( vv.size.magW/10, 10 );
			var deg3 = 45;
			var bo = this.theme3Formula( deg3 );
			
			// showScene
			$( contentArr[param.showId] ).css({
				left: 0,
				top: 0,
				opacity: 1,
				display: 'block',
				transform: 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(0deg)',
				'-webkit-transform': 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(0deg)'
			});
			
			// preScene
			$( contentArr[param.preId] ).css({
				left: -bo.l,
				top: bo.t,
				opacity: 0.5,
				display: 'block',
				transform: 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(-45deg)',
				'-webkit-transform': 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(-45deg)'
			});
			
			// nextScene
			$( contentArr[param.nextId] ).css({
				left: bo.l,
				top: bo.t,
				opacity: 0.5,
				display: 'block',
				transform: 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(45deg)',
				'-webkit-transform': 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(45deg)'
			});
			
			$( contentArr[param.showId] ).attr( 'rotateZ', 0 );
			$( contentArr[param.preId] ).attr( 'rotateZ', -45 );
			$( contentArr[param.nextId] ).attr( 'rotateZ', 45 );
			
		}
		
		this.themeSetMovePos = function( changeX ) {
			
			var param = this.param;
			var contentArr = $( param.domId ).find( '.sp' );
			if( !changeX ) {
				return;
			}
			if( param.eo ) {
				clearInterval( param.eo );
			}
			
			var w, d, dl, dr, bo, bol, bor, changeRate, changeRatel, changeRater;
			w = vv.size.magW;
			var deg3 = 45;
			d = deg3 * changeX/w;
			dl = -deg3 + d;
			dr = deg3 + d;
			bo = this.theme3Formula( d );
			bol = this.theme3Formula( dl );
			bor = this.theme3Formula( dr );
			changeRate = ( bo.d/45 );
			changeRatel = ( bol.d/45 );
			changeRater = ( bor.d/45 );
			
			// showScene
			$( contentArr[param.showId] ).css({
				left: bo.l * changeRate,
				top: bo.t * changeRate,
				opacity: 1 - Math.abs(changeRate),
				transform: 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(' + d + 'deg)',
				'-webkit-transform': 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(' + d + 'deg)'
			});
			
			// preScene
			$( contentArr[param.preId] ).css({
				left: bol.l * changeRatel,
				top: bol.t * changeRatel,
				opacity: 1 - Math.abs(changeRatel),
				transform: 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(' + dl + 'deg)',
				'-webkit-transform': 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(' + dl + 'deg)'
			});
			
			// nextScene
			$( contentArr[param.nextId] ).css({
				left: bor.l * changeRater,
				top: bor.t * changeRater,
				opacity: 1 - Math.abs(changeRater),
				transform: 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(' + dr + 'deg)',
				'-webkit-transform': 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(' + dr + 'deg)'
			});
			
			$( contentArr[param.showId] ).attr( 'rotateZ', d );
			$( contentArr[param.preId] ).attr( 'rotateZ', dl );
			$( contentArr[param.nextId] ).attr( 'rotateZ', dr );
			
		}
		
		this.themeSetEndPos = function() {
			
			var param = this.param;
			var contentArr = $( param.domId ).find( '.sp' );
			if( param.eo ) {
				clearInterval( param.eo );
			}
			var derection = this.checkMoveDerectionX();
			
			if( derection == 1 ) {
				var dShow = $( contentArr[param.showId] ).attr( 'rotateZ' ) || 0;
				dShow = parseInt( dShow, 10 );
				var dDataShow = vvGetAnimateData( dShow, 45, 100, vvTween.Back.easeOut );
				
				var dPre = $( contentArr[param.preId] ).attr( 'rotateZ' ) || 0;
				dPre = parseInt( dPre, 10 );
				var dDataPre = vvGetAnimateData( dPre, 0, 100, vvTween.Back.easeOut );
				
				var that = this;
				param.scrollLock = 1;
				new vvSchedule( function( acNum, eo ) {
					
					if( !param.eo ) {
						param.eo = eo;
					}
					
					if( acNum >= dDataShow.length ) {
						
						clearInterval( eo );
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
						
					} else {
						
						var boShow = that.theme3Formula( dDataShow[acNum] );
						var changeRate = ( boShow.d/45 );
						$( contentArr[param.showId] ).css({
							left: parseInt( boShow.l * changeRate, 10 ),
							top: parseInt( boShow.t * changeRate, 10 ),
							opacity: 1 - changeRate + 0.5,
							transform: 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(' + boShow.d + 'deg)',
							'-webkit-transform': 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(' + boShow.d + 'deg)'
						});
						
						var boPre = that.theme3Formula(dDataPre[acNum]);
						changeRate = (boPre.d/45);
						$( contentArr[param.preId] ).css({
							left: parseInt( boPre.l * changeRate, 10 ),
							top: parseInt( boPre.t * changeRate, 10 ),
							opacity: 1 - changeRate,
							transform: 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(' + boPre.d + 'deg)',
							'-webkit-transform': 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(' + boPre.d + 'deg)'
						});
						
					}
					
				}, 100 );
				
			} else if ( derection == -1 ) {
				
				var dShow = $( contentArr[param.showId] ).attr( 'rotateZ' ) || 0;
				dShow = parseInt( dShow, 10 );
				var dDataShow = vvGetAnimateData( dShow, -45, 100, vvTween.Back.easeOut );
				
				var dNext = $( contentArr[param.nextId] ).attr( 'rotateZ' ) || 0;
				dNext = parseInt( dNext, 10 );
				var dDataNext = vvGetAnimateData( dNext, 0, 100, vvTween.Back.easeOut );
				
				var that = this;
				param.scrollLock = 1;
				new vvSchedule( function( acNum, eo ) {
					
					if( !param.eo ) {
						param.eo = eo;
					}
					
					if( acNum >= dDataShow.length ) {
						clearInterval( eo );
						param.scrollLock = 0;
						param.showId -= derection;
						param.showId = param.showId < 0 ? param.contentLen - 1 : param.showId;
						param.showId = param.showId > param.contentLen - 1 ? 0 : param.showId;
						that.setId();
						that.themeInitPos();
						if( param.callBack ) {
							param.callBack(param.showId);
						}
						
					} else {
						
						var boShow = that.theme3Formula( dDataShow[acNum] );
						var changeRate = ( boShow.d/45 );
						$( contentArr[param.showId] ).css({
							left: parseInt(boShow.l * changeRate,10),
							top: parseInt(boShow.t * changeRate,10),
							opacity: 1 - changeRate + 0.5,
							transform: 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(' + boShow.d + 'deg)',
							'-webkit-transform': 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(' + boShow.d + 'deg)'
						});
						
						var boNext = that.theme3Formula(dDataNext[acNum]);
						changeRate = ( boNext.d/45 );
						$( contentArr[param.nextId] ).css({
							left: parseInt( boNext.l * changeRate, 10 ),
							top: parseInt( boNext.t * changeRate, 10 ),
							opacity: 1 - changeRate,
							transform: 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(' + boNext.d + 'deg)',
							'-webkit-transform': 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(' + boNext.d + 'deg)'
						});
						
					}
					
				}, 100 );
				
			} else {
				
				var dShow = $( contentArr[param.showId] ).attr( 'rotateZ' ) || 0;
				dShow = parseInt( dShow, 10 );
				var dDataShow = vvGetAnimateData( dShow, 0, 60, vvTween.Cubic.easeOut );
				var that = this;
				
				new vvSchedule( function( acNum, eo ) {
					
					if( !param.eo ) {
						param.eo = eo;
					}
					
					if( acNum >= dDataShow.length ) {
						clearInterval( eo );
					} else {
						
						var boShow = that.theme3Formula(dDataShow[acNum]);
						var changeRate = ( boShow.d/45 );
						$( contentArr[param.showId] ).css({
							left: parseInt(boShow.l * changeRate,10),
							top: parseInt(boShow.t * changeRate,10),
							opacity: 1 - changeRate,
							transform: 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(' + boShow.d + 'deg)',
							'-webkit-transform': 'rotateX(0deg) scale(1) rotateY(0deg) rotateZ(' + boShow.d + 'deg)'
						});
						
					}
					
				}, 100 );
				
			}
		}
		
		this.themeShowPreFrame = function(){
			var param = this.param;
			param.sX = 0;
			param.eX = param.sX + 100;
		}
		
		this.themeShowNextFrame = function(){
			var param = this.param;
			param.sX = 0;
			param.eX = param.sX - 100;
		}
		
		this.themeSlideTo = function( toId  ) {
			
			var param = this.param;
			var contentArr = $( param.domId ).find( '.sp' );
			if( param.showId == toId || param.pageLock ) {
				return;
			}
			
			param.pageLock = 1;
			param.showId = toId - 1 < 0 ? param.contentLen - 1 : toId - 1;
			this.refresh();
			contentArr.vvAnimate({
				opacity: 0
			},0,{
				acTime: 500
			});
			
			var that = this;
			var to = setTimeout( function() {
				param.pageLock = 0;
				param.scrollLock = 0;
				that.showNextFrame( 0, that );
				clearTimeout( to );
			}, 500 );
			
		}
		
	}
	
})( window );
