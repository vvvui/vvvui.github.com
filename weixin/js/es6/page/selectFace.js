var SelectFace = React.createClass({
    getInitialState: function() {
        return {
            loaded: 0
        };
    },
    componentDidMount: function() {
        requireCheck(['backBar'], this.init);
        historyPage = 'showIdCard';
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
                    <span className="tipText">请提交您的三张高清人脸照片<font color="#2ab24c">【很重要】</font></span>
                </div>
                <div className="faceGroup clearFix">
                    <div className="facePic">
                        <img src="img/face1.png"></img>
                        <input type="file" accept="image/*" className="iFile" id="idCard"/>
                    </div>
                    <div className="facePic">
                        <img src="img/face2.png"></img>
                        <input type="file" accept="image/*" className="iFile" id="idCard"/>
                    </div>
                    <div className="facePic">
                        <img src="img/face3.png"></img>
                        <input type="file" accept="image/*" className="iFile" id="idCard"/>
                    </div>
                </div>
                <div className="faceGroup clearFix">
                    <div className="facePic">
                        正面
                    </div>
                    <div className="facePic">
                        侧面
                    </div>
                    <div className="facePic">
                        闭眼
                    </div>
                </div>
                <a href="#selectFace#selectDebitCard"><div className="acButton">下一步</div></a>
            </div>
        );
	}
});
