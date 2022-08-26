const initialState = {
  isLogged: false,
  registered:false,
  logUpError:'',
  logInError:'',
  info:''
}

const account = (state = initialState, {type, payload}) => {
  switch(type) {
    case 'LOG_IN':
      return state
    case 'LOG_OUT':
      return initialState
    case 'RESET':
      return initialState
    case 'REGISTERED':
      return {...state, registered:payload}
      case 'LOGUP_STATUS':{
        return {...state, logUpError:payload, registered:payload?false:true}
      }
      case 'LOGIN_STATUS':{
        return {...state, logInError:payload.error, isLogged:payload.error?false:true, 
          info:payload.info||''}
      }
      
      
    default:
      return state
  }
}

export default account