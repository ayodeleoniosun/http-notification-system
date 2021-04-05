import redis from 'redis'
import customErrorCodes from '../constants/customErrorCodes'
import {CustomError} from '../helpers/errors'
const subscriber = redis.createClient()

class SubscriberService {
  subscribe (payload, topic) {
    const subscription = subscriber.subscribe(topic, (message, channel) => {
      console.log(`Received messages in ${channel} : ${JSON.stringify(payload)}`)
    })

    const subscribe = subscriber.subscribe(topic, subscription)

    if (subscribe)
      return {url: payload.url, topic: topic}
    throw new CustomError(customErrorCodes.SUBSCRIPTION_NOT_CREATED)
  }
}

export default SubscriberService

