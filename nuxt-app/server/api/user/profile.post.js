export default defineEventHandler(async (event) => {
    const rawBody = await readBody(event)

    const userID = rawBody.userID

    const tokenString = process.env.PROFILES_PREFIX_TO_USE + 'PROFILES_ACCESS_TOKEN'
    const spaceIDString = process.env.PROFILES_PREFIX_TO_USE + 'PROFILES_SPACE_ID'
    
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            // NOTE the `:` after the Token in the below
            'Authorization': `Basic ${Buffer.from(`${process.env[tokenString]}:`).toString('base64')}`,
        },
    }

    // Because the URL changes if sending an anonymous ID
    const idLabel = rawBody.anon === 'true' ? 'anonymous_id' : 'user_id'
    console.log('fetching profile for ID: ', userID)
    const requestURL = `https://profiles.segment.com/v1/spaces/${process.env[spaceIDString]}/collections/users/profiles/${idLabel}:${userID}/traits`

    try {
            const fetchedProfile = await fetch(requestURL, options)
            const json = await fetchedProfile.json()
            // console.log(json, fetchedProfile)

            return {
                status: 'OK',
                data: json
            }
        } catch(e) {
            console.log('Error getting profile: ', e, json)
            return {
                status: 'Error',
                data: {}
            }
        }
})