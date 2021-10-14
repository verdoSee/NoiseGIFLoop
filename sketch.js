const R = 2;
const r = 0.5;
let phi = 0;
const phiSpeed = 0.01;
let slide = 0;
let canvas;

function setup() {
	let p5Canvas = createCanvas(800, 800);

	canvas = p5Canvas.canvas;

	slide = createSlider(0, 10, 0, 0);
}

function getPos(theta, noiseMax) {
	const xoff = (R + r * cos(theta)) * cos(phi) * noiseMax;
	const zoff = (R + r * cos(theta)) * sin(phi) * noiseMax;
	const yoff = r * sin(theta) * noiseMax;
	var range = map(noise(xoff + 999, yoff + 999, zoff + 999), 0, 1, 10, 200);
	let x = range * cos(theta);
	let y = range * sin(theta);
	return [x, y];
}

function draw() {
	//capturer.start();
	background(0);
	let noiseMax = slide.value();
	translate(width / 2, height / 2);

	push();
	noFill();
	strokeWeight(1.5);
	beginShape();

	for (let theta = 0; theta < 2 * PI; theta += radians(1)) {
		const [x, y] = getPos(theta, noiseMax);
		stroke(255);
		vertex(x, y);
	}

	endShape(CLOSE);
	pop();
	//end main shape

	const [ellipseX, ellipseY] = getPos(radians(frameCount), noiseMax);
	//ellipse
	push();
	fill(255);
	ellipse(ellipseX, ellipseY, 13, 13);
	pop();

	phi += phiSpeed;

	if (phi >= TWO_PI) {
		phi = 0; //debugging
		console.log("REAPEAT");
		//capturer.stop();
		//capturer.save();
	}

	noStroke();
	fill(255);
	//rect(0, height - 10, (phi / TWO_PI) * width, 5);
	//capturer.capture(canvas);
}
