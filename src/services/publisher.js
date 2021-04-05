import redis from 'redis'
import customErrorCodes from '../constants/customErrorCodes'
import {CustomError} from '../helpers/errors'
import ports from '../constants/ports'
import axios from 'axios'

const publisher = redis.createClient()

class PublisherService {
  publish (payload, topic) {
    const publish = publisher.publish(topic, JSON.stringify(payload))

    axios.all([
      ports.forEach(port => {
        axios.post(`http://localhost:${port}/subscribe/${topic}`, {
          data: {topic: topic, data: payload}
        })
      })
    ])

    if (publish)
      return {topic: topic}
    throw new CustomError(customErrorCodes.MESSAGE_NOT_PUBLISHED)
  }
}

export default PublisherService
