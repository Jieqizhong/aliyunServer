const net=require('net');

let users={
	
	
};


const server=net.createServer((socket)=>{
	
	console.log('有的人连进来了');
	
	socket.on('error',()=>{
		console.log('有de人跑了');
	});
	
	socket.write(`
		欢迎来到德莱联盟
		add:username
		@username:content
		@all:content
	`)
	//{
	//	"cmd":"addUser","content":"",
	//	"cmd":"privateMessage","toUser":"XXX","content":"",
	//	"cmd":"all","content":"hello world"
	//}
	
	socket.on('data',(data)=>{
		//process.stdout.write(data);

		// try{
			// JSON.parse(data.toString())
		// }
		// catch(e){
			// socket.write('格式不对呀');
			// return;
		// }
		
		let message=JSON.parse(data.toString());
		
		switch(message.cmd){
			case'addUser':
				for(var key in users){
					if(message.content==key){
						socket.write('名称重复');
						return;
					}
					
				}
				socket.write('注册成功');
				users[message.content]=socket;
				console.log(users)
				break;
				
			case'privateMessage':
				for(var name in users){
					if(message.toUser==name){
						users[name].write(message.content);
						return;
					}
				}
				socket.write('查无此人');
				break;
			
			default:
				// socket.write('琴，请看清楚再输');
				break;
		}
		
		
		
		
	});
	
	process.stdin.resume();
	process.stdin.setEncoding("utf8");
	process.stdin.on('data',(txt)=>{
	socket.write(txt.trim());
	})

	
});
server.listen(8080,()=>{
	console.log('开始成功')
});
