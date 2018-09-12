import App from '../App';
import Loadable from 'react-loadable'

const loadable = (filename) => Loadable({
    loader:() => import(`../components/${filename}/${filename}`),
    loading:() => ('')
});
// import Gutter from '../gutter/gutter';


//路由配置对象
const routerConfig = [
    {
        path:'/login',
        component:loadable('login')
    },
    {
        path:'/',
        exact:true,
        component:loadable('main')
    },
    {
        path:'/mine',
        component:loadable('mine')
    },
];

export default routerConfig;