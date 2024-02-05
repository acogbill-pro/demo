export default defineEventHandler(async (event) => {
    const rawBody = await readBody(event)

    const {userID, isAnon} = rawBody

    const tokenString = process.env.PREFIX_TO_USE + 'PROFILES_ACCESS_TOKEN'
    const token = `${process.env[tokenString]}:`
    const spaceIDString = process.env.PREFIX_TO_USE + 'PROFILES_SPACE_ID'
    const spaceID = process.env[spaceIDString]
    // console.log('TOKEN', token)
    
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(token).toString('base64')}`,
            'Accept-Encoding': 'zlib',
        },
        
    }

    // Because the URL changes if sending an anonymous ID
    const idLabel = isAnon === 'true' ? 'anonymous_id' : 'user_id'
    
    const requestURL = `https://profiles.segment.com/v1/spaces/${spaceID}/collections/users/profiles/${idLabel}:${userID}/traits?limit=200`
    console.log('fetching traits for ID: ', userID, requestURL)
    try {
            const fetchedProfile = await fetch(requestURL, options)
            
            const json = await fetchedProfile.json()
            console.log(json)

            return {
                status: 'OK',
                data: json
            }
        } catch(e) {
            console.log('Error getting profile: ', e)
            return {
                status: 'Error',
                data: {}
            }
        }
})