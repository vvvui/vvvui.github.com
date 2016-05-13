'use strict';

var ShowDebitCard = React.createClass({
    displayName: 'ShowDebitCard',

    getInitialState: function getInitialState() {
        return {
            loaded: 0
        };
    },
    componentDidMount: function componentDidMount() {
        requireCheck(['backBar'], this.init);
        historyPage = 'checkDebitCard';
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
                    ),
                    React.createElement(
                        'div',
                        { className: 'changeBtn' },
                        React.createElement(
                            'a',
                            { href: '#showDebitCard#changeDebitCard' },
                            '换卡'
                        )
                    )
                )
            ),
            React.createElement(
                'a',
                { href: '#showDebitCard#setWork' },
                React.createElement(
                    'div',
                    { className: 'acButton', style: { 'margin': '30px 15px 0px 15px' } },
                    '下一步'
                )
            )
        );
    }
});