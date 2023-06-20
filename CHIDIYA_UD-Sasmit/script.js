const cont1 = document.getElementById('container1');
const cont2 = document.getElementById('container2');
const cont3 = document.getElementById('container3');
const cont4 = document.getElementById('container4');
const cont5 = document.getElementById('container5');
const nop = document.getElementById('nop');
const img = document.getElementById('ques');
const p1 = document.getElementById('player1');
const p2 = document.getElementById('player2');
const p3 = document.getElementById('player3');
const p4 = document.getElementById('player4');
const p1t = document.getElementById('player1s');
const p2t = document.getElementById('player2s');
const p3t = document.getElementById('player3s');
const p4t = document.getElementById('player4s');
const p1w = document.getElementById('p1win');
const p2w = document.getElementById('p2win');
const p3w = document.getElementById('p3win');
const p4w = document.getElementById('p4win');
const p1k = document.getElementById('p1key');
const p2k = document.getElementById('p2key');
const p3k = document.getElementById('p3key');
const p4k = document.getElementById('p4key');
let p1s = document.getElementById('p1s');
let p2s = document.getElementById('p2s');
let p3s = document.getElementById('p3s');
let p4s = document.getElementById('p4s');
let p5s = document.getElementById('p5s');
let p6s = document.getElementById('p6s');
let p7s = document.getElementById('p7s');
let p8s = document.getElementById('p8s');
const nowin = document.getElementById('none');
let gamma=0;
let c=0;
let alpha=0;
let x=2;
let y,y1=-1;
let beta=0;
nop.addEventListener('change', function handlechange(event){
    x=(nop.options[nop.selectedIndex].value);
    initarr();
})
function change1()
{
    cont1.style.display = 'none';
    cont2.style.display = 'block';
}
function change2()
{
    cont1.style.display = 'none';
    cont5.style.display = 'none';
    cont2.style.display = 'none';
    cont3.style.display = 'flex';
    
    xyz= setInterval(convert, timefind());
    

}
let score = [0,0,0,0];
let a = [0,0,-1,-1];
let arrx = [0,0,-1,-1];
function initarr(){
if(x==2)
{
    p3k.style.display="none";
    p4k.style.display="none";
    p3t.style.display="none";
    p4t.style.display="none";
    a = [0,0,-1,-1];
    arrx = [0,0,-1,-1];
}
if(x==3)
{
    p4k.style.display="none";
    p3t.style.display="flex";
    p4t.style.display="none";
    a = [0,0,0,-1];
    arrx = [0,0,0,-1];
    p3k.style.display="block";
}
if(x==4)
{
    p3k.style.display="block";
    p4k.style.display="block";
    p3t.style.display="flex";
    p4t.style.display="flex";
    a = [0,0,0,0];
    arrx = [0,0,0,0];
}

}
function convert(){
// clearInterval(xyz)
if(alpha!=0)
check();
do{
    y = Math.floor(Math.random()*(29));}
    while(y1==y);
img.src= y +".png";
console.log("A");
window.addEventListener("keydown",(e)=>{
        if(e.key == 'q' && a[0]==0)
        a[0]=1;
        if(e.key == 'Q' && a[0]==0)
        a[0]=1;
        if(e.key == 'c' && a[1]==0)
        a[1]=1;
        if(e.key == 'C' && a[1]==0)
        a[1]=1;
        if(e.key == 'm' && a[2]==0)
        a[2]=1;
        if(e.key == 'M' && a[2]==0)
        a[2]=1;
        if(e.key == 'p' && a[3]==0)
        a[3]=1;
        if(e.key == 'P' && a[3]==0)
        a[3]=1;
    });
alpha++;
y1=y;
gamma++;
// xyz=setInterval(convert , timefind());
}


function check()
{
    if(x==2)
    {
        if(y>-1 && y<17)
        {
            if(a[0]==1)
            score[0]=score[0]+10;
            else score[0]=score[0]-5;
            if(a[1]==1)
            score[1]=score[1]+10;
            else score[1]=score[1]-5;
        }
        else
        {
            if(a[0]==0)
            score[0]=score[0]+10;
            else score[0]=score[0]-5;
            if(a[1]==0)
            score[1]=score[1]+10;
            else score[1]=score[1]-5;
        }
        a[0]=0;a[1]=0;
    }
    if(x==3)
    {
        if(y>-1 && y<17)
        {
            
            if(a[0]==1)
            score[0]=score[0]+10;
            else score[0]=score[0]-5;
            if(a[1]==1)
            score[1]=score[1]+10;
            else score[1]=score[1]-5;
            if(a[2]==1)
            score[2]=score[2]+10;
            else score[2]=score[2]-5;
        }
        else
        {
            if(a[0]==0)
            score[0]=score[0]+10;
            else score[0]=score[0]-5;
            if(a[1]==0)
            score[1]=score[1]+10;
            else score[1]=score[1]-5;
            if(a[2]==0)
            score[2]=score[2]+10;
            else score[2]=score[2]-5;
        }
        a[0]=0;a[1]=0;a[2]=0;
    }
    if(x==4)
    {
        if(y>-1 && y<17)
        {
            if(a[0]==1)
            score[0]=score[0]+10;
            else score[0]=score[0]-5;
            if(a[1]==1)
            score[1]=score[1]+10;
            else score[1]=score[1]-5;
            if(a[2]==1)
            score[2]=score[2]+10;
            else score[2]=score[2]-5;
            if(a[3]==1)
            score[3]=score[3]+10;
            else score[3]=score[3]-5;
        }
        else
        {
            if(a[0]==0)
            score[0]=score[0]+10;
            else score[0]=score[0]-5;
            if(a[1]==0)
            score[1]=score[1]+10;
            else score[1]=score[1]-5;
            if(a[2]==0)
            score[2]=score[2]+10;
            else score[2]=score[2]-5;
            if(a[3]==0)
            score[3]=score[3]+10;
            else score[3]=score[3]-5;
        }
        a[0]=0;a[1]=0;a[2]=0;a[3]=0;
    }
    for(let k=0;k<4;k++){
        if(score[k]>=150){
            // arrx[k]=a[k];
            cont3.style.display="none";
            clearInterval(xyz);
            cont4.style.display="flex";
            p5s.innerText=score[0];
            p6s.innerText=score[1];
            p7s.innerText=score[2];
            p8s.innerText=score[3];
            p1.style.display="flex";
            p2.style.display="flex";
            if(x>2)
            p3.style.display="flex";
            else
            p3.style.display="none";
            if(x>3)
            p4.style.display="flex";
            else
            p4.style.display="none";
        }
    }
    p1s.innerText=score[0];
    p2s.innerText=score[1];
    p3s.innerText=score[2];
    p4s.innerText=score[3];
    clearInterval(xyz);
    if(cont3.style.display == "flex")
    xyz = setInterval(convert , timefind());
}
function change4(){
    cont4.style.display ="none";
    // c=0;
    // for(let k=0;k<4;k++){
    //     if(a[k]==0)
    //     c++;
    // }
    // if(c==0)
    // {
    //     cont4.style.display = 'none';
    //     cont5.style.display = 'flex';
    //     nowin.style.display = 'block';

    // }
    // if(c==1)
    // {
    //     cont4.style.display = 'none';
    //     cont5.style.display = 'flex';
    //     if(a[0]==0)
    //     p1w.style.display = 'block';
    //     if(a[1]==0)
    //     p2w.style.display = 'block';
    //     if(a[2]==0)
    //     p3w.style.display = 'block';
    //     if(a[3]==0)
    //     p4w.style.display = 'block';
    // }
    // if(c==2 || c==3)
    // {
    //     // xyz = setInterval(convert , timefind());
    //     change2();
    // }
    cont4.style.display = 'none';
    cont5.style.display = 'flex';
    if (score[0]>score[1] && score[0]>score[2] && score[0]>score[3])
    p1w.style.display="block";
    else if (score[1]>score[0] && score[1]>score[2] && score[1]>score[3])
    p2w.style.display="block";
    else if (score[2]>score[1] && score[2]>score[0] && score[2]>score[3])
    p3w.style.display="block";
    else if (score[3]>score[1] && score[3]>score[2] && score[3]>score[0])
    p4w.style.display="block";
    else
    nowin.style.display="block";
}
function change5(){
    score = [0,0,0,0];
    p1s.innerHTML ="0";
    p2s.innerHTML ="0";
    p3s.innerHTML ="0";
    p4s.innerHTML ="0";
    if(x==2)
{
    a = [0,0,-1,-1];
    arrx = [0,0,-1,-1];
}
if(x==3)
{
    a = [0,0,0,-1];
    arrx = [0,0,0,-1];
}
if(x==4)
{
    a = [0,0,0,0];
    arrx = [0,0,0,0];
}
    img.src= "rsg.png";
    cont1.style.display='block';
    cont5.style.display='none';
    p1w.style.display = 'none';
    p2w.style.display = 'none';
    p3w.style.display = 'none';
    p4w.style.display = 'none';
    p1.style.display = 'none';
    p2.style.display = 'none';
    p3.style.display = 'none';
    p4.style.display = 'none';
    nowin.style.display = 'none';
    gamma=0;
    alpha=0;
}
function timefind(){
    if (gamma<5)
    return 2000;
    else if (gamma<10)
    return 1750;
    else if(gamma<15)
    return 1500;
    else if(gamma<20)
    return 1250;
    else if(gamma<25)
    return 1000;
    else
    return 750;
}
function back()
{
    cont2.style.display="none";
    cont1.style.display="block";
}