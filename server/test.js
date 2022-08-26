//console.log( dateFormat(new Date()))
function dateFormat(date) {

    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  }


  let d  = dateFormat(new Date());
  console.log(new Date(...d.split('-')).toString())
  //console.log(dateFormat(new Date()))
