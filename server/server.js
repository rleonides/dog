const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const dog_walker_Router = require('./routes/walkers');
const owner_Router = require('./routes/owners');
const login_Router = require('./routes/login');

const app = express();
app.set("port", process.env.PORT || 3001);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname,'public','index.html'))
})

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  next(createError(404));
});*/

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.get('/h',(req,res)=>{
res.send({h:'hola'})
})

app.use('/api/',dog_walker_Router)
app.use('/api/',owner_Router)
app.use('/api/',login_Router)

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);

})

