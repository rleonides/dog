import React from "react";
import { Formik } from "formik";
import { Button, Input } from "../../components";
import { logUpValidation } from "../../validationSchemas";
import { Container, Title, Logo } from "./styled";
import { connect } from "react-redux";
import { saveRecord } from "../../redux_actions/redux-actions";
import dog_ownwer from "../../assets/img/png/logo/dog_owner_.png";
import dog_walker from "../../assets/img/png/logo/dog_walker.jpg";
import {Redirect} from "react-router-dom";
import { AiOutlineCloseCircle } from 'react-icons/ai';
const initialValues = {
  email: "",
  password: "",
  name: "",
  lastName: "",
  phone: "",
  address: "",
  confirmPassword: "",
};

const LogUp = (props) => {
  const [role, setRole] = React.useState("Dueño");

  return (
    <Container>
      {props.account.registered ? (
        <Redirect
          to={{
            pathname: "/log-in",
          }}
        />
      ) : null}
      <div className="relative hidden sm:block">
        <Logo
          src={require("../../assets/img/png/logo/dogger_logo.png")}
          alt="Dogger"
        />
      </div>
      <div className="show-anim nice-scroll relative pb-2 md:w-96 md:h-96 w-[60%] h-[70%] bg-black/40 rounded-3xl flex justify-center items-center flex-col shadowbox">
        <div className="flex flex-col items-center justify-center w-full pt-4 pb-2 text-center rounded-t-3xl gorw ">
          <div className="flex items-center w-full text-center justify-evenly">
            <img
              onClick={() => setRole("Dueño")}
              className={`hover:cursor-pointer hover:opacity-100 ${
                role === "Paseador" ? "opacity-25" : "opacity-100"
              }  w-24 rounded-full [border:2px_solid_#D6DD70]`}
              src={dog_ownwer}
              alt=""
            />
            <img
              onClick={() => setRole("Paseador")}
              className={`hover:cursor-pointer hover:opacity-100 ${
                role === "Dueño" ? "opacity-25" : "opacity-100"
              } w-24 rounded-full [border:2px_solid_#D6DD70] `}
              src={dog_walker}
              alt=""
            />
          </div>

          <h1 className="text-xl font-bold text-[#D6DD70]">{role}</h1>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={logUpValidation}
          onSubmit={(values, actions) => {
            props.onSubmit({ ...values, role });
            actions.setSubmitting(false);
            console.log("formik props >>>", props);
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
            return (
              <>
                <div className="relative z-30 w-full overflow-y-hidden ">
                  {props.account.logUpError ? (
                    <p className="absolute inset-0 flex flex-col items-center justify-center text-xl font-bold show-anim text-amber-300 bg-lime-900/50">
                       <AiOutlineCloseCircle className="absolute text-6xl top-1 text-slate-200/50 hover:text-slate-200 hover:cursor-pointer" onClick={()=>props.closeError({type:"RESET"})}/>
                      <span>{props.account.logUpError}</span>
                    </p>
                  ) : null}

                  <div className="inset-0 w-full h-full py-2 mb-2 overflow-y-scroll insetShadow">
                    <Input
                      error={errors.name}
                      label="Nombre(s)"
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                    />
                    <Input
                      error={errors.lastName}
                      label="Apellidos"
                      name="lastName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                    />
                    <Input
                      error={errors.email}
                      label="Correo"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="email"
                      value={values.email}
                    />
                    <Input
                      error={errors.address}
                      label="Dirección"
                      name="address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.address}
                    />
                    <Input
                      error={errors.phone}
                      label="Teléfono"
                      name="phone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="tel"
                      value={values.phone}
                    />

                    <Input
                      error={errors.password}
                      label="Contraseña"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.password}
                    />
                    <Input
                      error={errors.confirmPassword}
                      label="Confirmar contraseña"
                      name="confirmPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.confirmPassword}
                    />
                  </div>
                </div>
                <Button
                  disabled={!isValid || isSubmitting}
                  onPress={handleSubmit}
                  wide
                >
                  Registrarse
                </Button>
              </>
            );
          }}
        </Formik>
      </div>
    </Container>
  );
};

function mapLogUpDispatchToProps(dispatch) {
  return {
    onSubmit: (obj) => {
      dispatch(saveRecord(obj));
    },
    closeError:dispatch
  };
}

const mapLogUpStateToProps = ({ account }) => ({
  account,
});

const ReduxLogUp = connect(
  mapLogUpStateToProps,
  mapLogUpDispatchToProps
)(LogUp);

//Se elimino un campo de correo y se agrega un input address
export default ReduxLogUp;
