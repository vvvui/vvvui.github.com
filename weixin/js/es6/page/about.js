var About = React.createClass({
    getInitialState: function() {
        return {
            loaded: 0
        };
    },
    componentDidMount: function() {
        requireCheck(['backBar'], this.init);
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
                <BackBar title="宜分期首页"/>
                <div>
                    a<br/>
                    a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>宜分期首页
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                    宜分期首页<br/>
                </div>
            </div>
        );
	}
});
