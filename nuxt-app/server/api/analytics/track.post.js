import { Analytics } from '@segment/analytics-node'
// or, if you use require:
// const { Analytics } = require('@segment/analytics-node')

// instantiation
const writeKey = process.env.SERVER_SIDE_WRITE_KEY
const analytics = new Analytics({ writeKey })

export default defineEventHandler(async (event) => {
    
    // console.log(orderID)

    try {
        const rawBody = await readBody(event)

        const {userID, isAnon, event, properties} = rawBody

        if (!isAnon) {
            analytics.track({
                userId: userID,
                event,
                properties,
            });
        } else {
            analytics.track({
                anonymousId: userID,
                event,
                properties,
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