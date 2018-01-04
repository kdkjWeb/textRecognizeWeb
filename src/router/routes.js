/* 管理项目整个路由的加载 */
const HelloWorld = ()=>import('@/components/HelloWorld')

export default {
	routes: [
		{
			path: '/',
		    name: 'HelloWorld',
		    component: HelloWorld
		}
	]
}