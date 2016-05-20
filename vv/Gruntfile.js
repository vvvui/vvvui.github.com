module.exports = function( grunt ) {
	
	var banner  = '/**\n';
		banner += '* ' + getNowDate() + '\n';
		banner += '* @cxj chengxiaojia@uuzuche.com\n';
		banner += '* @site http://www.uuzuche.com\n';
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
	
	// Project configuration.
	grunt.initConfig({
		uglify: {
			options: {
				banner: banner
			},
			buildvv: {
				options: {
					// mangle : false, //不混淆变量名
					preserveComments : false // 清除注释 false-全部 all-保留 some-保留部分
				},
				files: {
					'build/js/min/vvDateSelecter.min.js': [
						'source/js/com/vvCom.js',
						'source/js/com/jqExt.js',
						'source/js/com/vvAnimate.js',
						'source/js/src/vvSelecter.js',
						'source/js/src/vvDateSelecter.js'
					]
				}
			},
			buildvv1: {
				options: {
					// mangle : false, //不混淆变量名
					preserveComments : false // 清除注释 false-全部 all-保留 some-保留部分
				},
				files: {
					'build/js/min/vvDateSelecter.min.js': [
						'source/js/com/vvCom.js',
						'source/js/com/jqExt.js',
						'source/js/com/vvAnimate.js',
						'source/js/src/vvSelecter.js',
						'source/js/src/vvDateSelecter.js'
					]
				}
			},
			buildall: {// 按原文件结构压缩js文件夹内所有JS文件
				options: {
					preserveComments: false
				},
                files: [{
                    expand: true,
                    cwd: 'src', //  目录下
                    src: '**/*.js', // 所有js文件
                    dest: 'min/src' //输出到此目录下
                }]
            }
		},
		cssmin: {
			vvDateSelecter: {
				options: {
					// shorthandCompacting: false,
					// roundingPrecision: -1
				},
				files: {
					'build/css/min/vvDateSelecter.min.css': [
						'source/css/com/vvCom.css',
						'source/css/src/vvSelecter.css'
					]
				}
			},
			cssMinAll: {
				target: {
					files: [{
						expand: true,
						cwd: 'release/css',
						src: ['*.css', '!*.min.css'],
						dest: 'release/css',
						ext: '.min.css'
					}]
				}
			}
		}
	});
	
	// 加载任务插件。
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	// 默认被执行的任务列表。
	grunt.registerTask('default', ['uglify:buildvv']);
	
	grunt.registerTask('vvmin', ['uglify:buildvv']);
	grunt.registerTask('vvall', ['uglify:buildall']);
	grunt.registerTask('cssMin', ['cssmin:vvDateSelecter']);
	
};