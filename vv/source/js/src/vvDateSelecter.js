
( function( window ) {
	
	var vvDateSelecter = function ( param ) {
		this.param = param;
		this.param.domId = param.domId ? param.domId : '#vvDateSelecter';
		this.param.timeBegin = param.timeBegin ? param.timeBegin : this.getNowDate();
		this.param.timeEnd = param.timeEnd ? param.timeEnd : this.getNowDate();
		this.init();
	}
	
	vvDateSelecter.prototype = {
		
		init: function() {
			this.yearInt();
			this.acTionInit();
		},
		
		acTionInit: function() {
			var that = this;
			$('#startTime').touch(function(e){
				that.param.type = 1;
				that.setValue($('#startTime').html());
				that.showContent();
			});
			$('#endTime').touch(function(e){
				that.param.type = 2;
				that.setValue($('#endTime').html());
				that.showContent();
			});
			$('#clearBtn').touch(function(e){
				that.maskHide();
				$(that.param.domId).vvAnimate({
					top: $(window).height()
				}, function(){
					$(that.param.domId).hide();
				}, {
					acTime: 500
				});
			});
			$('#checkBtn').touch(function(e){
				that.checkAction();
			});
			$('#alertCheckBtn').touch(function(e){
				$('#vvSelecterAlert').hide();
				$('#vvSelecterAlertMask').hide();
			});
		},
		
		checkAction: function() {
			var checkedDate = formartZero(this.param.year) + formartZero(this.param.month) + formartZero(this.param.day);
			var subDate = formartZero(this.param.year) + '-' + formartZero(this.param.month) + '-' + formartZero(this.param.day);
			var that = this;
			if( this.param.type == 1 ) {
				var dataEnd = $('#endTime').html().replace(/-/g,'');
				if( parseInt(checkedDate) > parseInt(dataEnd) ) {
					$('#vvSelecterAlert').show();
					$('#vvSelecterAlertMask').show();
				} else {
					$('#startTime').html(subDate);
					this.maskHide();
					$(this.param.domId).vvAnimate({
						top: $(window).height()
					}, function(){
						$(that.param.domId).hide();
					}, {
						acTime: 500
					});
					if( this.param.callBack ) {
						this.param.callBack();
					}
				}
			} else {
				var dataStart = $('#startTime').html().replace(/-/g,'');
				if( parseInt(dataStart) > parseInt(checkedDate) ) {
					$('#vvSelecterAlert').show();
					$('#vvSelecterAlertMask').show();
				} else {
					$('#endTime').html(subDate);
					this.maskHide();
					$(this.param.domId).vvAnimate({
						top: $(window).height()
					}, function(){
						$(that.param.domId).hide();
					}, {
						acTime: 500
					});
					if( this.param.callBack ) {
						this.param.callBack();
					}
				}
			}
		},
		
		setValue: function( val ) {
			var reg = /(\d{4,4})-(\d{1,2})-(\d{1,2})/;
			var dArr = val.match(reg);
			if( dArr ) {
				this.param.year = dArr[1];
				this.param.month = dArr[2];
				this.param.day = dArr[3];
				this.yearInt();
				this.yearSelecter.setValue( dArr[1] );
				this.monthSelecter.setValue( dArr[2] );
				this.daySelecter.setValue( dArr[3] );
			}
		},
		
		showContent: function() {
			this.maskShow();
			$(this.param.domId).show();
			$(this.param.domId).vvAnimate({
				top: $(window).height() - 210
			}, 0, {
				acTime: 500
			});
		},
		
		maskShow: function() {
			$('#vvSelecterMask').css({
				display: 'block',
				opacity: 0
			});	
			$('#vvSelecterMask').vvAnimate({
				opacity: 0.5
			}, 0, {
				acTime: 500
			});
		},
		
		maskHide: function() {
			$('#vvSelecterMask').vvAnimate({
				opacity: 0
			}, function(){
				$('#vvSelecterMask').css({
					display: 'none'
				});
			}, {
				acTime: 500
			});
		},
		
		yearInt: function() {
			var yearBegin = parseInt( this.param.timeBegin.split('-')[0] , 10 );
			var yearEnd = parseInt( this.param.timeEnd.split('-')[0] , 10 );
			var yearData = [];
			this.param.year = this.param.year || yearBegin;
			while( yearBegin <= yearEnd ) {
				yearData.push({
					option: yearBegin + '年',
					value: yearBegin
				});
				yearBegin ++;
			}
			var that = this;
			if(!this.yearSelecter){
				this.yearSelecter = new vvSelecter({
					domId  : "#vvYearSelecter",
					scrollDomId  : "#vvYearSelecterScroll",
					data   : yearData,
					callBack : function(value){
						that.param.year = value;
						that.monthInit();
						that.param.month = that.monthSelecter.param.data[0].value;
						that.dateInit();
						that.param.day = that.daySelecter.param.data[0].value;
					}
				});
			}
			this.monthInit();
		},
		
		monthInit: function() {
			var monthBegin = 1;
			var monthEnd = 12;
			var yearBegin = parseInt( this.param.timeBegin.split('-')[0] , 10 );
			var yearEnd = parseInt( this.param.timeEnd.split('-')[0] , 10 );
			if( this.param.year == yearBegin ) {
				monthBegin = parseInt( this.param.timeBegin.split('-')[1] , 10 );
				// console.log(monthBegin)
			}
			if( this.param.year == yearEnd ) {
				monthEnd = parseInt( this.param.timeEnd.split('-')[1] , 10 );
				// console.log(monthEnd)
			}
			var monthData = [];
			
			this.param.month = this.param.month || monthBegin;
			while( monthBegin <= monthEnd ) {
				monthData.push({
					option: monthBegin + '月',
					value: monthBegin
				});
				monthBegin ++;
			}
			var that = this;
			if( !this.monthSelecter ) {
				this.monthSelecter = new vvSelecter({
					domId  : "#vvMonthSelecter",
					scrollDomId  : "#vvMonthSelecterScroll",
					data   : monthData,
					callBack : function(value){
						that.param.month = value;
						that.dateInit();
						that.param.day = that.daySelecter.param.data[0].value;
					}
				});
			} else if( this.yearSelecter.param.checkedValue != this.param.year ) {
				this.monthSelecter.param.data = monthData;
				this.monthSelecter.domInit();
			}
			this.dateInit();
		},
		
		dateInit: function() {
			var
				dayBegin = 1,
				dayEnd = new Date( this.param.year, this.param.month , 0 ).getDate(),
				yearBegin = parseInt( this.param.timeBegin.split('-')[0] , 10 ),
				yearEnd = parseInt( this.param.timeEnd.split('-')[0] , 10 ),
				monthBegin = parseInt( this.param.timeBegin.split('-')[1] , 10 ),
				monthEnd = parseInt( this.param.timeEnd.split('-')[1] , 10 ),
				dayData = [];
				
			if( this.param.year == yearBegin && this.param.month == monthBegin ) {
				dayBegin = parseInt( this.param.timeBegin.split('-')[2] , 10 );
			}
			if( this.param.year == yearEnd && this.param.month == monthEnd ) {
				dayEnd = parseInt( this.param.timeEnd.split('-')[2] , 10 );
			}
			this.param.day = this.param.day || dayBegin;
			while( dayBegin <= dayEnd ) {
				dayData.push({
					option: dayBegin + '日',
					value: dayBegin
				});
				dayBegin ++;
			}
			
			var that = this;
			if( !this.daySelecter ) {
				this.daySelecter = new vvSelecter({
					domId  : "#vvDaySelecter",
					scrollDomId  : "#vvDaySelecterScroll",
					data   : dayData,
					callBack : function(value) {
						that.param.day = value;
					}
				});
			} else if( this.yearSelecter.param.checkedValue != this.param.year || this.monthSelecter.param.checkedValue != this.param.month ) {
				this.daySelecter.param.data = dayData;
				this.daySelecter.domInit();
			}
		},	
		
		getNowDate: function() {
			var date = new Date();
			var str = date.getFullYear() + "-" + formartZero(date.getMonth() + 1) + "-" + formartZero(date.getDate());
			return str;
		}
		
	}
	
	function formartZero(num){
		var num = parseInt(num);
		var str = num < 10 ? "0" + num : num;
		return str;
	}
	
	//callback
	window.vvDateSelecter = vvDateSelecter;
	
})( typeof window !== 'undefined' ? window : this );
