const user = (state = {}, { type, payload }) => {
  switch(type) {
    case 'GET_USER':
      return state
    case 'RESET':
      return {}
    default:
      return state
  }
}

export default user