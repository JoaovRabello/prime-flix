import "./filme.css"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { api } from "../../services/api"
import toast from "react-hot-toast"

export default function Filme() {

    const { id } = useParams()
    const [filme, setFilme] = useState([{}])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {

        async function loadFilme() {
            try {
                const response = await api.get(`/movie/${id}`, {
                    params: {
                        api_key: "deec13ad83de48e47dcb58df8a9bb2c7",
                        language: "pt-BR"
                    }
                })
                setFilme(response.data)
                setLoading(false)
            } catch (err) {
                navigate("/", { replace: true })
                return
            }
        }

        loadFilme()
        return () => {
           loadFilme()
        }

    }, [])

    function handleSalvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix")

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((item) => item.id === filme.id)

        if(hasFilme){
            toast.error("Este filme já está na sua lista")
            return
        }

        filmesSalvos.push(filme)
        localStorage.setItem("@primeflix",JSON.stringify(filmesSalvos))

        toast.success("Filme salvo com sucesso!")
    }

    if (loading) {
        return <h3 className="loading">Carregando detalhes...</h3>
    }


    return (
        <div className="filme-info">
            <b>{filme.title}</b>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt="background filme" />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <h4>Avaliação: {filme.vote_average.toFixed(2)} / 10</h4>

            <div className="area-buttons">
                <button onClick={handleSalvarFilme}>Salvar</button>
                <button>
                    <a target="blank" href={`https://www.youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    )
}