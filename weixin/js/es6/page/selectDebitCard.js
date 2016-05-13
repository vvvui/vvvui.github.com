var SelectDebitCard = React.createClass({
    getInitialState: function() {
        return {
            loaded: 0
        };
    },
    componentDidMount: function() {
        requireCheck(['backBar'], this.init);
        historyPage = 'selectFace';
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
                <div className="cardBk">
                    <div className="imgArea">
                        <img src="img/debitcard.png"></img>
                        <input type="file" accept="image/*" className="iFile" id="idCard"/>
                    </div>
                </div>
                <div className="cardText">借记卡正面</div>
                <div className="cardLinkText"><a href="#selectDebitCard#setDebitCard">手动输入</a></div>
                <a href="#selectDebitCard#checkDebitCard"><div className="acButton">下一步</div></a>
            </div>
        );
	}
});
