import { Analytics } from '@segment/analytics-node'
// or, if you use require:
// const { Analytics } = require('@segment/analytics-node')

// instantiation
const writeKeyString = process.env.PREFIX_TO_USE + 'SERVER_SIDE_WRITE_KEY'
const writeKey = process.env[writeKeyString]
console.log('WRITE KEY', writeKey)
const analytics = new Analytics({ writeKey })

export default defineEventHandler(async (event) => {
    console.log('server side track')
    // console.log(orderID)

    try {
        const rawBody = await readBody(event)
        // console.log('rawBody',rawBody)

        analytics.track(rawBody)
    
        return {
            status: 'OK',
            data: {},
        }
    } catch(e) {
        console.log('error in server side Track', e)
        return {
            status: 'Error',
            data: {}
        }
    }
})