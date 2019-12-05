import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3070";//基础路径
axios.defaults.withCredentials = true;//允许跨域请求，就要配置express-server里的跨域头
axios.interceptors.response.use((res) => res.data.data);//设置拦截器，直接获得data
//请求所有数据接口
export let getTableData = () =>{
	return axios.get('/getTableData');
}
//修改数据接口，传入id和被修改的那一项
export let updataTable = (id,data) =>{
	return axios.put(`/updataTable?id=${id}`,{
		data
	});
}

//未使用
export let getAll = () =>{
	return axios.all([getTableData()]);
}
