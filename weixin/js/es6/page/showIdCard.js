var ShowIdCard = React.createClass({
    getInitialState: function() {
        return {
            loaded: 0
        };
    },
    componentDidMount: function() {
        requireCheck(['backBar'], this.init);
        historyPage = 'checkIdCard';
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
                <div className="idCardShow">
                    <div className="idCardShowTextG">
                        <div className="textL">身份证号</div>
                        <div className="textR">****************32</div>
                    </div>
                    <div className="idCardShowTextG">
                        <div className="textL">姓　　名</div>
                        <div className="textR">*军</div>
                    </div>
                </div>
                <a href="#showIdCard#selectFace"><div className="acButton" style={{'margin':'30px 15px 0px 15px'}}>下一步</div></a>
            </div>
        );
	}
});
