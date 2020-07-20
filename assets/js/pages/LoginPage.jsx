import React, { useState, useContext } from 'react';
import authAPI from '../services/authAPI';
import AuthContext from "../contexts/AuthContext";

const LoginPage = ({onLogin, history}) => {

    const {setIsAuthenticated} = useContext(AuthContext)

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    const [error, setError] = useState(false)

    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setCredentials({...credentials, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try{
            await authAPI.authenticate(credentials)
            setError(false)
            setIsAuthenticated(true)
            history.replace("/customers")
         } catch (error) {
             setError(true)
             console.log(error)
         }
    }

    return ( 
        <>
            <h1>Login</h1>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="__email">Email</label>
                    <input 
                        value={credentials.email} 
                        type="email" 
                        className="form-control" 
                        name="username" 
                        id="email" 
                        placeholder="email" 
                        onChange={handleChange}
                    />
                </div>
                
                <p className="invalid-feedback">Aucun compte ne possède cette adresse ou es informations ne correspondent pas</p>
                
                <div className="form-group">
                    <label htmlFor="__password">Password</label>
                    <input 
                        value={credentials.password} 
                        type="text" 
                        className="form-control" 
                        name="password" 
                        id="password" 
                        placeholder="password" 
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Connexion
                    </button>
                </div>
            </form>
        </>
     );
}
 
export default LoginPage;