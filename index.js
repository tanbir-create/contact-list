const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact')
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true})); 
app.use(express.static('assets'));

// var contactList = [
//     {
//         name: 'Tanbir',
//         phone: '7002564183'
//     },
//     {
//         name: 'Ahmed',
//         phone: '8455612568'
//     },
//     {
//         name: 'Potato',
//         phone: '9876521346'
//     }
// ]

app.get('/', function(req, res){
    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contacts in db');
            return;
        }
        return res.render('home', {
            title: "My Contacts",
            contact_list: contacts
        
        });
    });
});

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: 'practice'
    });
});

app.post('/create-contact', function(req, res){
    // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log('error creating contact');
            return;
        }
        console.log('**********', newContact);
        return res.redirect('back');
    });
    
});

//for deleting contact
app.get('/delete-contact', function(req, res){
    //get id from query in the url
    let id = req.query.id;

    //find contact in db using id and delete it
    
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting from database');
            return;
        }
         return res.redirect('back');
    });
   

});


app.listen(port, function(err){
    if(err){
        console.log('error in running the server', err);
    }

    console.log('express server is running on port:', port);
});