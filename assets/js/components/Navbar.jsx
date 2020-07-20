import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import authAPI from '../services/authAPI';
import AuthContext from "../contexts/AuthContext"

const Navbar = ({history}) => {

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext)

    const handleLogout = () => {
        authAPI.logout();
        setIsAuthenticated(false)
        history.push("/login")
    }

    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">My App</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {isAuthenticated && 
                    <>
                        <li className="nav-item">
                            <Link to="/customers" className="nav-link">
                                Clients
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/invoices" className="nav-link">
                                Factures
                            </Link>
                        </li>
                    </>}
                </ul>
                <ul className="navbar-nav ml-auto">
                    {!isAuthenticated && 
                    <>
                        <li className="nav-item">
                            <a href="" className="btn nav-link">
                                Inscription
                            </a>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="btn btn-success">
                                Connexion
                            </Link>
                        </li>
                        </>}
                    {isAuthenticated && 
                    <>
                        <li className="nav-item">
                            <button onClick={handleLogout} className="btn btn-danger">
                                Déconnexion
                            </button>
                        </li>
                    </>}
                </ul>
            </div>
        </nav>
     );
}
 
export default Navbar;