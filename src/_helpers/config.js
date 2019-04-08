import { userConstants } from "../constants/user.constants";

let token = null

export const getConfig = () => {
    
  try {
      token = localStorage.getItem(userConstants.USER_TOKEN)    
  } catch (error) { 
  }
  const config  = {
      headers: {'Authorization': "Bearer " + token}
  }

  return config
}