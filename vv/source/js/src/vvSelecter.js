
( function( window ) {
	
	var vvSelecter = function ( param ) {
		this.param = param;
		this.param.domId = param.domId ? param.domId : "#vvSelecter";
		this.param.scrollDomId = param.scrollDomId ? param.scrollDomId : "#vvSelecterScroll";
		this.param.optionHeight = param.optionHeight || 40;
		this.param.optionPadding = param.optionPadding || 5;
		this.param.addPos = param.addPos || 10;
		this.init();
	}
	
	vvSelecter.prototype = {
		
		init: function() {
			var scrollDom = $( this.param.scrollDomId );
			this.optionContent = scrollDom.html();
			this.domInit();
			$( this.param.domId ).touchGroup(this);
			var that = this;
			if( !vv.check.isMobile ) {
				$( window ).bind( 'mouseup', function( e ) {
					that.touchEnd( e );
				} );
			}
		},
		
		domInit: function() {
			var scrollDom = $( this.param.scrollDomId );
			var optionInner = "";
			var len = this.param.data.length;
			for( var i = 0; i < len; i++ ) {
				optionInner += this.optionContent.replace( "%tag%", this.param.data[i].option );
			}
			scrollDom.html( optionInner );
			this.setValue( 0 );
		},
		
		setClass: function( checkedId ) {
			var scrollDom = $( this.param.scrollDomId );
			scrollDom.find( ".option" ).removeClass( "checked" );
			$( scrollDom.find( ".option" )[checkedId] ).addClass( "checked" );
		},
		
		setValue: function( value ) {
			var scrollDom = $(this.param.scrollDomId);
			var checkedId = 0;
			for( var i in this.param.data ) {
				if( this.param.data[i].value == value ) {
					checkedId = i;
				}
			}
			this.setClass( checkedId );
			var sTop = -( parseInt( checkedId ) + 1 ) * this.param.optionHeight + this.param.optionHeight * 2 + this.param.optionPadding;
			scrollDom.css( "top", sTop );
			this.param.checkedValue = value;
		},
		
		touchStart: function( event ) {
			var scrollDom = $( this.param.scrollDomId );
			if( this.param.scrollLock ) {
				return;
			}
			this.param.scrollLock = 1;
			this.param.moveLock = true;
			this.param.sY = event.pageY || event.y;
			this.param.sT = scrollDom[0].offsetTop;
			this.param.lastPos  = this.param.sY;
			this.param.sLastPos = this.param.sY;
		},
		
		touchMove: function( event ) {
			if( !this.param.moveLock ) {
				return;
			}
			var scrollDom = $( this.param.scrollDomId );
			var mY = event.pageY || event.y;
			this.param.sLastPos = this.param.lastPos;
			this.param.lastPos = mY;
			var changeY = mY - this.param.sY;
			scrollDom.css({
				"top" : this.param.sT + changeY
			});
			var that = this;
			var param = this.param;
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
			if( !this.param.moveLock ) {
				return;
			}
			var scrollDom = $( this.param.scrollDomId );
			this.param.moveLock = false;
			var addRate = this.param.lastPos - this.param.sLastPos;
			var oY = scrollDom[0].offsetTop;
			oY += this.param.addPos * addRate;
			// 校正位置
			oY = Math.abs( oY % this.param.optionHeight ) > this.param.optionHeight/2 && Math.abs(oY) > this.param.optionHeight + this.param.optionPadding ? oY - oY % this.param.optionHeight - this.param.optionHeight * 1 : oY - oY % this.param.optionHeight;
			oY += this.param.optionPadding;
			// 边界校正
			var moveY;
			var maxTopPos = -( scrollDom.height() - this.param.optionHeight * 2 - this.param.optionPadding );
			moveY = oY > maxTopPos ? oY : maxTopPos;
			moveY = moveY < this.param.optionHeight + this.param.optionPadding ? moveY : this.param.optionHeight + this.param.optionPadding;
			var that = this;
			scrollDom.vvAnimate({
				top: moveY
			}, function() {
				var checkedId = Math.abs( parseInt((scrollDom[0].offsetTop - that.param.optionHeight - that.param.optionPadding)/40) );
				that.setClass(checkedId);
				if(that.param.callBack) {
					that.param.callBack( that.param.data[checkedId].value );
				}
				that.setValue( that.param.data[checkedId].value );
				that.param.scrollLock = 0;
			}, {
				acTime: 500
			});
		}
		
	}
	
	//callback
	window.vvSelecter = vvSelecter;
	
})( typeof window !== 'undefined' ? window : this );
