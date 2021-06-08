img=""
status=""
object=[]
sound=""
function setup(){
    canvas=createCanvas(640,420);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    object_Detector=ml5.objectDetector('cocossd', modeloaded);
    document.getElementById("status").innerHTML="Status:Detecting Baby"
}

function preload(){
sound=loadSound("alarm_buzzer_experia.mp3")
}


function draw(){
image(video,0,0,640,420);
/*fill("#fa0000");
text("dog",45,75);
stroke("#fa0000")
noFill();
rect(30,60,450,350);

fill("#fa0000");
text("cat",320,120);
noFill();
stroke("#fa0000")
rect(300,90,270,320);
*/
if(status!=""){   
for(i=0; i<object.length; i++){
    if(object[i].label=="person"){
        document.getElementById("status").innerHTML="Status: Baby Detected";
fill("#fa0000");
percent=floor(object[i].confidence*100);
text(object[i].label+""+percent+"%",object[i].x,object[i].y);
noFill();
stroke("#fa0000");
rect(object[i].x,object[i].y,object[i].width,object[i].height);
    }
    else{
     document.getElementById("status").innerHTML="Status: Baby Not Found!";
     sound.play();
    }

}
}
}

function modeloaded(){
    console.log("Model has been loaded");
    status= true;
    object_Detector.detect(img , gotresult);
}

function gotresult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object=results;

}