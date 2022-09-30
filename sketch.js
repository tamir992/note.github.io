// Your code will go here

// Open up your console - if everything loaded properly you should see the version number 
// corresponding to the latest version of ml5 printed to the console and in the p5.js canvas.
console.log('ml5 version:', ml5.version);

let model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
let pitch;
let audioContext;
let mic;
let freq = 0;
let amp;
let level;
let size;
let record;
let sound;
let recordCon = 0;
let recordLamp = 0;
let notes = [
  
  {note:'C1', freq: 32.70},
  {note:'D1', freq: 36.71},
   {note:'E1', freq: 41.20},
  {note:'F1', freq: 43.65},
   {note:'G1', freq: 49.00},
  {note:'A1', freq: 55.00},
   {note:'B1', freq: 61.74},
  {note:'C2', freq: 65.41},
   {note:'D2', freq: 73.42},
  {note:'E2', freq: 82.41},
   {note:'F2', freq: 87.31},
  {note:'G2', freq: 98.00},
   {note:'A2', freq: 110.00},
  {note:'B2', freq: 123.47},
   {note:'C3', freq: 130.81},
  {note:'D3', freq: 146.83},
   {note:'E3', freq: 164.81},
  {note:'F3', freq: 174.61},
   {note:'G3', freq: 196.00},
  {note:'A3', freq: 220.00},
   {note:'B3', freq: 246.94},
  {note:'C4', freq: 261.63},
   {note:'D4', freq: 293.66},
  {note:'E4', freq: 329.63},
   {note:'F4', freq: 349.23},
  {note:'G4', freq: 392.00},
   {note:'A4', freq: 440.00},
  {note:'B4', freq: 493.88},
   {note:'C5', freq: 523.25},
  {note:'D5', freq: 587.33},
   {note:'E5', freq: 659.25},
  {note:'F5', freq: 698.46},
   {note:'G5', freq: 783.99},
  {note:'A5', freq: 880.00},
   {note:'B5', freq: 987.77},
  {note:'C6', freq: 1046.50},
   {note:'D6', freq: 1174.66},
  {note:'E6', freq: 1318.51},
   {note:'F6', freq: 1396.91},
  {note:'G6', freq: 1567.98},
   {note:'A6', freq: 1760.00},
  {note:'B6', freq: 1975.53},
   {note:'C7', freq: 2093.00},
  {note:'D7', freq: 2349.32},
   {note:'E7', freq: 2637.02},
  {note:'F7', freq: 2793.83},
   {note:'G7', freq: 3135.96},
   {note:'A7', freq: 3520.00},
  {note:'B7', freq: 3951.07},
   {note:'C8', freq: 4186.01},
  {note:'D8', freq: 4698.63},
   {note:'E8', freq: 5274.04},
  {note:'F8', freq: 5587.65},
   {note:'G8', freq: 6271.93},
   {note:'A8', freq: 7040.00},
  {note:'B8', freq: 7902.13},
]



function setup(){
	createCanvas(400, 400);
	textSize(width / 3);
	textAlign(CENTER, CENTER);
    audioContext = getAudioContext();
    amp = new p5.Amplitude();
    mic = new p5.AudioIn();
    record = new p5.SoundRecorder();
    sound = new p5.SoundFile;
  
    record.setInput(mic);
    
    mic.start(listening);
    
}

function mouseClicked(){
    getAudioContext().resume();
  if (recordCon == 0 ){
    record.record(sound);
    recordLamp = 255;
    recordCon = 1;
  }else {
    if (recordCon == 1){
      record.stop(sound);
      recordLamp = 125;
      recordCon =2;
    }else{
      if (recordCon == 2){
        sound.play();
        recordLamp = 0;
        recordCon = 0;
      }
    }
  }
  

}


function listening(){
  console.log('listening');
  
  
  pitch = ml5.pitchDetection(
     model_url,
     audioContext,
     mic.stream,
     modelLoaded
    );
  
}

function gotPitch(error, frequency){
  if (error){
    console.error(error);
  }else{
    if (frequency){
      freq = frequency;
    }    pitch.getPitch(gotPitch);
  }
  }

function modelLoaded(){
  console.log('model loaded!');
  pitch.getPitch(gotPitch);
}

function draw(){
  background(0);
  level = mic.getLevel();
  size = map(level,0,1,10,400);
  fill(255,0,255);
  ellipse(width / 2, height-300, size, size);
  
  
  ///record lamp
  fill(recordLamp);
  ellipse(width-30, height-30, 20, 20);
  
  if (level > 0.07){
	
	textAlign(CENTER, CENTER);
    fill(255);
    textSize(64);
    text(freq.toFixed(0) + ' Hz', width/2, height/2);
  
  
    
   
  console.log(amp);
  console.log(level);
    
    
  
    let closeNote = -1;
    let recordDiff = 10;
    for (let i = 0; i < notes.length; i++){
      let diff = freq - notes[i].freq;
      if (abs(diff) < recordDiff){
        closeNote = notes[i];
        recordDiff = diff;
        
      }
    }
  
   let diff = recordDiff;
  
    textSize(32);
    fill(0,0,255);
    text(closeNote.note, width/2, height - 100);
    
  }
   
}
