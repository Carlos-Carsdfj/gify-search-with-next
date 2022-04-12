import  { useState } from 'react'
import SvgComponent from './SvgComponent'
export default function SearchBox({setGifs, titleSearch ='search'}) {
  const  [ textToSearch, setTextToSearch ] = useState('')
  const handleTextChanged = (ev) =>{
    const text = ev.target.value
    setGifs(text)
    setTextToSearch(text)
  }
  const submit = (ev)=>{
    ev.preventDefault()
   // setGifs(textToSearch)
  }
  return (<>
    <label htmlFor='inputSearch'>
    { titleSearch }
  </label>

    <form className='flex h-10 mt-2 gap-2 border-2 rounded-md border-blue-500 p-1' onSubmit={submit}>

      <input id='inputSearch' type="text"  className='form-control outline-none'
        value={textToSearch}
        onChange={handleTextChanged}
      />
      <button className='px-5 flex  justify-center items-center bg-blue-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out  align-center'
        aria-label="Center Align"
      >
        <SvgComponent/>
      </button>

    </form>
</>
  )
}
