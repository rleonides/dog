/* eslint-disable no-use-before-define */

export function saveRecord (obj) {
  return function (dispatch) {
   console.log(obj)
   window
   .fetch(`/api/${obj.role==='Paseador'?'new_walker':'new_owner'}`, {
     method: "post",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({fields:obj}),
   })
   .then((res) => res.json())
   .then((res) => {
     console.log(res);
     dispatch({type:'LOGUP_STATUS', payload: res.error})
}).catch(console.log)
    
  }
}

export function logIn(obj) {
  return function (dispatch) {
   console.log(obj)
   window
   .fetch('/api/login', {
     method: "post",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({fields:obj}),
   })
   .then((res) => res.json())
   .then((res) => {
     console.log(res);
     dispatch({type:'LOGIN_STATUS', payload: res})
}).catch(console.log)
    
  }
}
