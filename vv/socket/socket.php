<?php

$socket = new webSocket('10.100.63.153',8080);

class webSocket{

	public $sockets;
	public $users;
	public $master;
	
	public function __construct($address, $port){
		$this -> master = $this -> WebSocket($address, $port);
		$this -> sockets = array('socket' => $this -> master);
		$this -> run();
	}
	
	function run(){
		while(true){	
			$sockets = $this -> sockets;
			$write = NULL;
			$except = NULL;
			socket_select($sockets ,$write ,$except ,NULL);
			foreach($sockets as $sock){
				if($sock == $this -> master){
					$client = socket_accept($this -> master);
					$this -> sockets[] = $client;
					$this -> users[] = array(
						'socket' => $client,
						'handShake' => false
					);
				}else{
					$len = socket_recv($sock ,$buffer ,2048 ,0);
					$k = $this -> search($sock);
					if($len < 7){
						$this -> close($sock);
						continue;
					}
					if(!$this -> users[$k]['handShake']){
						$this -> handShake($k,$buffer);
					}else{
						$buffer = $this -> uncode($buffer);
						$this -> send($k,$buffer);
					}
				}
			}
		}
	}
	
	function close($sock){
		$k = array_search($sock, $this->sockets);
		socket_close($sock);
		unset($this -> sockets[$k]);
		unset($this -> users[$k]);
		$this -> e("key:$k close");
	}
	
	function search($sock){
		foreach($this -> users as $k => $v){
			if($sock == $v['socket'])
			return $k;
		}
		return false;
	}
	
	function WebSocket($address,$port){
		$server = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
		socket_set_option($server, SOL_SOCKET, SO_REUSEADDR, 1);
		socket_bind($server, $address, $port);
		socket_listen($server);
		$this -> e('Server Started : '.date('Y-m-d H:i:s'));
		$this -> e('Listening on   : '.$address.' port '.$port);
		return $server;
	}
	
	function handShake($k,$buffer){
		$buf  = substr($buffer,strpos($buffer,'Sec-WebSocket-Key:')+18);
		$key  = trim(substr($buf,0,strpos($buf,"\r\n")));
		$new_key = base64_encode(sha1($key."258EAFA5-E914-47DA-95CA-C5AB0DC85B11",true));
		$new_message = "HTTP/1.1 101 Switching Protocols\r\n";
		$new_message .= "Upgrade: websocket\r\n";
		$new_message .= "Sec-WebSocket-Version: 13\r\n";
		$new_message .= "Connection: Upgrade\r\n";
		$new_message .= "Sec-WebSocket-Accept: " . $new_key . "\r\n\r\n";
		socket_write($this->users[$k]['socket'],$new_message,strlen($new_message));
		$this->users[$k]['handShake']=true;
		return true;
	}
	
	function uncode($str){
		$mask = array();  
		$data = '';  
		$msg = unpack('H*',$str);  
		$head = substr($msg[1],0,2);  
		if (hexdec($head{1}) === 8) {  
			$data = false;  
		}else if (hexdec($head{1}) === 1){  
			$mask[] = hexdec(substr($msg[1],4,2));  
			$mask[] = hexdec(substr($msg[1],6,2));  
			$mask[] = hexdec(substr($msg[1],8,2));  
			$mask[] = hexdec(substr($msg[1],10,2));  
		  
			$s = 12;  
			$e = strlen($msg[1])-2;  
			$n = 0;  
			for ($i=$s; $i<= $e; $i+= 2) {  
				$data .= chr($mask[$n%4]^hexdec(substr($msg[1],$i,2)));  
				$n++;  
			}  
		}  
		return $data;
	}
	
	function code($msg){
		$msg = preg_replace(array('/\r$/','/\n$/','/\r\n$/',), '', $msg);
		$frame = array();  
		$frame[0] = '81';  
		$len = strlen($msg);  
		$frame[1] = $len<16?'0'.dechex($len):dechex($len);  
		$frame[2] = $this->ord_hex($msg);  
		$data = implode('',$frame);  
		return pack("H*", $data);  
	}
	
	function ord_hex($data)  {  
		$msg = '';  
		$l = strlen($data);  
		for ($i= 0; $i<$l; $i++) {  
			$msg .= dechex(ord($data{$i}));  
		}  
		return $msg;  
	}
	
	function send($k,$msg){
		// echo $msg;
		$request = json_decode($msg,true);
		$command = $request["command"];
		$action = $request["action"];
		if(!defined('PATH')) define('PATH',dirname(__FILE__));
		if($command){
			include_once(PATH."\\controller\\".$command.".php");
			eval("\$class = new w_$command(\$request);");
			eval("\$callback = \$class->$action(\$request);");
			$msg = $this -> code($callback);
			$self = 1;
			$this -> sendTo($k,$msg,$self);
		}
	}
	
	function sendTo($k,$str,$key='all'){
		$key = 'all';
		if($key == 'all'){
			foreach($this->users as $v){
				socket_write($v['socket'],$str,strlen($str));
			}
		}else{
			socket_write($this->users[$k]['socket'],$str,strlen($str));	
		}
	}
	
	function e($str){
		$path=dirname(__FILE__).'/log.txt';
		$str=$str."\n";
		error_log($str,3,$path);
		echo iconv('utf-8','gbk//IGNORE',$str);
	}
	
}
?>