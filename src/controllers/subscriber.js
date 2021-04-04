import * as Promise from 'bluebird'
import SubscriberService from '../services/subscriber'
import statusCodes from '../constants/statusCodes'
import customErrorCodes from '../constants/customErrorCodes'

export const subscribe = (req, res) => {
  const subscriberService = new SubscriberService(req.decoded)

  Promise.try(() => subscriberService.subscribe(req.body, req.params.topic))
    .then(subscriber => {
      res.status(statusCodes.OK).send({
        url : subscriber.url,
        topic: subscriber.topic,
        success: true,
        message: `Subscription successfully created on ${req.params.topic}`
      })
    })
    .catch((err) => {
      console.log(err)
      if (err.type === customErrorCodes.SUBSCRIPTION_NOT_CREATED) {
        return res.status(statusCodes.BAD_REQUEST).send({
          success: false,
          message: `Unable to create subscription on ${req.params.topic}`,
        })
      }

      return res.status(statusCodes.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: 'An error occured. Try again.'
      })
    })
}
