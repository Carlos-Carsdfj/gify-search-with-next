import Cookies from 'js-cookie'
import { createContext, useState, useEffect } from 'react'

export const LoginContext = createContext()
const initialState = Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo'))
    : null


export function LoginContextProvider({children}) {
  const [user, setUser ] = useState(initialState)
  useEffect(()=>{  
    console.log('en el context')
    if(user){
      Cookies.set('userInfo', JSON.stringify(user))
    }else{
      Cookies.remove('userInfo')
    }
  }
  ,[user])
  const value = [ user, setUser ]
  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
}