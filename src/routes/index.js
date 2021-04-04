import {publisherRoutes} from './publisher'
import {subscriberRoutes} from './subscriber'

module.exports = router => {
  publisherRoutes(router)
  subscriberRoutes(router)
}
