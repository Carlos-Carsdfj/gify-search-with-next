
import { useState, useEffect } from 'react'
import Head from 'next/head'
import SearchBox from 'components/SearchBox'
import GifCard from 'components/GifCard'
import { SkeletonCards } from 'components/SekeletonCards'
import { searchAll, searchGifs } from 'utils/giphy-search'

export default function Home() {
  const [gifs, setGifs] = useState('')
  const [gifsList, setGifsList ] = useState([])
  const [isLoading, setIsLoading ] = useState(false) 
  const [isSearching, setIsSarching ] = useState(false) 

  const [ offset, setOffset] = useState(0)
  useEffect(()=>{
    if(gifs ===''){
      setIsSarching(true)
    searchAll(0).then(res=>{
      setGifsList(res)
      setOffset(0)
      setIsSarching(false)
    }).catch((err)=>{
      console.error(err)
      setIsSarching(false)
    })
  }else{
      setIsSarching(true)
        searchGifs(gifs,0).then(res=>{
          setGifsList(res)
          setOffset(0)
          setIsSarching(false)
        }).catch((err)=>{
          console.error(err)
          setIsSarching(false)
        })
    }
    
  },[gifs])  
  const handeShowMore = ()=>{
    if(gifs.length > 0){
    setIsLoading(true)
      searchGifs(gifs, offset+11).then(res=>{
        setGifsList(prev=>prev.concat(...res))
        setIsLoading(false)
      }).catch((err)=>{
        console.error(err)
        setIsLoading(false)
      })    
    }
    setOffset(prev=>prev+10)
  }
  
  return (<>
        <Head>
        <title>Gify Search</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Do you like gifs? Here is a search engine to find your favorite gifs"/>
      </Head>
    <div className="  flex flex-col items-center justify-center w-full" >
      <h1 className='font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600'>Gify Search</h1>
      <SearchBox  setGifs={setGifs} titleSearch={'type and have fun'} />
      <hr className="my-6 "/>
    </div>
    <div className="container mx-auto p-2">{        isSearching ?<SkeletonCards/>
     :
    <div className="grid grid-flow-row-dense grid-cols-1 lg:grid-cols-3  gap-x-2 gap-y-1  ">
   {gifsList.map(gif=>
          <GifCard 
            key={gif.id} 
            src={gif.image}
            alt={gif.title}
            width={gif.width}
            height={gif.height}
            username={gif.username}
            useravatar={gif.userAvatar}
          />
        )
}   
      </div>}
      <div className="text-center">{  
        isLoading ? <span>
    Processing...</span>
     : <button className={`text-center text-gray-800 font-bold py-2 px-4 rounded flex-col justify-center    items-center ${gifs.length >0 ? '' : 'hidden' }`}
      onClick={handeShowMore}>
  <span>SHOW MORE </span>
</button>}
</div>
      </div>
      </>
  )
}
