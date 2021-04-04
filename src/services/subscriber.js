import redis from 'redis'
import customErrorCodes from '../constants/customErrorCodes'
import {CustomError} from '../helpers/errors'
const subscriber = redis.createClient()

export default class SubscriberService {
  subscribe (payload, topic) {
    const token = subscriber.subscribe(topic, JSON.stringify(payload))
    
    if (token)
      return {url: payload.url, topic: topic}
    throw new CustomError(customErrorCodes.SUBSCRIPTION_NOT_CREATED)
  }
}
