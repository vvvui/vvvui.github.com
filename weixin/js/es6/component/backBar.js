var BackBar = React.createClass({
	render: function () {
		var backLink = "#" + showPage + "#" + historyPage + "#1";
		return (
				<div className="backBar">
					<a href={backLink}>
						<div className="backIcon">
							<img src="img/backicon.png"></img>
						</div>
					</a>
					{this.props.title}
				</div>
		);
	}
});
