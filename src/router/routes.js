/* 管理项目整个路由的加载 */
const Login = ()=>import('@/pages/login/login'),
	  Index = ()=>import('@/pages/index/index'),
	  Register = ()=>import('@/pages/register/register')

export default {
	routes: [
		{
			path: '/',
		    name: 'Login',
		    component: Login
		},
		{
			path: '/index',
			name: 'Index',
			component: Index
		},
		{
			path: '/register',
			name: 'Register',
			component: Register
		}
	]
}