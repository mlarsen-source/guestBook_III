/*

Author: Matthew Larsen
Date: 02/05/2025
Portfolio Project: Guestbook Part II
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

// default route for contact form home page
app.get('/',(req, res)=>{

  res.sendFile(`${import.meta.dirname}/views/home.html`);
});


// post route to handle contact form submission
app.post('/confirm', (req, res) =>
{
  // Get form data from request body
  const contact = 
  {
    lname: req.body.lname,
    fname: req.body.fname,
    title: req.body.title,
    company: req.body.company,
    linkedIn: req.body.linkedIn,
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
  res.sendFile(`${import.meta.dirname}/views/confirm.html`);
});


// admin route to view all contacts
app.get('/admin/contacts', (req, res) => {
  
  // create dynamic admin page
  let html = '<h1>Contact List</h1><ul>';
  for (const contacts of contactList) 
  {
    html += `<li>${contacts.lname} ${contacts.fname} - ${contacts.title} - ${contacts.company} - ${contacts.linkedIn} - ${contacts.meet} -
    ${contacts.other} - ${contacts.message} - ${contacts.mailList} - ${contacts.format} - ${contacts.timestamp}</li>`;
  }
  html += '</ul>';
  res.send(html);
});


// tell the server to listen on port 3000
app.listen(3000, ()=>{

  console.log("Server running at http://localhost:3000")
});