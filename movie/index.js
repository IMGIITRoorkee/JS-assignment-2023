
        const url = 'https://abir82-bollywood-recommendations.p.rapidapi.com/?year=2018&genre=Comedy';
        const options = {
	        method: 'GET',
	       headers: {
	         	'X-RapidAPI-Key': '3684e6db84msh42d5d977177dfcdp15ac51jsn2b864f074624',
	         	'X-RapidAPI-Host': 'abir82-bollywood-recommendations.p.rapidapi.com'
	}
};
let l={};
fetch(url,options).then((response)=>{
             if (!response.ok) {
           throw new Error(`HTTP error: ${response.status}`);
            }
        return  response.json();
             }).then((json)=>{
               l=json;
             });
             let b=[];
             let hino=0;
             let h=0;
             let hiden=[];
             let s="";
             let q=0;
             let x=0;
             fet(0);
             function fet(q){
                b=[];
                hino=0;
                h=0;
                hiden=[];
                s="";
                k="";
               document.getElementById('gameloss').style.display='none';
               document.getElementById('nextbtn').style.display='none';
             fetch(url,options).then((response)=>{
                         if (!response.ok) {
                       throw new Error(`HTTP error: ${response.status}`);
                        }
                    return  response.json();
                         }).then((json)=>{
                       console.log(json);
                       // json is  an array of objects
                        let c=(json.data[q]).Title;
                          console.log(c);
                    
                        let d=c.toUpperCase();
                        let a=['A','E','I','O','U'];
                         console.log(d.length);
                         for(let i=0;i<d.length;i++){
                            let done;
                           if (a.includes(d[i])){
                                done=document.createElement('div');
                                done.classList.add("letter");
                                const f=document.createTextNode(d[i]);
                                done.appendChild(f);
                                done.id=i;
                            }
                            else if(d[i]==" "){
                                done=document.createElement('div');
                                done.classList.add("space");
                                const f=document.createTextNode(d[i]);
                                done.appendChild(f);
                                done.id=i;
                            }
                            else{
                                hiden.push(d[i]);
                                b.push(i);
                                done=document.createElement('div');
                                done.classList.add("letter");
                                done.id=i;
                            }
                            document.getElementById('one').appendChild(done);
                         }
                         document.getElementById('chances').innerHTML='You only have '+b.length+' chances' ;
                        
                    })
            }
            function validateForm(){
                let movie=(document.forms['complete']['movie'].value).toUpperCase;
                if(movie==((l.data[q].Title).toUpperCase)){
                    document.getElementById('nextbtn').style.display='block';
                }
            }
            function hint(){
                let a=['A','E','I','O','U'];
               let conso=document.forms['hint']['index'].value;
               conso=conso.toUpperCase();
               const str = l.data[q].Title;
               if(hiden.includes(conso)){
                h+=1;
                chances-=1
                 const indexes = [];
                 let x=document.createElement('span');
                 document.getElementById('chances').innerHTML='You only have '+(b.length-h)+' chances';
                 const f=document.createTextNode(conso);
                 x.appendChild(f);
                 document.getElementById('correct').appendChild(x);
                for (let index = 0; index < str.length; index++) {
                    if (((str[index].toUpperCase() )== conso) ) {
                       indexes.push(index);
                    }
               }
               for(let j=0;j<indexes.length;j++){
                  let r=document.getElementById(indexes[j]);
                  if(document.getElementById(indexes[j]).innerHTML==0){
                    r.innerHTML=conso;
                    hino+=1;
                  }
               }
            }
            else if((!(a.includes(conso))) && (!(hiden.includes(conso)))){
                h+=1;
                let x=document.createElement('span');
                document.getElementById('chances').innerHTML='You only have '+(b.length-h)+' chances';
                 const f=document.createTextNode(conso);
                 x.appendChild(f);
                 console.log(x);
                 document.getElementById('wrong').appendChild(x);
            }
            console.log(hino)
            if (hino==b.length){
                document.getElementById('result').innerHTML='CONGRATS!! YOU GUESSED THE CORRECT MOVIE TITLE';
                document.getElementById('nextbtn').style.display='block';
                let point=document.getElementById('point').innerHTML;
                point=String(Number(point)+1);
                document.getElementById('point').innerHTML=point;
            }
            else if((hino!=b.length) && (h==b.length)){
                document.getElementById('hint').remove();
                document.getElementById('gameloss').style.display='block';

                document.getElementById('complete').remove();
            }
             }
        function next(){
            let menu = document.getElementById('one');
            while (menu.firstChild) {
               menu.removeChild(menu.firstChild);
            }
            let correct=document.getElementById('correct');
            while(correct.firstChild){
                correct.removeChild(correct.firstChild);
            }
            let wrong=document.getElementById('wrong');
            while(wrong.firstChild){
                wrong.removeChild(wrong.firstChild);
            }
            q+=1;
            fet(q);
            
        }
        
