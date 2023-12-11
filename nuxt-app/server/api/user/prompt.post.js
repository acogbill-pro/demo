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

async function main(profileData, prompt) {

    const completion = await AI.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `Refactor a business customer's 'traits' (key-value pairs of human attributes) and 'events' (array of their interactions with the business; the order of these events is reverse-chronological and important to the customer experience; please emphasize recent/extraordinary behaviors and deemphasize default or frequent activities like Home Page and Account Page visits), in a JSON object under the key 'result'. The result should only contain one sentence, and follow this prompt: ${prompt}.`,
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


function countTokens(messages) {

    const enc = getEncoding("gpt2");
    assert(enc.decode(enc.encode(messages)) === messages);
}

export default defineEventHandler(async (event) => {

    try {
        const {profile, prompt} = await readBody(event)

        const data = await main(profile, prompt)

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