/**
 *  axios config manage
 */

import Vue from 'Vue'
import axios from 'axios'
import {has, getItem , setItem, removeItem} from '@/utils/localStorage'

const axios_conf = axios.create({
	baseURL: 'http://192.168.20.50:8081/', //ph
	// baseURL: 'http://192.168.20.3:8080/chatroom/', //zxc
	timeout: 3000, //所有请求30s后过期
	withCredentials: true, //跨域凭证
})

Object.defineProperty(Vue.prototype, '$axios', { value: axios_conf})

export default axios_conf