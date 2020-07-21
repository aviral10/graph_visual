let arr = []
let npress = false;
let dpress = false;
let temp;
let baseSize = 20;
let yesdelete = false;
let isOn = false;
let storeprev = 0;
let inn = 0
let edges;
let typi = false;
let inp;
let onaBub;
let pipes;
function setup() {
  createCanvas(1200,600);
  background(255);
  reset();
  temp = new Bubble(0,0,baseSize+5);
  let button = createButton('Reset');
  button.mousePressed(reset); 
}
function reset(){
  arr = [];
  edges = new Map();
  pipes = [];
}

function draw() {

  background(255);
  if(npress)
  {
    temp.x = mouseX;
    temp.y = mouseY;
    temp.draw();  
  }
  if(dpress)
  {
     circle(mouseX,mouseY, 30);
     for(let i=0;i<arr.length;i++)
     {
      let posx = Math.floor(arr[i].x);
      let posy = Math.floor(arr[i].y);
       if(arr[i].isInside())
       {
         for(let j=0;j<arr.length;j++)
         {
           
           if(i!=j)
           {
             for(let k = 0;k<arr[j].connected.length;k++)
             {
              if((Math.floor(arr[j].connected[k].x) == posx) && (Math.floor(arr[j].connected[k].y) == posy))
              {
                
                  arr[j].connected.splice(k,1);
              }
            }
           }
         }
         arr.splice(i,1);
         break;
       }
     }
  }
  for(let i=0;i<arr.length;i++){
    arr[i].hoverr();
    arr[i].dedge();
    arr[i].draw();
  }

  
}

function findWeight(){

}


function getadj(){
  let adj = "";
  for(let i=0;i<arr.length;i++){
    s = "adj[" + arr[i].data + "] = {"
    let len = arr[i].connected.length;
    if(len!=0)
    {
      for(let j=0;j<len;j++){
        if(j != len-1){
          s+= "{" + arr[i].connected[j].data + "}" + ",";
        }
        else{
          s+= "{" + arr[i].connected[j].data + "}" + "}\n";
        }
      }
    }
    else{
      s = "adj[" + arr[i].data + "] = {}\n";
    }
    adj+=s;
  }
  console.log(adj)
}


function mousePressed(){
  if(!(mouseX>width || mouseY > height) && !typi){
    if(arr.length==0)
      arr.push(new Bubble(mouseX,mouseY,baseSize));
    else
    {
      isOn = false;
      let noteInd = 0;
      for(let i=0;i<arr.length;i++)
      {
        if(arr[i].isInside(2*arr[i].r) && dpress==false)
        {
          isOn = true;
          npress = !npress;
          yesdelete = !yesdelete;
          noteInd = i;
          if(npress){
            //console.log("ob at ind: ", i);
            storeprev = i;
          }
          else{
            noteInd = i;
            //to push index uncomment below
            //arr[storeprev].connected.push(noteInd);
            let present = false;
            let count = 0;
            for(let obb of arr[storeprev].connected){
              if( (Math.floor(arr[noteInd].x) == Math.floor(obb.x))&& (Math.floor(arr[noteInd].y) == Math.floor(obb.y))){
                present = true;
                for (let [key, value] of edges) {
                  let hold = value;
                  
                  let cc = 0
                  for(let inside of hold){
                    let rec = inside[0];
                    if((key == (arr[storeprev].data)) &&(rec == (arr[noteInd].data))){
                      //console.log("found at ind: ", cc);
                      hold.splice(cc,1);
                      break;
                    }
                    cc++;
                  }
                }
                arr[storeprev].connected.splice(count,1);
                break;
              }
              count++;
            }
            if(!present){
              arr[storeprev].connected.push(arr[noteInd]);
              let px1 = arr[storeprev].x;
              let py1 = arr[storeprev].y;
              let px2 = arr[noteInd].x;
              let py2 = arr[noteInd].y;
              let newborn =new Pipe(arr[storeprev].data, arr[noteInd].data, px1,py1,px2,py2);
              pipes.push(newborn);

              let check = edges.has(arr[storeprev].data)
              if(check){
                let weigh = 0;
                let hold = edges.get(arr[storeprev].data);
                hold.push([arr[noteInd].data, weigh]);
              }else{
                let weigh = 0;
                edges.set(arr[storeprev].data, [[arr[noteInd].data, weigh]]);
              }

            }else{
              console.log("Present");
            }
            storeprev = 0;
          }
          break;
        }
      }
      if(!isOn && !npress && dpress==false)
      {
        let newobj = new Bubble(mouseX,mouseY,baseSize);
        newobj.data = arr.length;
        arr.push(newobj);
      }
      

    }
  }
}
let update_data_index = 0;
function keyPressed(){
  if(keyIsDown(16) && keyIsDown(67)){
    console.log("KeyStroke: shift + c");
    npress = false;
  }
  if(keyIsDown(16) && keyIsDown(68)){
    console.log("KeyStroke: Shift + d");
    dpress = !dpress;
  }
  if(keyIsDown(16) && keyIsDown(65)){
    console.log("KeyStroke: shift + a");
    getadj();
  }
  if((keyIsDown(16) && keyIsDown(86)) ){
    onaBub = false;
    update_data_index = 0;
    for(let oo of arr){
      if(oo.isInside()){
        onaBub = true;
        
        break;
      }
      update_data_index++;
    }

    if(onaBub){
      typi = !typi
      if(typi){
        console.log("KeyStroke: Shift+v");
        inp = createInput();
        inp.position(mouseX,mouseY);
        inp.changed(newval);
      }
      if(typi == false){
        inp.remove();
      }
    }
  }
}

function newval(){
  
  arr[update_data_index].data = inp.value();
  console.log(inp.value());
  inp.remove();
  typi = false;
}