function makePattern(syll){
	var array = [];

	for(var i = 1; i < syll + 1; i++){
		array.push(i);
	}

	var total = 0;
	var string = '';
	var randomIndex;

	while(total < syll){
		randomIndex = Math.floor(Math.random() * array.length);
		total += array[randomIndex];
		string += array[randomIndex];
		array.splice(syll-total);
	}
	return string;
}

function haikuPattern(){
	var string = "";
	string += makePattern(5) + ',' 
			+ makePattern(7) + ","
			+ makePattern(5);
	return string;
}

module.exports = haikuPattern;