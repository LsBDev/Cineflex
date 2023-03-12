import styled from "styled-components"

export default function Label({text}) {

  return (
      <CaptionContainer>
        <CaptionItem>
          <CaptionCircle text={text} />
          {text}
        </CaptionItem>
      </CaptionContainer>    
  )
}

const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width:33%;
  justify-content: space-between;
  margin: 20px;
`
const CaptionCircle = styled.div`
  border: 1px solid  ${props => props.text === "Selecionado" ? "#0E7D71" : props.text === "Indisponível" ? "#F7C52B" : "#7B8B99"};
  background-color: ${props => props.text === "Selecionado" ? "#1AAE9E" : props.text === "Indisponível" ? "#FBE192" : "#C3CFD9"};  
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`