import { Analytics } from '@segment/analytics-node'
import OpenAI from "openai";

const { openAIKey } = useRuntimeConfig().public
const writeKeyString = process.env.PREFIX_TO_USE + 'SERVER_SIDE_WRITE_KEY'
console.log('AI using write key ', writeKeyString)
const writeKey = process.env[writeKeyString]
console.log('WRITE KEY', writeKey)
const analytics = new Analytics({ writeKey })

// instantiation
const AI = new OpenAI({
    apiKey: openAIKey,
});

async function main(profileData, traitName, traitPrompt) {

    const completion = await AI.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `Based on a business customer's profile -- a combination of 'traits' (key-value pairs of human attributes) and 'events' (array of their interactions with the business; the order of these events is reverse-chronological and important to the customer experience) -- create a single JSON object with format '{${traitName}: traitValue}', to be added to the customer's profile as another trait. 'traitValue' should be the result of applying the following prompt to the profile to generate a value for the trait: '${traitPrompt}'. For example, if the customer's profile has a trait 'pets: [{"name":"Rover","size":"large","species":"dog"},{"age":1,"breed":"Maine Coon","name":"Whiskers","size":"small"}]', and the prompt is 'number of pets', the resulting trait with value would be '{count_of_pets: 2}'`
          },
          { role: "user", content: JSON.stringify(profileData) },
        ],
        model: "gpt-4-1106-preview",//"gpt-3.5-turbo-1106",
        temperature: 0.2,
        response_format: { type: "json_object" },
      });

    console.log(`${completion.usage.prompt_tokens} OpenAI tokens used`)

    return completion.choices[0].message.content
  }

export default defineEventHandler(async (event) => {

    try {
        const {profile, traitName, traitPrompt} = await readBody(event)

        const data = await main(profile, traitName, traitPrompt)

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