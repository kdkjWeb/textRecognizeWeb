import commonServices from '@/server/commonServices'

export default {
    //发送建议
    sendMsg:({model, Vue, hidenLoading})=>{
        return new Promise((resolve,reject)=>{
            commonServices.transport({
                url: 'message/addAdvice',
				model,
				Vue,
				hidenLoading 
            }).then(res=>{
                resolve(res)
            },err=>{
                reject(err)
            })
        })
    }
}