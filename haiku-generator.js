//MODULES
//**************************************
//haiku generator
var getHaiku = require('./haiku');
//'dictionary' generator (word/syllable reference)
var createDictionary = require('./dictionary');


//A NOTE ABOUT PATTERNS
//**************************************
//user can input their own specific haiku pattern
//must be in format 122,232,122  5,7,5  etc. No spaces, commas to indicate line breaks.
//if user wants a random pattern generated, use "generate" (no quotes)
var pattern = process.argv[2];

//file to pull haiku from is OPTIONAL last argument, ex. book-text.txt, no ./ needed.
var file = process.argv[3];

//SO example syntax to run haiku generator is -
//node haiku-generator generate book-text.txt

var dictionary = createDictionary('./cmudict.txt', file);



console.log(getHaiku(pattern, dictionary, file));