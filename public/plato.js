// Plato by Jay Harel

// Set the stage for calculating and drawing the plates
function prepPlates(weight) {
	var bar = 45; // Todo: get from settings
	var availablePlates = new Map(); // Todo: get from settings
	availablePlates.set(45, 8); // Weight, number of plates available at that weight
	availablePlates.set(35, 1);
	availablePlates.set(25, 1);
	availablePlates.set(10, 2);
	availablePlates.set(5, 1);
	availablePlates.set(2.5, 1);
	availablePlates.set(1.25, 1); 

	var displayedPlates = new Map();
	displayedPlates.set(45,   ["p45h","p45g","p45f","p45e","p45d","p45c","p45b","p45a"]);
	displayedPlates.set(35,   ["p35"]);
	displayedPlates.set(25,   ["p25"]);
	displayedPlates.set(10,   ["p10b","p10a"]);
	displayedPlates.set(5,    ["p5"]);
	displayedPlates.set(2.5,  ["p2_5"]);
	displayedPlates.set(1.25, ["p1_25"]);
	
	weight -= bar;
	weight /= 2; // find plates per side

	calcPlate(weight, weight, availablePlates, displayedPlates);
}


// Get a displayed plate id for a given weight (if one is available)
function getDisplayedPlate(plates, weight) {
	if(plates.has(weight)) {
		var ret = plates.get(weight).pop();
		if(ret != null) {
			return ret;
		}
		else {
			console.log("Out of "+weight+" lb plates!");
			return null;
		}
	}
}

// Calculate the next plate and call the anumation function
function calcPlate(totalWeight, remainingWeight, availablePlates, displayedPlates) {
	var nextPlate = 0;
	var plateToDisplay;
	// find the heaviest plate that is not lighter or eaqual to the remaining weight
	availablePlates.forEach( (value, key, availablePlates) => {
		if(key >= nextPlate && key <= remainingWeight) { 
			nextPlate = key;
		}
	});
	// Animate the next plate
	plateToDisplay = getDisplayedPlate(displayedPlates, nextPlate);
	if(plateToDisplay != null) {
		remainingWeight -= nextPlate;
		animatePlate(plateToDisplay, 300, 0, calcPlate, totalWeight, remainingWeight, availablePlates, displayedPlates);
	}
	else
		console.log("missing weight per side:", remainingWeight);
}

// Animate a plate for the given weight and call the calc function for the next plate
function animatePlate(plateID, startX, endX, calcNextPlate, totalWeight, remainingWeight, availablePlates, displayedPlates) {
	var elem = document.getElementById(plateID);   
	var pos = startX;
	var id = setInterval(frame, 1);
	var skip = 10;
	elem.style.visibility = "visible";
	function frame() {
		if(pos <= endX) {
			clearInterval(id);
			calcNextPlate(totalWeight, remainingWeight, availablePlates, displayedPlates); // animation is done so trigger next plate
		} else {
			pos -= skip; 
			elem.style.left = pos + 'px';
			elem.style.width = '20px';
			elem.style.border = '1px inset gray';
		}
	}
}


/*
// var plates = ["p45h","p45g"]; 
function placePlates() {
	var p = plates.pop();
	if(!p) return;
	movePlate(p, 300, 0, placePlates);
}

function movePlate(plateID, startX, endX, callback) {
	var elem = document.getElementById(plateID);   
	var pos = startX;
	var id = setInterval(frame, 1);
	var skip = 3;
	elem.style.visibility = "visible";
	function frame() {
		if(pos <= endX) {
			clearInterval(id);
			// animation is done so trigger next plate
			callback();
		} else {
			pos -= skip; 
			elem.style.left = pos + 'px'; 
		}
	}
}

*/
/*
var plates = new Array();
plates = ["p55","p45","p35","p25","p10","p5","p2_5","p1_25"];

function placePlates() {
	while(plates.length > 0) {
		var p = plates.pop();
    	movePlate(p, 0, 300);
		console.log(p);
    }
}

function movePlate(plateID, startX, endX) {
  var elem = document.getElementById(plateID);   
  var pos = startX;
  var id = setInterval(frame, 1);
  var skip = 3;
  elem.style.visibility = "visible";
  function frame() {
    if (pos >= endX) {
      clearInterval(id);
    } else {
		pos += skip; 
		elem.style.left = pos + 'px'; 
    }
  }
}
*/

/*
// Remove a plate of the given weight
function removePlate(plateWeight, availablePlates) {
	if(availablePlates.has(plateWeight)) {
		var platesLeft = availablePlates.get(plateWeight);
		if(platesLeft == 1) // If there's only one plate left in this weight
			availablePlates.delete(plateWeight); // Delete this plate weight
		else
			availablePlates.set(plateWeight, platesLeft-1); // Decrement the number of plates left
	}
}
*/