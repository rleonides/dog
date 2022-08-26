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
import dog_ownwer from "../../assets/img/png/logo/dog_owner_.png";
import dog_walker from "../../assets/img/png/logo/dog_walker.jpg";
const Navbar = (props) => {
  const { isLogged, newLogUp, logOut,info } = props
  return (
    <Container  isLogged = {isLogged} >
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
          <div className="flex items-center justify-center h-full mr-2 wrap"> 
               {info?.role === 'Paseador'?(<img
              className={`hover:cursor-pointer hover:opacity-100  h-[70%] rounded-full [border:2px_solid_rgb(148_163_184)]`}
              src={dog_walker}
              alt=""
            />):
            (<img
              className={`hover:cursor-pointer hover:opacity-100  h-[70%] rounded-full [border:2px_solid_rgb(148_163_184)] `}
              src={dog_ownwer}
              alt=""
            />)}

            <RiLogoutBoxRLine className='text-3xl ml-2   hover:text-[#5C5F30] font-bold hover:cursor-pointer text-[#D6DD70]'
           onClick={()=>logOut({type:'LOG_OUT'})}/>
           
           </div>
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
  isLogged: account.isLogged,
  info: account.info
})

function mapDispatchToProps(dispatch) {
  return {
    newLogUp:dispatch,
    logOut:dispatch
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(Navbar)