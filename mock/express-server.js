let express = require('express');
let app = express();
let port = 3070;
//创建服务
app.listen(port,()=>{
	console.log(`服务创建成功,正在监听${port}端口!`);
});

let bodyParser = require('body-parser');//中间件获取请求主体信息
let {readFile,writeFile} = require('./fsPromise.js');
let pathDataTable = './table.json';

//解决跨域问题，浏览8080&服务3070，打包后这代码不要了，因为同域了
app.use((req,res,next)=>{
	//可写res.header也可写res.setHeader
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");//跨域不能写*通配符，8080和config/index.js里的port匹配的
	res.setHeader("Access-Control-Allow-Credentials", true);//访问控制允许凭据,必须有
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By",' 3.2.1')//可有可没有
    if(req.method == "OPTIONS") {
    	//让options请求快速返回，res.send改成res.sendStatus
    	res.sendStatus(200);
    	return;
    };
    next();
});




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(async (req,res,next)=>{
	let tableData = await readFile(pathDataTable);
	req.tableData = JSON.parse(tableData);
	next();
});

//接口要写res.send({...})，返回值的形式，成功失败都要写，否则会报跨域错之类createError

//获取所有数据接口
app.get('/getTableData',(req,res)=>{
	let result = [];
	let all = req.tableData;//获取所有json
	let list = req.query.data;//得到传入的当前周日期数组
	let first = list[0];//当前周一日期
	//let last = list[list.length-1];//周日日期
	
	//先判断传进来的周一日期是否在json里存在，如果不存在就整体新建，那我要知道当前任务的数量，才能确定要新建几组数据，所以每条数据还要有个bid来归类，辨别哪几个任务是同一周的
	
	//先判断json中是否有该日期的数据，有的话就不用造了，直接读取出来
//	all.some(item=>{
//		item['week1']['time']==fir
//	})
	
	//准备造空数据，先数组去重，为了每项任务保留一条，要每项任务都造空数据

	function aryDup(ary){
		for(let i=0;i<ary.length-1;i++){
			let cur = ary[i]['nid'];
			for(let j=i+1;j<ary.length;j++){
				if(cur==ary[j]['nid']){
					ary.splice(j,1);
					j--;
				}
			}
		}
		return ary
	}
	
	
	//如果数据和当前周一日期都存在
	if (all && first) {
		//遍历数据
		all.forEach(item=>{
			//拿到所有的周一日期
			let fTime = eval("("+item['week1']+")")['time'];
			//console.log(fTime);
			if(fTime==first){
				//将匹配当前周一的数据放入数组，返回给前端
				result.push(item);
			}
		})
		//如果没有筛选到数据，就造空数据
		if(result.length===0){
			let nameList = req.tableData.concat();//数组克隆为了不改变原数组
			nameList = aryDup(nameList);
			//造空数据
			nameList = nameList.map((item,index)=>{
				return {
					id : all[all.length-1]['id'] + ++index,
					nid : item['nid'],
					name : item['name'],
					showInput: false,
					submitVal: 0,
					week1 : `{"time":"${list[0]}","val":0}`,
					week2 : `{"time":"${list[1]}","val":0}`,
					week3 : `{"time":"${list[2]}","val":0}`,
					week4 : `{"time":"${list[3]}","val":0}`,
					week5 : `{"time":"${list[4]}","val":0}`,
					week6 : `{"time":"${list[5]}","val":0}`,
					week7 : `{"time":"${list[6]}","val":0}`,
				}
			})
			all = all.concat(nameList);//把json所有的数据与新造的数据合并数组
			writeFile('./table.json',all);//把合并后的写库
			result = nameList;//把我造的空数据返回出去
			//console.log('新建数据')
		}
		
		
        res.send({
            code: 0,
            message: 'OK!',
            data: result
        });
        return;
    }
	res.send({code: 1, message: 'NO!', data: []});
	return;
});

//修改输入接口
app.put('/updataTable',(req,res)=>{
	//获取传进来的id
	//let id = parseInt(req.query.id);不用问号传参不用这样写了
	let id = req.body.data.id;
	//获取所有数据
	let result = req.tableData;
	
	//如果id存在
	if(id){
		//获取传入的被修改的数据（对象），put接口传入的数据放在{data}里，所以这里要找req.body.data才能拿到传入的数据
		let list = req.body.data;
		//console.log(list)
		//遍历所有数据，找到id匹配的哪一项，将传入的数据赋值给找到的这一项
		result = result.map(item=>{
			if(item.id===id){
				item = list
			}
			return item;
		});
		//console.log(result);
		//将更新后的数据写入json，但是这样改一点就会重写一次，不好，能不能只更新json中的匹配数据呢？
		//或者是修改前台让修改的值存在cookie/session中？点击保存再发送，但是前台存在搜索功能，搜索是filter筛选，会改变list数组，list改变会影响到计算，所以筛选不能隐藏，只能改变list数组，现在做的功能是搜索清空就重新请求数据，更改值就往json重写
		writeFile('./table.json',result);
		res.send({code:0,message:'OK!'});
		return;
	}
	res.send({code:1,message:'NO!'});
	return;
});

//提交审批
app.put('/subTable',(req,res)=>{
	let result = req.tableData;
	let list = req.body.data;
	if(list){
		result = result.map(rItem=>{
			let cur = rItem.id;
			list.forEach(lItem=>{
				if(cur==lItem.id){
					rItem = lItem;
				}
			})
			return rItem;
		});
		writeFile('./table.json',result);
		res.send({code:0,message:'OK!'});
		return;
	}
	res.send({code:1,message:'NO!'});
	return;
})





//用于快速结束没有任何数据的响应，使用res.end()。 
//响应中要发送JSON响应，使用res.json()。 
//响应中要发送数据,使用res.send() ,但要注意headers['Content-Type']参数。 
//如果使用res.end()返回数据非常影响性能

//处理静态资源请求
//app.use(express.static('../src/'));
//app.use((req,res,next)=>{
//	res.status(404);
//	res.redirect('http://www.baidu.com');
//})









