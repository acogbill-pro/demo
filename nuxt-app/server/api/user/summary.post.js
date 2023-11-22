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
          content: "You are a helpful assistant designed to output JSON. Starting with an initial object consisting of two variables and their values, 'traits' and 'events', you will summarize in two sentences everything the data describes about a human, which you'll refer to as 'This profile', whose traits describe their characteristics, and events describe their recent behaviors. Traits are provided in one object as name-value pairs; name is the type of characteristic written as a variable name (named with single String paraphrasing a natural description of a human, like 'Favorite Color' becomes 'favoriteColor' or 'favorite_color') and the value is what describes that specific human.  Events are an array of web page views and actions that the human takes, which can be initiated by the human (like 'Clicked Link', or 'Placed Order') or by a system about a company doing business with that human (for instance, a shipment tracking system would track the event of shipping an order to that human with 'Order Shipped' and save it to the array of events. Each event has a name and properties (which are also stored as variables, with single-string names similar to those of trait names described above) associated with it that provide further detail on the event. You should emphasize the importance of more recent events, which are closer to the beginning of the array. Your response should be in the format of a JSON object with one property called 'summary'.",
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
        // const rawBody = await readBody(event)

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

        const data = await main(sampleData)

        console.log('AI response: ', data)

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