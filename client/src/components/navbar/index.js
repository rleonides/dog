import React from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { Button } from '../'
import {
  ButtonsContainer,
  Container,
  Logo,
  Title,
  TitleContainer
} from './styled' 
import { RiLogoutBoxRLine } from 'react-icons/ri';
import {Redirect} from "react-router-dom";

const Navbar = (props) => {
  const { isLogged, newLogUp, logOut } = props
  //console.log(isLogged)
  return (
    <Container>
      <TitleContainer>
        <Logo src={require('../../assets/img/png/logo/dogger_icon.png')} alt='Logo' />
        <Link to="/" style={{ textDecoration: 'none'}}>
          <Title>
            Dogger
          </Title>
        </Link>
      </TitleContainer>
      { !isLogged?
        (
          <ButtonsContainer>
            <Link to="/log-up">
              <Button onPress={()=>newLogUp({type:'REGISTERED', payload: false})}>
                Registrarse
              </Button>
            </Link>
            <Link to="/log-in">
              <Button secondary>
                Iniciar sesión
              </Button>
            </Link>
          </ButtonsContainer>
        ):(
          <div><RiLogoutBoxRLine className='text-2xl hover:text-3xl animation hover:text-[#5C5F30] font-bold hover:cursor-pointer text-[#D6DD70]'
           onClick={()=>logOut({type:'LOG_OUT'})}/></div>
        )
      }
         {!isLogged && (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      ) }
    </Container>
  )
}

const mapStateToProps = ({ account }) => ({
  isLogged: account.isLogged
})

function mapDispatchToProps(dispatch) {
  return {
    newLogUp:dispatch,
    logOut:dispatch
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(Navbar)