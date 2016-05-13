'use strict';

var ChangeDebitCard = React.createClass({
    displayName: 'ChangeDebitCard',

    getInitialState: function getInitialState() {
        return {
            loaded: 0
        };
    },
    componentDidMount: function componentDidMount() {
        requireCheck(['backBar'], this.init);
        historyPage = 'showDebitCard';
    },
    init: function init() {
        this.setState({ loaded: 1 });
    },
    render: function render() {
        if (!this.state.loaded) {
            return React.createElement('div', null);
        }
        return React.createElement(
            'div',
            { className: 'page', style: this.props.style },
            React.createElement(BackBar, { title: '申请分期' }),
            React.createElement(
                'div',
                { className: 'showDebitCard' },
                React.createElement(
                    'div',
                    { className: 'debitCardContent' },
                    React.createElement('img', { src: 'img/bank/bcm.png' }),
                    React.createElement(
                        'div',
                        { className: 'bankName' },
                        '交通银行'
                    ),
                    React.createElement(
                        'div',
                        { className: 'cardName' },
                        '储蓄卡'
                    ),
                    React.createElement(
                        'div',
                        { className: 'cardNumber' },
                        '**** **** **** 6542'
                    )
                )
            )
        );
    }
});