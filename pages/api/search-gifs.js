// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const gifs = req.query.to_search
  const offset = req.query.offset
  const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_APP_KEY}&q=${gifs}&limit=10&offset=${offset}&rating=g&lang=en`)
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
