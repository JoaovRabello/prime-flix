import { Link } from "react-router-dom"
import "./favoritos.css"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"


function Favoritos() {
    const [filmesFavoritos, setFilmesFavoritos] = useState([])

    useEffect(() => {

        function getFilmesStorage() {
            const localFilmes = localStorage.getItem("@primeflix")
            setFilmesFavoritos(JSON.parse(localFilmes) || [])
        }

        getFilmesStorage()

        return () => getFilmesStorage
        
    }, [])

    function handleRemove(id) {
        const filtroFilmes = filmesFavoritos.filter((item) => item.id !== id)

        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes))

        setFilmesFavoritos(filtroFilmes)

        toast.success(`Filme deletado com sucesso!`)
    }

    return (
        <div className="container">
            <h1>Meus filmes</h1>

            {filmesFavoritos.map(item => (
                <article className="item" key={item.id}>

                    <span className="ellipsis">{item.title}</span>

                    <div className="div-info">
                        <Link to={`/filme/${item.id}`}>
                            Ver detalhes
                        </Link>
                        <button onClick={() => handleRemove(item.id)}>Excluir</button>
                    </div>

                </article>
            ))}

            {filmesFavoritos.length === 0 && (
                <p className="text">Nenhum filme favorito encontrado :(</p>
            )}
        </div>
    )
}

export default Favoritos