<?php
$_config = array(
	'common' => array(
		'debug'           => 1, // 调试状态 等于1为开启
		'hash'            => 'www.shifukanche.com', // 站点加密HASH
		'language'        => 'ch', // 语言选择  ch 简体中文
		'loginErrorMax'   => 5,    // 单日登陆错误尝试次数，不限制次数设置为 0
		'logSaveTime'     => 30,   // log保留天数
		'siteTitle'       => 'shifukanche',
		'siteKeyword'     => 'shifukanche',
		'siteDescription' => 'shifukanche'
	),
	'db' => array(
		'dbHost'    => '127.0.0.1',
		'dbPort'    => '3306',
		'dbUser'    => 'root',
		'dbPass'    => '',
		'dbType'    => 'mysql',
		'charset'   => 'utf8',
		'connect'   => 0, // 是否持续连接
		'dbName'    => 'test',
		'tablePre'  => ''
	),
	'cookie' => array(
		'cookiePre'    => 'shifukanche_', // COOKIE前缀
		'cookieDomain' => '',        // COOKIE作用域
		'cookiePath'   => '/',       // COOKIE作用路径
		'cookieTime'   => 3600 * 24  // COOKIE作用时间
	)
);
?>
