var exec = require('child_process').exec;
var fs = require('fs');
var watchList = require('./watchConfig').watchList;

var execCode = process.argv[2] || 'route';

var fileDir = watchList[execCode];

// compileFunction
function compileEs6() {
	// logShow
	console.log( 'compileling es6 to es5 ');
	// commandExec
	exec( './node_modules/.bin/babel ' + fileDir.es6 + ' -o ' + fileDir.es5, { encoding: 'utf-8' }, function( error, stdout, stderr ) {
		if( error !== null ) {
			console.log( error );
			return;
		}
		// finish
		console.log( 'compile es6 to es5 finish');
		compileMixJs();
	} );
}

function compileMixJs() {
	// logShow
	console.log( 'compileling mixjs ');
	// commandExec
	exec( 'grunt ' + execCode, { encoding: 'utf-8' }, function( error, stdout, stderr ) {
		if( error !== null ) {
			console.log( error );
			return;
		}
		// finish
		console.log( 'mixjs finish');
	} );
}

// doCompile


console.log('watching file ...');
fs.watchFile( fileDir.es6, {
	persistent: true, 
	interval: 1000 // 1 sec
}, 
function( curr, prev ) {
	console.log('the file changed, compile ...');
	compileEs6();
});
	
