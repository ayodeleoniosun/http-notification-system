import {subscribe} from '../controllers/subscriber'

export let subscriberRoutes = router => {
  router.post('/subscribe/:topic', subscribe)
}
