const express = require("express");
const app = express();

app.use(express.static("gameoflife"));

app.get("/", function(req, res){
   res.redirect("index.html");
});

app.listen(3000, function(){
   console.log("Example is running on port 3000");
});

app.get("/name/:name", function(req, res){
   const name = req.params.name;
   res.send("<h1>Hello " + name +"</h1>");
});

app.get("/google/:search", function(req, res){
   const searchValue = req.params.search;
   if(searchValue == "*")
   {
      res.send("404");
   }else {
      res.redirect("https://google.com/search?q="+searchValue);
   }
})