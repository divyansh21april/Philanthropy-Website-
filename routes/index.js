var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var cookie = require('cookie-parser');
var a='';
var b='';

router.post('/addmember', function(req, res){

    // Get a Mongolient to work with the Mongo server
    var MongoClient = mongodb.MongoClient;

    // Define where the MongoDB server is
    var url = 'mongodb://localhost:27017/project';

    // Connect to the server
    MongoClient.connect(url, function(err, db){
      if (err) {
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');

        // Get the documents collection
        var collection = db.collection('member');

        // Get the student data passed from the form
        var member = {first: req.body.first,last: req.body.last,grade: req.body.grade,
          email: req.body.email, phone: req.body.phone, username: req.body.username,
          gpa: req.body.gpa, password:req.body.password, hour: 0,active:0};
          var search={username: req.body.username,password:req.body.password,email: req.body.email, phone: req.body.phone};

          collection.find([search]).toArray(function (err, resu){ 
            if(resu.length)
            {
              res.render('addmember');
            }
            else if(err)
            {
              res.send(err);
            }
            else{
        // Insert the student data into the database
        collection.insert([member], function (err, result){
          if (err) {
            console.log(err);
          } else {

            // Redirect to the updated student list
            res.redirect("addmember");
          }   
          // Close the database
          
        });}
});
      }
    });

  });

router.post('/order', function(req, res){

    // Get a Mongolient to work with the Mongo server
    var MongoClient = mongodb.MongoClient;

    // Define where the MongoDB server is
    var url = 'mongodb://localhost:27017/project';

    // Connect to the server
    MongoClient.connect(url, function(err, db){
      if (err) {
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');

        // Get the documents collection
        var collection = db.collection('order');

        // Get the student data passed from the form
        var order = {item: req.body.items,price: req.body.price,quantity: req.body.quantity,
          username: req.body.username,date:Date()};

          var search={username: req.body.username,item:req.body.item,date:Date()};

          collection.find([search]).toArray(function (err, resu){ 
            if(resu.length)
            {
              res.render('merchandise');
            }
            else if(err)
            {
              res.send(err);
            }
            else{
        // Insert the student data into the database
        collection.insert([order], function (err, result){
          if (err) {
            console.log(err);
          } else {

            // Redirect to the updated student list
            res.redirect("merchandise");
          }   
          // Close the database
          
        });}
});
      }
    });

  });

router.post('/addevent', function(req, res){

    // Get a Mongolient to work with the Mongo server
    var MongoClient = mongodb.MongoClient;

    // Define where the MongoDB server is
    var url = 'mongodb://localhost:27017/project';

    // Connect to the server
    MongoClient.connect(url, function(err, db){
      if (err) {
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');

        // Get the documents collection
        var collection = db.collection('events');

        // Get the student data passed from the form
        var member = {name: req.body.topic,start:req.body.startdate,end: req.body.enddate};
          var search={name: req.body.topic,start:req.body.startdate,end: req.body.enddate};

          collection.find([search]).toArray(function (err, resu){ 
            if(resu.length)
            {
              res.render('addevent');
            }
            else if(err)
            {
              res.send(err);
            }
            else{
        // Insert the student data into the database
        collection.insert([event], function (err, result){
          if (err) {
            console.log(err);
          } else {

            // Redirect to the updated student list
            res.redirect("addevent");
          }   
          // Close the database
          
        });}
});
      }
    });

  });

router.post('/addsuggestion', function(req, res){

    // Get a Mongolient to work with the Mongo server
    var MongoClient = mongodb.MongoClient;

    // Define where the MongoDB server is
    var url = 'mongodb://localhost:27017/project';

    // Connect to the server
    MongoClient.connect(url, function(err, db){
      if (err) {
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');

        // Get the documents collection
        var collection = db.collection('events');

        // Get the student data passed from the form
        var member = {username: req.body.username,date:Date(),suggestion: req.body.suggestion};
        // Insert the student data into the database
        collection.insert([event], function (err, result){
          if (err) {
            console.log(err);
          } else {

            // Redirect to the updated student list
            res.redirect("addevent");
          }   
          // Close the database
          
});
      }
    });

  });

router.post('/checkuser', function(req, res){

    // Get a Mongo client to work with the Mongo server
    var MongoClient = mongodb.MongoClient;

    // Define where the MongoDB server is
    var url = 'mongodb://localhost:27017/project';

    // Connect to the server
    MongoClient.connect(url, function(err, db){
      if (err) {
          
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');

        // Get the documents collection
        var collection1 = db.collection('member');
        var collection2 = db.collection('order');
  
        // Get the student data passed from the form
        a = req.body.username;
        b = req.body.pass;
        
        //var status = 0;
        var res1;
        var res2;
      if(a=='admin'&&b=='stanford')
      {
        
        collection1.find({}).toArray(function (err, result) 
      {
        if (err) 
        {
          res.send(err);
        } 
        else  
        {
          res1=result;
        } 
      });
         collection2.find({}).toArray(function (err, result) 
      {
        if (err) 
        {
          res.send(err);
        } 
        else
        {
          res2=result;
        } 
      });
        res.cookie('username', a, {expire : new Date() + 9999});
        res.cookie('password', b, {expire : new Date() + 9999});
        res.render("userprofile",{status:'admin',members:res1,order:res2});
      }
      else{
       collection1.find({username: req.body.username, password:req.body.pass,active:1}).toArray(function (err, result) {
       if (err) {
         
        res.send(err);
       } else if (result.length==1)
        {console.log('hey');
        collection1.find({username:a}).toArray(function (err, result) 
      {
        if (err) 
        {
          res.send(err);
        } 
        else if (result.length) 
        {
           res1=result;
        } 
        else 
        {
          res.send('No documents found');
        }
      });
         collection2.find({username:a}).toArray(function (err, result) 
      {
        if (err) 
        {
          res.send(err);
        } 
        else if (result.length) 
        {
          res2=result;
        } 
        else 
        {
          res.send('No documents found');
        }
      });
        res.cookie('username', a, {expire : new Date() + 9999});
        res.cookie('password', b, {expire : new Date() + 9999});
        res.render("userprofile",{status:'user',members:res1,order:res2});
       } else {
        

        res.render("login",{'status':1});
      }
  });
   }
}
      });
});

router.post('/validateupdate', function(req, res){
  var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/project';
    MongoClient.connect(url, function(err, db)
    {
      if (err) 
      {
        console.log('Unable to connect to the Server:', err);
      } 
      else 
      {
        console.log('Connected to Server');
        var collection = db.collection('member');
        collection.find({username:req.body.username}).toArray(function (err, result) 
        {
          if (err) 
          {
            res.send(err);
          } 
          else if (result.length) 
          {
                var ab={$set:{field:req.body.val}};
                var xy=req.body.field;
                collection.update({username:req.body.username},{$set:{xy:req.body.val}},function (err, resu)
            {
              if (err) 
              {
                res.send(err);
              }
              else if(resu)
                {
                  res.render('addmember');
                }

              else{res.render('userprofile');
            console.log('update1');} 
            });
           }  
          else 
          {
            console.log('updated2');
            res.render('userprofile');
          }
      });
    }
    });

});
/*
router.post('/shop', function(req, res){
  var MongoClient = mongodb.MongoClient;
  var url = 'mongodb://localhost:27017/project';
  MongoClient.connect(url, function (err, db) 
  {
    if (err) 
    {
      console.log('Unable to connect to the Server', err);
    } 
    else 
    {
      console.log('Connection established to', url);
      var collection = db.collection('items');
      collection.find({}).toArray(function (err, result) 
      {
        if (err) 
        {
          res.send(err);
        } 
        else if (result.length) 
        {
          res.render('merchandise', {title: 'Shop' },{"items":result});
        } 
        else 
        {
          res.send('No documents found');
        }
        
      });
    }
  });   
});

*/
router.get('/', function(req, res, next) 
{
  var MongoClient = mongodb.MongoClient;

    // Define where the MongoDB server is
    var url = 'mongodb://localhost:27017/project';

    // Connect to the server
    MongoClient.connect(url, function(err, db){
      if (err) {
          
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');

        // Get the documents collection
        var res1;
        var res2;
        var collection1 = db.collection('member');
        var collection2 = db.collection('event');
        collection1.find().sort({hour:-1}).toArray(function (err, result) 
      {
        if (err) 
        {
          res.send(err);
        } 
        else  
        {
           res1=result;
        } 
      }); 
        collection2.find().toArray(function (err, result) 
      {
        if (err) 
        {
          res.send(err);
        } 
        else  
        {
         res2=result;
        } 
      }); 
        res.render('index',{members:res1,event:res2});
      }
  
});
});

router.get('/login', function(req, res, next) 
{
  a='';
  b='';
  res.clearCookie('username');
  res.clearCookie('password');
  res.render('login');
});

router.get('/merchandise', function(req, res, next) 
{
  res.render('merchandise');
});

router.get('/suggestion', function(req, res, next) 
{
  res.render('suggestion');
});

router.get('/about', function(req, res, next) 
{
  res.render('about');
});
router.get('/evententry', function(req, res, next) 
{
  res.render('evententry');
});

router.get('/userprofile', function(req, res){
  var MongoClient = mongodb.MongoClient;

    // Define where the MongoDB server is
    var url = 'mongodb://localhost:27017/project';

    // Connect to the server
    MongoClient.connect(url, function(err, db){
      if (err) {
          
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');

        // Get the documents collection
        var collection1 = db.collection('member');
        var collection2 = db.collection('order');
    if(req.cookies['username']=='admin'){
      
        collection1.find({}).toArray(function (err, result) 
      {
        if (err) 
        {
          res.send(err);
        } 
        else  
        {
          var res1=result;
        } 
      });
         collection2.find({}).toArray(function (err, result) 
      {
        if (err) 
        {
          res.send(err);
        } 
        else
        {
          var res2=result;
        } 
      });
        res.cookie('username', a, {expire : new Date() + 9999});
        res.cookie('password', b, {expire : new Date() + 9999});
        res.render("userprofile",{status:'admin'},{members:res1},{order:res2});
      }
      else{
       collection1.find({username: req.body.username, password:req.body.pass,active:1}).toArray(function (err, result) {
       if (err) {
         
        res.send(err);
       } else if (result.length==1)
        {console.log('hey');
        var collection1 = db.collection('userevent');
        var collection2 = db.collection('order');
        collection1.find({username:req.body.username}).toArray(function (err, result) 
      {
        if (err) 
        {
          res.send(err);
        } 
        else if (result.length) 
        {
          var res1=result;
        } 
        else 
        {
          res.send('No documents found');
        }
      });
         collection2.find({username:req.body.username}).toArray(function (err, result) 
      {
        if (err) 
        {
          res.send(err);
        } 
        else if (result.length) 
        {
          var res2=result;
        } 
        else 
        {
          res.send('No documents found');
        }
      });
        res.cookie('username', a, {expire : new Date() + 9999});
        res.cookie('password', b, {expire : new Date() + 9999});
        res.render("userprofile",{status:'admin',event:res1,order:res2});
    }
    else{
      res.render('login');
    }
});
     }
   }
   });
  });

router.get('/request',  function(req, res){
    
     
      res.render('request');
});


router.get('/signout', function(req, res){
  a='';
  b='';
  res.clearCookie('username');
  res.clearCookie('password');
  res.render("login");
});

router.get('/update', function(req, res){
  res.render("update");
});

router.get('/register', function(req, res){
  var MongoClient = mongodb.MongoClient;

    // Define where the MongoDB server is
    var url = 'mongodb://localhost:27017/project';

    // Connect to the server
    MongoClient.connect(url, function(err, db){
      if (err) {
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');

        // Get the documents collection
        var collection = db.collection('member');

        // Get the student data passed from the form
        // Insert the student data into the database
        collection.find({active:0}).toArray(function (err, result){
          if (err) {
            console.log(err);
          } else {

            // Redirect to the updated student list
            res.render("memberdec",{mem:result});
          }   
          // Close the database
          
});
      }
    });
  
});
router.get('/accept', function(req, res){
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/project';
    MongoClient.connect(url, function(err, db)
    {
      if (err) 
      {
        console.log('Unable to connect to the Server:', err);
      } 
      else 
      {
        console.log('Connected to Server');
        var collection = db.collection('member');
                collection.update({username:req.query.username},{$set:{active:1}},function (err, resu)
            {
              if (err) 
              {
                res.send(err);
              }
              else
                {
                  res.render('memberdec');
                }
            });
              }
      });
    });
router.get('/decline', function(req, res){
  var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/project';
    MongoClient.connect(url, function(err, db)
    {
      if (err) 
      {
        console.log('Unable to connect to the Server:', err);
      } 
      else 
      {
        console.log('Connected to Server');
        var collection = db.collection('member');
                collection.remove({username:req.query.username},function (err, resu)
            {
              if (err) 
              {
                res.send(err);
              }
              else
                {
                  res.render('memberdec');
                }
            });
              }
      });
});
router.get('/setevent', function(req, res){
  var MongoClient = mongodb.MongoClient;

    // Define where the MongoDB server is
    var url = 'mongodb://localhost:27017/project';

    // Connect to the server
    MongoClient.connect(url, function(err, db){
      if (err) {
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');

        // Get the documents collection
        var collection = db.collection('event');

        // Get the student data passed from the form
        var ab = {start: req.body.startdate,end:req.body.enddate,eventname: req.body.eventname};
        // Insert the student data into the database
        collection.insert([ab], function (err, result){
          if (err) {
            console.log(err);
          } else {

            // Redirect to the updated student list
            res.render("admincalender");
          }   
          // Close the database
          
});
      }
    });
});
router.get('/calender', function(req, res){
  res.render("admincalender");
});
router.get('/evententry', function(req, res){
  res.render("evententry");
});
router.get('/userevent', function(req, res){
  var MongoClient = mongodb.MongoClient;

    // Define where the MongoDB server is
    var url = 'mongodb://localhost:27017/project';

    // Connect to the server
    MongoClient.connect(url, function(err, db){
      if (err) {
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');

        // Get the documents collection
        var collection = db.collection('userevent');

        // Get the student data passed from the form
        var ab = {username: req.body.username,date:req.body.date,eventname: req.body.eventname,hours:req.body.hours};
        // Insert the student data into the database
        collection.insert([ab], function (err, result){
          if (err) {
            console.log(err);
          } else {

            // Redirect to the updated student list
            res.render("evententry");
          }   
          // Close the database
          
});
      }
    });
  
});

module.exports = router;