var fs = require('fs');
var haikuPattern = require('./haiku-pattern');

//GENERATE HAIKU

function createHaiku(pattern, dictionary, textFile) {
	if(pattern === undefined){
		pattern = haikuPattern();
	}

	if(textFile === undefined){
		return haikuFromDict(pattern, dictionary);
	} else {
		return haikuFromText(pattern, dictionary, textFile);
	}
}

function haikuFromText(pattern, dictionary, textFile){
	var text = formatText(textFile);

	var syllMatch = convertToSyllables(text, dictionary);
	var pattern = pattern.replace(/,/g, '');

	var regEx = new RegExp(pattern);
	var match = regEx.exec(syllMatch);

	var haiku = text.slice(match.index, (pattern.length + 1));

	return haiku.join(" ");
}

function haikuFromDict(pattern, dictionary){
	pattern = formatPattern(pattern);

	var haiku = [];

	pattern.forEach(function(array){
		var line = [];
		array.forEach(function(num){
			line.push(findWord(num, dictionary));
		});
		haiku.push(line.join(' '));
	});

	return haiku.join('\n');
}

function formatText(file){
	var text = fs.readFileSync(file).toString();
	text = text.replace(/\s+/g, ' ').replace(/[^a-z ]+|^ | $/gi, '');
	text = text.split(/ +/);
	return text;
}

function convertToSyllables(file, dictionary){
	var textArray = formatText(file);

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

function findWord(num, dictionary){
	//use number to find index of the words list with that syllable count
	var wordList = dictionary[num];

	//find length of word list, use it to generate random index number 
	var randomWord = wordList[Math.floor(Math.random() * wordList.length)];
	
	return randomWord;
}

function formatPattern(string){
	var array = string.split(',');
	array = array.map(function(nums){
		return nums.split('');
	});
	array.forEach(function(subArray, i, arr){
		arr[i] = subArray.map(function(num){
			return Number(num);
		});
	});
	return array;
}

module.exports = createHaiku;






