let drizzleX = [61,259,116,133,351,189,394,14,153,282,8,199,162,227,297,195,283,218,90,262]; 
let drizzleY = [0,-20,-40,-60,-80,-100,-120,-140,-160,-180,-200,-220,-240,-260,-280,-300,-320,-340,-360,-380];
let flout = [[true, 40, 40],[true, 360, 60]];
let alph = 255;
let x = 200;
let y = -20;
let num = 0;
let score = 0;
let speed = 1;
let start = true;
let drops = [[ 100,  200,  300],[-100, -300, -200]];
let final = [[ "red", "green"],["Oh no! You lost with a score of ", "Congrats! You won with a score of "]]; 
let sky = [['#87CEEB','#FFE042','#FF0000',"collect the sunbeams!"],['#395877','#92BAD2','#FFD968',"collect the raindrops!"]]; 
let screen = 1;
function setup() {
  createCanvas(400, 400);
  noStroke();
  textSize(50);
}
function draw() {
  if (start == true) {
    screen1();
  }else if (num == 30) {
    textSize(50);
    fill(255);
    background(final[0][int(score/16)]);
    text(final[1][int(score/16)] + score + "! Click to play again", 20, 20, 400, 400);
    screen = 3;
  }else{
    screen2();
  }
}

function mouseClicked () {
  if((start == true)&&(mouseX > width/2))
    temp = 0;
  if((start == true)&&(mouseX < width/2))
    temp = 1;
  start = false;
  if ((screen == 3)&&(start == false)){
    start = true;
    reset();
  }
}
function screen1 () {
  background(sky[0][0]);
  sun(400);
  fill(sky[1][0]);
  rect(0, 0, width/2, height);
  rain(170);
  fill(80);
  text("rain", 60, 200, 400, 400);
  fill(0);
  text("or", 172, 200, 400, 400);
  textSize(30);
  text("click a side to start", 80, 250, 400, 400);
  textSize(50);
  fill('#DFC022');
  text("sun?", 250, 200, 400, 400);
}
function screen2 () {
  textSize(30);
  background(sky[temp][0]);
  fill(sky[temp][2]);
  text(sky[temp][3], 20, 200, 400, 400);
  fill(0, 0, 0, alph-=0.75);
  textSize(15);
  text('keep the mouse on the catcher to begin collecting', 23, 230, 400, 400);
  if (temp == 1)
    rain(width);
  else
    sun(200);
}
function rain (num) {
  drizzle(num);
  rainClouds(255);
  if(start == false) {
    createDrop(0.3);
    createCatcher();
  }else
    raindrop();
  rainClouds(84);
}
function sun (x) {
  fill('#DFC022');
  ellipse(x, 0, 400, 120);
  fill('rgba(223, 192, 34, 0.25)');
  ellipse(x, 0, 420, 140);
  ellipse(x, 0, 460, 180);
  ellipse(x, 0, 520, 240);
  sunClouds(0, 0.6, 0.15, 245);
  sunClouds(1, 0.4, 0.35, 255);
  if(start == false) {
    createDrop(0.3);
    createCatcher();
  }else
    raindrop();
  cloud(flout[0][1]%(width+160) - 120, flout[0][2], 255, 84);
  cloud(flout[1][1]%(width+160) - 120, flout[1][2], 255, 84);
}
function rainClouds (a) {
  if (start == false){
  cloud(290, 0, 80,a);
  cloud(220,10,100,a);
  cloud(270,40,120,a);
  cloud(200,40, 80,a);
  cloud(130,50,100,a);
  cloud(180,80,120,a);
  }
  cloud( 80, 0, 80,a);
  cloud( 10,10,100,a);
  cloud( 60,40,120,a);
}
function sunClouds (num, x, y, color) {
  if(flout[num][2]>75)
     flout[num][0] = true;
  if(flout[num][2]<25)
     flout[num][0] = false;
  if(flout[num][0])
    cloud((flout[num][1]+=x)%(width+160) - 120, flout[num][2]-=y, color, 255);
  else
    cloud((flout[num][1]+=x)%(width+160) - 120, flout[num][2]+=y, color, 255);
}
function cloud (x, y, color, a) {
  fill(color,color,color,a);
  ellipse(   x,10+y,60,50);
  ellipse(30+x,   y,60,50);
  ellipse(80+x,10+y,60,50);
  ellipse(20+x,30+y,60,50);
  ellipse(60+x,25+y,60,50);
}
function raindrop () {
  wrap(0);
  ellipse(drops[0][0], drops[1][0]+=0.5, 20, 20);
  wrap(1);
  ellipse(drops[0][1]-=0.25, drops[1][1]+=0.55, 20, 20);
  wrap(2);
  ellipse(drops[0][2]+=0.25, drops[1][2]+=0.6, 20, 20);
}
function wrap (num) {
  if (drops[1][num] > height){
      drops[1][num] = -40;
      drops[0][num] = random(20, width - 20);
  }
  if (drops[0][num] > width/2)
      fill(sky[0][1]);
  else
      fill(sky[1][1]);
  
  if (drops[0][num] < 0)
      drops[0][num] = width;
  else if (drops[0][num] > width)
      drops[0][num] = 0;
}
function createDrop (inc){
  fill(sky[temp][1]);
  ellipse(x, y+=speed, 20, 20);
  if ((((x>mouseX-20)&&(x<mouseX+20))&&((y>mouseY-20)&&(y<mouseY+20)))&&(y>300)){
    y = height + 100;
    score++;
  }
  if (y > height){
    y = -40;
    speed+=inc;
    x = random(20, width - 20);
    num++;
  }
}
function createCatcher () {
  fill(sky[temp][2]);
  if(mouseY < 300)
    rect(mouseX-20, 300-20, 40, 40);
  else
    rect(mouseX-20, mouseY-20, 40, 40);
}
function drizzle (lim) {
  for(let i = 0; i < 20; i++){
    if(drizzleX[i] >= lim)
      drizzleX[i] = random(lim);
    stroke(120);
    line(drizzleX[i] += 4, drizzleY[i] += 6, (drizzleX[i] += 4)+20, (drizzleY[i] += 6)+30);
    if (drizzleY[i] > height)
      drizzleY[i] = -10;
  }
  noStroke();
}
function reset () {
  drizzleX = [61,259,116,133,351,189,394,14,153,282,8,199,162,227,297,195,283,218,90,262];
  drizzleY =[0,-20,-40,-60,-80,-100,-120,-140,-160,-180,-200,-220,-240,-260,-280,-300,-320,-340,-360,-380];
  flout = [[true, 40, 40],[true, 360, 60]];
  alph = 255;
  x = 200;
  y = -20;
  num = 0;
  score = 0;
  speed = 1;
  start = true;
  drops = [[ 100,  200,  300],[-100, -300, -200]];
  screen = 1;
}
