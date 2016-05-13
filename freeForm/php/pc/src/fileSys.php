<?php
namespace fileSys
{
	
	// readFile
	function sReadFile ($filename) {
		$content = '';
		if (function_exists('file_get_contents')) {
			@$content = file_get_contents($filename);
		} else {
			if (@$fp = fopen($filename, 'r')) {
				@$content = fread($fp, filesize($filename));
				@fclose($fp);
			}
		}
		return $content;
	}

	// writeFile
	function sWriteFile($filename, $writetext, $openmod='w') {
		if (@$fp = fopen($filename, $openmod)) {
			flock($fp, 2);
			fwrite($fp, $writetext);
			fclose($fp);
			return true;
		} else {
			return false;
		}
	}
	
}
?>