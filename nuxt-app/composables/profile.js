const exampleVar = ref('Example')

export const useProfile = () => {
    return {
        forUser: async () => {
            return useAsyncData("user", async () => {
                const runtimeConfig = useRuntimeConfig()
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        //'Authorization
                    },
                    body: null//JSON.stringify(dataToPass)
                }
                const {data} = await $fetch('/api/user/profile', options)

                return data
            })
        },
        getName: computed(async () => {
            const {data} = await useProfile().forUser()

            // transform data here

            return data.value.name // note the .value!
        }),

    }
}