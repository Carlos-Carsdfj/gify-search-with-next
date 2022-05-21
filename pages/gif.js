import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { LoginContext } from 'context/LoginContext'
import Layout from 'components/Layout'
export default function Gif() {
  const [gif, setGif] = useState(null)
  const router = useRouter()
  const idGIf = router.query.gif
  const [user] = useContext(LoginContext)
  useEffect(()=>{
    if(!user){
      router.push('/login')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])
  useEffect(()=>{
    fetch(`https://api.giphy.com/v1/gifs/${idGIf}?api_key=nokEIpoUxC3kQQW3gCN7rtLm219qmBeh`)
    .then(res=>res.json())
    .then((res)=>{
      const data = res.data
      const gifFromServer = {
        id:data.id,
        image:data.images?.downsized_large?.url||'/images/user.png',
        title:data.title||'title is undefined',
        userAvatar:data.user?.avatar_url||'/images/user.png',
        username:data.user?.display_name||'anonimus',
        width:data.images?.downsized_large?.width ||'600',
        height:data.images?.downsized_large?.height||'600',
        description: data.user?.description||'does not have',
        websiteUrl: data.user?.website_url ||'does not have',
        instagramUrl: data.user?.instagram_url ||'does not have'
      }
      setGif(gifFromServer)
    },[])
  })
  if(gif){
    return (<Layout title ='Gify Search | Gif' config={{showback:true,showlogout:true}}>
    <div className="grid py-1.5 px-1.5 m-0 grid-cols-1 grid-rows-2 min-h-[600px] gap-4 content-center  items-stretch justify-items-center md:grid-cols-3 md:grid-rows-1 ">
    <div
      className="shadow-md shadow-black-500 rounded-md row-span-1 col-span-1 w-11/12 object-scale-down  md:col-span-2 p-0 "
    >
    <Image
      src={gif.image}
      alt={gif.title}
      width={500}
      height={500}
     layout='responsive'
    /></div>
    <div className="p-4 text-center  w-full">
      <h3 className="   font-bold tracking-tight  text-4xl mt-0 mb-2 text-blue-600">
        {gif.title}
      </h3>
      <p className="text-gray-700 text-base mb-4">
        {gif.description}
      </p>
      <hr className="my-6 border-gray-300" />
      <div className="border border-gray-600 rounded-md flex flex-col">
      <span className=" flex justify-between px-1.5">
          user:<p>{gif.username}</p>
        </span>
        <span className=" flex justify-between px-1.5">
          website:<p>{gif.websiteUrl}</p>
        </span>
        <span className="flex justify-between px-1.5">
          instagram :<p>{gif.instagramUrl}</p>
        </span>
      </div>
    </div>
  </div>
  </Layout>
  )}
}
