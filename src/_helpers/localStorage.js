let token = null

export const getConfig = () => {
    
    try {
        token = localStorage.getItem('userToken')    
    } catch (error) { 
    }
    const config  = {
        headers: {'Authorization': "Bearer " + token}
    }

    return config
}