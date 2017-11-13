int cols,rows;
int scl = 20;
  int w = 1200; 
  int h = 900;
float[][]  terrain;
float flying = 0;
void setup(){
  size(600,600,P3D);

  cols = w/scl;
  rows = w/scl; 
  terrain = new float[cols][rows];
  
}



void draw(){
  
  flying -= 0.1;
  
  float yoffset = flying;
  for(int y = 0; y<rows;y++){
    float xoffset = 0;
    for(int x = 0; x<cols;x++){
      terrain[y][x] = map(noise(xoffset,yoffset),0,1,-100,100);
      xoffset += 0.1;
    }
    yoffset += 0.1;
  }
  
  
  background(0);
  stroke(255);
  noFill();
  
  translate(width/2,height/2);
  rotateX(PI/3);
  
  translate(-w/2,-h/2);
  for(int i = 0; i<rows-1;i++){
    beginShape(TRIANGLE_STRIP);
    for(int j = 0; j<cols;j++){
      vertex(j*scl,i*scl,terrain[i][j]);
      vertex(j*scl,(i+1)*scl,terrain[i+1][j]); 
    }
    endShape();
  }
  
}