import redis from 'redis'
import customErrorCodes from '../constants/customErrorCodes'
import {CustomError} from '../helpers/errors'
import axios from 'axios'

const publisher = redis.createClient()

class PublisherService {
  publish (payload, topic) {
    const publish = publisher.publish(topic, JSON.stringify(payload))
    const port = [9000, 9001]

    axios.all([
      port.forEach(port => {
        axios.post(`http://localhost:${port}/subscribe/${topic}`, {
          data: {topic: topic, data: payload}
        })
      })
    ])

    if (publish)
      return publish
    throw new CustomError(customErrorCodes.MESSAGE_NOT_PUBLISHED)
  }
}

export default PublisherService
