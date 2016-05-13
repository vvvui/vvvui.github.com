var SetDebitCard = React.createClass({
    getInitialState: function() {
        return {
            loaded: 0
        };
    },
    componentDidMount: function() {
        requireCheck(['backBar'], this.init);
        historyPage = 'selectDebitCard';
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
                <BackBar title="申请分期"/>
                <div className="yellowTip alphaBg clearFix">
                    <div className="tipIcon" style={{'padding-top':'0px'}}><img src="img/tipicon.png"></img></div>
                    <span className="tipText" style={{'font-size':'0.8rem'}}>此卡为您的还款借记卡，为提高您的审核通过率，请选择交易时间为3个月以上的借记卡哦</span>
                </div>
                <div className="groupArea" style={{'margin-top':'15px'}}>
                    <div className="groupItem clearFix">
                        <div className="itemTitle colorGray">持卡人姓名</div>
                        <input className="itemInput itemInputMargin colorGray" placeholder="姓名"/>
                    </div>
                    <div className="groupItem clearFix">
                        <div className="itemTitle">卡　　　号</div>
                        <input className="itemInput itemInputMargin colorDefault" placeholder="卡号"/>
                    </div>
                    <div className="groupItem clearFix">
                        <div className="itemTitle">开　户　行</div>
                        <input className="itemInput itemInputMargin colorDefault" placeholder="开户行"/>
                    </div>
                    <div className="groupItem clearFix">
                        <div className="itemTitle">预留手机号</div>
                        <input className="itemInput itemInputMargin colorDefault" placeholder="手机号"/>
                    </div>
                    <div className="groupItem clearFix">
                        <div className="itemTitle">验　证　码</div>
                        <input className="itemInput itemInputCode itemInputMargin colorDefault"
                               placeholder="请输入验证码"/>
                        <div className="getCodeButton">获取验证码</div>
                    </div>
                </div>
                <a href="#setDebitCard#showDebitCard"><div className="acButton" style={{'margin':'30px 15px 0px 15px'}}>下一步</div></a>
                <div style={{'height':'30px'}}></div>
            </div>
        );
	}
});
