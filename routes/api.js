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
          commentcount: cCount
        });
      });
      res.send(books);
    }
  });
})

router.post('/api/books', function (req, res){
  if (req.body.title) {
    var title = req.body.title;
    let book = new Book ({title: title});
    book.save((err,doc)=>{
      if (err) {
        console.log(err);
        return 'the book has not been saved';
      } else {
        res.send(doc);
      }
    });
  } else {
    res.end();
    return 'no title is provided';
  }
})

router.delete('/api/books', function(req, res){
  Book.deleteMany({},(err,doc) => {
    if (err) {
      console.log(err);
      return 'no book were deleted';
    } else {
      return 'complete delete successful';
    }; 
  });
  
  
});

router.get('/api/books/:id', function (req, res){
  var bookid = req.params.id;
  Book.findById({_id: bookid},'_id title comments',(err,doc) => {
    if (err) {
      console.log(err);
      return 'no book exists';
    } else {
      res.json(doc)
    }
  });
})

router.post('/api/books/:id', function(req, res){
  var bookid = req.params.id;
  var comment = req.body.comment;
  Book.findById({_id: bookid},'_id title comments',(err,doc) => {
    if (err) {
      res.send('the book with ' + bookid + ' was not found');
    } else {
      doc.comments.push(comment);
      doc.save((err,doc)=>{
        if (err) console.log(err)
        res.json(doc) 
      });
    }
  });
})

router.delete('/api/books/:id', function(req, res){
  var bookid = req.params.id;
  Book.findByIdAndDelete({_id: bookid},(err,doc) => {
    if (err) {
      console.log(err);
      res.send('the book was not deleted');
    } else {
      res.send('delete successful')
    }; 
  });
}); 

module.exports = router;