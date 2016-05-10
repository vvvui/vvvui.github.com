var watchList = require('./watchConfig').watchList;
module.exports = function( grunt ) {
	
	var banner  = '/**\n';
		banner += '* ' + getNowDate() + '\n';
		banner += '* @yifenqi@creditease.cn\n';
		banner += '* @site http://www.yifenqi.com\n';
		banner += '*/\n';
	
	function getNowDate() {
		var date = new Date();
		var str = date.getFullYear() + "-" + formartZero( date.getMonth() + 1 ) + "-" + formartZero( date.getDate() );
		return str;
	}
	
	function formartZero( num ) {
		var num = parseInt( num );
		var str = num < 10 ? "0" + num : num;
		return str;
	}
	
	var confObj = {};
	
	confObj.uglify = {
		options: {
			banner: banner
		},
		buildRoot: {
			options: {
				preserveComments: false
			},
			files: [{
				expand: true,
				cwd: 'js/es5', //  目录下
				src: '*.js', // 所有js文件
				dest: 'js/build/' //输出到此目录下
			}]
		},
		buildPage: {
			options: {
				preserveComments: false
			},
			files: [{
				expand: true,
				cwd: 'js/es5/page', //  目录下
				src: '*.js', // 所有js文件
				dest: 'js/build/page' //输出到此目录下
			}]
		},
		buildComponent: {
			options: {
				preserveComments: false
			},
			files: [{
				expand: true,
				cwd: 'js/es5/component', //  目录下
				src: '*.js', // 所有js文件
				dest: 'js/build/component' //输出到此目录下
			}]
		}
	};
	
	for(var key in watchList) {
		confObj.uglify[key] = {
			options: {
				// mangle : false, //不混淆变量名
				preserveComments : false // 清除注释 false-全部 all-保留 some-保留部分
			},
			files: {
				 
			}
		}
		confObj.uglify[key].files[watchList[key].build] = [watchList[key].es5];
	}
	
	console.log(confObj.uglify.indexJs);
	
	// Project configuration.
	grunt.initConfig(confObj);
	
	// 加载任务插件。
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	// 默认被执行的任务列表。
	grunt.registerTask('default', ['uglify:buildRoot','uglify:buildPage','uglify:buildComponent']);
	
	for(var key in watchList) {
		console.log(key)
		grunt.registerTask(key, ['uglify:' + key]);
	}
	
};