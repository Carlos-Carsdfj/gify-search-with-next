export default async function handler(req, res) {
  
  const response = await fetch('https://api.giphy.com/v1/gifs/trending?api_key=XPKc3fqLS3FLGYde6wV8GVWutwfeERM3')
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
    res.status(200).json({gifsList: arrayGifies})
}