import styled from 'styled-components'


export const ButtonsContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
 
`

export const Container = styled.nav`
  align-items: center;
  box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.3);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 0.8rem;
  z-index: 1000;
  width:100%;
  @media (max-width:460px) {
    flex-direction:colum;
    justify-content: center;
    width:100%
  }
`

export const Logo = styled.img`
  height: 3.2rem;

`

export const Title = styled.h2`
  color: #5C5F30;
  font-size: 2rem;
  font-weight:bold;
  text-decoration: none;
  margin-left: 5px ;
  &:hover {
    text-shadow:  2px 4px 4px rgba(0,0,0,0.8);
  }
  text-shadow:  1px 2px 2px rgba(0,0,0,0.8);

`

export const TitleContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 5px 0;

  height:80px;
 
  @media (max-width:460px) {
    height:initial;
  }
`
