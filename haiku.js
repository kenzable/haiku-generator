var fs = require('fs');


//CREATE SYLLABLE REFERENCE ARRAY

function makeSyllablesArray(file){
	var lines = formatData(file);
	var syllablesArray = [];

	//split each line to word and phoneme components
	lines.forEach(function(line){
    	var lineSplit = line.split("  ");
    	var word = lineSplit[0];
    	var phonemes = lineSplit[1];

    	//do a string match on the phonemes to catch digits
		//count the length of the resulting list to get sylable count
    	if(phonemes.match(/\d/g)){
    		var syllableCount = phonemes.match(/\d/g).length;

    		//push word into syllablesArray at index matching sylable count
			//IF syllablesArray[i] is undefined, create new array with word in it at index, 
    		if(syllablesArray[syllableCount] === undefined){
    			syllablesArray[syllableCount] = [word];
    		} else {
    			syllablesArray[syllableCount].push(word);
    		}
    	}
    });
    return syllablesArray;
}

function formatData(file){
	//convert binary data to text string
	var data = fs.readFileSync(file).toString();

	//split text into array of lines
	return data.toString().split("\n");
}


//GENERATE HAIKU
function createHaiku(pattern, syllablesArray, text) {
	var haiku = [];

	pattern.forEach(function(array){
		var line = [];
		array.forEach(function(num){
			line.push(findWord(num, syllablesArray));
		});
		haiku.push(line.join(' '));
	});

	return haiku.join('\n');
}

function findWord(num, syllablesArray){
	//use number to find index of the words list with that syllable count
	var wordList = syllablesArray[num];

	//find length of word list, use it to generate random index number 
	var randomWord = wordList[Math.floor(Math.random() * wordList.length)];

	return randomWord;
}

module.exports = {createHaiku: createHaiku, makeSyllablesArray: makeSyllablesArray};






