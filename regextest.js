
var msgs = [
	"love 뜻 @jtjoo_bot",
	"@jtjoo_bot love 뜻",
	"love word 뜻 @jtjoo_bot"
];

let word = new RegExp(/([\w]+) 뜻/i);

for ( let m of msgs ) {
	console.log( word.exec( m )[1] );
}