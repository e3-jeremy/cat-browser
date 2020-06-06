import CatList from './views/CatList'
import CatPost from './views/CatPost'
import Page404 from './views/Page404'

const routes = [
  {
    path: '/',
    name: 'CatList',
    component: CatList
  },
  {
    path: '/:catid',
    name: 'CatPost',
    component: CatPost
  },
  // Fallback
  { path: "*", component: Page404, name: 'Page Not Found' }
]

export default routes
