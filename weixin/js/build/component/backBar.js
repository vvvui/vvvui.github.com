/**
* 2016-05-13
* @yifenqi@creditease.cn
* @site http://www.yifenqi.com
*/
"use strict";var BackBar=React.createClass({displayName:"BackBar",render:function(){var a="#"+showPage+"#"+historyPage+"#1";return React.createElement("div",{className:"backBar"},React.createElement("a",{href:a},React.createElement("div",{className:"backIcon"},React.createElement("img",{src:"img/backicon.png"}))),this.props.title)}});