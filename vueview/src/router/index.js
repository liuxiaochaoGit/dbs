import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Regist from '@/views/regist'
import Main from '@/views/main'
import List from '@/components/list'
import ListLoad from '@/components/list_load'
import Finder from '@/views/finder'
// import Msg from '@/views/message'
import Groom from '@/views/groom'
import Mine from '@/views/mine'
import Publish from '@/views/publish'
import Chat from '@/components/chat'
import ChatList from '@/components/chat_list'
import Datum from '@/views/datum_edit'
import CopperImage from '@/components/cropper_image'
import DefaultS from '@/components/default_s'


Vue.use(Router)

export default new Router({
    routes: [
        /*{
            path: '/',
            name: 'login',
            component: Login
        },*/
        {
            path: '/regist',
            name: 'regist',
            component: Regist
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/',
            name: 'v-main',
            component: Main,
            redirect: '/list',
            children: [
                {
                    path: '/list',
                    name: 'v-list',
                    component: List,
                    children: [
                        {
                            path: '/',
                            name: 'list_load',
                            component: ListLoad,
                        }
                    ]
                },
                {
                    path: '/finder',
                    name: 'v-finder',
                    component: Finder,
                    children: [
                        {
                            path: '/',
                            name: 'list_load',
                            component: ListLoad,
                        }
                    ]
                },
                {
                    path: '/publish',
                    name: 'v-publish',
                    component: Publish
                },
                {
                    path: '/groom',
                    name: 'v-groom',
                    component: Groom,
                    redirect: ChatList,
                    children: [
                        {
                            path: '/chatlist',
                            name: 'v-chatlist',
                            component: ChatList,
                        }
                    ]
                },
                {
                    path: '/chat',
                    name: 'v-chat',
                    component: Chat,
                },
                {
                    path: '/mine',
                    name: 'v-mine',
                    component: Mine
                }
            ]
        },
        {
            path: '/datumEdit',
            name: 'datumEdit',
            component: Datum
        },
        {
            path: '/copperImage',
            name: 'cropper',
            component: CopperImage
        },
        {
            path: '/default_s',
            name: 'defaultS',
            component: DefaultS
        }
        /*{
            path: '/list',
            name: 'v-list',
            component: List
        }*/
    ]
})
