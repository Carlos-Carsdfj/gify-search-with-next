import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router' 
import Image from 'next/image'
import { LoginContext } from '../context/LoginContextCreate'
import { useForm } from "react-hook-form"
import doorImage from '../public/images/door.png'
import Layout from '../components/Layout'

export default function Login({submitFormProps = null}){
  const [isLoading, setIsLoading]= useState(false)
  const router = useRouter()
  const [user, setUser] = useContext(LoginContext)
  useEffect(()=>{
    if(user){
      router.push('/')
    }
  },[user])
  const { register, handleSubmit, formState: { errors } } = useForm();
  const submit = submitFormProps ? submitFormProps : async (data)=>{
    setIsLoading(true)
    try{
      const response = await fetch('/api/login-db',{
      method:'POST',
        body:JSON.stringify(data)
      }).then(res=>res.json())
      if(response?.user){
        setUser(response.user)
      }else{
        alert('error usuario  o contraseña incorrecta')
      }
       setTimeout(() => {
        setIsLoading(false)
      }, 5000)
    }catch(error){
      setIsLoading(false)
    }  
  }
  
  return (<Layout title='Gifi Search | Login'>
    <div className=" flex flex-wrap flex-col  sm:flex-row  justify-center items-center h-full g-6">
      <div className="w-full mb-12 md:mb-0  md:w-5/12 ">
        <Image 
          src={doorImage}
          layout='responsive'
          height={300}
          width={300}
          alt='door that is  closed'
          priority
        />
      </div>
      <form className=" md:w-5/12 lg:ml-20 "
      onSubmit={handleSubmit(submit)}   
      data-testid='form'
      >
      <div className='h-5 pt-0'><span className='text-sm m-auto'>{errors.name ? "el nombre debe ser valido" : " "}</span></div>
      <span>hola</span>
      <input 
        className=" mb-4 form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        type="text" placeholder="usuario" {...register("name", { minLength: 2,  required: true})}
        disabled={isLoading} 
        />
        <div className='h-5 pt-0'><span className='text-sm m-auto'>{errors.password ? "la contraseña es invalida" : " "}</span></div>
      <input
        className="   mb-4 form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
        type="password" placeholder="contraseña" {...register("password", { minLength: 8,  required: true})} 
        disabled={isLoading} 
      />
      <button
        className={`inline-block px-7 py-3  text-white font-medium text-sm leading-snug uppercase rounded shadow-md   focus:outline-none focus:ring-0 active:bg-blue-800  active:shadow-lg transition duration-150 ease-in-out w-full ${isLoading ? 'bg-blue-300':'bg-blue-600 focus:bg-blue-700 focus:shadow-lg hover:bg-blue-700 hover:shadow-lg'}`}
        type='submit'
        data-testid='buttonSubmit'
        disabled={isLoading}
      >
        {isLoading ? 'Verificando datos':'Iniciar sesion'}
      </button>
      </form>
    </div>
    </Layout>
  )
}
