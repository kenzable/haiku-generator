var fs = require('fs');

function formatData(file){
	//convert binary data to text string
	var data = fs.readFileSync(file).toString();

	//split text into array of lines
	var lines = data.toString().split("\n");

	//split each line to word and phoneme components
	lines = lines.map(function(line){
		var line = line.split("  ");

		//REMOVE the (num) found after some words 
		line[0] = line[0].replace(/\(\d+\)/, '')
		return line;
	});

	return lines;
}

function createDictionary(file, text){
	var wordRef = formatData(file);
	var dataStore;
	var buildFunc;
	
	if(text === undefined){
		dataStore = [];
		buildFunc = makeSyllableArray;
	} else {
		dataStore = {};
		buildFunc = makeWordsObject;
	}

	wordRef.forEach(function(line){
		var word = line[0];
		var phonemes = line[1];

		//catch digits, count the length of the resulting list to get sylable count
    	if(phonemes.match(/\d/g)){
    		var syllableCount = phonemes.match(/\d/g).length;
			dataStore = buildFunc(word, syllableCount, dataStore);
		}
	});

	return dataStore;
}

function makeWordsObject(word, syllableCount, object){
	var startLetter = word.charAt(0);

	//make or add to object corresponding to first letter 
	if(object[startLetter] === undefined){
		object[startLetter] = {};
	}
	object[startLetter][word] = syllableCount;
	return object;
}

function makeSyllableArray(word, syllableCount, array){
	//IF syllablesArray[i] is undefined, create new array at syllable index 
    if(array[syllableCount] === undefined){
    	array[syllableCount] = [];
    } 
    array[syllableCount].push(word);
    return array;
}

module.exports = createDictionary;