window.onload=function(){
	
	var resetting=document.querySelector('#resetting');
	var preserve=document.querySelector('#preserve');
    var canvas=document.querySelector('#canvas');
	var ctx=canvas.getContext('2d');

	var bgcolor=document.querySelector('#bgcolor');
	var bgc=bgcolor.getContext('2d');

    var huiqi=document.querySelector('#huiqi');

	var memory={};
    var baocun;
	var kaiguan=true;
    
    bgc.beginPath();
    bgc.fillStyle='rgb(240,220,25)';
	bgc.fillRect(0,0,600,600);
	bgc.fill();
    

 //    ctx.beginPath();
	// ctx.strokeRect(37.5,37.5,525,525);
	// ctx.stroke();
    //画棋盘

    var huaqipan=function(){
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
    }
    huaqipan();
	

    //渐变色
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


	var luozi2=function(x,y,color){
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
    var luozi=function(x,y,color){

    	var zx=40*x+2.5;
    	var zy=40*y+2.5;
    	if(color){
    		ctx.drawImage(qiziimg,0,0,200,200,zx,zy,36,36);
    	}else{
    		ctx.drawImage(qiziimg,200,0,200,200,zx,zy,36,36)
    	}
    }
    //判定该下黑子白子
    canvas.onclick=function(e){
    	var x=Math.round((e.offsetX-20.5)/40);
    	var y=Math.round((e.offsetY-20.5)/40);
    	if(memory[x+'_'+y]){return}
    	luozi(x,y,kaiguan);
        memory[x+'_'+y]=kaiguan?'black':'white';
        localStorage.kg=kaiguan;
    	kaiguan =! kaiguan;
    	localStorage.data=JSON.stringify(memory);

        if(!kaiguan){
        if( win(x,y,'black') ){
            alert('黑棋胜利');
            if(confirm('是否再来一局?')){
               localStorage.clear();
               location.reload();
               memory = {};
               kaiguan = true;
               return;
            }else{
               canvas1.onclick  = null;
            }
          }
        }else{
          if( win(x,y,'white')){
             alert('白棋胜利');
            if(confirm('是否再来一局?')){
              localStorage.clear();
              location.reload();
              memory = {};
              kaiguan = true;
              return;
            }else{
               canvas1.onclick  = null;
            }
          }
        }


        //悔棋
        if(localStorage.kg == 'true'){
            kaiguan=false;
        }else if(localStorage.kg == 'false'){
            kaiguan=true;
        }

        huiqi.onclick=function(){
            var newmemory = {};//创建一个新对象
            for(var i in memory){
              if(i != (x+'_'+y)){//把当前点击的棋子除去之后，将memory对象重新复制给newmemory;
                newmemory[i] = memory[i];
              }
            }
            memory = newmemory;//再把newmemory重新复制给qizi，
            kaiguan = !kaiguan;
            ctx.clearRect(x*40+3,y*40+3,35,35);//擦除刚才点击过的棋子
        }
    }

    //保存棋盘数据，刷新后不被清空
    if(localStorage.data){
    	memory=JSON.parse(localStorage.data);
    	for(var i in memory){
    		var x=i.split('_')[0];
    		var y=i.split('_')[1];
    		luozi(x,y,(memory[i]=="black")?true:false)
    	}
    }
    if(localStorage.kg == 'true'){
    	kaiguan=false;
    }else if(localStorage.kg == 'false'){
    	kaiguan=true;
    }


    //重新开始
    resetting.onclick=function(){
    	localStorage.clear(localStorage.data);
    	memory={};
    	ctx.clearRect(0,0,600,600);
    	kaiguan=true;
    }
	

    //判定输赢
    var win=function(x,y,color){
      var shuju = filter(color);
      var tx,ty,H = 1,S = 1,ZX = 1,YX= 1;

      tx = x;ty = y;while(shuju[moshi(tx-1,ty)]){tx--;H++}
      tx = x;ty = y;while(shuju[moshi(tx+1,ty)]){tx++;H++}
      if(H >= 5){return true}

      tx = x;ty = y;while(shuju[moshi(tx,ty-1)]){ty--;S++}
      tx = x;ty = y;while(shuju[moshi(tx,ty+1)]){ty++;S++}
      if(S >= 5){return true}

      tx = x;ty = y;while(shuju[moshi(tx-1,ty-1)]){ty--;tx--;ZX++}
      tx = x;ty = y;while(shuju[moshi(tx+1,ty+1)]){ty++;tx++;ZX++}
      if(ZX >= 5){return true}

      tx = x;ty = y;while(shuju[moshi(tx+1,ty-1)]){ty--;tx++;YX++}
      tx = x;ty = y;while(shuju[moshi(tx-1,ty+1)]){ty++;tx--;YX++}
      if(YX >= 5){return true}
    }

    var moshi = function(x,y){
      return x+'_'+y;
    }

    var filter = function(color){
      var r = {};
      for(var i in memory){
        if(memory[i] == color){
           r[i] = memory[i]
        }
      }
      return r;
    }
    //倒计时
	
 //localStorage.a=1
 //localStorage.clear 清空
 //JSON.stringify() 把对象转成字符串
 //JSON.parse() 把转换成字符串的对象转换回来


}