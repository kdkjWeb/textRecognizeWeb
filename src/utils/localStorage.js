/**
 * 对localStorage 的操作方法
 */
import {deepClone} from './publicFunctions'
import store from '@/store'

const KEY = 'textRecognize_app',
      localStorage = window.localStorage
let myStorage,
    username

let init = ()=>{
	try {
	    if (!myStorage) {
	      myStorage = JSON.parse(localStorage.getItem(KEY) || '{}')
	    } else {
	      localStorage.setItem(KEY, JSON.stringify(myStorage))
	    }
	}catch (e) {
	    console.log(e)
	}
}

let saveLocalStorage = ()=>{
  try{
    localStorage.setItem(KEY, JSON.stringify(myStorage))
  }catch(e){
    console.log(e)
  }
}

let getUserName = () =>{
  if(!store.state.user.username){
    setTimeout(getUserName, 500)
    return
  }
  username = store.state.user.username
  if(typeof myStorage[username] != 'object')
    myStorage[username] = {}
}

init()

export function has(key) {
  if(key == 'token'){
    return Object.hasOwnProperty.call(myStorage, key)
  }
  if(!username || username != store.state.user.username) 
    getUserName()
  return Object.hasOwnProperty.call(myStorage[username], key)
}

export function getItem(key) {
  if (!has(key)) {
    return false
  }
  if(key == 'token'){
    return myStorage[key]
  }
  if(!username || username != store.state.user.username) 
    getUserName()

  if(myStorage[username][key])
    return myStorage[username][key]

  removeItem(key)
  return false
}

export function setItem({key, value }) {
  if(!key || value == undefined){
    throw new Error('必须传入键值对')
  }
  if(key == 'token'){
    myStorage[key] = value
  }else{
    if(!username || username != store.state.user.username) 
      getUserName()
    
    myStorage[username][key] = typeof value == 'object'?deepClone(value) : value
  }
  saveLocalStorage()
}

export function removeItem(key) {
  if (has(key)) {
    if(key == 'token'){
      delete myStorage[key]
    }else{
      delete myStorage[username][key]
    }
    saveLocalStorage()
  }
}

export function clear() {
  myStorage = {}
  saveLocalStorage()
}