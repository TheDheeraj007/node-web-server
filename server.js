const express= require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname+ '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname +'/public'));


app.use((req, res, next)=>{
fs.appendFile('server.log',req.url,(err)=>{
});
next();
})

hbs.registerHelper('getCurrentHelper',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(txt)=>{
  return txt.toUpperCase();
})

app.get('/',(req,res)=>{

res.render('home.hbs',{
    pageTitle: 'Welcome Page',
    currentYear: new Date().getFullYear(),
    message:'Welcome User'
});

});

app.get('/project', (req,res)=>{
res.render('project.hbs',{
      pageTitle: 'Project Page',
      currentYear: new Date().getFullYear(),
      message:'This is project page'
})
})

app.get('/get',(req,res)=>{

  res.render('about.hbs',{
      pageTitle: 'About Page',
      currentYear: new Date().getFullYear()
  });

});

app.get('/bad',(req,res)=>{
  res.send({
error:404,
description: 'Not found'
  });

});


app.listen(port, ()=>{
  console.log(`server up on port ${port}`);
});
