'use strict';

var SetDebitCard = React.createClass({
    displayName: 'SetDebitCard',

    getInitialState: function getInitialState() {
        return {
            loaded: 0
        };
    },
    componentDidMount: function componentDidMount() {
        requireCheck(['backBar'], this.init);
        historyPage = 'selectDebitCard';
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
                { className: 'yellowTip alphaBg clearFix' },
                React.createElement(
                    'div',
                    { className: 'tipIcon', style: { 'padding-top': '0px' } },
                    React.createElement('img', { src: 'img/tipicon.png' })
                ),
                React.createElement(
                    'span',
                    { className: 'tipText', style: { 'font-size': '0.8rem' } },
                    '此卡为您的还款借记卡，为提高您的审核通过率，请选择交易时间为3个月以上的借记卡哦'
                )
            ),
            React.createElement(
                'div',
                { className: 'groupArea', style: { 'margin-top': '15px' } },
                React.createElement(
                    'div',
                    { className: 'groupItem clearFix' },
                    React.createElement(
                        'div',
                        { className: 'itemTitle colorGray' },
                        '持卡人姓名'
                    ),
                    React.createElement('input', { className: 'itemInput itemInputMargin colorGray', placeholder: '姓名' })
                ),
                React.createElement(
                    'div',
                    { className: 'groupItem clearFix' },
                    React.createElement(
                        'div',
                        { className: 'itemTitle' },
                        '卡　　　号'
                    ),
                    React.createElement('input', { className: 'itemInput itemInputMargin colorDefault', placeholder: '卡号' })
                ),
                React.createElement(
                    'div',
                    { className: 'groupItem clearFix' },
                    React.createElement(
                        'div',
                        { className: 'itemTitle' },
                        '开　户　行'
                    ),
                    React.createElement('input', { className: 'itemInput itemInputMargin colorDefault', placeholder: '开户行' })
                ),
                React.createElement(
                    'div',
                    { className: 'groupItem clearFix' },
                    React.createElement(
                        'div',
                        { className: 'itemTitle' },
                        '预留手机号'
                    ),
                    React.createElement('input', { className: 'itemInput itemInputMargin colorDefault', placeholder: '手机号' })
                ),
                React.createElement(
                    'div',
                    { className: 'groupItem clearFix' },
                    React.createElement(
                        'div',
                        { className: 'itemTitle' },
                        '验　证　码'
                    ),
                    React.createElement('input', { className: 'itemInput itemInputCode itemInputMargin colorDefault',
                        placeholder: '请输入验证码' }),
                    React.createElement(
                        'div',
                        { className: 'getCodeButton' },
                        '获取验证码'
                    )
                )
            ),
            React.createElement(
                'a',
                { href: '#setDebitCard#showDebitCard' },
                React.createElement(
                    'div',
                    { className: 'acButton', style: { 'margin': '30px 15px 0px 15px' } },
                    '下一步'
                )
            ),
            React.createElement('div', { style: { 'height': '30px' } })
        );
    }
});