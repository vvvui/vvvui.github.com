var
	// import
	exec = require( 'child_process' ).exec,
    path = require( 'path' ),
    fs = require( 'fs' ),
	// dirInit
	lessDir = path.join( __dirname ),
	cssDir = path.join( __dirname, '..', 'css' ),
	// dataSet
	compileList = [
		{
			// freeForm
			inFile: path.join( lessDir, 'src', 'freeForm.less' ),
			outFile: path.join( cssDir, 'src', 'freeForm.css' )
		}
	],
	cLen = compileList.length,
	cId = 0;
	
// compileFunction
function compileLess( compileList, id ) {
	var
		inFile = compileList[ id ].inFile,
		outFile = compileList[ id ].outFile,
		cmd = [ 'lessc ', inFile, ' > ', outFile ].join('');
	// logShow
	console.log( 'compileling : ' + inFile );
	// commandExec
	exec( cmd, { encoding: 'utf-8' }, function( error, stdout, stderr ) {
		if( error !== null ) {
			console.log( error );
			return;
		}
		// loop
		cId ++;
		if( cId < cLen ) {
			compileLess( compileList, cId );
		}
	} );
}

// doCompile
compileLess( compileList, cId );

console.log('watching file ...');
fs.watchFile( compileList[0].inFile, {
	persistent: true, 
	interval: 1000 // 1 sec
}, 
function( curr, prev ) {
	console.log('the file changed, compile ...');
	cId = 0;
	compileLess( compileList, cId );
});
	