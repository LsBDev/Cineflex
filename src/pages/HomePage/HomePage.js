import { useState, useEffect } from "react"
import styled from "styled-components"
import { Link, useParams } from "react-router-dom";
import axios from "axios"
//link que me leva pra página que eu quero. Só passar a rota: <Link to="/rota">Texto linkado<Link/>

export default function HomePage() {
    const [movies, setMovie] = useState([])
    const {idSessao} = useParams()

    useEffect(() => {
        const url = "https://mock-api.driven.com.br/api/v8/cineflex/movies"
        const promise = axios.get(url)

        promise.then(response => {setMovie(response.data)})
    },[])

    console.log(movies)



    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {/* <MovieContainer>
                    <Link to="/sessoes/:idFilme">
                    <img src={"https://br.web.img2.acsta.net/pictures/22/05/16/17/59/5165498.jpg"} alt="poster"/></Link>
                </MovieContainer> */}
                {movies.map((movie) => {
                        return (
                        <MovieContainer key={movie.id}>
                            <Link to={`/sessoes/:${movie.id}`}>
                                <img src={movie.posterURL} alt={movie.title}/>
                            </Link>
                        </MovieContainer>
                        )
                })}
            </ListContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`