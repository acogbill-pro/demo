export const useJSONFile = async (withPath) => {

    const {data} = await $fetch(withPath)

    return {
        data
    }
}