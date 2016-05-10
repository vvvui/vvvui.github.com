'use strict';

var CheckIdCard = React.createClass({
    displayName: 'CheckIdCard',

    getInitialState: function getInitialState() {
        return {
            loaded: 0
        };
    },
    componentDidMount: function componentDidMount() {
        requireCheck(['backBar'], this.init);
        historyPage = 'selectIdCard';
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
                    React.createElement('img', { src: 'img/idcarddefault.jpg' })
                ),
                React.createElement(
                    'div',
                    { className: 'idCard idCardRight' },
                    React.createElement('img', { src: 'img/idcardbackdefault.jpg' })
                )
            ),
            React.createElement(
                'div',
                { className: 'idCardTextGroup clearFix' },
                React.createElement(
                    'div',
                    { className: 'carText idCardLeft' },
                    '身份证正面'
                ),
                React.createElement(
                    'div',
                    { className: 'carText idCardRight' },
                    '身份证反面'
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
                        { className: 'itemTitle' },
                        '身份证号'
                    ),
                    React.createElement('input', { className: 'itemInput colorDefault', defaultValue: '452128199006012211' })
                ),
                React.createElement(
                    'div',
                    { className: 'groupItem clearFix' },
                    React.createElement(
                        'div',
                        { className: 'itemTitle' },
                        '姓　　名'
                    ),
                    React.createElement('input', { className: 'itemInput colorDefault', defaultValue: '刘华' })
                ),
                React.createElement(
                    'div',
                    { className: 'groupItem clearFix' },
                    React.createElement(
                        'div',
                        { className: 'itemTitle' },
                        '性　　别'
                    ),
                    React.createElement(
                        'div',
                        { className: 'sexRadio' },
                        React.createElement('img', { src: 'img/sexradio.png' })
                    ),
                    React.createElement(
                        'div',
                        { className: 'sexRadio', style: { 'padding-right': '2rem' } },
                        '男'
                    ),
                    React.createElement(
                        'div',
                        { className: 'sexRadio' },
                        React.createElement('img', { src: 'img/sexradiounselect.png' })
                    ),
                    React.createElement(
                        'div',
                        { className: 'sexRadio' },
                        '女'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'groupItem clearFix' },
                    React.createElement(
                        'div',
                        { className: 'itemTitle' },
                        '出生年月'
                    ),
                    React.createElement('input', { className: 'itemInput colorDefault', defaultValue: '1985-06-01' })
                ),
                React.createElement(
                    'div',
                    { className: 'groupItem clearFix', style: { 'height': '4rem' } },
                    React.createElement(
                        'div',
                        { className: 'itemTitle' },
                        '地　　址'
                    ),
                    React.createElement('textarea', { className: 'itemInput colorDefault',
                        style: { 'height': '3rem', 'resize': 'none' },
                        defaultValue: '山东省青岛市北茂街区北市科技风貌街612号' })
                ),
                React.createElement(
                    'div',
                    { className: 'groupItem clearFix' },
                    React.createElement(
                        'div',
                        { className: 'itemTitle' },
                        '有 效 期'
                    ),
                    React.createElement('input', { className: 'itemInput',
                        style: { 'width': '7rem', 'font-size': '1rem', 'color': '#c8c8c8' },
                        defaultValue: '2005-09-09' }),
                    React.createElement(
                        'div',
                        { className: 'itemFlowText', style: { 'left': '13.5rem' } },
                        '至'
                    ),
                    React.createElement('input', { className: 'itemInput',
                        style: { 'width': '7rem', 'font-size': '1rem', 'color': '#c8c8c8', 'text-align': 'right' },
                        defaultValue: '2005-09-09' })
                )
            ),
            React.createElement(
                'a',
                { href: '#checkIdCard#showIdCard' },
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