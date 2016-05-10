var
	// import
	exec = require( 'child_process').exec;
	
// compileFunction
function compileEs6() {
	// logShow
	console.log( 'compileling es6 to es5 ');
	// commandExec
	exec( './node_modules/.bin/babel js/es6 -d js/es5 ', { encoding: 'utf-8' }, function( error, stdout, stderr ) {
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
	exec( 'grunt', { encoding: 'utf-8' }, function( error, stdout, stderr ) {
		if( error !== null ) {
			console.log( error );
			return;
		}
		// finish
		console.log( 'mixjs finish');
	} );
}

// doCompile
compileEs6();

	