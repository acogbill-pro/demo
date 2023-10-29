import { Analytics } from '@segment/analytics-node'
// or, if you use require:
// const { Analytics } = require('@segment/analytics-node')

// instantiation
const writeKey = process.env.SERVER_SIDE_WRITE_KEY
const analytics = new Analytics({ writeKey })

export default defineEventHandler(async (event) => {
    const rawBody = await readBody(event)

    const {userID, contents} = rawBody
    const orderID = Math.floor(new Date() / 1000)
    // console.log(orderID)

    try {
        return {
            status: 'OK',
            data: {orderID, ...contents}
        }
    } catch(e) {
        return {
            status: 'Error',
            data: {}
        }
    }
})