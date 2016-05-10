"use strict";

var About = React.createClass({
    displayName: "About",

    getInitialState: function getInitialState() {
        return {
            loaded: 0
        };
    },
    componentDidMount: function componentDidMount() {
        requireCheck(['backBar'], this.init);
    },
    init: function init() {
        this.setState({ loaded: 1 });
    },
    render: function render() {
        if (!this.state.loaded) {
            return React.createElement("div", null);
        }
        return React.createElement(
            "div",
            { className: "page", style: this.props.style },
            React.createElement(BackBar, { title: "宜分期首页" }),
            React.createElement(
                "div",
                null,
                "a",
                React.createElement("br", null),
                "a",
                React.createElement("br", null),
                "a",
                React.createElement("br", null),
                "a",
                React.createElement("br", null),
                "a",
                React.createElement("br", null),
                "a",
                React.createElement("br", null),
                "a",
                React.createElement("br", null),
                "宜分期首页 宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null),
                "宜分期首页",
                React.createElement("br", null)
            )
        );
    }
});