import {publish} from '../controllers/publisher'

export let publisherRoutes = router => {
  router.post('/publish/:topic', publish)
}
