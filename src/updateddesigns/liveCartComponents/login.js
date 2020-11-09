import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import firebase from '../../config'


const LoginForm = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [login, setLogin] = useState(false)
   const {register, handleSubmit, errors, reset} = useForm()
   const onSubmit = async (data) => {
       setLoading(true)
       console.log(data)
       try{
           const cred = await firebase.auth().signInWithEmailAndPassword(data.email, data.password)
           if(cred.user.uid !== sessionStorage.getItem('RoleId')) throw 'Wrong User'
           setLogin(true)
       }
       catch(e){
           console.log(e)
           setError(e.message)
           setLogin(false)
       }
       setLoading(false)
       reset()
   }

   const beforeLogin = (!loading ? <button onClick={handleSubmit(onSubmit)}>Check</button> : <div>cheking</div>)

   return (
       <div>       
            {error}
           <div>
               {errors.email && errors.email.message}
               <label>Email</label>
               <input name="email" ref={register({ required: 'This is required' })} />
               {errors.password && errors.password.message}
               <label>Password</label>
               <input name="password" type="password" ref={register({ required: 'This is required' })} />
               {login ? (<div>authenticated</div>) : beforeLogin}
           </div>
        </div>

   )
}

export default LoginForm