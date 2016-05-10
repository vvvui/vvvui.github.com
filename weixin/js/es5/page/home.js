"use strict";

var Home = React.createClass({
	displayName: "Home",

	render: function render() {
		return React.createElement(
			"div",
			{ className: "page", style: this.props.style },
			React.createElement(
				"a",
				{ href: "#home#installmentRegister" },
				"申请分期"
			),
			React.createElement("br", null),
			React.createElement("br", null),
			React.createElement(
				"a",
				{ href: "#home#about" },
				"账单查询"
			),
			React.createElement("br", null),
			React.createElement("br", null),
			React.createElement(
				"a",
				{ href: "#home#about" },
				"我的订单"
			),
			React.createElement("br", null),
			React.createElement("br", null),
			React.createElement(
				"a",
				{ href: "#home#about" },
				"下载APP"
			),
			React.createElement("br", null),
			React.createElement("br", null),
			React.createElement(
				"a",
				{ href: "#home#about" },
				"客服咨询"
			),
			React.createElement("br", null),
			React.createElement("br", null),
			React.createElement(
				"a",
				{ href: "#home#about" },
				"常见问题"
			),
			React.createElement("br", null),
			React.createElement("br", null)
		);
	}
});