import { Analytics } from '@segment/analytics-node'
import OpenAI from "openai";

const { openAIKey } = useRuntimeConfig().public
const writeKeyString = process.env.PREFIX_TO_USE + 'SERVER_SIDE_WRITE_KEY'
console.log('AI using write key ', writeKeyString)
const writeKey = process.env[writeKeyString]
const analytics = new Analytics({ writeKey })

// instantiation
const AI = new OpenAI({
    apiKey: openAIKey,
});

async function main(postedBody) {
    const {prompt: originalPrompt, traits} = postedBody
    const traitsAsString = JSON.stringify(traits)

    const combinedPrompt = `${originalPrompt}, featuring colors, objects, products, and methods of communication preferred by the business customer described by the key-value pairs of human attributes in this object: ${traitsAsString}. The image should not feature any words, and be as simple as possible, with no graphics or diagrams.`

    console.log(combinedPrompt)

    try {
        const response = await AI.images.generate({
            model: "dall-e-3",
            prompt: combinedPrompt,
            n: 1,
            size: "1792x1024",
        });
        
        // console.log(`${response.usage.prompt_tokens} OpenAI tokens used`)

        // const {data} = response.json()
        // image_url = data[0].url

        return response
    } catch(e) {
        console.log('Error in generating image', e)
        return {data:[{url:''}]}
    }
  }

export default defineEventHandler(async (event) => {

    try {
        const rawBody = await readBody(event)

        // console.log('rawBody', rawBody)

        // const {userID, isAnon} = rawBody

        const {data} = await main(rawBody)

        // console.log('AI response: ', data)

        // if (!isAnon) {
        //     analytics.track({
        //         userId: userID,
        //         event: 'Order Confirmed',
        //         properties: data
        //     });
        // } else {
        //     analytics.track({
        //         anonymousId: userID,
        //         event: 'Order Confirmed',
        //         properties: data
        //     });
        // }

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