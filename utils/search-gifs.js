
const searchGifs= async({search = '', offset = 0, limit = 10})=>{
  const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.NEXT_PUBLIC_GIPHY_APP_KEY}&q=${search}&limit=${limit}&offset=${offset}&rating=g&lang=en`)
  const responJson = await response.json()
  const { data } = responJson
  let num = 0
  const arrayGifies = data.map(gif=>({    
    idFromClient:gif.id+num++,
    id:gif.id,
    image:gif.images.fixed_width_downsampled.url,
    title:gif.title||'title is undefined',
    userAvatar:gif.user?.avatar_url||'/images/user.png',
    username:gif.user?.display_name||'anonimus',
    width:gif.images.fixed_width_downsampled.width,
    height:gif.images.fixed_width_downsampled.height
  }))
  return arrayGifies
}
export default searchGifs


