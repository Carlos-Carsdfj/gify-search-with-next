export  async function searchAll(offset) {

    const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${process.env.NEXT_PUBLIC_GIPHY_APP_KEY}&limit=20&offset=${offset}`)
    const responJson = await response.json()
    const { data } = responJson
    const arrayGifies = data.map(gif=>({    
        id:gif.id,
        image:gif.images.fixed_width_downsampled.url,
        title:gif.title||'title is undefined',
        userAvatar:gif.user?.avatar_url||'/images/user.png',
        username:gif.user?.display_name||'anonimus',
        width:gif.images.fixed_width_downsampled.width,
        height:gif.images.fixed_width_downsampled.height
      }))
     return new Promise(resolve=>resolve(arrayGifies))
}

export  async function searchGifs(gifs, offset) {

        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.NEXT_PUBLIC_GIPHY_APP_KEY}&q=${gifs}&limit=10&offset=${offset}&rating=g&lang=en`)
        const responJson =  await response.json()
        const { data } = responJson
        const arrayGifies = data.map(gif=>({    
        id:gif.id,
        image:gif.images.fixed_width_downsampled.url,
        title:gif.title||'title is undefined',
        userAvatar:gif.user?.avatar_url||'/images/user.png',
        username:gif.user?.display_name||'anonimus',
        width:gif.images.fixed_width_downsampled.width,
        height:gif.images.fixed_width_downsampled.height
        }))
     return new Promise(resolve=>resolve(arrayGifies))
    

}
  