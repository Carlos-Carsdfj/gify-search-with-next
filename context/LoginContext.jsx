import Cookies from 'js-cookie'
import {  useState, useEffect } from 'react'
import { LoginContext } from './LoginContextCreate'


const initialState = Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo'))
    : null


export function LoginContextProvider({children}) {
  const [user, setUser ] = useState(initialState)
  useEffect(()=>{  
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