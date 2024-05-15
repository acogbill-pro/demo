export default defineEventHandler(async (event) => {
    // console.log('hello world')
    const rawBody = await readBody(event)
    console.log('Logger called for:', rawBody)

    // const tokenString = process.env.PREFIX_TO_USE + 'PROFILES_ACCESS_TOKEN'
    // const token = `${process.env[tokenString]}:`
    // const spaceIDString = process.env.PREFIX_TO_USE + 'PROFILES_SPACE_ID'
    // const spaceID = process.env[spaceIDString]
    // console.log('TOKEN', token)
    
    // const options = {
    //     method: "GET",
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Basic ${Buffer.from(token).toString('base64')}`,
    //         'Accept-Encoding': 'zlib',
    //     },
        
    // }

    // Because the URL changes if sending an anonymous ID
    // const idLabel = 'phone'//isAnon ? 'anonymous_id' : 'user_id'
    
    // const requestURL = `https://profiles.segment.com/v1/spaces/${spaceID}/collections/users/profiles/${idLabel}:${idValue}/traits?limit=200`
    // console.log(`fetching traits for ${idLabel}: ${idValue}`, requestURL)
    // try {
    //         const fetchedProfile = await fetch(requestURL, options)
            
    //         const json = await fetchedProfile.json()
    //         console.log(json)

    //         return {
    //             status: 'OK',
    //             data: json
    //         }
    //     } catch(e) {
    //         console.log('Error getting profile: ', e)
    //         return {
    //             status: 'Error',
    //             data: {}
    //         }
    //     }
})