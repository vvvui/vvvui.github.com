'use strict';

var SelectIdCard = React.createClass({
    displayName: 'SelectIdCard',

    getInitialState: function getInitialState() {
        return {
            loaded: 0
        };
    },
    componentDidMount: function componentDidMount() {
        requireCheck(['backBar'], this.init);
        historyPage = 'installmentRegister';
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
                    'div',
                    { className: 'tipText' },
                    '该页面已经过安全加密，请您放心输入'
                )
            ),
            React.createElement(
                'div',
                { className: 'idCardGroup clearFix' },
                React.createElement(
                    'div',
                    { className: 'idCard idCardLeft' },
                    React.createElement('img', { src: 'img/idcard.png' }),
                    React.createElement('input', { type: 'file', accept: 'image/*', className: 'iFile', id: 'idCard' })
                ),
                React.createElement(
                    'div',
                    { className: 'idCard idCardRight' },
                    React.createElement('img', { src: 'img/idcardback.png' }),
                    React.createElement('input', { type: 'file', accept: 'image/*', className: 'iFile', id: 'idCardBack' })
                )
            ),
            React.createElement(
                'div',
                { className: 'idCardTextGroup clearFix' },
                React.createElement(
                    'div',
                    { className: 'carText idCardLeft' },
                    '添加身份证正面照片'
                ),
                React.createElement(
                    'div',
                    { className: 'carText idCardRight' },
                    '添加身份证反面照片'
                )
            ),
            React.createElement(
                'a',
                { href: '#selectIdCard#checkIdCard' },
                React.createElement(
                    'div',
                    { className: 'acButton' },
                    '下一步'
                )
            )
        );
    }
});