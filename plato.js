var plates = new Array();
//plates = ["p55","p45","p35","p25"];
plates = ["p55","p45","p35","p25","p10","p5","p2_5","p1_25"];

function placePlates() {
  // places the next plate and waits until animation is done before triggering next plate 
  var p = plates.pop();
  if(!p) return;
  movePlate(p, 0, 300, placePlates);
  console.log(p); 
}

function movePlate(plateID, startX, endX, callback) {
  var elem = document.getElementById(plateID);   
  var pos = startX;
  var id = setInterval(frame, 1);
  var skip = 3;
  elem.style.visibility = "visible";
  function frame() {
    if (pos >= endX) {
      clearInterval(id);
      // animation is done so trigger next plate
      callback();
    } else {
		pos += skip; 
		elem.style.left = pos + 'px'; 
    }
  }
}


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
