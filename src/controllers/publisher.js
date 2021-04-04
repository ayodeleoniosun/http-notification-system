import * as Promise from 'bluebird'
import PublisherService from '../services/publisher'
import statusCodes from '../constants/statusCodes'
import customErrorCodes from '../constants/customErrorCodes'

export const publish = (req, res) => {
  const publisherService = new PublisherService(req.decoded)

  Promise.try(() => publisherService.publish(req.body, req.params.topic))
    .then(publisher => {
      res.status(statusCodes.OK).send({
        success: true,
        data: publisher,
        message: `Message successfully published on ${req.params.topic}`
      })
    })
    .catch((err) => {
      if (err.type === customErrorCodes.MESSAGE_NOT_PUBLISHED) {
        return res.status(statusCodes.BAD_REQUEST).send({
          success: false,
          message: 'Unable to publish message on ${req.params.topic}',
        })
      }

      return res.status(statusCodes.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: 'An error occured. Try again.'
      })
    })
}
