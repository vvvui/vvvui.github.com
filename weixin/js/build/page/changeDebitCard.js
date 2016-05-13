/**
* 2016-05-13
* @yifenqi@creditease.cn
* @site http://www.yifenqi.com
*/
"use strict";var ChangeDebitCard=React.createClass({displayName:"ChangeDebitCard",getInitialState:function(){return{loaded:0}},componentDidMount:function(){requireCheck(["backBar"],this.init),historyPage="showDebitCard"},init:function(){this.setState({loaded:1})},render:function(){return this.state.loaded?React.createElement("div",{className:"page",style:this.props.style},React.createElement(BackBar,{title:"申请分期"}),React.createElement("div",{className:"showDebitCard"},React.createElement("div",{className:"debitCardContent"},React.createElement("img",{src:"img/bank/bcm.png"}),React.createElement("div",{className:"bankName"},"交通银行"),React.createElement("div",{className:"cardName"},"储蓄卡"),React.createElement("div",{className:"cardNumber"},"**** **** **** 6542")))):React.createElement("div",null)}});