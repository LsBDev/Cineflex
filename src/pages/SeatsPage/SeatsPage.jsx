import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import styled from "styled-components"
import Label from "./Label"

export default function SeatsPage({seats, setSeats, setInfo}) {
    
    const {idSessao} = useParams()
    const [selected, setSelected] = useState([])
    const [name, setName] = useState("")
    const [cpf, setCpf] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        // const id = idSessao.replace(':' , '')
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`
        const promise = axios.get(url)

        promise.then((res) => setSeats(res.data))
        promise.catch((err) => console.log(err.response))
    }, [idSessao, setSeats])


    function selecionar(seat)  {
        const arr = [...selected]
        const arrIds = arr.map(item => item.id)
        if(seat.isAvailable === false) {
            alert("Esse assento não está disponível")
        }
        if(arrIds.includes(seat.id)) {
            setSelected(arr.filter((item) => item.id !== seat.id) )
        } else if(seat.isAvailable === true) {
            setSelected([...selected, seat])
        }
    }

    function reservar(seats, name, cpf) {
        const arrayIds = seats.map((item) => item.id)
        const object = {ids: arrayIds, name: name, cpf: cpf}
        const url = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many"
        const promise = axios.post(url, object)
        promise.then(() => {
            setInfo({name: name, cpf: cpf, seats: seats.map((item) => item.name)})
            navigate("/sucesso")})
    }

    // function selecionar(seat) {
    //     const arr = []
    //     let lightSwitch = false
    //     for(let i = 0; i < selected.length; i++) {
    //         if (selected[i] !== seat) {
    //             arr.push(selected[i])
    //         } else {
    //             lightSwitch = true
    //         }
    //     }
    //     if(lightSwitch === false) {
    //         setSelected([...arr, seat])            
    //     } else {
    //         setSelected([...arr])
    //     }
    // }

    if(seats === undefined) {
        return
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s) 
            <SeatsContainer>           
                {seats.seats.map((seat, index) => {
                    return (
                        <SeatItem data-test="seat" key={index} onClick={() => selecionar(seat)} selected={selected.map(item => item.id)} seat={seat}>{seat.name}</SeatItem>
                    )
                } )}
            </SeatsContainer>


            <Container>
                <Label text='Selecionado'/>
                <Label text='Disponível'/>
                <Label text='Indisponível'/>
            </Container>
            

            <FormContainer>
                Nome do Comprador:
                <input data-test="client-name" value={name} onChange={e => setName(e.target.value)} placeholder="Digite seu nome..." required/>
                CPF do Comprador:
                <input data-test="client-cpf" value={cpf} onChange={e => setCpf(e.target.value)} placeholder="Digite seu CPF..." required/>
                <button data-test="book-seat-btn" onClick={() => reservar([...selected], name, cpf)}>Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer data-test="footer">
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