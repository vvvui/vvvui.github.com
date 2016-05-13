var jsDir = 'js/build/';
var dirRand = Math.random();
var requireConfig = {
    about: {
        url: [jsDir + 'page/about.js?' + dirRand]
    },
    home: {
        url: [jsDir + 'page/home.js?' + dirRand]
    },
    installmentRegister: {
        url: [jsDir + 'page/installmentRegister.js?' + dirRand]
    },
    selectIdCard: {
        url: [jsDir + 'page/selectIdCard.js?' + dirRand]
    },
    checkIdCard: {
        url: [jsDir + 'page/checkIdCard.js?' + dirRand]
    },
    showIdCard: {
        url: [jsDir + 'page/showIdCard.js?' + dirRand]
    },
    selectFace: {
        url: [jsDir + 'page/selectFace.js?' + dirRand]
    },
    selectDebitCard: {
        url: [jsDir + 'page/selectDebitCard.js?' + dirRand]
    },
    setDebitCard: {
        url: [jsDir + 'page/setDebitCard.js?' + dirRand]
    },
    checkDebitCard: {
        url: [jsDir + 'page/checkDebitCard.js?' + dirRand]
    },
    showDebitCard: {
        url: [jsDir + 'page/showDebitCard.js?' + dirRand]
    },
    changeDebitCard: {
        url: [jsDir + 'page/changeDebitCard.js?' + dirRand]
    },
    //component
    backBar: {
        url: [jsDir + 'component/backBar.js?' + dirRand]
    }
};

//location.reload();

var allList =[];
for(var k in requireConfig) {
    allList.push(k);
}
var animateFrame = 50;

function isPc() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    if (userAgentInfo.indexOf("iPhone") > 0) {
        animateFrame = 30;
    }
    return flag;
}

var screenWidth = window.screen.availWidth;
var scale = 1;
var mainWrapStyle = {};
if (isPc()) {
    mainWrapStyle = {
        width: '320px',
        height: '640px',
        overflow: "hidden"
    };
    screenWidth = 320;
} else {
    scale = 320/screenWidth;
}

function requireCheck(arr, callback) {
    var loadUrl;
    var key;
    var aLen = arr.length;
    for(var k = 0; k < aLen;  k++){
        if (!requireConfig[arr[k]].loaded) {
            loadUrl = requireConfig[arr[k]].url;
            key = arr[k];
            break;
        }
    }
    if (loadUrl) {
        //console.log(loadUrl);
        require(loadUrl, function(){
            requireConfig[key].loaded = 1;
            for(var k = 0; k < aLen;  k++){
                if (!requireConfig[arr[k]].loaded) {
                    requireCheck(arr, callback);
                    return;
                }
            }
            //console.log('finish');
            callback();
        });
    } else {
        callback();
    }
}

var Route = React.createClass({
    getInitialState: function() {
        return {
            loaded: 0
        };
    },
    componentDidMount: function() {
        this.loadInit();
        var that = this;
        window.onhashchange = function(){
            that.link(window.location.href)
        };
    },
    loadInit: function () {
        let reqList = [];
        routeFrom ? reqList.push(routeFrom) : false;
        routeTo ? reqList.push(routeTo) : false;
        //console.log(reqList);
        requireCheck(reqList, this.init);
    },
    init: function() {
        ChildFrom = 0;
        ChildTo = 0;

        switch (routeFrom) {
            case 'about': ChildFrom = About; break;
            case 'home': ChildFrom = Home; break;
            case 'installmentRegister': ChildFrom = InstallmentRegister; break;
            case 'selectIdCard': ChildFrom = SelectIdCard; break;
            case 'checkIdCard': ChildFrom = CheckIdCard; break;
            case 'showIdCard': ChildFrom = ShowIdCard; break;
            case 'selectFace': ChildFrom = SelectFace; break;
            case 'selectDebitCard': ChildFrom = SelectDebitCard; break;
            case 'setDebitCard': ChildFrom = SetDebitCard; break;
            case 'checkDebitCard': ChildFrom = CheckDebitCard; break;
            case 'showDebitCard': ChildFrom = ShowDebitCard; break;
            case 'changeDebitCard': ChildFrom = ChangeDebitCard; break;
            default: ChildFrom = Home; break;
        }
        switch (routeTo) {
            case 'about': ChildTo = About; break;
            case 'home': ChildTo = Home; break;
            case 'installmentRegister': ChildTo = InstallmentRegister; break;
            case 'selectIdCard': ChildTo = SelectIdCard; break;
            case 'checkIdCard': ChildTo = CheckIdCard; break;
            case 'showIdCard': ChildTo = ShowIdCard; break;
            case 'selectFace': ChildTo = SelectFace; break;
            case 'selectDebitCard': ChildTo = SelectDebitCard; break;
            case 'setDebitCard': ChildTo = SetDebitCard; break;
            case 'checkDebitCard': ChildTo = CheckDebitCard; break;
            case 'showDebitCard': ChildTo = ShowDebitCard; break;
            case 'changeDebitCard': ChildTo = ChangeDebitCard; break;
        }
        //historyPage = showPage;
        if (ChildTo) {
            showPage = routeTo;
            this.animate();
        } else {
            showPage = routeFrom;
            this.setState({loaded: 1});
        }
    },
    animate: function () {
        var that = this;
        var fromStart, toStart, aData;
        if (aDrection) {
            fromStart = 0;
            toStart = -screenWidth;
            aData = vvGetAnimateData(0, screenWidth, animateFrame);
        } else {
            fromStart = 0;
            toStart = screenWidth;
            aData = vvGetAnimateData(0, -screenWidth, animateFrame);
        }
        var sTime = 0;
        var nTime = 0;
        var tSum  = 0;
        this.acNum = 0;
        this.fps = 100;
        this.fps = parseInt( 1000/this.fps, 10 );
        //this.fps = this.fps * scale;
        clearInterval(this.ev);
        that.animateFinish = 0;
        this.ev = setInterval(function(){
            //sTime = nTime || new Date().getTime();
            //nTime = new Date().getTime();
            //tSum += nTime - sTime;
            //if( tSum > that.fps ) {
                tSum -= that.fps;
                fromStart = aData[that.acNum];
                toStart = aData[that.acNum];
                if (aDrection) {
                    that.fromStyle = {
                        left: fromStart + 'px'
                    }
                    that.toStyle = {
                        left: -screenWidth + toStart + 'px'
                    }
                } else {
                    that.fromStyle = {
                        left: fromStart + 'px'
                    }
                    that.toStyle = {
                        left: screenWidth + toStart + 'px'
                    }
                }
                if (that.acNum >= aData.length) {
                    clearInterval(that.ev);
                    that.animateFinish = 1;
                }
                that.setState({loaded: 1});
                that.acNum ++;
            //}
        }, 10);
    },
    link: function (url) {
        //console.log(url)
        clearInterval(this.ev);
        var route = url.split("#");
        routeFrom = route[1];
        routeTo = route[2];
        aDrection = route[3];
        //showPage = routeFrom;
        //historyPage = routeTo;
        this.loadInit();
        historyLocation = nowLocation;
        nowLocation = url;
    },
    render () {
        //console.log(ChildTo);
        if (!this.state.loaded) {
            return (
                <div></div>
            );
        }
        if (!ChildTo) {
            return (
                <div ref="mainWrap" className="mainWrap" style={mainWrapStyle}>
                    <ChildFrom link={this.link}/>
                </div>
            );
        }
        if (this.animateFinish) {
            return (
                <div ref="mainWrap" className="mainWrap" style={mainWrapStyle}>
                    <ChildTo link={this.link} style={this.toStyle}/>
                </div>
            );
        }
        //console.log(routeTo);
        return (
            <div ref="mainWrap" className="mainWrap" style={mainWrapStyle}>
                <ChildFrom link={this.link} style={this.fromStyle}/>
                <ChildTo link={this.link} style={this.toStyle}/>
            </div>
        );
    }
});

var
    ChildFrom,
    ChildTo,
    routeFrom,
    routeTo,
    aDrection,
    defaultPage = 'home',
    historyPage = defaultPage,
    showPage = defaultPage,
    nowLocation,
    historyLocation;

function render () {
    var route = window.location.href.split("#");
    nowLocation = window.location.href;
    routeFrom = route[1] || defaultPage;
    routeTo = route[2];
    aDrection = route[3];
    //console.log(window.location.href)
    ReactDOM.render(<Route />, document.body);
}

render(); // render initially

requireCheck(allList, function(){});