import * as Yup from 'yup'

const logInValidation = Yup.object().shape({
  email: Yup.string()
    .email('Correo invalido')
    .required('Campo requerido'),
  password: Yup.string()
    .matches(/[a-z]/g, 'Debe tener al menos una minúscula') 
    .matches(/[A-Z]/g, 'Debe tener al menos una mayúscula')
    .matches(/[0-9]/g, 'Debe tener al menos un número')
    .matches(/[^a-zA-Z\d]/g, 'Debe tener al menos un caracter especial')
    .min(8, 'Debe tener mínimo 8 caracteres')
    .required('Campo requerido'),

})

export default logInValidation