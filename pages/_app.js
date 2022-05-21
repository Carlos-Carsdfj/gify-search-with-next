import '../styles/globals.css'
import { LoginContextProvider } from 'context/LoginContext'
function MyApp({ Component, pageProps }) {
  return <LoginContextProvider><Component {...pageProps} /></LoginContextProvider>
}

export default MyApp
