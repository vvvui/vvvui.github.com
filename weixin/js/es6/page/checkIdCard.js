var CheckIdCard = React.createClass({
    getInitialState: function() {
        return {
            loaded: 0
        };
    },
    componentDidMount: function() {
        requireCheck(['backBar'], this.init);
        historyPage = 'selectIdCard';
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
                <div className="yellowTip alphaBg clearFix">
                    <div className="tipIcon" style={{'padding-top':'0px'}}><img src="img/tipicon.png"></img></div>
                    <div className="tipText">该页面已经过安全加密，请您放心输入</div>
                </div>
                <div className="idCardGroup clearFix">
                    <div className="idCard idCardLeft">
                        <img src="img/idcarddefault.jpg"></img>
                    </div>
                    <div className="idCard idCardRight">
                        <img src="img/idcardbackdefault.jpg"></img>
                    </div>
                </div>
                <div className="idCardTextGroup clearFix">
                    <div className="carText idCardLeft">身份证正面</div>
                    <div className="carText idCardRight">身份证反面</div>
                </div>
                <div className="groupArea" style={{'margin-top':'15px'}}>
                    <div className="groupItem clearFix">
                        <div className="itemTitle">身份证号</div>
                        <input className="itemInput colorDefault" defaultValue="452128199006012211"/>
                    </div>
                    <div className="groupItem clearFix">
                        <div className="itemTitle">姓　　名</div>
                        <input className="itemInput colorDefault" defaultValue="刘华"/>
                    </div>
                    <div className="groupItem clearFix">
                        <div className="itemTitle">性　　别</div>
                        <div className="sexRadio"><img src="img/sexradio.png"></img></div>
                        <div className="sexRadio" style={{'padding-right':'2rem'}}>男</div>
                        <div className="sexRadio"><img src="img/sexradiounselect.png"></img></div>
                        <div className="sexRadio">女</div>
                    </div>
                    <div className="groupItem clearFix">
                        <div className="itemTitle">出生年月</div>
                        <input className="itemInput colorDefault" defaultValue="1985-06-01"/>
                    </div>
                    <div className="groupItem clearFix" style={{'height':'4rem'}}>
                        <div className="itemTitle">地　　址</div>
                        <textarea className="itemInput colorDefault"
                                  style={{'height':'3rem', 'resize':'none'}}
                                  defaultValue="山东省青岛市北茂街区北市科技风貌街612号"></textarea>
                    </div>
                    <div className="groupItem clearFix">
                        <div className="itemTitle">有 效 期</div>
                        <input className="itemInput"
                               style={{'width':'7rem', 'font-size':'1rem', 'color':'#c8c8c8'}}
                               defaultValue="2005-09-09"/>
                        <div className="itemFlowText" style={{'left':'13.5rem'}}>至</div>
                        <input className="itemInput"
                               style={{'width':'7rem', 'font-size':'1rem', 'color':'#c8c8c8', 'text-align':'right'}}
                               defaultValue="2005-09-09"/>
                    </div>
                </div>
                <a href="#checkIdCard#showIdCard"><div className="acButton" style={{'margin':'30px 15px 0px 15px'}}>下一步</div></a>
                <div style={{'height':'30px'}}></div>
            </div>
        );
	}
});
