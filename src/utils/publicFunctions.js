/**
 *  公用方法
 */

/**
 * 手机正则验证
 * @str  需要验证的string
 * @return Boolean 
 */
export function phoneRegExp(str){
	const pRegExp = /^[1][3,4,5,7,8][0-9]{9}$/
	if(pRegExp.test(str))
		return true
	return false
}

/**
 * 深拷贝
 * @return Object 拷贝后的对象
 */
export function deepClone(obj){
	let newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return obj;
    } else if(window.JSON){
        newobj = JSON.parse(JSON.stringify(obj))//系列化对象,还原
    } else {
        for(let i in obj){
            newobj[i] = typeof obj[i] === 'object' ? 
            deepClone(obj[i]) : obj[i]; 
        }
    }
    return newobj;
}