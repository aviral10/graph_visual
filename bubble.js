class Bubble{
    constructor(x,y,r=20){
        this.x = x;
        this.y = y;
        this.r = r;
        this.connected = [];
        this.col = {
            r: 255,
            g: 255,
            b: 255,
            a: 800,
        }
        this.data = 0;

    }
    ddata(x1,y1,x2,y2,offset){
        textSize(20);
        fill(145,206,255);
        stroke(145,206,255);
        strokeWeight(1);
        textAlign(CENTER, CENTER);
        text(this.data, abs(x1+x2)/2-offset, abs(y1+y2)/2-offset);
    }
    dedge() {
        if(this.connected.length!=0)
        {
            for(let i=0;i<this.connected.length;i++){
                let posx = Math.floor(this.x);
                let posy = Math.floor(this.y);

                // let p1 = new Pipe(this.x,this.y, this.connected[i].x, this.connected[i].y)
                // p1.draw();
   
                strokeWeight(2);
                stroke(66,245,84);
                line(this.x,this.y, this.connected[i].x, this.connected[i].y);
                //this.ddata(this.x,this.y, this.connected[i].x, this.connected[i].y,-10);
                
                for(let j=0;j<this.connected[i].connected.length;j++){
                    if(posx == Math.floor(this.connected[i].connected[j].x) && posy == Math.floor(this.connected[i].connected[j].y)){

                        // let p1 = new Pipe(this.x,this.y, this.connected[i].x, this.connected[i].y, {r: 247,g:30,b:247})
                        // p1.draw();
                        strokeWeight(2);
                        stroke(247,30,247);
                        line(this.x,this.y, this.connected[i].x, this.connected[i].y);
                        //this.ddata(this.x,this.y, this.connected[i].x, this.connected[i].y, -10);
                        break;
                    }
                }
            }
        }
    }

    isInside(r=this.r){
        return dist(mouseX,mouseY,this.x,this.y) < r;
    }
    hoverr(){
        let cc = this.col;
        if(this.isInside())
        {
            this.col.r = 176;
            this.col.g = 255;
            this.col.b = 185;
            this.col.a = 800;
           
        }
        else{
            this.col.r = 255;
            this.col.g = 255;
            this.col.b = 255;
            this.col.a = 800;
         
        }
    }

    update(px,py){
        this.x = px;
        this.y = py;
    }

    draw(){
        fill(this.col.r,this.col.g,this.col.b,this.col.a);
        //stroke(255,0,221,100);
        stroke(145,206,255);
        strokeWeight(2);
        ellipse(this.x,this.y, 2*this.r);
        textSize(20);
        fill(145,206,255);
        stroke(145,206,255);
        strokeWeight(1);
        textAlign(CENTER, CENTER);
        text(this.data, this.x, this.y);
    }
  }
  