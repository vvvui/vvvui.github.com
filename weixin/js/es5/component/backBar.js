"use strict";

var BackBar = React.createClass({
	displayName: "BackBar",

	render: function render() {
		var backLink = "#" + showPage + "#" + historyPage + "#1";
		return React.createElement(
			"div",
			{ className: "backBar" },
			React.createElement(
				"a",
				{ href: backLink },
				React.createElement(
					"div",
					{ className: "backIcon" },
					React.createElement("img", { src: "img/backicon.png" })
				)
			),
			this.props.title
		);
	}
});