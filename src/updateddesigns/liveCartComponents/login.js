import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import ReactLoading from 'react-loading'
import firebase from '../../config'


const LoginForm = ({auth}) => {
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
           setError('Username / Password is incorrect')
           setLogin(false)
       }
       setLoading(false)
       reset()
   }
   useEffect(() => {
       auth(login)
   }, [login])
   const loadingSign = loading ? <ReactLoading type= 'spin' color="#fff" style={null} /> : null
   const beforeLogin = <span width='100%' onClick={handleSubmit(onSubmit)}>{loadingSign} {loading ? 'Checking' : 'Check'}</span>

   return (
       <div width='100%'>       
           <div width="100%">
                <div className="col-12 w-100-row">
                    <div className="row form-group">
                        <div className="col col-md-4">
                            <label className="form-control-label">Username</label>
                        </div>
                       <div className="col-12 col-md-6">
                           <input className="form-control edit_product" name="email" ref={register({ required: 'This is required' })} />
                           <p className="error">{errors.password && errors.password.message}</p>
                       </div>
                    </div>
                </div>
                <div className="col-12 w-100-row">
                    <div className="row form-group">
                        <div className="col col-md-4">
                            <label className="form-control-label">Password</label>
                        </div>
                       <div className="col-12 col-md-6">
                           <input className="form-control edit_product" type="password" name="password" ref={register({ required: 'This is required' })} />
                           <p className="error">{error}</p>
                           <p className="error">{errors.password && errors.password.message}</p>
                           <p className="btn con-btn-pop">{login ? ('Authenticated') : beforeLogin}</p>
                       </div>
                    </div>
                </div>
           </div>
        </div>

   )
}

export default LoginForm