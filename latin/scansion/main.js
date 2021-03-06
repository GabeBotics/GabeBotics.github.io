var vowels = ['a', 'e', 'o', 'u'];
var longVowels = ['ā', 'ē', 'ī', 'ō', 'ū'];
var consonants = ['b', 'c', 'd', 'f', 'g', 'j', 'k', 'l', 'n', 'p', 'qu', 'q', 'r', 's', 't', 'v', 'w', 'y', 'z'];
var diphthongs = ['ae', 'āe', 'aē', 'āē', 'au', 'āu', 'aū', 'āū', 'eu', 'ēu', 'eū', 'ēū', 'oe', 'ōe', 'oē', 'ōē'];

var output;
var finalOutput = '';

function Scan() {

	//consonant -> -
	//normal vowel -> /
	//long vowel -> *

	"use strict";
	finalOutput = '';

	var input = document.getElementById("input").value;

	output = input.toLowerCase();
	output = output.replace(/[.,?;:'!*/-]/g, '');

	//remove every 'h'
	output = output.replace(/h/g, '');

	//replace 'm' with '%'
	output = output.replace(/m/g, '%');

	//represent each consonant as '-'
	for (var i = 0; i < consonants.length; i++) {
		output = output.replace(new RegExp(consonants[i], 'g'), '-');
	}

	//represent x as '--'
	output = output.replace(/x/g, '--');

	//treat diphthongs as a long vowel
	for (i = 0; i < diphthongs.length; i++) {
		output = output.replace(new RegExp(diphthongs[i], 'g'), '*');
	}

	//represent each normal vowel as '/'
	for (i = 0; i < vowels.length; i++) {
		output = output.replace(new RegExp(vowels[i], 'g'), '/');
	}

	//treat 'i' before a vowel at the beginning of a word as a consonant
	output = output.replace(new RegExp(' i/', 'g'), ' -/');
	if (output.charAt(0) === 'i' && output.charAt(1) === '/') {
		output = output.replace('i/', '-/');
	}
	output = output.replace(/i/g, '/');

	//represent each long vowel as '*'
	for (i = 0; i < longVowels.length; i++) {
		output = output.replace(new RegExp(longVowels[i], 'g'), '*');
	}

	//fix elisions with 'm'
	output = output.replace(/\/% \//g, '/ /');
	output = output.replace(/\/% \*/g, '/ *');
	output = output.replace(/\*% \//g, '* /');
	output = output.replace(/\*% \*/g, '* *');
	output = output.replace(/%/g, '-');


	//fix elisions
	output = output.replace(/\/ \*/g, ' *');
	output = output.replace(/\* \//g, ' /');
	output = output.replace(/\/ \//g, ' /');
	output = output.replace(/\* \*/g, ' *');

	//remove spaces
	output = output.replace(/ /g, '');


	//check for any unrecognized characters
	for (i = 0; i < output.length; i++) {
		//if there is a character that is not / * or - then give an error
		if (output.charAt(i) != '/' && output.charAt(i) != '*' && output.charAt(i) != '-' && output.charAt(i) != '\n') {
			document.getElementById("output").innerHTML = 'Text could not be scanned! Did not recognize: ' + output.charAt(i) + '<br /> <br /> Try removing it and scanning again.';
			return;
		}
	}


	//prepare final output
	var outputArray = output.split(/\n/);
	for (i = 0; i < outputArray.length; i++) {
		WriteOutput(outputArray[i]);
		finalOutput += '<br />';
	}

	document.getElementById("output").innerHTML = finalOutput;
}

function WriteOutput(String) {
	for (var i = 0; i < String.length; i++) {
		//if letter is a vowel
		if (String.charAt(i) === '/' || String.charAt(i) === '*') {
			//long syllable case
			if (String.charAt(i) === '*') {
				finalOutput += '- ';
			}

			//if there is one character after it
			else if (String.length - i === 2) {
				if (String.charAt(i + 1) === '-') {
					finalOutput += 'X ';
				} else finalOutput += 'U ';
			}

			//if this is the last letter
			else if (String.length - i === 1) {
				finalOutput += 'X ';
			}

			//long syllable case
			else if (String.charAt(i) === '/' && String.charAt(i + 1) === '-' && String.charAt(i + 2) === '-') {
				finalOutput += '- ';
			}

			//else it is a short syllable
			else {
				finalOutput += 'U ';
			}
		}
	}
}
