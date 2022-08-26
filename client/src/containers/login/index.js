import React from "react";
import { Formik } from "formik";
import { Button, Input } from "../../components";
import { logInValidation } from "../../validationSchemas";
import { Container, FormContainer, Logo, Title } from "./styled";
import loginImg from "../../assets/img/png/logo/dog.jpg";
import { logIn } from "../../redux_actions/redux-actions";
import { connect } from "react-redux";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import {Redirect} from "react-router-dom";
const initialValues = {
  email: "",
  password: "",
};

const LogIn = (props) => {
  return (
    <Container>
      {props.account.isLogged ? (
        <Redirect
          to={{
            pathname: "/Dashboard",
          }}
        />
      ) : null}
      <div className="hidden sm:block">
        <Logo
          src={require("../../assets/img/png/logo/dogger_logo.png")}
          alt="Dogger"
        />
      </div>
      <div className="show-anim relative md:w-96 md:h-96 w-[60%] h-[60%] bg-black/40 rounded-3xl flex justify-start  items-center flex-col shadowbox">
        <div className="flex flex-col items-center justify-center w-full py-4 text-center rounded-t-3xl gorw">
          <div className="flex items-center justify-center w-full text-center">
            <img
              className="w-[30%] rounded-full [border:2px_solid_#D6DD70] "
              src={loginImg}
              alt=""
            />
          </div>
          <h1 className="text-xl font-bold text-[#D6DD70]">Iniciar Sesión</h1>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={logInValidation}
          onSubmit={(values, actions) => {
            console.log("formik props >>>", values);
            props.onSubmit(values);
            actions.setSubmitting(false);
            actions.resetForm();
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            handleBlur,
            isSubmitting,
            isValid,
          }) => {
          //  console.log(props.account)
            return (
              <div className="relative flex flex-col flex-wrap items-center justify-center w-full grow">
                  {props.account.logInError ? (
                    <p className="absolute inset-0 flex flex-col items-center justify-center text-xl font-bold rounded-b-3xl show-anim text-amber-300 bg-lime-900/50">
                       <AiOutlineCloseCircle className="absolute text-6xl top-1 text-slate-200/50 hover:text-slate-200 hover:cursor-pointer" onClick={()=>props.closeError({type:"RESET"})}/>
                      <span>{props.account.logInError}</span>
                    </p>
                  ) : null}
                <div className="-mt-10  w-[90%]">
                  <Input
                    error={errors.email}
                    label="Correo"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                  />
                </div>
                <div className=" w-[90%]">
                  <Input
                    error={errors.password}
                    label="Contraseña"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                  />
                </div>
                <div className=" w-[90%]">
                  <Button
                    disabled={!isValid || isSubmitting}
                    onPress={handleSubmit}
                    wide
                  >
                    Entrar
                  </Button>
                </div>
              </div>
            );
          }}
        </Formik>
      </div>
    </Container>
  );
};
function mapLoginDispatchToProps(dispatch) {
  return {
    onSubmit: (obj) => {
      dispatch(logIn(obj));
    },
    closeError:dispatch
  };
}

const mapLoginStateToProps = ({ account }) => ({
  account,
});

const ReduxLogin = connect(
  mapLoginStateToProps,
  mapLoginDispatchToProps
)(LogIn);

//Se elimino un campo de correo y se agrega un input address
export default ReduxLogin;

// <Logo src={require('../../assets/img/png/logo/dogger_logo.png')} alt='Dogger' />
