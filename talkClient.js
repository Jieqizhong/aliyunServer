const net=require('net');

const socket=net.createConnection(8080,'172.17.14.19',()=>{
	console.log('已上线')
});

socket.on('data',(data)=>{
		process.stdout.write(data);
	})
	
process.stdin.resume();
process.stdin.setEncoding("utf8");
process.stdin.on('data',(txts)=>{
	//add:username
	//@username:content
	//@all:content
	
	let oktxt='';//记录已经OK的string
	let txt=txts.toString().trim();//当前的string
	let index=txt.indexOf(':');//冒号的下标
	let fisrt=txt.slice(0,1);//得到第一个字符
	let cmds=txt.slice(0,index);//得到命令，也就是冒号前面的string
	let content=txt.slice(index+1)//得到内容，也就是冒号后面的string
	
	switch(fisrt){
		
		case'@':
			var cmd=cmds.slice(1);
			switch(cmd){
				case'all':
				oktxt=JSON.stringify({"cmd":"all","content":content});
				break;
				default:
				oktxt=JSON.stringify({"cmd":"privateMessage","toUser":cmd,"content":content});
				break;
			}								
			break;
			
		default:
			if(cmds=='add'){
				oktxt=JSON.stringify({"cmd":"addUser","content":content});
			}
			else{
				console.log('琴，请看清楚再输')
			}
			break;
	}
	
	socket.write(oktxt);
})
