import redis from 'redis'
import customErrorCodes from '../constants/customErrorCodes'
import {CustomError} from '../helpers/errors'
const publisher = redis.createClient()

export default class PublisherService {
  publish (payload, topic) {
    const publish = publisher.publish(topic, JSON.stringify(payload))

    if (publish)
      return true
    throw new CustomError(customErrorCodes.MESSAGE_NOT_PUBLISHED)
  }
}
