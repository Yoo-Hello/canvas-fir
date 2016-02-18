window.onload=function(){
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
       ctx.beginPath();
       ctx.moveTo(20.5+i*40,20);
       ctx.lineTo(20.5+i*40,580);
       ctx.stroke(); 

       ctx.beginPath();
       ctx.moveTo(20,20.5+i*40);
       ctx.lineTo(580,20.5+i*40);
       ctx.stroke();
	}

    ctx.beginPath();
	ctx.arc(300,300,3,0,Math.PI*2);
	ctx.fill();

	for(var i=0;i<2;i++){
		ctx.beginPath();
	    ctx.arc(140+i*320,140,3,0,Math.PI*2);
	    ctx.fill();

	    ctx.beginPath();
	    ctx.arc(140+i*320,460,3,0,Math.PI*2);
	    ctx.fill();
	}


	var lingrad=ctx.createLinearGradient(20,20,20,580);
	lingrad.addColorStop(0,'red');
	lingrad.addColorStop(0.2,'orange');
	lingrad.addColorStop(0.4,'yellow');
	lingrad.addColorStop(0.6,'green');
	lingrad.addColorStop(0.8,'blue');
	lingrad.addColorStop(1,'purple');


	ctx.beginPath();
	ctx.strokeStyle=lingrad;
	ctx.lineWidth=6;
	ctx.moveTo(20,20);
	ctx.lineTo(20,580);
	ctx.stroke();


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
    	kaiguan =! kaiguan;
    	
    }
	

	
 //localStorage.a=1
 //localStorage.clear 清空
 //JSON.stringify() 把对象转成字符串
 //JSON.parse() 把转换成字符串的对象转换回来


}