<?php
namespace route
{
	function getRoute() {
		global $commandList;
		$queryString = $_SERVER['QUERY_STRING'];
		if ($queryString || isset($_POST['c'])) {
			$command = \route\getParam("c");
			$action = \route\getParam("a");
			// param route check
			if (empty($action) || empty($command)) {
				echo "wrong route";
				exit();
			}
			// commandList check
			if (!$commandList[$command] || !in_array($action, $commandList[$command])) {
				echo "can not find in commandList";
				exit();
			}
			include(PATH."control/" . $command . ".php");
			call_user_func_array("\\$command\\$action", array()); 
		} else {
			// show index page
		}
	}

	function getParam($name) {
		$ret = null;
		if (isset($_GET[$name])) {
			$ret = $_GET[$name];
		}
		if (isset($_POST[$name])) {
			$ret = $_POST[$name];
		}
		return $ret;
	}
}
?>
