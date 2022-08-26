import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  background: #FFFFF9;
  display: flex;
  flex: 1;
  justify-content: space-evenly;
  width:100%;
 
`

export const Logo = styled.img`
  flex: 1 ;
 
`

export const FormContainer = styled.div`
  align-items: start;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0px 3px 10px 2px rgba(0,0,0,0.3);
  border-radius: 10px
  width:800px;
  height:200px
`

export const Title = styled.h3`
  font-size: 2rem;
  margin-bottom: 5%;
  margin:-25px 0 10px;
  border-bottom:2px solid #d6dd70;
  padding: 0 15px;
  font-weight:bold;
  
`
