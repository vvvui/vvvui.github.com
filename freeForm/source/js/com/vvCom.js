( function( window ) {
	
	var
		verson = '1.0.0',
		document = window.document,
		userAgent = navigator.userAgent;
	
	var vv = function() {
		return new vvFn();
	}
	
	var vvFn = function() {
		
	}
	
	vvFn.prototype = {
		
		check: vvCheck(),
		
		fileDir: function ( baseFileName ) {
			return vvGetFileDir( baseFileName );
		},
		
		require: function ( url ) {
			return vvRequire( url );
		},
		
		load: function ( callBack, fileList ) {
			return vvLoader( callBack, fileList );
		},
		
		delay: function ( callBack, delay ) {
			var to = setTimeout ( function() {
				callBack();
				clearTimeout( to );
			}, delay );
		},
		
		getCookie: function ( name ) {
			var ck = document.cookie;
			var exp = new RegExp( name + "=.*?(?=;|$)" );
			var mch = ck.match( exp );
			return mch ? unescape( mch[0].substring( name.length + 1 ) ) : null;
		},
		
		setCookie: function ( name, value, expires ) {
			document.cookie = name + "=" + escape(value) +
			( ( expires ) ? "; expires=" + expires.toGMTString() : "" ) +
			( ";path=/" );
		},
		
		getCookieExpire: function () {
			var exp = new Date();
			exp.setTime( exp.getTime() + 24 * 60 * 60 * 1000 );
			return exp;
		}
		
	}
	
	function vvCheck() {
		return {
			
			isMobile: ( function() {
				return userAgent.match(/AppleWebKit.*Mobile.*/i) ? true : false;
			} )(),
			
			isWebKit: ( function() {
				return userAgent.match(/WebKit/i) ? true : false;
			} )(),
			
			isIe: (function(){
				return (document.all) ? true : false;
			})()
			
		}
	}
	
	vvFn.prototype.event = {
		
		getEvent: function( event ) {
			return event ? event : window.event;
		},
		
		getEventFirst: function( event ) {
			var e = event ? event : window.event;
			if( vv().isMobile ) {
				return e.targetTouches[0];
			} else {
				return e;
			}
		},
		
		getTarget: function( event ) {
			return event.target || event.srcElement;
		},
		
		getPosition: function( event ) {
			var
				backArr = {},
				e = vv().event.getEventFirst( event ),
				pageX = e.pageX,
				pageY = e.pageY;
				
			if( !pageX ) {
				pageX = e.clientX + ( document.body.scrollLeft || document.documentElement.scrollLeft );
			}
			if( !pageY ) {
				pageY = e.clientY + ( document.body.scrollTop || document.documentElement.scrollTop );
			}
			backArr.pageX = pageX;
			backArr.pageY = pageY;
			return backArr;
		},
		
		preventDefault: function( event ) {
			if( event.preventDefault ) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
		},
		
		stopPropagation: function( event ) {
			if( event.stopPropagation ) {
				event.stopPropagation();
			} else {
				event.cancelBubble = true;
			}
		},
		
		getRelatedTarget: function( event ) {
			if( event.relatedTarget ) {
				return event.relatedTarget;
			} else if ( event.toElement ) {
				return event.toElement;
			} else if( event.fromElement ) {
				return event.fromElement;
			} else {
				return null;
			}
		},
		
		getWheelDelta: function( event ) {
			if( event.wheelDelta ) {
				return event.wheelDelta;
			} else {
				return -event.detail * 40;
			}
		},
		
		getCharCode: function( event ) {
			if( typeof event.charCode == 'number' ) {
				return event.charCode;
			} else {
				return event.keyCode;
			}
		}
		
	}
	
	var vvGetFileDir = function( baseFileName ) {
		var jsDom = document.scripts;
		var themeDirBack;
		var jLen = jsDom.length;
		for( var i = jLen; i > 0; i-- ) {
			if( jsDom[i-1].src.indexOf( baseFileName ) > -1 ) {
				themeDirBack = jsDom[i-1].src.substring( 0, jsDom[i-1].src.lastIndexOf("/") + 1 );
			}
		}
		return themeDirBack;
	}
	
	var vvRequire = function( url ) {
		var head = document.getElementsByTagName("head")[0];
		var regScript = /^.*\.js$/i;
		if( regScript.test(url) ) {
			var script  = document.createElement("script");
			script.type = 'text/javascript';
			script.src  = url + "?" + Math.random();
			head.appendChild(script);
			return script;
		}
		var regCss = /^.*\.css$/i;
		if( regCss.test(url) ) {
			var css  = document.createElement('link');
			css.href = url + "?" + Math.random();
			css.rel  = 'stylesheet';
			css.type = 'text/css';
			head.appendChild(css);
			return css;
		}
	}
	
	var vvLoader = function ( callBack, fileList ) {
		var fLen = fileList.length;
		var loadId = 0;
		var require = function() {
			var loadFile = vvRequire( fileList[loadId] );
			var regCss = /^.*\.css$/i;
			var regScript = /^.*\.js$/i;
			if( regCss.test( fileList[loadId] ) ) {
				vvStyleOnload( loadFile, function(){
					loadId ++;
					if( loadId < fLen ) {
						require();
					} else {
						callBack();
					}
				});
			} else if( regScript.test( fileList[loadId] ) ) {
				if( vvCheck().isIe ) {
					loadFile.onreadystatechange = function( e ) {
						if( loadFile.readyState == "loaded" || loadFile.readyState == "complete" ) {
							loadId ++;
							if( loadId < fLen ) {
								require();
							} else {
								callBack();
							}
						}
					}
				} else {
					loadFile.onload = function( e ) {
						loadId ++;
						if( loadId < fLen ) {
							require();
						} else {
							callBack();
						}
					}
				}
			}
		};
		require();
	}

	var vvStyleOnload = function( node, callback ) {
		if( node.attachEvent ) { // for IE6-9 and Opera
			node.attachEvent( 'onload', callback );
		} else {
			setTimeout( function() {
				vvPoll( node, callback );
			}, 0 ); // for cache
		}
	}

	var vvPoll = function( node, callback ) {
		if( callback.isCalled ) {
			return;
		}
		var isLoaded = false;
		if ( /webkit/i.test( navigator.userAgent ) ) { // webkit
			if ( node['sheet'] ) {
				isLoaded = true;
			}
		} else if( node['sheet'] ) { // for Firefox
			try {
				if( node['sheet'].cssRules ) {
					isLoaded = true;
				}
			} catch( ex ) { // NS_ERROR_DOM_SECURITY_ERR
				if( ex.code === 1000 ) {
					isLoaded = true;
				}
			}
		}
		if( isLoaded ) {
			setTimeout( function() {
				callback();
			}, 1 );
		} else {
			setTimeout( function() {
				vvPoll(node,callback);
			}, 1 );
		}
	}
	
	window.vv = vv();
	
})( typeof window !== "undefined" ? window : this );