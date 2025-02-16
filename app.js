/*

Author: Matthew Larsen
Date: 02/13/2025
Portfolio Project: Guestbook Part III
Filename: app.js
File Description: JavaScript for Guestbook app

*/

// import express module
import express from 'express';

// instantiate an express application
const app = express();

// instantiate an array to store form submissions
const contactList = [];

// serve static files from the 'public' directory
app.use(express.static('public'));

// handling form submission for data sent in the URL-encoded format
app.use(express.urlencoded({extended: true}));

//Set the view engine
app.set('view engine', 'ejs');

// default route for contact form home page
app.get('/',(req, res)=>{

  res.render('home');
});


// post route to handle contact form submission
app.post('/confirm', (req, res) =>
{
  
  // validate name and e-mail fields are not blank, send invalid input notification if required fields are blank
  if(req.body.lname === "" || req.body.fname === "" || req.body.email == "")
  {
    res.send("Invalid Input");
  }
  
  // if field validation passses create contact object, add contact object to contactList array and send confirmation page
  else
  {
    
    // create contact object with form data from request body and add a timestamp
    const contact = 
    {
      lname: req.body.lname,
      fname: req.body.fname,
      title: req.body.title,
      company: req.body.company,
      linkedIn: req.body.linkedIn,
      email: req.body.email,
      meet: req.body.meet,
      other: req.body.other,
      message: req.body.message,
      mailList: req.body.mailList,
      format: req.body.format,
      timestamp: new Date()
    };
  
    // Save contact info to the contactList array
    contactList.push(contact)
    
    // Log the contactList array to the console
    console.log(req.body);
  
    // send confirmation page to user
    res.render('confirm', { contact });
  }
});


// admin route to view all contacts
app.get('/admin', (req, res) => {
  
  
  res.render('admin');
});


// tell the server to listen on port 3000
app.listen(3000, ()=>{

  console.log("Server running at http://localhost:3000")
});