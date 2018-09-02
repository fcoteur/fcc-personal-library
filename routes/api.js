/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
var express = require('express');
var router = express.Router();
var expect = require('chai').expect;

var Book = require('../models/book');


router.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

router.get('/api/books', function (req, res){
  //response will be array of book objects
  //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
  Book.find({}, (err,docs) =>{
    if (err) {
      console.log(err);
      res.end();
    } else {
      let books =[];
      docs.forEach((doc)=>{
        let cCount = doc.comments.length;
        books.push({
          title: doc.title,
          _id: doc._id,
          commentCount: cCount
        });
      });
      res.send(books);
    }
  });
})

router.post('/api/books', function (req, res){
  var title = req.body.title;
  let book = new Book ({title: title});
  book.save((err,doc)=>{
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.send(doc);
    }
    
  });
  //response will contain new book object including atleast _id and title
})

router.delete('/api/books', function(req, res){
  //if successful response will be 'complete delete successful'
});

router.get('/api/books/:id', function (req, res){
  var bookid = req.params.id;
  //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
})

router.post('/api/books/:id', function(req, res){
  var bookid = req.params.id;
  var comment = req.body.comment;
  //json res format same as .get
})

router.delete('/api/books/:id', function(req, res){
  var bookid = req.params.id;
  //if successful response will be 'delete successful'
}); 

module.exports = router;