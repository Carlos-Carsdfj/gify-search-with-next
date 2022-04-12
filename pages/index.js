
import { useState, useEffect } from 'react'
import Image from 'next/image'
import SearchBox from 'components/SearchBox'
import GifCard from 'components/GifCard'

export default function Home() {
  const [gifs, setGifs] = useState('')
  const [gifsList, setGifsList ] = useState([])
  useEffect(()=>{
    if(gifs ===''){
    fetch('/api/search-all').then(res=>res.json()).then(res=>{
      setGifsList(res.gifsList)
    })}else{
      const search = encodeURI(gifs)
        fetch(`/api/search-gifs?to_search=${search}`).then(res=>res.json()).then(res=>{
          setGifsList(res.gifsList)})
    }
  },[gifs])
  return (<>
    <div className="  flex flex-col items-center justify-center w-full" >
      <h1 className='font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600'>Gify Search</h1>
      <SearchBox  setGifs={setGifs} titleSearch={'type and have fun'} />
      <hr className="my-6 "/>
    </div>
    <div className="container mx-auto">
    <div className="grid grid-flow-row-dense grid-cols-3  gap-x-2 gap-y-1  ">
   {  gifsList.map(gif=>
          <GifCard 
            key={gif.id} 
            src={gif.image}
            alt={gif.title}
            width={gif.width}
            height={gif.height}
            username={gif.username}
            userAvatar={gif.userAvatar}
          />
        )
}   
      </div>
      <div className="text-center">
      <button className=" text-center text-gray-800 font-bold py-2 px-4 rounded flex-col justify-center    items-center ">
  <span>SHOW MORE </span>
  
</button>
</div>
      </div>
      </>
  )
}
