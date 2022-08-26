import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  background: #FFFFF9;
  display: flex;
  flex: 1;
  justify-content: space-evenly;
  width:100%;
  position:relative;
 
`

export const Logo = styled.img`
  flex: 1;
  padding: 0 5%;
`

export const TextContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 90%;
  justify-content: space-evenly;

  padding: 0 20px;
  z-index:10;
  
`

export const Title = styled.h3`
  font-size: 2rem;
  margin: 7.5px;
  ${({align}) => `text-align: ${align};`}
`

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

export const SubTitle = styled.h3`
  font-size: 2.5rem;
  
`

export const Paragraph = styled.p`
  font-size: 1.5rem;
`
