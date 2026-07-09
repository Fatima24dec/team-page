import axios from 'axios'


const authHeader = () => ({})


const client = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_ENDPOINT}`,
    headers: {},
})


class httpClient {
    static get<T = any>(path = '', config = {}) {
        return client.get<T>(`${path}`, {
            ...config,
            headers: {
                ...authHeader(),
                ...((config as any).headers || {})
            },
        })
    }


}

client.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error

        if (response) {
            if (response.status === 500) {
            }
        }

        return Promise.reject(error)
    },
)

export {httpClient}