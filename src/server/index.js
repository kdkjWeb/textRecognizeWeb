/**
 *  axios config manage
 */

import Vue from 'Vue'
import axios from 'axios'

const axios_conf = axios.create({
	baseURL: '',
	timeout: '',
	withCredentials: false, //跨域凭证
})

Object.defineProperty(Vue.prototype, '$axios', { value: axios_conf})

export default axios_conf