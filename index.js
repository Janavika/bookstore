//import express from "express";    //act as builtin server and also it is a framework
//import  mysql  from "mysql";
//import cors from "cors"; //It is middleware to connect express
//app password dfwtkyvewvlraank

var express = require("express");
var mysql = require("mysql");
var cors = require("cors");


 const app = express();
  
 const db = mysql.createConnection({                                    
      host:"localhost",
      user: "root",
      password:"password",
      database:"bookstore"
 });

 app.use(express.json());
 app.use(cors());

 app.get("/",(req,res) =>{
    res.json("this is my backend")
 });

 app.get("/booklist",(req,res) =>{
    const q = `select *from booklist`;
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
});

app.get("/booklist/:id",(req,res) =>{
    const q = `select * from booklist where ISBN=`;
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
});


app.get("/booklist/:author",(req,res) =>{
    const q = `select * from booklist where author=?`;
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
});

app.get("/booklist/:title",(req,res) =>{
    const q = `select * from booklist where title=?`;
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
});

app.get("/booklist/:review",(req,res) =>{
    const q = `select * from booklist where review=?`;
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
});

 app.post("/booklist",(req,res)=>{
    const q = "INSERT INTO booklist(`ISBN`,`title`,`review`,`author`) VALUES (?,?,?,?)"; //?is like scanf(means reads the value)
    // const values = ["title from backend","title from backend","title from backend"]
    db.query(q, [req.body.ISBN,req.body.title,req.body.review,req.body.author],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Book list has been created")
    })
 });


 app.delete("/booklist/:review",(req,res) =>{
    const bookId = req.params.review  //params is an object of the req object that contains route parameters (like it will fetch from the url)
   const q = "DELETE FROM booklist WHERE review = ? "
    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Book review has been DELETED ")
    })
 });

//  app.put("/booklist/:id",(req,res) =>{
//     const bookId = req.params.review;
//    const q = "UPDATE booklist SET `review`= ?";
//    const values = [req.body.review]
//     db.query(q,[...values,bookId],(err,data)=>{   //...is to add new array to existing array
//         if(err) return res.json(err)
//         return res.json(data)
//     })
//  });

app.put("/booklist/:id",(req,res) =>{
    const bookId = req.params.id;
   const q = "UPDATE booklist SET `review`= ? Where `ISBN`=?";
   const values = [req.body.review]
   db.query(q,[...values,bookId],(err,data)=>{   //...is to add new array to existing array
            if(err) return res.json(err)
        return res.json(data)
         })

})



 app.listen(5000,() =>{
        console.log("Connected to Backend!")
 });
