( function( window ) {
	
	var slider;
	
	var vvMenu = function ( param ) {
		this.param = param || {};
		this.param.paramBtn = {};
		this.param.paramTitle = {};
		this.param.domId = this.param.domId  || '#vvMenu';
		this.init();
	}
	
	vvMenu.prototype = {
		
		init: function() {
			var param = this.param;
			this.actionBind();
			$( '.menuContent' ).find( '.contentArea' ).css({
				height: 315
			});
			$( 'input,textarea' ).focus( function(){
				param.focus = 1;
			} );
		},
		
		actionBind: function() {
			$( '.menuBtn' ).bindTouch( this.btnAction, this );
			$( '#menuMaskLayer' ).bindTouch( this.hideContent, this );
			this.titleBind( 'addTitle' );
			this.titleBind( 'editTitle' );
			this.titleBind( 'editPageTitle' );
			this.titleBind( 'editMusicTitle' );
			$( 'input,textarea' ).bindTouch( function( e ){
				$( vv.event.getTarget( e ) ).focus();
			} );
			$( '#componentBack' ).bindTouch( function( e, that ){
				var param = that.param;
				$( '#openContent' ).vvAnimate({
					left: vv.size.magW
				},function() {
					param.menuLock = 0;
				},{
					acTime: 800
				});
			}, this );
		},
		
		btnAction: function( e, that ) {
			var targetId = vv.event.getTarget(e).id;
			var param = that.param;
			if( param.animate ) {
				clearInterval( param.animate );
				delete param.animate;
				param.animate = null;
			}
			if( param.paramBtn.animate ) {
				clearInterval( param.paramBtn.animate );
				delete param.paramBtn.animate;
				param.paramBtn.animate = null;
			}
			targetId = '#' + targetId;
			$( targetId ).css({
				transform: 'rotateY(180deg)',
				'-webkit-transform': 'rotateY(180deg)'
			});
			$( targetId ).attr( 'rotateY', 180 );
			$( targetId ).vvAnimate({
				rotateY: 0
			}, 0, 0, param.paramBtn );
			that.buttonTouchCallBack( targetId );
			// console.log(that)
		},
		
		buttonTouchCallBack: function( targetId ) {
			var param = this.param;
			param.scale = param.scale || 1;
			if( !$( '#slideFrames' ).attr( 'scale' ) ) {
				$( '#slideFrames' ).attr( 'scale', 1 );
			}
			switch( targetId ) {
				case '#zoomOutBtn':
					param.scale += 0.1;
					$( '#slideFrames' ).vvAnimate({
						scale: param.scale
					}, 0, 0, param );
				break;
				case '#zoomInBtn':
					param.scale -= 0.1;
					$( '#slideFrames' ).vvAnimate({
						scale: param.scale
					}, 0, 0, param );
				break;
				case '#saveBtn':
					
				break;
				default:
					this.changeMenuContent( targetId );
					this.showContent( targetId );
				break;
			}
		},
		
		titleBind: function( selector ) {
			var classSelector = '.' + selector;
			$( classSelector ).bindTouch( this.titleAction, this );
		},
		
		titleAction: function( e, that ) {
			var targetId = vv.event.getTarget( e ).id;
			that.changeTag( targetId );
			that.changeContent( targetId.replace( /Title/g, 'Area' ) );
		},
		
		changeMenuContent: function( targetId ) {
			$( '.titleList' ).hide();
			$( '.' + targetId.replace( /#|Btn/g, '' ) + 'Title' ).show();
			this.changeTag( targetId.replace( /#|Btn/g, '' ) + 'Title2' );
			this.changeContent( targetId.replace( /#|Btn/g ,'' ) + 'Area2' );
		},
		
		changeTag: function( targetId ) {
			var param = this.param;
			$( 'input,textarea' ).blur();
			param.focus = 0;
			var tagNum = parseInt( targetId.match( /\d+/ )[0] );
			var tagTo = parseInt( ( tagNum - 1 ) * ( $( '#contentTitle' ).width() * (1/3) ), 10 );
			var tagClass = targetId.replace( /\d/g ,'' );
			$( '.' + tagClass ).removeClass( 'titleChecked' );
			$( '#' + targetId ).addClass( 'titleChecked' );
			if( param.paramTitle.animate ) {
				clearInterval( param.paramTitle.animate );
				delete param.paramTitle.animate;
				param.paramTitle.animate = null;
			}
			$( '#titleTag' ).vvAnimate({
				left: tagTo
			}, 0, {
				acTime: 500
			}, param.paramTitle );
		},
		
		changeContent: function( targetId ) {
			$( '.contentArea' ).hide();
			if( targetId == 'editPageArea2' ) {
				targetId = 'addArea2';
			}
			if( targetId == 'addArea3' ) {
				$('#componentScroll').show();
				$('#componentSinglePageScroll').hide();
			}
			$('#componentTitle').hide();
			$( '#' + targetId ).css({
				display: 'block',
				opacity: 0
			});
			$( '#' + targetId ).vvAnimate({
				opacity: 1
			});
		},
		
		showContent: function( targetId ) {
			var param = this.param;
			if( param.menuLock ) {
				return;
			}
			if( param.slider ) {
				param.slider.param.menuLock = 1;
			}
			param.menuLock = 1;
			$('#contentTitle').show();
			$( '#menuMaskLayer' ).css({
				display: 'block',
				opacity: 0
			});
			$( '#menuMaskLayer' ).vvAnimate({
				opacity: 0.5
			});
			$( '#menuContent' ).vvAnimate({
				top: $( '#vvMenu' ).height() - 360
			}, function(){
				param.menuLock = 0;
			}, {
				acTime: 500,
				delay: 500
			});
		},
		
		hideContent: function( e, that ) {
			var param = that.param;
			if( param.menuLock ) {
				return;
			}
			if( param.focus ) {
				$('input,textarea').blur();
				param.focus = 0;
				return;
			}
			param.menuLock = 1;
			$( '#menuContent' ).vvAnimate({
				top: $( '#vvMenu' ).height()
			}, function(){
				if( param.slider ) {
					param.slider.param.menuLock = 0;
				}
			}, {
				acTime: 500
			});
			$( '#menuMaskLayer' ).vvAnimate({
				opacity: 0
			}, function() {
				$( '#menuMaskLayer' ).css({
					display: 'none'
				});
				param.menuLock = 0;
			});
		}
		
	}
	
	window.vvMenu = vvMenu;
	
})( typeof window !== 'undefined' ? window : this );