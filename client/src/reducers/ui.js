const initialState = {
  loading: false
}

const ui = (state = initialState, { type, payload }) => {
  switch(type) {
    case 'START_LODING':
      return {
        ...state,
        loading: true
      }
      case 'STOP_LOADING':
        return {
          ...state,
          loading: false
        }
      case 'RESET':
        return initialState
      default:
        return state
  }
}

export default ui