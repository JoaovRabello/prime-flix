import "./header.css";
import { Link } from "react-router-dom"

function Header() {
    return (
        <header>
            <nav>
                <Link className="logo" to={"/"} >
                    Prime <span>Flix</span>
                </Link>

                <Link className="favoritos" to={"/favoritos"}>
                    Meus filmes
                </Link>
            </nav>

        </header>
    )
}

export default Header