(function (window) {
	
	var reference;
	var winW = $(window).width();
	var winH = $(window).height();
	
	var freeForm = function (param) {
		this.param = param || {};
		this.init();
	}
	
	freeForm.prototype = {
		
		init: function () {
			this.param.objList = {
				'label': 0,
				'input': 0,
				'textarea': 0,
				'select': 0,
				'submit': 0,
				'checkbox': 0,
				'radio': 0,
				'file': 0,
				'frame': 0
			}
			
			this.actionInit();
			// get default pos
			var padding = this.getPadding();
			// reference
			reference = new referenceSys({
				referenceDefaultLeft: padding.paddingLeft,
				referenceDefaultTop: padding.paddingTop
			});
			pSetter.reference = reference;
			// lockSelect
			$('#rulerVTextContent').bind('selectstart', function(){ return false; });
			var that = this;
			$(window).resize(function() {
				var padding = that.getPadding();
				var winChange = {
					w: padding.paddingLeft - reference.param.referenceDefaultLeft,
					h: padding.paddingTop - reference.param.referenceDefaultTop,
				};
				reference.param.referenceDefaultLeft = padding.paddingLeft;
				reference.param.referenceDefaultTop = padding.paddingTop;
				reference.resize(winChange);
			});
		},
		
		getPadding: function () {
			var paddingLeft = parseInt($('#freeForm').css('left'), 10) +  parseInt($('#freeForm').css('margin-left'), 10) + 210;
			var paddingTop = parseInt($('#freeForm').css('top'), 10) +  parseInt($('#freeForm').css('margin-top'), 10);
			return {
				paddingLeft: paddingLeft,
				paddingTop: paddingTop
			}
		},
		
		actionInit: function () {
			for (var i in this.param.objList) {
				this.touchTargetId = i;
				this.creatTemp();
			}
		},
		
		creatTemp: function () {
			var param = this.param;
			var componentListStr = 'label input textarea select submit checkbox radio file frame';
			var contentId = this.touchTargetId;
			// touch target check
			var reg = new RegExp(contentId);
			if (reg.test(componentListStr)) {
				var touchTarget = $("#" + this.touchTargetId);
				var addComponent = $(touchTarget[0].outerHTML);
				addComponent.attr('id', addComponent.attr('id') + 'move');
				$('#componentForm').append(addComponent);
				var sL = -200;
				var sT = parseInt(touchTarget.css('top'), 10);
				// preventDefault
				addComponent.click(function(e){
					vv.event.preventDefault(e);
				});
				// action init
				addComponent.touchGroup({
					touchStart: function (event) {
						this.moveLock = true;
						this.touchTargetId = $(vv.event.getTarget(event)).attr('id');
						var touchTarget = $("#" + this.touchTargetId);
						this.sX = event.pageX || event.x;
						this.sY = event.pageY || event.y;
						this.sL = parseInt(touchTarget.css('left'), 10);
						this.sT = parseInt(touchTarget.css('top'), 10);
						this.defaultIndex = parseInt(touchTarget.css('z-index'), 10);
						touchTarget.css({
							'z-index': 10
						});
					},
					touchMove: function (event) {
						if ( !this.moveLock ) {
							return;
						}
						var touchTarget = $("#" + this.touchTargetId);
						this.mX = event.pageX || event.x;
						this.mY = event.pageY || event.y;
						var changeX = this.mX - this.sX;
						var changeY = this.mY - this.sY;
						touchTarget.css({
							left: this.sL + changeX,
							top: this.sT + changeY,
						});
						reference.showReferenceLine({
							left: this.sL + changeX,
							top: this.sT + changeY  
						});
					},
					touchEnd: function (event) {
						if ( !this.moveLock ) {
							return;
						}
						var touchTarget = $("#" + this.touchTargetId);
						touchTarget.css('z-index', this.defaultIndex);
						this.moveLock = false;
						var eL = parseInt(touchTarget.css('left'), 10);
						var eT = parseInt(touchTarget.css('top'), 10);
						// creat check
						var maxL = parseInt($('#componentForm').css('width'), 10) -  parseInt(touchTarget.css('width'), 10) - parseInt(touchTarget.css('padding-left'), 10) - parseInt(touchTarget.css('padding-right'), 10);
						var maxT = parseInt($('#componentForm').css('height'), 10) -  parseInt(touchTarget.css('height'), 10) - parseInt(touchTarget.css('padding-top'), 10) - parseInt(touchTarget.css('padding-bottom'), 10);
						// creatResizeObject
						if (eL >= 0 && eT >= 0 && eL <= maxL && eT <= maxT) {
							param.objList[contentId] ++;
							new freeComponent({
								contentId: touchTarget.attr('id'),
								contentNum: param.objList[contentId]
							});
						}
						touchTarget.css({
							left: sL,
							top: sT,
						});
						reference.hideReferenceLine();
					}
				});
				// reset position
				addComponent.css({
					left: -200,
					cursor: 'move'
				});
			}
		}
	}
	
	var freeComponent = function (param) {
		this.param = param;
		this.init();
	}
	
	freeComponent.prototype = {
		
		init: function () {
			var param = this.param;
			var addComponent = $($('#' + param.contentId)[0].outerHTML);
			addComponent.attr('id', addComponent.attr('id').replace('move','') + param.contentNum);
			if (addComponent.attr('class') == 'fFrame'){
				addComponent.attr('class', addComponent.attr('class') + ' frame');
			} else {
				addComponent.attr('class', addComponent.attr('class') + ' com');
			}
			$('#componentForm').append(addComponent);
			addComponent.touchGroup(this);
			addComponent.click(function(e){
				vv.event.preventDefault(e);
			});
			this.inFrameCheck();
			this.frameIn();
			$('#componentController').hide();
			controlBar.targetId = addComponent.attr('id');
		},
		
		touchStart: function (event) {
			this.touchTargetId = $(vv.event.getTarget(event)).attr('id');
			var touchTarget = $("#" + this.touchTargetId);
			this.moveLock = true;
			this.isMove = 0;
			this.clickNum = this.clickNum || 0;
			controlBar.targetId = touchTarget.attr('id');
			this.sX = event.pageX || event.x;
			this.sY = event.pageY || event.y;
			this.sL = parseInt(touchTarget.css('left'), 10);
			this.sT = parseInt(touchTarget.css('top'), 10);
			this.defaultIndex = parseInt(touchTarget.css('z-index'), 10);
			touchTarget.css({
				'z-index': 10
			});
			// frameChildren pos init
			this.comFPos = {};
			var frameChildren = $('.comF');
			var fLen = frameChildren.length;
			for (var i = 0; i < fLen; i++) {
				this.comFPos[i] = {
					sL: parseInt($(frameChildren[i]).css('left'), 10),
					sT: parseInt($(frameChildren[i]).css('top'), 10)
				}
			}
			// hide controller
			$('#componentController').hide();
			this.inFrameCheck();
		},
		
		touchMove: function (event) {
			if ( !this.moveLock ) {
				return;
			}
			var touchTarget = $("#" + this.touchTargetId);
			this.mX = event.pageX || event.x;
			this.mY = event.pageY || event.y;
			var changeX = this.mX - this.sX;
			var changeY = this.mY - this.sY;
			if (changeX || changeY) {
				this.isMove = 1;
			}
			touchTarget.css({
				left: this.sL + changeX,
				top: this.sT + changeY
			});
			this.inFrameCheck(changeX, changeY);
			reference.showReferenceLine({
				left: this.sL + changeX,
				top: this.sT + changeY  
			});
		},
		
		touchEnd: function (event) {
			if ( !this.moveLock ) {
				return;
			}
			var touchTarget = $("#" + this.touchTargetId);
			touchTarget.css('z-index', this.defaultIndex);
			this.moveLock = false;
			this.frameIn();
			reference.hideReferenceLine();
			if (this.isMove) {
				this.clickNum = 0;
			} else {
				this.clickNum ++;
				var parent = this;
				setTimeout(function(){
					parent.clickNum = 0;
				},500);
			}
			if (this.clickNum >= 2 || event.button == 2) {
				controlBar.refresh(touchTarget.attr('id'));
			}
		},
		
		inFrameCheck: function (changeX, changeY) {
			var frameReg = /fFrame/;
			var touchTarget = $("#" + this.touchTargetId);
			var classStr = touchTarget.attr('class');
			if (frameReg.test(classStr)) {
				// frameChildren pos follow
				var frameId = touchTarget.attr('id');
				var frameChildren = $('.comF');
				var fLen = frameChildren.length;
				for (var i = 0; i < fLen; i++) {
					if ($(frameChildren[i]).attr('frame') == frameId){
						$(frameChildren[i]).css({
							left: this.comFPos[i].sL + changeX,
							top: this.comFPos[i].sT + changeY
						});
					}
				}
				return;
			}
			this.inFrameId = 0;
			var sL = parseInt(touchTarget.css('left'), 10);
			var sT = parseInt(touchTarget.css('top'), 10);
			var sW = parseInt(touchTarget.css('width'), 10);
			var sH = parseInt(touchTarget.css('height'), 10);
			sL += sW/2;
			sT += sH/2;
			var frames = $('.frame');
			var fLen = frames.length;
			for (var i = 0; i < fLen; i++) {
				var fL = parseInt($(frames[i]).css('left'), 10);
				var fT = parseInt($(frames[i]).css('top'), 10);
				var fW = parseInt($(frames[i]).css('width'), 10);
				var fH = parseInt($(frames[i]).css('height'), 10);
				var minL = parseInt(fL, 10);
				var maxL = parseInt(fL + fW, 10);
				var minT = parseInt(fT, 10);
				var maxT = parseInt(fT + fH, 10);
				if (sL >= minL && sL <= maxL && sT >= minT && sT <= maxT) {
					this.inFrameId = frames[i].id;
					$(frames[i]).addClass('blueBk');
				} else {
					$(frames[i]).removeClass('blueBk');
				}
			}
		},
		
		frameIn: function () {
			var touchTarget = $("#" + this.touchTargetId);
			$('#' + this.inFrameId).removeClass('blueBk');
			if (this.inFrameId) {
				touchTarget.removeClass('com');
				touchTarget.addClass('comF');
				touchTarget.attr('frame', this.inFrameId);
			} else {
				touchTarget.removeClass('comF');
				touchTarget.addClass('com');
				touchTarget.attr('frame', this.inFrameId);
			}
		}
		
	}
	
	/* component contoller */
	var componentController = function () {
		this.init();
	}
	
	componentController.prototype = {
		
		init: function () {
			var that = this;
			// controller move
			var controller = $('#componentController');
			controller.touchGroup({
				touchStart: function (event) {
					this.touchTargetId = $(vv.event.getTarget(event)).attr('id');
					var touchTarget = $("#" + this.touchTargetId);
					var target = $('#' + that.targetId);
					var touchId = touchTarget.attr('id');
					switch (touchId) {
						case 'componentController':
							this.moveLock = true;
							this.isMove = 0;
							this.sX = event.pageX || event.x;
							this.sY = event.pageY || event.y;
							this.sL = parseInt(touchTarget.css('left'), 10);
							this.sT = parseInt(touchTarget.css('top'), 10);
						break;
						case 'setIcon':
							pSetter.setTarget(that.targetId);
							pSetter.show();
							controller.hide();
						break;
						case 'delIcon':
							controller.hide();
							target.remove();
						break;
					}
				},
				touchMove: function (event) {
					if ( !this.moveLock ) {
						return;
					}
					var touchTarget = $("#" + this.touchTargetId);
					this.mX = event.pageX || event.x;
					this.mY = event.pageY || event.y;
					var changeX = this.mX - this.sX;
					var changeY = this.mY - this.sY;
					if(Math.abs(changeX) || Math.abs(changeY)){
						this.isMove = 1;
					}
					touchTarget.css({
						left: this.sL + changeX,
						top: this.sT + changeY,
					});
					var target = $('#' + that.targetId);
					target.css({
						left: this.sL + changeX,
						top: this.sT + changeY,
					});
					reference.showReferenceLine({
						left: this.sL + changeX,
						top: this.sT + changeY  
					});
				},
				touchEnd: function (event) {
					if ( !this.moveLock ) {
						return;
					}
					this.moveLock = false;
					if (!this.isMove) {
						controller.hide();
					}
					reference.hideReferenceLine();
				}
			});
			$('#rulerVTextContent').touch(function(event){
				var touchTarget = $(vv.event.getTarget(event));
				if (touchTarget.attr('id') == 'rulerVTextContent') {
					controller.hide();
				}
			});
			// controller resize
			var resizeIcon = $('#resizeIcon');
			resizeIcon.touchGroup({
				touchStart: function (event) {
					this.touchTargetId = $(vv.event.getTarget(event)).attr('id');
					var touchTarget = $("#" + this.touchTargetId);
					var target = $('#' + that.targetId);
					var touchId = touchTarget.attr('id');
					this.moveLock = true;
					this.isMove = 0;
					this.sX = event.pageX || event.x;
					this.sY = event.pageY || event.y;
					this.sL = parseInt(touchTarget.css('right'), 10);
					this.sT = parseInt(touchTarget.css('bottom'), 10);
					this.sW = parseInt(target.css('width'), 10);
					this.sH = parseInt(target.css('height'), 10);
					this.param = {};
				},
				touchMove: function (event) {
					if ( !this.moveLock ) {
						return;
					}
					var param = this.param;
					this.mX = event.pageX || event.x;
					this.mY = event.pageY || event.y;
					var changeX = this.mX - this.sX;
					var changeY = this.mY - this.sY;
					if(Math.abs(changeX) || Math.abs(changeY)){
						this.isMove = 1;
					}
					var target = $('#' + that.targetId);
					target.css({
						width: this.sW + changeX,
						height: this.sH + changeY
					});
					controller.css({
						width: this.sW + changeX + 6,
						height: this.sH + changeY + 6
					});
					var parent = this;
					if (param.it) {
						clearTimeout(param.it);
					}
					param.it = setTimeout(function () {
						parent.touchEnd();
						clearTimeout(param.it);
					}, 1000);
				},
				touchEnd: function (event) {
					if ( !this.moveLock ) {
						return;
					}
					this.moveLock = false;
				}
			});
			// bk resize
			var gResizeIcon = $('#gResizeIcon');
			gResizeIcon.touchGroup({
				touchStart: function (event) {
					this.touchTargetId = $(vv.event.getTarget(event)).attr('id');
					var touchTarget = $("#" + this.touchTargetId);
					var target = $('#componentForm');
					var touchId = touchTarget.attr('id');
					this.moveLock = true;
					this.isMove = 0;
					this.sX = event.pageX || event.x;
					this.sY = event.pageY || event.y;
					this.sL = parseInt(touchTarget.css('right'), 10);
					this.sT = parseInt(touchTarget.css('bottom'), 10);
					this.sW = parseInt(target.css('width'), 10);
					this.sH = parseInt(target.css('height'), 10);
					this.bodyW = $(document.body).width();
					this.bodyH = $(document.body).height();
					controller.hide();
					this.param = {};
				},
				touchMove: function (event) {
					if ( !this.moveLock ) {
						return;
					}
					var param = this.param;
					this.mX = event.pageX || event.x;
					this.mY = event.pageY || event.y;
					var changeX = this.mX - this.sX;
					var changeY = this.mY - this.sY;
					if(Math.abs(changeX) || Math.abs(changeY)){
						this.isMove = 1;
					}
					var target = $('#componentForm');
					target.css({
						width: this.sW + changeX,
						height: this.sH + changeY
					});
					var sW = this.sW + changeX + 6;
					var sH = this.sH + changeY + 6;
					controller.css({
						width: sW,
						height: sH
					});
					var bH = this.bodyH + changeY > $(window).height() ? this.bodyH + changeY : $(window).height();
					var bW = this.bodyW + changeX > $(window).width() ? this.bodyW + changeX : $(window).width();
					$('html').css({
						height: bH
					});
					$('#rulerV, #rulerVTextContent').css({
						height: bH - 17
					});
					$('#rulerH, #rulerVTextContent').css({
						width: bW - 17
					});
					$('.vReferenceLineLock, #vReferenceLine').css({
						height: bH + 17
					});
					$('.hReferenceLineLock, #hReferenceLine').css({
						width: bW + 17
					});
					var parent = this;
					if (param.it) {
						clearTimeout(param.it);
					}
					param.it = setTimeout(function () {
						parent.touchEnd();
						clearTimeout(param.it);
					}, 500);
				},
				touchEnd: function (event) {
					if ( !this.moveLock ) {
						return;
					}
					this.moveLock = false;
				}
			});
			$('#gSetIcon').touch(function(){
				pSetter.setTarget('componentForm');
				pSetter.show();
			});
		},
		
		refresh: function (targetId) {
			var target = $('#' + targetId);
			this.targetId = targetId;
			var controller = $('#componentController');
			var tw = parseInt(target.css('width')) + parseInt(target.css('padding-left')) + parseInt(target.css('padding-right'));
			var th = parseInt(target.css('height')) + parseInt(target.css('padding-top')) + parseInt(target.css('padding-bottom'));
			controller.css({
				width: tw,
				height: th,
				top: target.css('top'),
				left: target.css('left')
			});
			controller.show();
		}
		
	}
	
	var controlBar = new componentController();
	
	/* param setter */
	var pSetter = new paramSetter();
	
	/* key event */
	$(document.body).on('keydown',function(e){
		if (pSetter.inserting) {
			return;
		}
		var target = $('#' + controlBar.targetId);
		var control = $('#componentController');
		if (!pSetter.lockKey) {
			vv.event.preventDefault(e);
		}
		if (e.keyCode == 16) {
			controlBar.isShift = 1;
		}
		if (e.keyCode == 17) {
			controlBar.isCtrl = 1;
		}
		var add = 1;
		if (controlBar.isShift) {
			add = 5;
		}
		switch (e.keyCode) {
			case 37: // left
				if (controlBar.isCtrl) {
					target.css({
						width: parseInt(target.css('width')) - add
					});
					control.css({
						width: parseInt(control.css('width')) - add
					});
				} else {
					target.css({
						left: parseInt(target.css('left')) - add
					});
					control.css({
						left: parseInt(control.css('left')) - add
					});
				}
			break;
			case 38: // up
				if (controlBar.isCtrl) {
					target.css({
						height: parseInt(target.css('height')) - add
					});
					control.css({
						height: parseInt(control.css('height')) - add
					});
				} else {
					target.css({
						top: parseInt(target.css('top')) - add
					});
					control.css({
						top: parseInt(control.css('top')) - add
					});
				}
			break;
			case 39: // right
				if (controlBar.isCtrl) {
					target.css({
						width: parseInt(target.css('width')) + add
					});
					control.css({
						width: parseInt(control.css('width')) + add
					});
				} else {
					target.css({
						left: parseInt(target.css('left')) + add
					});
					control.css({
						left: parseInt(control.css('left')) + add
					});
				}
			break;
			case 40: // down
				if (controlBar.isCtrl) {
					target.css({
						height: parseInt(target.css('height')) + add
					});
					control.css({
						height: parseInt(control.css('height')) + add
					});
				} else {
					target.css({
						top: parseInt(target.css('top')) + add
					});
					control.css({
						top: parseInt(control.css('top')) + add
					});
				}
			break;
		}
	});
	
	$(document.body).on('keyup',function(e){
		if (e.keyCode == 16) {
			controlBar.isShift = 0;
		}
		if (e.keyCode == 17) {
			controlBar.isCtrl = 0;
		}
	});
	
	//callback
	window.freeForm = freeForm;
	
})( typeof window !== 'undefined' ? window : this );
