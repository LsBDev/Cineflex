import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import Button from "./Button"

export default function SeatsPage() {
    const [seats, setSeats] = useState()
    const {idSessao} = useParams()
    const [selected, setSelected] = useState([])

    // console.log(seats)
    console.log(selected)

    useEffect(() => {
        const id = idSessao.replace(':' , '')
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${id}/seats`
        const promise = axios.get(url)

        promise.then((res) => setSeats(res.data))
        promise.catch((err) => console.log(err.response))
    }, [idSessao])

    function selecionar(seat) {
        const selec = [...selected, seat]
        console.log(selec)
        setSelected(selec)
       
    }

    if(seats === undefined) {
        return
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s) 
            <SeatsContainer>           
                {seats.seats.map((seat) => {
                    return (
                        <SeatItem onClick={() => selecionar(seat.id)} selected={selected} seat={seat}>{seat.name}</SeatItem>
                    )
                } )}
            </SeatsContainer>


            <Container>
                <Button text='Selecionado'/>
                <Button text='Disponível'/>
                <Button text='Indisponível'/>
            </Container>
            

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." />

                <button>Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={seats.movie.posterURL} alt={seats.movie.title} />
                </div>
                <div>
                    <p>{seats.movie.title}</p>
                    <p>{seats.day.weekday} - {seats.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
    
}

const Container = styled.div `
  display: flex;
`
const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    display: flex;
    width: 330px;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const SeatItem = styled.div`
    border: 1px solid ${(props) => props.seat.isAvailable ? (props.selected.includes(props.seat.id) ? "#0E7D71" : "#7B8B99") : "#F7C52B"};
    background-color: ${(props) => props.seat.isAvailable ? (props.selected.includes(props.seat.id) ? "#1AAE9E" : "#C3CFD9") : "#FBE192"};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`