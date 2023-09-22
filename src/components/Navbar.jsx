import CartWidget from "./CartWidget"
import Logo from "../img/logo.png"
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div>                     
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={Logo} alt="Logo New Computers" width="200" />
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link typo-menu" to="/category/notebook">Notebooks</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link typo-menu" to="/category/gabinete">Gabinetes</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link typo-menu" to="/category/monitor">Monitores</NavLink>
                            </li>
                            <li className="nav-item ">
                                <NavLink className="nav-link typo-menu" to="/category/componente">Componentes</NavLink>
                            </li>                                                      
                        </ul>
                    </div>
                    <div className="img-carrito">
                        <CartWidget />                        
                    </div>
                </div>
            </nav>                             
        </div>
    )
}

export default Navbar;
