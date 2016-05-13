<?php
namespace freeForm
{
	
	function save () {
		$data = json_decode(\route\getParam("data"), true);
		$parent = $data["parent"];
		$children = $data["children"];
		include(PATH."src/fileSys.php");
		checkDir();
		$attrNameArr = array(
			'id',
			'class',
			'name',
			'frame',
			'readonly',
			'type',
			'placeholder'
		);
		$styleNameArr = array(
			'width',
			'height',
			'top',
			'left',
			'position',
			'background-color',
			'resize',
			'right',
			'bottom',
			'font-size',
			'color',
			'z-index',
			'cursor',
			'border-left',
			'border-right',
			'border-top',
			'border-bottom',
			'padding-left',
			'padding-right',
			'padding-top',
			'padding-bottom',
			'margin-left',
			'margin-right',
			'margin-top',
			'margin-bottom',
			'line-height',
			'text-align',
			'background-image',
			'background-repeat',
			'border-radius',
			'display',
			'background-size',
			'pointer-events',
			'overflow',
			'opacity',
			'filter'
		);
		createCss($parent, $children, $styleNameArr);
		createHtml($children, $attrNameArr);
		print('{"save": "success"}');
	}
	
	function createCss ($parent, $children, $styleNameArr) {
		$css = '';
		// parent css
		$id = $parent['2'][0];
		$css .= '#' . $id . " {\n";
		// default position init
		if (!isset($parent['1']['4'])) {
			$css .= "\t" . 'position: absolute;' ."\n";
		}
		foreach ($parent['1'] as $k => $v) {
			if (!empty($v)) {
				if ($styleNameArr[$k] == 'left') {
					$css .= "\t" . $styleNameArr[$k] . ': 0px' . ";\n";
				}else{
					$css .= "\t" . $styleNameArr[$k] . ': ' . $v . ";\n";
				}
			}
		}
		$css .= "}\n";
		// children css
		if (count($children) > 0) {
			foreach ($children as $childKey => $child) {
				$id = $child['2'][0];
				$css .= '.' . $id . " {\n";
				// default position init
				if (!isset($child['1']['4'])) {
					$css .= "\t" . 'position: absolute;' ."\n";
				}
				foreach ($child['1'] as $k => $v) {
					if (!empty($v)) {
						$css .= "\t" . $styleNameArr[$k] . ': ' . $v . ";\n";
					}
				}
				$css .= "}\n";
			}
		}
		// write
		$cssDir = PATH."cache/css/src/freeForm.css";
		if (!\fileSys\sWritefile($cssDir, $css)) {
			exit("File: $cssDir can not be write!");
		}
	}
	
	function createHtml ($children, $attrNameArr) {
		$tplFile = PATH."view/freeForm/theme.html";
		$template = \fileSys\sReadfile($tplFile);
		$content = '';
		if (count($children) > 0) {
			foreach ($children as $childKey => $child) {
				$tagName = $child['0'];
				if (!empty($content)) {
					$content .= "\t\t\t";
				}
				switch ($child['0']) {
					case 'input':
						$content .= '<' . $tagName;
						foreach ($child['2'] as $k => $v) {
							if (!empty($v) && $attrNameArr[$k] != 'readonly') {
								if ($attrNameArr[$k] == 'class') {
									$content .= ' ' . $attrNameArr[$k] . '="' . $child['2'][0] . '"';
								} else {
									$content .= ' ' . $attrNameArr[$k] . '="' . $v . '"';
								}
							}
						}
						if(!empty($child['4'])){
							$content .= ' ' . 'value="' . $child['4'] . '"';
						}
						$content .= ">\n";
					break;
					case 'select':
					case 'div':
					case 'textarea':
						$content .= '<' . $tagName;
						foreach ($child['2'] as $k => $v) {
							if (!empty($v) && $attrNameArr[$k] != 'readonly') {
								if ($attrNameArr[$k] == 'class') {
									$content .= ' ' . $attrNameArr[$k] . '="' . $child['2'][0] . '"';
								} else {
									$content .= ' ' . $attrNameArr[$k] . '="' . $v . '"';
								}
							}
						}
						if(!empty($child['4'])){
							$content .= ' ' . 'value="' . $child['4'] . '"';
						}
						$content .= '>';
						$content .= $child['3'];
						$content .= '</' . $tagName . '>' . "\n";
					break;
					default:
						$content .= '<' . $tagName;
						foreach ($child['2'] as $k => $v) {
							if (!empty($v) && $attrNameArr[$k] != 'readonly') {
								if ($attrNameArr[$k] == 'class') {
									$content .= ' ' . $attrNameArr[$k] . '="' . $child['2'][0] . '"';
								} else {
									$content .= ' ' . $attrNameArr[$k] . '="' . $v . '"';
								}
							}
						}
						if(!empty($child['4'])){
							$content .= ' ' . 'value="' . $child['4'] . '"';
						}
						$content .= '>';
						$content .= $child['3'];
						$content .= '</' . $tagName . '>' . "\n";
					break;
				}
			}
		}
		$template = str_replace('%content%', $content, $template);
		// write
		$htmlDir = PATH."cache/html/freeForm.html";
		if (!\fileSys\sWritefile($htmlDir, $template)) {
			exit("File: $htmlDir can not be write!");
		}
	}
	
	function checkDir () {
		$cacheDir = 'pc/cache';
		if (!is_dir($cacheDir)) {
			mkdir($cacheDir, 0777);
		}
		$checkList = array(
			'/html',
			'/css',
			'/css/com',
			'/css/src',
			'/js',
			'/js/ext',
			'/js/min'
		);
		foreach ($checkList as $k => $v) {
			if (!is_dir($cacheDir . $v)) {
				mkdir($cacheDir . $v, 0777);
			}
		}
	}
	
}
?>