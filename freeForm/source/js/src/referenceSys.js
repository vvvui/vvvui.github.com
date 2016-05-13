(function (window) {
	
	var referenceSys = function (param) {
		this.param = param || {};
		this.init();
	}
	
	referenceSys.prototype = {
		
		init: function () {
			this.referenceNum = 2;
			var param = this.param;
			this.referenceHInit();
			this.referenceVInit();
			// ruler
			this.rulerInit();
		},
		
		resize: function (winChange) {
			$('#rulerH, #rulerVTextContent').css({
				width: $('body')[0].scrollWidth - 17
			});
			$('#rulerV, #rulerVTextContent').css({
				height: $('body')[0].scrollHeight - 17
			});
			$('.hReferenceLineLock, .hReferenceLine').css({
				width: $('body')[0].scrollWidth
			});
			$('.vReferenceLineLock, .vReferenceLine').css({
				height: $('body')[0].scrollHeight
			});
			var param = this.param;
			// ruler
			var pT = param.referenceDefaultTop;
			var mT = 17 + (parseInt(pT/50) + 1) * 50 - pT;
			$('#rulerVContent').css({
				top: -mT
			});
			var rulerTextNum = parseInt((parseInt($('#rulerV').css('height'), 10) - pT)/50, 10) + 100;
			var tList = $('.rulerVText');
			for (var i = 0; i < rulerTextNum; i++) {
				var addText = $(tList[i]);
				addText.css({
					top: i * 50 + pT - 17
				});
			}
			var pL = param.referenceDefaultLeft;
			var mL = 17 + (parseInt((pL)/50) + 1) * 50 - pL;
			$('#rulerHContent').css({
				left: -mL
			});
			var rulerTextNum = parseInt((parseInt($('#rulerH').css('width'), 10) - pL)/50, 10) + 50;
			var tList = $('.rulerHText');
			for (var i = 0; i < rulerTextNum; i++) {
				var addText = $(tList[i]);
				addText.css({
					left: i * 50 + pL + 2
				});
			}
		},
		
		//ruler
		rulerInit: function () {
			var param = this.param;
			var pT = param.referenceDefaultTop;
			var mT = 17 + (parseInt(pT/50) + 1) * 50 - pT;
			$('#rulerVContent').css({
				top: -mT
			});
			var rulerTextNum = parseInt((parseInt($('#rulerV').css('height'), 10) - pT)/50, 10) + 100;
			for (var i = 0; i < rulerTextNum; i++) {
				var addText = $('<div class="rulerVText">' + (i * 50) + '</div>');
				addText.css({
					top: i * 50 + pT - 17
				});
				$('#rulerVTextContent').append(addText);
			}
			var pL = param.referenceDefaultLeft;
			var mL = 17 + (parseInt((pL)/50) + 1) * 50 - pL;
			$('#rulerHContent').css({
				left: -mL
			});
			var rulerTextNum = parseInt((parseInt($('#rulerH').css('width'), 10) - pL)/50, 10) + 50;
			for (var i = 0; i < rulerTextNum; i++) {
				var addText = $('<div class="rulerHText">' + (i * 50) + '</div>');
				addText.css({
					left: i * 50 + pL + 2
				});
				$('#rulerVTextContent').append(addText);
			}
			$('#rulerH, #rulerVTextContent').css({
				width: $('body')[0].scrollWidth - 17
			});
			$('#rulerV, #rulerVTextContent').css({
				height: $('body')[0].scrollHeight - 17
			});
		},
		
		// referenceLine
		showReferenceLine: function (pos) {
			var param = this.param;
			var hReference = $('#hReferenceLine');
			var vReference = $('#vReferenceLine');
			hReference.css({
				top: pos.top + param.referenceDefaultTop,
				display: 'block'
			});
			vReference.css({
				left: pos.left + param.referenceDefaultLeft,
				display: 'block'
			});
		},
		
		hideReferenceLine: function () {
			$('#hReferenceLine, #vReferenceLine').hide();
		},
		
		referenceHInit: function () {
			var that = this;
			var param = this.param;
			// hReference
			var hReferenceLineLock = $('<div class="hReferenceLineLock"></div>');
			hReferenceLineLock.append($('<div class="hReferenceLineLockContent"></div>'));
			$('body').append(hReferenceLineLock);
			hReferenceLineLock.css({
				top: param.referenceDefaultTop - 4,
				width: $('body')[0].scrollWidth,
				display: 'block'
			});
			hReferenceLineLock.attr('id', 'reference' + this.referenceNum);
			this.referenceNum ++;
			// action init
			hReferenceLineLock.touchGroup({
				touchStart: function (event) {
					this.moveLock = true;
					this.touchTargetId = $(vv.event.getTarget(event)).attr('id');
					var touchTarget = $("#" + this.touchTargetId);
					this.sY = event.pageY || event.y;
					this.sT = parseInt(touchTarget.css('top'), 10);
					this.isMove = 0;
					this.clickNum = this.clickNum || 0;
				},
				touchMove: function (event) {
					if ( !this.moveLock ) {
						return;
					}
					var touchTarget = $("#" + this.touchTargetId);
					this.mY = event.pageY || event.y;
					var changeY = this.mY - this.sY;
					touchTarget.css({
						top: this.sT + changeY
					});
					if (Math.abs(changeY) > 5) {
						this.isMove = 1;
					}
				},
				touchEnd: function (event) {
					if ( !this.moveLock ) {
						return;
					}
					var touchTarget = $("#" + this.touchTargetId);
					this.moveLock = false;
					var isBuild = touchTarget.attr('isBuild');
					if (this.isMove && !isBuild) {
						touchTarget.attr('isBuild', 1);
						that.referenceHInit();
					}
					if (this.isMove) {
						this.clickNum = 0;
					} else {
						this.clickNum ++;
						var parent = this;
						setTimeout(function(){
							parent.clickNum = 0;
						},1000);
					}
					if (isBuild && this.clickNum >= 2) {
						touchTarget.remove();
					}
				}
			});
		},
		
		referenceVInit: function () {
			var that = this;
			var param = this.param;
			// vReference
			var vReferenceLineLock = $('<div class="vReferenceLineLock"></div>');
			vReferenceLineLock.append($('<div class="vReferenceLineLockContent"></div>'));
			$('body').append(vReferenceLineLock);
			vReferenceLineLock.css({
				left: param.referenceDefaultLeft - 4,
				height: $('body')[0].scrollHeight,
				display: 'block'
			});
			vReferenceLineLock.attr('id', 'reference' + this.referenceNum);
			this.referenceNum ++;
			// action init
			vReferenceLineLock.touchGroup({
				touchStart: function (event) {
					this.moveLock = true;
					this.touchTargetId = $(vv.event.getTarget(event)).attr('id');
					var touchTarget = $("#" + this.touchTargetId);
					this.sX = event.pageX || event.x;
					this.sL = parseInt(touchTarget.css('left'), 10);
					this.isMove = 0;
				},
				touchMove: function (event) {
					if ( !this.moveLock ) {
						return;
					}
					var touchTarget = $("#" + this.touchTargetId);
					this.mX = event.pageX || event.x;
					var changeX = this.mX - this.sX;
					touchTarget.css({
						left: this.sL + changeX
					});
					if (Math.abs(changeX) > 5) {
						this.isMove = 1;
					}
				},
				touchEnd: function (event) {
					if ( !this.moveLock ) {
						return;
					}
					var touchTarget = $("#" + this.touchTargetId);
					this.moveLock = false;
					var isBuild = touchTarget.attr('isBuild');
					if (this.isMove && !isBuild) {
						touchTarget.attr('isBuild', 1);
						that.referenceVInit();
					}
					if (this.isMove) {
						this.clickNum = 0;
					} else {
						this.clickNum ++;
						var parent = this;
						setTimeout(function(){
							parent.clickNum = 0;
						},1000);
					}
					if (isBuild && this.clickNum >= 2) {
						touchTarget.remove();
					}
				}
			});
		}
		
	}
	
	window.referenceSys = referenceSys;
	
})( typeof window !== 'undefined' ? window : this );