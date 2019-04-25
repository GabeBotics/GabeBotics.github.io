
var vowels = ['a', 'e', 'o', 'u'];
var longVowels = ['ā', 'ē', 'ī','ō'];
var consonants = ['b', 'c', 'd', 'f', 'g', 'j', 'k', 'l', 'm', 'n', 'p', 'qu', 'q', 'r', 's', 't', 'v', 'w', 'y', 'z'];
var diphthongs = ['ae', 'āe', 'aē', 'āē', 'au', 'āu', 'eu', 'ēu', 'oe', 'ōe', 'oē', 'ōē'];

var output;
var finalOutput = '';

function Scan(){
	
	//consonant -> -
	//normal vowel -> /
	//long vowel -> *
	
	"use strict";
	finalOutput = '';
	
	var input = document.getElementById("input").value;
	
	output = input.toLowerCase();
	
	//remove every 'h'
	output = output.replace(/h/g, '');
	
	//represent each consonant as '-'
	for (var i = 0; i < consonants.length; i++){
		output = output.replace(new RegExp(consonants[i], 'g'), '-');
	}
	
	//represent x as '--'
	output = output.replace(/x/g, '--');
	
	//treat diphthongs as a long vowel
	for (i = 0; i < diphthongs.length; i++){
		output = output.replace(new RegExp(diphthongs[i], 'g'), '*');
	}
	
	//represent each normal vowel as '/'
	for (i = 0; i < vowels.length; i++){
		output = output.replace(new RegExp(vowels[i], 'g'), '/');
	}
	
	//treat 'i' before a vowel at the beginning of a word as a consonant
	output = output.replace(new RegExp(' i/', 'g'), ' -/');
	if(output.charAt(0) === 'i' && output.charAt(1) === '/'){
		output = output.replace('i/', '-/');
	}
	output = output.replace(/i/g, '/');
	
	//represent each long vowel as '*'
	for (i = 0; i < longVowels.length; i++){
		output = output.replace(new RegExp(longVowels[i], 'g'), '*');
	}
	
	//remove spaces
	output = output.replace(/ /g, '');
	
	var outputArray = output.split(/\n/);
	for (i = 0; i < outputArray.length; i++){
		WriteOutput(outputArray[i]);
		finalOutput += '<br />';
	}
	
	document.getElementById("output").innerHTML = finalOutput;
}

function WriteOutput(String){
		for (var i = 0; i < String.length; i++){
		//if letter is a vowel
		if (String.charAt(i) === '/' || String.charAt(i) === '*'){
			//long syllable case
			if (String.charAt(i) === '*'){
				finalOutput += '- ';
				}
			//if there are less than two characters after it
			else if (String.length - i <= 2){
				finalOutput += 'X ';
			}
			//long syllable case
			else if (String.charAt(i) === '/' && String.charAt(i+1) === '-' && String.charAt(i+2) === '-'){
				finalOutput += '- ';
			}
			//else it is a short syllabe
			else{
				finalOutput += 'U ';
			}
		}
	}
}
