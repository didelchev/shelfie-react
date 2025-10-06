const requester = async (url, options) => {
    const response = await fetch(url, options)

    if(response.status === 204 ){
        return 
    } 

    const result = await response.json().catch(() => ({message: `Server error: ${response.status}`}))

    if(!response.ok) {
        throw result
    }

    return result
}


const createOptions = (method, data) => {

    const accessToken = localStorage.getItem('auth')

    const options = {
        method,
        headers: {}
    }

    if (accessToken) {
        options.headers['X-Authorization'] = accessToken;
    }

    if(data){ 
        options.headers = { 
            ...options.headers,
            'Content-Type': 'application/json'
        }
        options.body = JSON.stringify(data)
    }


    return options
}

export const api = {
    get(url){
        return requester(url, createOptions('GET'))
    },
    post(url, data){
        return requester(url, createOptions('POST', data))
    },
    put(url, data){
        return requester(url, createOptions('PUT', data))
    },
    patch(url, data){
        return requester(url, createOptions('PATCH', data))
    },
    del(url){
        return requester(url, createOptions('DELETE'))
    }
}

