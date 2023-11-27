import { Analytics } from '@segment/analytics-node'
// or, if you use require:
// const { Analytics } = require('@segment/analytics-node')

// instantiation
// const writeKeyString = process.env.PREFIX_TO_USE + 'SERVER_SIDE_WRITE_KEY'
// const writeKey = process.env[writeKeyString]
// const analytics = new Analytics({ writeKey })

export default defineEventHandler(async (event) => {

    try {
        const rawBody = await readBody(event)

        const {userID, isAnon} = rawBody
    
        return {
            status: 'OK',
            data: {
                traits: {
                    enriched: true,
                    oms_id: '12345678',
                    enrichment_source: 'OMS',
                    loyalty_tier: 'Gold',
                    likely_subscriber: true,
                    phone: '+19177576756',
                }
            },
        }
    } catch(e) {
        return {
            status: 'Error',
            data: {}
        }
    }
})