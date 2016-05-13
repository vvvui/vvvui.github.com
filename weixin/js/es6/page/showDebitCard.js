var ShowDebitCard = React.createClass({
    getInitialState: function() {
        return {
            loaded: 0
        };
    },
    componentDidMount: function() {
        requireCheck(['backBar'], this.init);
        historyPage = 'checkDebitCard';
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
                <div className="showDebitCard">
                    <div className="debitCardContent">
                        <img src="img/bank/bcm.png"></img>
                        <div className="bankName">交通银行</div>
                        <div className="cardName">储蓄卡</div>
                        <div className="cardNumber">**** **** **** 6542</div>
                        <div className="changeBtn"><a href="#showDebitCard#changeDebitCard">换卡</a></div>
                    </div>
                </div>
                <a href="#showDebitCard#setWork"><div className="acButton" style={{'margin':'30px 15px 0px 15px'}}>下一步</div></a>
            </div>
        );
	}
});
