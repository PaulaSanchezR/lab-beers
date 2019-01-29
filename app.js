
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

// in other to use partial we have to REGISTER them
hbs.registerPartials(__dirname + '/views/partials');


//routers
app.get('/', (req, res, next) => {
  res.render('index');
});



app.get('/beers',(req,res,nex) => {
  //documention for the API you need to search for all the data
  const getBeer = punkAPI.getBeers();
  //beers is just a place holder
    getBeer.then (beers => { //========================> .this hold sucess callback
        //console.log(beers);


        const data = { beers }
        res.render('beers', data);
                                //we are renaming beers to allBeers varialbe
                                //which we'll we use in the view
         // res.render('beers', {allBeers:beers});

      })
      .catch(error => {
        console.log(error);
      })
});
app.get('/randomBeer',(req,res,nex)=>{

  //random
  punkAPI.getRandom()
  .then (someResponse => {
    console.log("====>",someResponse[0]);
    res.render('randomBeer', {randomBeer:someResponse[0]});
  })
  .catch(error => {
     console.log(error)
  })
  
})


app.listen(3000, ()=> {
  console.log("listen 3000");
});
