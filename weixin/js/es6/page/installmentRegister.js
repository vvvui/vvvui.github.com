var InstallmentRegister = React.createClass({
    getInitialState: function() {
        return {
            loaded: 0
        };
    },
    componentDidMount: function() {
        requireCheck(['backBar'], this.init);
        historyPage = 'home';
    },
    init: function () {
        this.setState({loaded: 1});
    },
    render: function () {
        if (!this.state.loaded) {
            return (
                <div></div>
            );
        }
        return (
            <div className="page" style={this.props.style}>
                <div className="yellowTip clearFix">
                    <div className="tipIcon"><img src="img/tipicon.png"></img></div>
                    <span className="tipText">温馨提示：下载APP申请会更加顺畅哦，<a href="" target="_blank">去下载</a></span>
                    <div className="tipRight"><img src="img/greenrighticon.png"></img></div>
                </div>
                <div className="inviteTitle">邀请码</div>
                <div className="singleArea">
                    <input className="inviteInput" placeholder="请输入邀请码"/>
                </div>
                <div className="groupArea">
                    <div className="groupItem clearFix">
                        <div className="itemTitle">商　　品</div>
                        <input className="itemInput" defaultValue="乐视电视"/>
                        <div className="arrowDown"><img src="img/arrowdown.png"></img></div>
                    </div>
                    <div className="groupItem clearFix">
                        <div className="itemTitle">分　　期</div>
                        <input className="itemInput" defaultValue="24"/>
                        <div className="arrowDown"><img src="img/arrowdown.png"></img></div>
                        <div className="itemFlowText">月</div>
                    </div>
                    <div className="groupItem clearFix">
                        <div className="itemTitle">分期金额</div>
                        <input className="itemInput" defaultValue="600"/>
                        <div className="itemFlowText">元</div>
                        <div className="itemFlowRightText"><span style={{color: '#eb873d'}}>200</span>元/每月</div>
                    </div>
                    <div className="groupItem clearFix">
                        <div className="itemTitle">分期用途</div>
                        <input className="itemInput" defaultValue="58寸乐视智能电视"/>
                    </div>
                </div>
                <a href="#installmentRegister#selectIdCard"><div className="acButton">下一步</div></a>
            </div>
        );
	}
});
