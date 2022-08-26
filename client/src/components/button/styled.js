import styled from 'styled-components'

export const ButtonContainer = styled.button`
  background: ${({secondary}) => secondary ? '#D6DD70' : '#5C5F30'};
  border-radius: 5px;
  border: 0;
  box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.3);
  padding: .5rem 1rem;
  ${({ wide }) => wide && 'width: 90%;'}
  &:hover {
    background: ${({secondary}) => secondary ? '#FFFFF9' : '#D6DD70'};
    cursor:pointer;
  }
  &:disabled {
    background: #9A9A9A;
  }
  margin:0 10px 5px;

  
`

export const Text = styled.span`
  color: ${({secondary}) => secondary ? '#5C5F30' : '#FFFFF9'};
  ${({ wide }) => wide && 'font-size: 1.3rem;'}
  ${ButtonContainer}:hover & {
    color: #5C5F30;
  }
  ${ButtonContainer}:disabled & {
    color: #FFFFF9;
  }
`