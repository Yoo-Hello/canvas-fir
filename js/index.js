window.onload=function(){
	var resetting=document.querySelector('#resetting');
	var canvas=document.querySelector('#canvas');
	var ctx=canvas.getContext('2d');

	var bgcolor=document.querySelector('#bgcolor');
	var bgc=bgcolor.getContext('2d');
    
    bgc.beginPath();
    bgc.fillStyle='rgb(240,220,25)';
	bgc.fillRect(0,0,600,600);
	bgc.fill();
    

 //    ctx.beginPath();
	// ctx.strokeRect(37.5,37.5,525,525);
	// ctx.stroke();

	for(var i=0;i<15;i++){
       bgc.beginPath();
       bgc.moveTo(20.5+i*40,20);
       bgc.lineTo(20.5+i*40,580);
       bgc.stroke(); 

       bgc.beginPath();
       bgc.moveTo(20,20.5+i*40);
       bgc.lineTo(580,20.5+i*40);
       bgc.stroke();
	}

    bgc.beginPath();

	bgc.fillStyle="rgb(0,0,0)";
	bgc.arc(300,300,3,0,Math.PI*2);
	bgc.fill();

	for(var i=0;i<2;i++){
		bgc.beginPath();
		bgc.fillStyle="rgb(0,0,0)";
	    bgc.arc(140+i*320,140,3,0,Math.PI*2);
	    bgc.fill();

	    bgc.beginPath();
	    bgc.arc(140+i*320,460,3,0,Math.PI*2);
	    bgc.fill();
	}


	// var lingrad=bgc.createLinearGradient(20,20,20,580);
	// lingrad.addColorStop(0,'red');
	// lingrad.addColorStop(0.2,'orange');
	// lingrad.addColorStop(0.4,'yellow');
	// lingrad.addColorStop(0.6,'green');
	// lingrad.addColorStop(0.8,'blue');
	// lingrad.addColorStop(1,'purple');


	// bgc.beginPath();
	// bgc.strokeStyle=lingrad;
	// bgc.lineWidth=6;
	// bgc.moveTo(20,20);
	// bgc.lineTo(20,580);
	// bgc.stroke();


	//落子


	var luozi=function(x,y,color){
		var zx=40*x+20.5;
		var zy=40*y+20.5;
		var black=ctx.createRadialGradient(zx,zy,3,zx,zy,18);
		black.addColorStop(0.1,'#333');
		black.addColorStop(1,'#000');
		var white=ctx.createRadialGradient(zx,zy,3,zx,zy,18);
		white.addColorStop(0.1,'#ddd');
		white.addColorStop(1,'#ccc');
		ctx.fillStyle=color?black:white;
        ctx.beginPath();
        ctx.arc(zx,zy,18,0,Math.PI*2);
        ctx.fill();
	}
    var memory={};
    var kaiguan=true;
    canvas.onclick=function(e){
    	var x=Math.round((e.offsetX-20.5)/40);
    	var y=Math.round((e.offsetY-20.5)/40);
    	if(memory[x+'_'+y]){return}
    	luozi(x,y,kaiguan);
        memory[x+'_'+y]=kaiguan?'black':'white';
        localStorage.kg=kaiguan;
    	kaiguan =! kaiguan;
    	localStorage.data=JSON.stringify(memory);
    }
    
    if(localStorage.kg == true){
    	kaiguan=false;
    }else if(localStorage.kg == false){
    	kaiguan=true;
    }
    if(localStorage.data){
    	memory=JSON.parse(localStorage.data);
    	for(var i in memory){
    		var x=i.split('_')[0];
    		var y=i.split('_')[1];
    		luozi(x,y,(memory[i]=="black")?true:false)
    	}
    }

    resetting.onclick=function(){
    	localStorage.clear(localStorage.data);
    	memory={};
    	ctx.clearRect(0,0,600,600);
    	kaiguan=true;
    }
	

	
 //localStorage.a=1
 //localStorage.clear 清空
 //JSON.stringify() 把对象转成字符串
 //JSON.parse() 把转换成字符串的对象转换回来


}