import { useRouter } from 'next/router'
import Head from 'next/head'
import LogoutButton from './LogoutButton'
import GoBackSvg from './GoBackSvg'
 
export default function Layout({children, title, config={showlogout:false, showback:false} }) {
  const router = useRouter()
  
  return (
  <>
    <Head>
      <title>{title || 'Gify Search'}</title>
      <link rel="icon" type="image/png" href="favicon.png" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="Do you like gifs? Here is a search engine to find your favorite gifs"/>
    </Head>
     <header className='flex flex-grow justify-between items-center flex-row-reverse pt-3'>
    { config.showlogout &&<LogoutButton />}
    {  config.showback &&
        <button
          className=''
          onClick={()=>router.back()}><GoBackSvg /></button>}
      </header>
    {children}
    </>
  )
}
