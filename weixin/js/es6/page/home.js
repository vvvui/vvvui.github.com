var Home = React.createClass({
	render: function () {
		return (
			<div className="page" style={this.props.style}>
				<a href="#home#installmentRegister">申请分期</a><br/><br/>
				<a href="#home#about">账单查询</a><br/><br/>
				<a href="#home#about">我的订单</a><br/><br/>
				<a href="#home#about">下载APP</a><br/><br/>
				<a href="#home#about">客服咨询</a><br/><br/>
				<a href="#home#about">常见问题</a><br/><br/>
			</div>
		);
	}
});
