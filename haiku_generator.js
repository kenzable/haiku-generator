var createHaiku = require('./haiku');
var createDictionary = require('./dictionary');

var text = process.argv[2];
var pattern = process.argv[3];


var dictionary = createDictionary('./cmudict.txt', text);

console.log(createHaiku(pattern, dictionary, text));