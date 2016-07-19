//MODULES
//**************************************
var fs = require('fs');
var pat = require('./haiku-pattern');


//HAIKU-BUILDING FUNCTIONS
//**************************************

function getHaiku(pattern, dictionary, file) {
	if(pattern === 'generate'){
		pattern = pat.haikuPattern();

		if(file !== undefined){
			var haiku;
			var iterations = 0;
			while(textSearch(pattern, dictionary, file) === "No haiku found" && iterations < 100000){
				iterations++;
				pattern = pat.haikuPattern();
				haiku = textSearch(pattern, dictionary, file);
			}
			return haiku;
		}
	}

	if (file === undefined){
		return buildHaiku(pattern, dictionary, file);
	} else {
		return textSearch(pattern, dictionary, file); 
	}
}

function buildHaiku(pattern, wordList, file){
	pattern = pat.formatPattern(pattern);

	var haiku = [];
	var i = 0;
	var word;

	pattern.forEach(function(array){
		var line = [];
		array.forEach(function(num){
			if(file === undefined){
				word = randomPick(wordList[num]);
			} else {
				word = wordList[i];
			}

			line.push(word);
			i++;
		});
		haiku.push(line.join(' '));
	});

	return haiku.join('\n');
}

function randomPick(array){
	//get random element in array
	var random = array[Math.floor(Math.random() * array.length)];
	
	return random;
}


//FUNCTIONS SPECIFICALLY FOR TEXT-TO-HAIKU
//**************************************

function textSearch(pattern, dictionary, file){
	var text = formatText(file);
	var syllMatch = convertToSyllables(text, dictionary);

	var strPat = pattern.replace(/,/g, '');
	var regEx = new RegExp(strPat, "g");

	if(regEx.exec(syllMatch) === null){
		return "No haiku found";
	} else {
		regEx.lastIndex = 0;
		var matches = [], match, index;
		while((match = regEx.exec(syllMatch)) !== null) {
			index = match.index;
			var haiku = text.slice(index, (index + strPat.length));
			matches.push(haiku);
		}
		var chosen = randomPick(matches);
		return buildHaiku(pattern, chosen, file);
	}
}

function formatText(file){
	var text = fs.readFileSync("./" + file).toString();
	text = text.replace(/\s+/g, ' ').replace(/[^a-z ]+|^ | $/gi, '');
	text = text.split(/ +/);
	return text;
}

function convertToSyllables(textArray, dictionary){
	var syllMatch = '';

	for(var i = 0; i < textArray.length; i++){
		var word = textArray[i].toUpperCase();
		var firstLetter = word.charAt(0);
		if(dictionary[firstLetter][word] === undefined){
			syllMatch += 0;
		} else {
			syllMatch += dictionary[firstLetter][word];
		}
	}
	return syllMatch;
}


//EXPORTS
//**************************************
module.exports = getHaiku;
