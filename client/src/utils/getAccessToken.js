const getAccessToken = () => {
    const authJSON = localStorage.getItem('auth')

    if(!auth){
        return ''
    }

    const authData = JSON.parse(authJSON);

    return authData?.accessToken    
}


getAccessToken()