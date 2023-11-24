import { Analytics } from '@segment/analytics-node'
import OpenAI from "openai";
import assert from "node:assert";
import { getEncoding, encodingForModel } from "js-tiktoken";


const { openAIKey } = useRuntimeConfig().public
const writeKeyString = process.env.PREFIX_TO_USE + 'SERVER_SIDE_WRITE_KEY'
console.log('AI using write key ', writeKeyString)
const writeKey = process.env[writeKeyString]
const analytics = new Analytics({ writeKey })

// instantiation
const AI = new OpenAI({
    apiKey: openAIKey,
});

async function main(profileData) {

    const completion = await AI.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "Refactor a business customer's 'traits' (key-value pairs of human attributes) and 'events' (array of their interactions with the business; please emphasize recent/significant and deemphasize default or frequent activities like Home Page visits) into a JSON 'summary' with two prioritized sentences. The second sentence should suggest an action to a customer service agent to provide added value to the customer, while also increasing revenue for the business extracted from that customer.",
          },
          { role: "user", content: JSON.stringify(profileData) },
        ],
        model: "gpt-4-1106-preview",//"gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
      });

    console.log(`${completion.usage.prompt_tokens} OpenAI tokens used`)

    return completion.choices[0].message.content
  }


function countTokens(messages) {

    const enc = getEncoding("gpt2");
    assert(enc.decode(enc.encode(messages)) === messages);
}

export default defineEventHandler(async (event) => {

    try {
        const rawBody = await readBody(event)

        console.log('rawBody', rawBody)

        // const {userID, isAnon} = rawBody

        const sampleData = {
            traits: {
                favoriteColor: 'blue',
                age: 45,
            },
            events: [
                {
                    event: 'Page Viewed',
                    properties: {
                        page_name: 'Shopping home'
                    },
                }
            ]
        }

        const data = await main(rawBody)

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