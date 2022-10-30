song1 = "";
song2 = "";
leftx = 0;
lefty = 0;
rightx = 0;
righty = 0;
LeftHandScore = 0;
RightHandScore = 0;
song1playing = "";
song2playing = "";

function preload() {
    song1 = loadSound("1.mp3");
    song2 = loadSound("09 09.mp3");
}
function setup() {
    canvas = createCanvas(400, 400);
    canvas.center();
    canvas.position(515, 250);
    cam = createCapture(VIDEO);
    cam.hide();
    posenet = ml5.poseNet(cam, modelLoaded);
    posenet.on('pose', gotposes);
}
function draw() {
    image(cam, 0, 0, 400, 400);
    stroke("red");
    song1playing = song1.isPlaying();
    song2playing = song2.isPlaying();
    if (RightHandScore > 0.2) {
        circle(rightx, righty, 50);
        song1.stop();
        if (song2playing == false) {
            song2.play();
            document.getElementById("song").innerHTML = "09 09";
        }
    }
    if (LeftHandScore > 0.2) {
        circle(leftx, lefty, 50);
        song2.stop();
        if (song1playing == false) {
            song1.play();
            document.getElementById("song").innerHTML = "Harry Potter";
        }
    }
}

function modelLoaded() {
    console.log("model is loaded");
}
function gotposes(results) {
    if (results.length) {
        leftx = results[0].pose.leftWrist.x;
        LeftHandScore = results[0].pose.keypoints[9].score;
        lefty = results[0].pose.leftWrist.y;
        rigthx = results[0].pose.rightWrist.x;
        rigthy = results[0].pose.rightWrist.y;
        RightHandScore = results[0].pose.keypoints[10].score;
        console.log("left hand score = " + LeftHandScore);
        console.log("right hand score  = " + RightHandScore);
    }
}