import { Analytics } from '@segment/analytics-node'

// instantiation
const writeKeyString = process.env.PREFIX_TO_USE + 'SERVER_SIDE_WRITE_KEY'
console.log('OMS using write key ', writeKeyString)
const writeKey = process.env[writeKeyString]
const analytics = new Analytics({ writeKey })

export default defineEventHandler(async (event) => {

    try {
        const rawBody = await readBody(event)

        const {userID, isAnon, contents} = rawBody
        const orderID = Math.floor(new Date() / 1000)
        const data = {orderID, ...contents}

        if (!isAnon) {
            analytics.track({
                userId: userID,
                event: 'Order Confirmed',
                properties: data
            });
        } else {
            analytics.track({
                anonymousId: userID,
                event: 'Order Confirmed',
                properties: data
            });
        }

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