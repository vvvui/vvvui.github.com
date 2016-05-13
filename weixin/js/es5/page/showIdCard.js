'use strict';

var ShowIdCard = React.createClass({
    displayName: 'ShowIdCard',

    getInitialState: function getInitialState() {
        return {
            loaded: 0
        };
    },
    componentDidMount: function componentDidMount() {
        requireCheck(['backBar'], this.init);
        historyPage = 'checkIdCard';
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
                { className: 'idCardShow' },
                React.createElement(
                    'div',
                    { className: 'idCardShowTextG' },
                    React.createElement(
                        'div',
                        { className: 'textL' },
                        '身份证号'
                    ),
                    React.createElement(
                        'div',
                        { className: 'textR' },
                        '****************32'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'idCardShowTextG' },
                    React.createElement(
                        'div',
                        { className: 'textL' },
                        '姓　　名'
                    ),
                    React.createElement(
                        'div',
                        { className: 'textR' },
                        '*军'
                    )
                )
            ),
            React.createElement(
                'a',
                { href: '#showIdCard#selectFace' },
                React.createElement(
                    'div',
                    { className: 'acButton', style: { 'margin': '30px 15px 0px 15px' } },
                    '下一步'
                )
            )
        );
    }
});