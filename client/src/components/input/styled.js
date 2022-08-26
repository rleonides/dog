import styled from 'styled-components'

export const ErrorLabel = styled.label`
  color: #D1551A;
  margin: 5px;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  width: 90%;
 
  margin:0 auto;
`

export const InputElement = styled.input`
  border-radius: 5px;
  border: 0;
  border-bottom: ${({error}) => error ? '2px solid #D1551A' : 0};
  padding: 5px;
  marging: 10px 0;
  box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.3);
  &:focus {
    border: 0;
  }
`

export const Label = styled.label`
  color: #5C5F30;
  margin: 5px;
`
