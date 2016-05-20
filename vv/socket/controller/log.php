<?php

//后台主页类
class w_log {

	//初始化
	function __construct($request){
		
	}
	
	//登陆
	function showLog($request){
		$backArr = array();
		$backArr["command"] = $request["command"];
		$backArr["action"] = $request["action"];
		$backArr["logContent"] = $request["logContent"];
		// echo json_encode($backArr);
		return json_encode($backArr);
	}
	
}

?>
