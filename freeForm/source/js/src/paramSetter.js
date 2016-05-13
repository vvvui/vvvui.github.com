( function (window) {
	
	var paramSetter = function (param) {
		this.param = param || {};
		this.init();
	}
	
	paramSetter.prototype = {
		
		init: function () {
			var that = this;
			$('#setClose').touch(function(){
				that.hide();
			});
			$('#setSave').touch(function(){
				that.paramSet();
			});
			$('#saveBtn').touch(function(){
				that.save();
			});
			$('.setNr').css({
				height: $(window).height() - 150
			});
			$('#setTitle').touch(function(e){
				that.changeMenu(vv.event.getTarget(e).id);
			});
			this.dataInit();
		},
		
		changeMenu: function (targetId) {
			$('.changeContent').hide();
			$('.setBtn').removeClass('checked');
			$('#' + targetId).addClass('checked');
			var menuId = targetId.replace('Btn', 'Menu');
			$('#' + menuId).show();
		},
		
		dataInit: function() {
			this.attrDefault = {
				'id': undefined,
				'class': undefined,
				'name': undefined,
				'frame': undefined,
				'readonly': 'readonly',
				'type': undefined,
				'placeholder': undefined
			};
			this.styleDefault = {
				'width': 'auto',
				'height': 'auto',
				'top': 'auto',
				'left': 'auto',
				'position': 'absolute',
				'background-color': 'rgba(0, 0, 0, 0)',
				'resize': 'none',
				'right': 'auto',
				'bottom': 'auto',
				'font-size': '14px',
				'color': 'rgb(0, 0, 0)',
				'z-index': 'auto',
				'cursor': 'move',
				'border-left': '0px none rgb(0, 0, 0)',
				'border-right': '0px none rgb(0, 0, 0)',
				'border-top': '0px none rgb(0, 0, 0)',
				'border-bottom': '0px none rgb(0, 0, 0)',
				'padding-left': '0px',
				'padding-right': '0px',
				'padding-top': '0px',
				'padding-bottom': '0px',
				'margin-left': '0px',
				'margin-right': '0px',
				'margin-top': '0px',
				'margin-bottom': '0px',
				'line-height': 'normal',
				'text-align': 'start',
				'background-image': 'none',
				'background-repeat': 'repeat',
				'border-radius': '0px',
				'display': 'block',
				'background-size': 'auto',
				'pointer-events': 'auto',
				'overflow': 'visible',
				'opacity': '1',
				'filter': 'none'
			};
		},
		
		setTarget: function (targetId) {
			if (this.moving) {
				return;
			}
			this.targetId = targetId;
		},
		
		show: function () {
			if (this.moving) {
				return;
			}
			this.moving = true;
			var that = this;
			this.paramGet();
			$('#setMask').css({
				width: $(document.body).width(),
				height: $(document.body).height()
			});
			if (!vv.check.isIe) {
				$('html').css({
					overflow: 'hidden'
				});
			}
			$('#setContent').show();
			$('#setContent').vvAnimate({
				right: 0
			});
			this.lockKey = 1;
			// ac
			this.moveX = 243;
			this.reference.param.referenceDefaultLeft -= this.moveX;
			$('#freeForm').vvAnimate({
				left: parseInt($('#freeForm').css('left')) - this.moveX
			});
			$('#rulerH').vvAnimate({
				left: parseInt($('#rulerH').css('left')) - this.moveX
			});
			$('#rulerVTextContent').vvAnimate({
				left: parseInt($('#rulerVTextContent').css('left')) - this.moveX
			});
			var vRLineLock = $('.vReferenceLineLock');
			var vLen = vRLineLock.length;
			for (var i = 0; i < vLen; i++) {
				var id = $(vRLineLock[i]).attr('id');
				$('#' + id).vvAnimate({
					left: parseInt($(vRLineLock[i]).css('left')) - this.moveX
				});
			}
		},
		
		hide: function () {
			this.reference.param.referenceDefaultLeft += this.moveX;
			var that = this;
			$('#setMask').hide();
			this.lockKey = 0;
			$('#setContent').vvAnimate({
				right: -400
			},function(){
				$('#setContent').hide();
				if (!vv.check.isIe) {
					$('html').css({
						overflow: 'scroll'
					});
				}
				that.moving = false;
			});
			// ac
			$('#freeForm').vvAnimate({
				left: parseInt($('#freeForm').css('left')) + this.moveX
			});
			$('#rulerH').vvAnimate({
				left: parseInt($('#rulerH').css('left')) + this.moveX
			});
			$('#rulerVTextContent').vvAnimate({
				left: parseInt($('#rulerVTextContent').css('left')) + this.moveX
			});
			var vRLineLock = $('.vReferenceLineLock');
			var vLen = vRLineLock.length;
			for (var i = 0; i < vLen; i++) {
				var id = $(vRLineLock[i]).attr('id');
				$('#' + id).vvAnimate({
					left: parseInt($(vRLineLock[i]).css('left')) + this.moveX
				});
			}
		},
		
		paramSaveGet: function () {
			var target = $("#" + this.targetId);
			this.html = target.html();
			this.value = target.val();
			var aNum = 0;
			this.attrSet = {};
			for (var i in this.attrDefault) {
				if (target.attr(i) != this.attrDefault[i]) {
					if (target.attr(i)) {
						this.attrSet[aNum] = target.attr(i);
					}
				}
				aNum ++;
			}
			// clear className
			this.attrSet[1] = 1;
			
			// clear default
			var tagName = target[0].tagName.toLowerCase();
			var type = target.attr('type');
			if ((tagName == 'input' || tagName == 'textarea' || tagName == 'select') && type != 'checkbox' && type != 'radio') {
				this.styleDefault['background-color'] = 'rgb(255, 255, 255)';
				this.styleDefault['border-left'] = '1px solid rgb(221, 221, 221)';
				this.styleDefault['border-right'] = '1px solid rgb(221, 221, 221)';
				this.styleDefault['border-top'] = '1px solid rgb(221, 221, 221)';
				this.styleDefault['border-bottom'] = '1px solid rgb(221, 221, 221)';
			} else {
				this.styleDefault['background-color'] = 'rgba(0, 0, 0, 0)';
				this.styleDefault['border-left'] = '0px none rgb(0, 0, 0)';
				this.styleDefault['border-right'] = '0px none rgb(0, 0, 0)';
				this.styleDefault['border-top'] = '0px none rgb(0, 0, 0)';
				this.styleDefault['border-bottom'] = '0px none rgb(0, 0, 0)';
			}
			
			if (tagName == 'input' || tagName == 'textarea') {
				this.styleDefault['padding-left'] = '3px';
				this.styleDefault['padding-right'] = '3px';
				this.styleDefault['padding-top'] = '3px';
				this.styleDefault['padding-bottom'] = '3px';
			} else {
				this.styleDefault['padding-left'] = '0px';
				this.styleDefault['padding-right'] = '0px';
				this.styleDefault['padding-top'] = '0px';
				this.styleDefault['padding-bottom'] = '0px';
			}
			
			if (tagName == 'textarea') {
				this.styleDefault['resize'] = 'auto';
			} else {
				this.styleDefault['resize'] = 'none';
			}
			
			var sNum = 0;
			this.styleSet = {};
			for (var i in this.styleDefault) {
				if (target.css(i) != this.styleDefault[i]) {
					if (target.css(i)) {
						this.styleSet[sNum] = target.css(i);
					}
				}
				sNum ++;
			}
		},
		
		paramGet: function () {
			var target = $("#" + this.targetId);
			this.html = target.html();
			if (this.targetId != 'componentForm') {
				$('#setHtml').val(this.html);
			}
			this.value = target.val();
			$('#setVal').val(this.value);
			var attr = {};
			for (var i in this.attrDefault) {
				attr[i] = target.attr(i);
			}
			$('#setAttr').val(objToStr(attr));
			var style = {};
			for (var i in this.styleDefault) {
				style[i] = target.css(i);
			}
			$('#setStyle').val(objToStr(style));
		},
		
		paramSet: function () {
			var target = $("#" + this.targetId);
			// attr
			var setAttr = $('#setAttr').val();
			var attr = {};
			var attrArr = setAttr.split(';');
			var aLen = attrArr.length;
			for (var i = 0; i < aLen; i++) {
				if(attrArr[i]) {
					var tempArr = attrArr[i].split(':');
					if (tempArr[1] != 'undefined') {
						attr[tempArr[0]] = tempArr[1];
					}
				}
			}
			target.attr(attr);
			// style
			var setStyle = $('#setStyle').val();
			var style = {};
			var styleArr = setStyle.split(';');
			var sLen = styleArr.length;
			for (var i = 0; i < sLen; i++) {
				if(styleArr[i]) {
					var tempArr = styleArr[i].split(':');
					if (tempArr[1] != 'undefined') {
						style[tempArr[0]] = tempArr[1];
					}
				}
			}
			target.css(style);
			target.val($('#setVal').val());
			if (this.targetId != 'componentForm') {
				target.html($('#setHtml').val());
			}
			if (target[0].tagName.toLowerCase() == 'textarea') {
				target.val($('#setHtml').val());
			}
			this.hide();
		},
		
		save: function () {
			var postData = {};
			postData.children = [];
			var saveComponentList = $('.com,.comF');
			var cLen = saveComponentList.length;
			if (cLen) {
				for (var i = 0; i < cLen; i++) {
					this.setTarget(saveComponentList[i].id);
					this.paramSaveGet();
					var obj = {
						0: $("#" + this.targetId)[0].tagName.toLowerCase(), // tagName
						1: this.styleSet, // style
						2: this.attrSet, // attr
						3: this.html, // html
						4: this.value // value
					}
					postData.children.push(obj);
				}
			}
			this.setTarget('componentForm');
			this.paramSaveGet();
			postData.parent = {
				0: $("#" + this.targetId)[0].tagName.toLowerCase(), // tagName
				1: this.styleSet, // style
				2: this.attrSet // attr
			}
			this.post(postData);
		},
		
		post: function (data) {
			var postData = {};
			postData.c = 'freeForm';
			postData.a = 'save';
			postData.data = JSON.stringify(data);
			console.log(postData);
			$.ajax({
				url: 'http://127.0.0.1/freeForm/php/index.php',
				data: postData,
				type: 'post',
				cache: false,
				dataType: 'json',
				success: function(data) {
					alert('save success');
					console.log(data);
				},
				error: function(error) {
					console.dir(error.responseText);
				}
			});
		}
		
	}
	
	function objToStr (obj) {
		var str = '';
		for (var i in obj) {
			str += i + ':' + obj[i] + ';';
		}
		return str;
	}
	
	window.paramSetter = paramSetter;
	
})( typeof window !== 'undefined' ? window : this );