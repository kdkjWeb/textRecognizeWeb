import {deepClone} from './publicFunctions'
if(!'WebSocket' in window){
	alert("当前浏览器不支持在线聊天功能，请更换版本较新的浏览器")
}

const baseURL = 'ws://192.168.20.122:8080/'
let ws

export default {
	connect({url, params, model, connector}){
		const cntor = deepClone(connector)

		url? url = baseURL + '/' + url : url = baseURL
		if(JSON.stringify(params) != '{}'){
			url += '?'
			for(let [index, elem] of Object.entries(params)){
				url = url + index + '='  + elem + '&'
			}
			url = url.substring(0, url.length - 1)
		}
		ws = new WebSocket(url)

		ws.onopen = (res) =>{
			console.log`链接成功,成功信息为`
		}

		ws.onmessage = (res)=>{
			let result = JSON.parse(res.data)
			console.log(model, result)
			//先判断这条信息是否是这个人发送的， 是则再判断对应的消息设置发送状态为成功，不是则直接将信息push到history中
			if(result.msgFrom == cntor.username){
				for(let i = model.length - 1; i > -1 ; i--){
					if(model[i].message == result.msg 
						&& model[i].date - new Date(result.date) == 0){
						//找到发送者发送的该条信息
						model[i].status = 'success'
						break
					}
				}
			}else{
				model.push({
					username: result.msgFrom,
					message: result.msg,
					groupId: result.groupId,
					date: new Date(result.date)
				})
			}
			
			
		}

		ws.onclose = (res)=> {
			console.log('链接已被关闭')
		}

		ws.onsend = (res)=>{
			console.log(res)
		}

		ws.onerror = (err) =>{
			console.log(err)
		}
	},
	send(msg) {
		if(!ws || ws.readyState != 1)
			return '当前不存在websocket链接信息'
		console.log(msg)

		ws.send(JSON.stringify(msg))
	},
	_connect(res) {
		console.log(res)
	},
	close() {
		ws.close()
	},

}