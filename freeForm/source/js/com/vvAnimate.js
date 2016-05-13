( function( window ) {
	
	var vvAnimate = function( selector, style, callBack, acParam, eo ) {
		this.param = {};
		this.selector = selector;
		this.style = style || {};
		this.callBack = callBack || function(){};
		this.acParam  = acParam  || {};
		this.eo = eo || {};
		this.init();
	}
	
	vvAnimate.prototype = {
		
		init: function() {
			var param = this.param;
			var acParam = this.acParam;
			acParam.loopNum = acParam.loopNum || 0;
			acParam.loop    = acParam.loop  || acParam.loop == 0 ? acParam.loop : 1;
			acParam.delay   = acParam.delay || 0;
			if( acParam.loop == 0 || acParam.loopNum < acParam.loop ) {
				param.aParam = {};
				param.aData  = {};
				param.aLive  = {};
				param.aDataType = {};
				param.totalAnimate = 0;
				var that = this;
				var to = setTimeout( function() {
					that.play();
					acParam.loopNum ++;
					clearTimeout(to);
				}, acParam.delay );
			}
		},
		play: function() {
			var param = this.param;
			var style = this.style;
			var object = $( this.selector );
			for( var i in style ) {
				switch(i) {
					// color
					case 'color':
					case 'background-color':
					case 'border-color':
						this.initDataColor( i );
					break;
					// opacity
					case 'opacity':
						this.initData( i, 1, 1 );
					break;
					// transform
					case 'scale':
					case 'rotateX':
					case 'rotateY':
					case 'rotateZ':
						this.initData( i, 0, 2 );
					break;
					// default
					default:
						this.initData( i, 0 );
					break;
				}
			}
			
			// action
			var that = this;
			param.doAnimate = 0;
			var dNum = 0;
			for( var d in param.aData ) {
				if(param.aData[d].length) {
					dNum ++;
				}
			}
			if( dNum ) {
				new vvSchedule( function( acNum, eo ) {
					if( !that.eo.animate ) {
						that.eo.animate = eo;
					}
					for( var k in param.aData ) {
						if( param.aDataType[k] == 1 || param.aDataType[k] == 2 || !param.aDataType[k] ) {
							if( acNum >= param.aData[k].length && param.aLive[k] ) {
								param.aLive[k]   = 0;
								param.doAnimate += 1;
							} else {
								if( param.aDataType[k] == 1 ) {
									object.css( k, param.aData[k][acNum] );
								} else if ( param.aDataType[k] == 2 ) {
									var scale, rotateX, rotateY, rotateZ;
									switch( k ) {
										case 'scale':
											scale = param.aData[k][acNum];
											rotateX = object.attr('rotateX') || 0;
											rotateY = object.attr('rotateY') || 0;
											rotateZ = object.attr('rotateZ') || 0;
										break;
										case 'rotateX':
											rotateX = param.aData[k][acNum];
											scale   = object.attr('scale')   || 1;
											rotateY = object.attr('rotateY') || 0;
											rotateZ = object.attr('rotateZ') || 0;
										break;
										case 'rotateY':
											rotateY = param.aData[k][acNum];
											scale   = object.attr('scale')   || 1;
											rotateX = object.attr('rotateX') || 0;
											rotateZ = object.attr('rotateZ') || 0;
										break;
										case 'rotateZ':
											rotateZ = param.aData[k][acNum];
											scale   = object.attr('scale')   || 1;
											rotateY = object.attr('rotateY') || 0;
											rotateX = object.attr('rotateX') || 0;
										break;
									}
									object.attr( k, param.aData[k][acNum] );
									object.css( 'transform','scale(' + scale + ') rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) rotateZ(' + rotateZ + 'deg)' );
									object.css( '-webkit-transform','scale(' + scale + ') rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) rotateZ(' + rotateZ + 'deg)' );
								} else {	
									object.css( k, parseInt( param.aData[k][acNum], 10 ) );
								}
							}
						} else if ( param.aDataType[k] == 3 ) {
							if( acNum >= param.aData[k][0].length && param.aLive[k] ) {
								param.aLive[k]   = 0;
								param.doAnimate += 1;
							} else {
								var cR = parseInt( param.aData[k][0][acNum], 10 );
								var cG = parseInt( param.aData[k][1][acNum], 10 );
								var cB = parseInt( param.aData[k][2][acNum], 10 );
								object.css( k, 'rgb(' + cR + ',' + cG + ',' + cB + ')' );
							}
						}
					}
					// finish
					if( param.doAnimate >= param.totalAnimate || acNum > 1200 ) { // maxFrame 1200
						clearInterval(eo);
						that.init();
						that.callBack();
					}
				} );
			}
		},
		initData: function( key, defaultStart, dataType ) {
			var 
				aStart,
				param   = this.param,
				acParam = this.acParam,
				acTime  = acParam.acTime || 1000,
				fps = acParam.fps || 60,
				tweenId = acParam.tween || acParam.tween == 0 ? acParam.tween : 22,
				tween   = this.getTween( tweenId ),
				tEnd    = acTime / ( 1000/fps ),
				style   = this.style,
				object  = $( this.selector );
				
			acParam.tween = tweenId;
			acParam.tEnd  = tEnd;
			
			if( dataType == 1 ) {
				aStart = object.css( key ) || object.css( key ) == 0 ? object.css( key ) : defaultStart;
				aStart = Number( aStart );
			} else if ( dataType == 2) {
				aStart = object.attr( key ) || object.attr( key ) == 0 ? object.attr( key ) : defaultStart;
				aStart = Number( aStart );
			} else {
				aStart = parseInt( object.css( key ), 10 ) || defaultStart;
			}
			
			param.aParam[key] = param.aParam[key] || param.aParam[key] == 0 ? param.aParam[key] : aStart;
			if( tween ) {
				param.aData[key] = vvGetAnimateData( param.aParam[key], style[key], tEnd, tween );
			} else {
				param.aData[key] = vvGetAnimateData2( param.aParam[key], style[key], 10, tweenId );
			}
			
			if( dataType == 2 ) {
				var scale,rotateX,rotateY,rotateZ;
				switch( key ) {
					case 'scale':
						scale = param.aParam[key];
						rotateX = object.attr('rotateX') || 0;
						rotateY = object.attr('rotateY') || 0;
						rotateZ = object.attr('rotateZ') || 0;
					break;
					case 'rotateX':
						rotateX = param.aParam[key];
						scale   = object.attr('scale')   || 1;
						rotateY = object.attr('rotateY') || 0;
						rotateZ = object.attr('rotateZ') || 0;
					break;
					case 'rotateY':
						rotateY = param.aParam[key];
						scale   = object.attr('scale')   || 1;
						rotateX = object.attr('rotateX') || 0;
						rotateZ = object.attr('rotateZ') || 0;
					break;
					case 'rotateZ':
						rotateZ = param.aParam[key];
						scale   = object.attr('scale')   || 1;
						rotateY = object.attr('rotateY') || 0;
						rotateX = object.attr('rotateX') || 0;
					break;
				}
				
				object.css( 'transform', 'scale(' + scale + ') rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) rotateZ(' + rotateZ + 'deg)' );
				object.css( '-webkit-transform', 'scale(' + scale + ') rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) rotateZ(' + rotateZ + 'deg)' );
				object.attr( key, param.aParam[key] );
				
			} else {
				object.css( key, param.aParam[key] );
			}
			
			param.totalAnimate += 1;
			param.aLive[key] = 1;
			param.aDataType[key] = dataType;
			
		},
		initDataColor: function( key ) {
			var 
				param = this.param,
				style = this.style,
				acParam = this.acParam,
				object = $( this.selector ),
				beginColor = object.css( key ) || '#feeeed',
				endColor = style[key],
				tweenId = acParam.tween,
				tween = this.getTween( tweenId ),
				reg = /#/,
				reg2 = /rgb/i,
				beginColorArr = [],
				endColorArr = [];
				
			if( reg.test( beginColor ) ) {
				beginColorArr = this.colorToNum( beginColor );
			} else if ( reg2.test( beginColor ) ) {
				beginColorArr = this.rgbToNum( beginColor );
			}
			if( reg.test( endColor ) ) {
				endColorArr = this.colorToNum( endColor );
			} else if ( reg2.test( endColor ) ) {
				endColorArr = this.rgbToNum( endColor );
			}
			param.aData[key] = [];
			
			if( tween ) {
				param.aData[key][0] = vvGetAnimateData( beginColorArr[0], endColorArr[0], acParam.tEnd, tween );
				param.aData[key][1] = vvGetAnimateData( beginColorArr[1], endColorArr[1], acParam.tEnd, tween );
				param.aData[key][2] = vvGetAnimateData( beginColorArr[2], endColorArr[2], acParam.tEnd, tween );
			} else {
				param.aData[key][0] = vvGetAnimateData2( beginColorArr[0], endColorArr[0], 10, tweenId );
				param.aData[key][1] = vvGetAnimateData2( beginColorArr[1], endColorArr[1], 10, tweenId );
				param.aData[key][2] = vvGetAnimateData2( beginColorArr[2], endColorArr[2], 10, tweenId );
			}
			
			object.css( key, 'rgb(' + beginColorArr[0] + ',' + beginColorArr[1] + ',' + beginColorArr[2] + ')' );
			param.totalAnimate += 1;
			param.aLive[key] = 1;
			param.aDataType[key] = 3;
			
		},
		colorToNum: function( color ) {
			var colorR = color.substr( 1, 2 );
			var colorG = color.substr( 3, 2 );
			var colorB = color.substr( 5, 2 );
			var backArr = [];
			backArr.push( parseInt( colorR, 16 ) );
			backArr.push( parseInt( colorG, 16 ) );
			backArr.push( parseInt( colorB, 16 ) );
			return backArr;
		},
		rgbToNum: function( color ) {
			var reg = /(\d+)\D+(\d+)\D+(\d+)\D+/i;
			var match = color.match( reg );
			var backArr = [];
			backArr.push( parseInt( match[1], 10 ) );
			backArr.push( parseInt( match[2], 10 ) );
			backArr.push( parseInt( match[3], 10 ) );
			return backArr;
		},
		getTween: function( tweenId ) {
			var tweenArr = {
				'0': vvTween.Linear,
				'1': vvTween.Quad.easeIn,
				'2': vvTween.Quad.easeOut,
				'3': vvTween.Quad.easeInOut,
				'11': vvTween.Cubic.easeIn,
				'12': vvTween.Cubic.easeOut,
				'13': vvTween.Cubic.easeInOut,
				'21': vvTween.Quart.easeIn,
				'22': vvTween.Quart.easeOut,
				'23': vvTween.Quart.easeInOut,
				'31': vvTween.Quint.easeIn,
				'32': vvTween.Quint.easeOut,
				'33': vvTween.Quint.easeInOut,
				'41': vvTween.Sine.easeIn,
				'42': vvTween.Sine.easeOut,
				'43': vvTween.Sine.easeInOut,
				'51': vvTween.Expo.easeIn,
				'52': vvTween.Expo.easeOut,
				'53': vvTween.Expo.easeInOut,
				'61': vvTween.Circ.easeIn,
				'62': vvTween.Circ.easeOut,
				'63': vvTween.Circ.easeInOut,
				'71': vvTween.Elastic.easeIn,
				'72': vvTween.Elastic.easeOut,
				'73': vvTween.Elastic.easeInOut,
				'81': vvTween.Back.easeIn,
				'82': vvTween.Back.easeOut,
				'83': vvTween.Back.easeInOut,
				'91': vvTween.Bounce.easeIn,
				'92': vvTween.Bounce.easeOut,
				'93': vvTween.Bounce.easeInOut
			};
			return tweenArr[ tweenId.toString() ] || 0;
		}
	}
	
	/* schedule */
	var vvSchedule = function( callBack, fps ){
		this.fps = fps || 60;
		this.fps = parseInt( 1000/this.fps, 10 );
		this.callBack = callBack || function(){};
		this.start();
	}
	vvSchedule.prototype = {
		
		start : function() {
			var sTime = 0;
			var nTime = 0;
			var tSum  = 0;
			this.acNum = 0;
			var that = this;
			var eo = setInterval( function() {
				sTime = nTime || new Date().getTime();
				nTime = new Date().getTime();
				tSum += nTime - sTime;
				if( tSum > that.fps ) {
					tSum -= that.fps;
					that.callBack( that.acNum, eo );
					that.acNum ++;
				}
			}, 1 );
		}
		
	}
	window.vvSchedule = vvSchedule;
	
	/* vvGetAnimateData */
	var vvGetAnimateData = function( aStart, aEnd, tEnd, tween, rate, tBegin ) {
		var aStart, aEnd, rate, tBegin, tEnd, backArr, aChange, tween;
		aStart = aStart || 0;
		aEnd   = aEnd   || aEnd == 0 ? aEnd : 1;
		rate   = rate   || 1;
		tBegin = tBegin || 0;
		tEnd   = tEnd   || 100;
		aChange = aEnd - aStart;
		tween   = tween || vvTween.Cubic.easeOut;
		backArr = [];
		while( tBegin < tEnd ) {
			backArr.push( tween( tBegin, aStart, aChange, tEnd ) );
			tBegin += rate;
		}
		if( backArr[ backArr.length - 1 ] != aEnd ) {
			backArr.push( aEnd );
		}
		return backArr;
	}
	window.vvGetAnimateData = vvGetAnimateData;
		
	var vvGetAnimateData2 = function( aStart, aEnd, tEnd, tween ) {
		var sum = aStart;
		var moveArr = [];
		while( sum != aEnd ) {
			var add = ( aEnd - sum ) / tEnd;
			add = add > 0 ? Math.ceil( add ) : Math.floor( add );
			sum += add;
			add != 0 ? moveArr.push(sum) : false;
		}
		if( tween % 2 == 0 ){
			aEnd > 0 ? moveArr.sort( function( a, b ){ return a - b; } ) : moveArr.sort( function( a, b ) { return b - a; } );
		}
		return moveArr;
	}
	window.vvGetAnimateData2 = vvGetAnimateData2;
	
	/* vvTween */
	var vvTween = {
		
		Linear: function( t, b, c, d ) {
			return c * t/d + b;
		},
		
		Quad: {
			
			easeIn: function( t, b, c, d ) {
				return c * ( t /= d ) * t + b;
			},
			
			easeOut: function( t, b, c, d ) {
				return -c * ( t /= d ) * ( t-2 ) + b;
			},
			
			easeInOut: function( t, b, c, d ) {
				if ( ( t /= d / 2 ) < 1 ) return c / 2 * t * t + b;
				return -c / 2 * ( ( --t ) * ( t-2 ) - 1 ) + b;
			}
			
		},
		
		Cubic: {
			
			easeIn: function( t, b, c, d ) {
				return c * ( t /= d ) * t * t + b;
			},
			
			easeOut: function( t, b, c, d ) {
				return c * ( ( t = t/d - 1 ) * t * t + 1 ) + b;
			},
			
			easeInOut: function( t, b, c, d ) {
				if ( ( t /= d / 2) < 1 ) return c / 2 * t * t * t + b;
				return c / 2 * ( ( t -= 2 ) * t * t + 2 ) + b;
			}
			
		},
		
		Quart: {
			
			easeIn: function( t, b, c, d ) {
				return c * ( t /= d ) * t * t * t + b;
			},
			
			easeOut: function( t, b, c, d ) {
				return -c * ( ( t = t/d - 1 ) * t * t * t - 1 ) + b;
			},
			
			easeInOut: function( t, b, c, d ) {
				if ( ( t /= d / 2 ) < 1 ) return c / 2 * t * t * t * t + b;
				return -c / 2 * ( ( t -= 2 ) * t * t * t - 2) + b;
			}
			
		},
		
		Quint: {
			
			easeIn: function( t, b, c, d ) {
				return c * ( t /= d ) * t * t * t * t + b;
			},
			
			easeOut: function( t, b, c, d ) {
				return c * ( ( t = t/d - 1 ) * t * t * t * t + 1 ) + b;
			},
			
			easeInOut: function( t, b, c, d ) {
				if ( ( t /= d / 2 ) < 1 ) return c / 2 * t * t * t * t * t + b;
				return c / 2*( ( t -= 2 ) * t * t * t * t + 2 ) + b;
			}
			
		},
		
		Sine: {
			
			easeIn: function( t, b, c, d ) {
				return -c * Math.cos( t/d * ( Math.PI/2 ) ) + c + b;
			},
			
			easeOut: function( t, b, c, d ) {
				return c * Math.sin( t/d * ( Math.PI/2 ) ) + b;
			},
			
			easeInOut: function( t, b, c, d ) {
				return -c / 2 * ( Math.cos( Math.PI * t/d ) - 1) + b;
			}
			
		},
		
		Expo: {
			
			easeIn: function( t, b, c, d ) {
				return ( t==0 ) ? b : c * Math.pow( 2, 10 * ( t/d - 1 ) ) + b;
			},
			
			easeOut: function( t, b, c, d ) {
				return ( t==d ) ? b + c : c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
			},
			
			easeInOut: function( t, b, c, d ) {
				if ( t==0 ) return b;
				if ( t==d ) return b+c;
				if ( ( t /= d / 2 ) < 1 ) return c / 2 * Math.pow( 2, 10 * ( t - 1 ) ) + b;
				return c / 2 * ( -Math.pow( 2, -10 * --t ) + 2 ) + b;
			}
			
		},
		
		Circ: {
			
			easeIn: function( t, b, c, d ) {
				return -c * ( Math.sqrt( 1 - ( t /= d ) * t ) - 1 ) + b;
			},
			
			easeOut: function( t, b, c, d ) {
				return c * Math.sqrt( 1 - ( t = t/d - 1 ) * t ) + b;
			},
			
			easeInOut: function( t, b, c, d ) {
				if ( ( t /= d / 2 ) < 1 ) return -c / 2 * ( Math.sqrt( 1 - t * t ) - 1 ) + b;
				return c / 2 * ( Math.sqrt( 1 - (t -= 2 ) * t ) + 1 ) + b;
			}
			
		},
		
		Elastic: {
			
			easeIn: function( t, b, c, d, a, p ) {
				var s;
				if ( t==0 ) return b;
				if ( ( t /= d ) == 1 ) return b + c;
				if ( typeof p == "undefined" ) p = d * .3;
				if ( !a || a < Math.abs( c ) ) {
					s = p / 4;
					a = c;
				} else {
					s = p / ( 2 * Math.PI ) * Math.asin( c / a );
				}
				return -( a * Math.pow( 2, 10 * ( t -= 1 ) ) * Math.sin( ( t * d - s ) * ( 2 * Math.PI ) / p ) ) + b;
			},
			
			easeOut: function( t, b, c, d, a, p ) {
				var s;
				if ( t==0 ) return b;
				if ( ( t /= d ) == 1 ) return b + c;
				if ( typeof p == "undefined" ) p = d * .3;
				if ( !a || a < Math.abs( c ) ) {
					a = c; 
					s = p / 4;
				} else {
					s = p/( 2 * Math.PI ) * Math.asin( c/a );
				}
				return ( a * Math.pow( 2, -10 * t ) * Math.sin( ( t * d - s ) * ( 2 * Math.PI ) / p ) + c + b );
			},
			
			easeInOut: function( t, b, c, d, a, p ) {
				var s;
				if ( t==0 ) return b;
				if ( ( t /= d / 2 ) == 2 ) return b + c;
				if ( typeof p == "undefined" ) p = d * ( .3 * 1.5 );
				if ( !a || a < Math.abs( c ) ) {
					a = c; 
					s = p / 4;
				} else {
					s = p / ( 2  *Math.PI ) * Math.asin( c / a );
				}
				if ( t < 1 ) return -.5 * ( a * Math.pow( 2, 10* (t -=1 ) ) * Math.sin( ( t * d - s ) * ( 2 * Math.PI ) / p ) ) + b;
				return a * Math.pow( 2, -10 * ( t -= 1 ) ) * Math.sin( ( t * d - s ) * ( 2 * Math.PI ) / p ) * .5 + c + b;
			}
			
		},
		
		Back: {
			
			easeIn: function( t, b, c, d, s ) {
				if ( typeof s == "undefined" ) s = 1.70158;
				return c * ( t /= d ) * t * ( ( s + 1 ) * t - s ) + b;
			},
			
			easeOut: function( t, b, c, d, s ) {
				if ( typeof s == "undefined" ) s = 1.70158;
				return c * ( ( t = t/d - 1 ) * t * ( ( s + 1 ) * t + s ) + 1 ) + b;
			},
			
			easeInOut: function( t, b, c, d, s ) {
				if ( typeof s == "undefined" ) s = 1.70158; 
				if ( ( t /= d / 2 ) < 1 ) return c / 2 * ( t * t * ( ( ( s *= ( 1.525 ) ) + 1 ) * t - s ) ) + b;
				return c / 2*( ( t -= 2 ) * t * ( ( ( s *= ( 1.525 ) ) + 1 ) * t + s ) + 2 ) + b;
			}
			
		},
		
		Bounce: {
			
			easeIn: function( t, b, c, d ) {
				return c - vvTween.Bounce.easeOut( d-t, 0, c, d ) + b;
			},
			
			easeOut: function( t, b, c, d ) {
				if ( ( t /= d ) < ( 1 / 2.75 ) ) {
					return c * ( 7.5625 * t * t ) + b;
				} else if ( t < ( 2 / 2.75 ) ) {
					return c * ( 7.5625 * ( t -= ( 1.5 / 2.75 ) ) * t + .75 ) + b;
				} else if ( t < ( 2.5 / 2.75 ) ) {
					return c * ( 7.5625 * ( t -= ( 2.25 / 2.75 ) ) * t + .9375 ) + b;
				} else {
					return c * ( 7.5625 * ( t -= ( 2.625 / 2.75 ) ) * t + .984375 ) + b;
				}
			},
			
			easeInOut: function( t, b, c, d ) {
				if ( t < d / 2 ) {
					return vvTween.Bounce.easeIn( t * 2, 0, c, d ) * .5 + b;
				} else {
					return vvTween.Bounce.easeOut( t * 2 - d, 0, c, d ) * .5 + c * .5 + b;
				}
			}
			
		}
		
	}
	window.vvTween = vvTween;
	
	window.vvAnimate = vvAnimate;
	
})( typeof window !== "undefined" ? window : this );