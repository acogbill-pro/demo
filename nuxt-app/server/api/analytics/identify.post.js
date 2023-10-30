import { Analytics } from '@segment/analytics-node'
// or, if you use require:
// const { Analytics } = require('@segment/analytics-node')

// instantiation
const writeKeyString = process.env.PREFIX_TO_USE + 'SERVER_SIDE_WRITE_KEY'
const writeKey = process.env[writeKeyString]
const analytics = new Analytics({ writeKey })

export default defineEventHandler(async (event) => {
    
    // console.log(orderID)

    try {
        const rawBody = await readBody(event)

        analytics.identify(rawBody)

        return {
            status: 'OK',
            data,
        }
    } catch(e) {
        return {
            status: 'Error',
            data: {}
        }
    }
})