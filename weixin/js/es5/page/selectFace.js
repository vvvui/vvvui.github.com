'use strict';

var SelectFace = React.createClass({
    displayName: 'SelectFace',

    getInitialState: function getInitialState() {
        return {
            loaded: 0
        };
    },
    componentDidMount: function componentDidMount() {
        requireCheck(['backBar'], this.init);
        historyPage = 'showIdCard';
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
                    { className: 'tipText' },
                    '请提交您的三张高清人脸照片',
                    React.createElement(
                        'font',
                        { color: '#2ab24c' },
                        '【很重要】'
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'faceGroup clearFix' },
                React.createElement(
                    'div',
                    { className: 'facePic' },
                    React.createElement('img', { src: 'img/face1.png' }),
                    React.createElement('input', { type: 'file', accept: 'image/*', className: 'iFile', id: 'idCard' })
                ),
                React.createElement(
                    'div',
                    { className: 'facePic' },
                    React.createElement('img', { src: 'img/face2.png' }),
                    React.createElement('input', { type: 'file', accept: 'image/*', className: 'iFile', id: 'idCard' })
                ),
                React.createElement(
                    'div',
                    { className: 'facePic' },
                    React.createElement('img', { src: 'img/face3.png' }),
                    React.createElement('input', { type: 'file', accept: 'image/*', className: 'iFile', id: 'idCard' })
                )
            ),
            React.createElement(
                'div',
                { className: 'faceGroup clearFix' },
                React.createElement(
                    'div',
                    { className: 'facePic' },
                    '正面'
                ),
                React.createElement(
                    'div',
                    { className: 'facePic' },
                    '侧面'
                ),
                React.createElement(
                    'div',
                    { className: 'facePic' },
                    '闭眼'
                )
            ),
            React.createElement(
                'a',
                { href: '#selectFace#selectDebitCard' },
                React.createElement(
                    'div',
                    { className: 'acButton' },
                    '下一步'
                )
            )
        );
    }
});