var SelectIdCard = React.createClass({
    getInitialState: function() {
        return {
            loaded: 0
        };
    },
    componentDidMount: function() {
        requireCheck(['backBar'], this.init);
        historyPage = 'installmentRegister';
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
                    <div className="tipText">该页面已经过安全加密，请您放心输入</div>
                </div>
                <div className="idCardGroup clearFix">
                    <div className="idCard idCardLeft">
                        <img src="img/idcard.png"></img>
                        <input type="file" accept="image/*" className="iFile" id="idCard"/>
                    </div>
                    <div className="idCard idCardRight">
                        <img src="img/idcardback.png"></img>
                        <input type="file" accept="image/*" className="iFile" id="idCardBack"/>
                    </div>
                </div>
                <div className="idCardTextGroup clearFix">
                    <div className="carText idCardLeft">添加身份证正面照片</div>
                    <div className="carText idCardRight">添加身份证反面照片</div>
                </div>
                <a href="#selectIdCard#checkIdCard"><div className="acButton">下一步</div></a>
            </div>
        );
	}
});
