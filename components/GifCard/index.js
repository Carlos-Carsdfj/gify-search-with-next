import Image from "next/image"
function GifCard(props) {
  return (<div className="Gif h-max rounded ">  
    <Image  className="w-full rounded "
        alt='image'
        width={200}
        height={200}
        {...props}
        layout='responsive'
    />
    <div className="flex items-center py-1 px-1 gap-2">
    <Image className="mb-3 rounded-full shadow-lg" 
      src={props.useravatar} 
      alt={props.username}
      width={60}
      height={60}
      priority={true}
    />
    <div className="">
    <h2 className="font-bold " >  
    Title : {props.alt}</h2>
    <h3 className="font-semibold" >Autor : {props.username}</h3>
    </div>
    </div>
  </div>)
}

export default GifCard