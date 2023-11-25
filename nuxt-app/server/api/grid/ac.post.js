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
                    BAN: '12345678',
                    enrichment_source: 'Grid AC',
                    wireless_plan: 'Family',
                    upgrade_eligible: true,
                    broadband_customer: true,
                    contract_expires_this_month: false,
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