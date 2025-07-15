import "./home.css"
import { useEffect, useState } from "react"
import { api } from "../../services/api"
import { Link } from "react-router-dom"

export default function Home() {

    const [filmes, setFilmes] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(() => {

        const loadFilmes = async () => {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "deec13ad83de48e47dcb58df8a9bb2c7",
                    language: "pt-BR",
                    page
                }
            })

            setFilmes(response.data.results)
            setLoading(false)
        }

        loadFilmes()

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })

        return () => loadFilmes()

    }, [page])

    function handleNext() {
        setPage(page + 1)

    }

    function handlePrevious() {
        if (page <= 1) return
        setPage(page - 1)

    }

    if (loading) {
        return <h2 className="loading">Carregando...</h2>
    }

    return (
        <main className="container">
            <div className="list-filmes">
                {filmes.map(item => (
                    <article key={item.id}>
                        <b>{item.title}</b>
                        <img src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} alt="" />
                        <Link to={`/filme/${item.id}`}>
                            Acessar
                        </Link>
                    </article>
                ))}
            </div>

            <div className="div-paginacao">
                <button style={{ cursor: page === 1 && "not-allowed" }} onClick={handlePrevious}>Página anterior</button>
                <span>{page}</span>
                <button onClick={handleNext}>Próxima página</button>
            </div>
        </main>
    )
}