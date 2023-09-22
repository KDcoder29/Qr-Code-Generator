import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
import bodyParser from "body-parser";
import express  from "express";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, "public", "images", "qr_img.jpg");


const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",function(req,res){
    res.render("index.ejs")
})


app.post("/submit",function(req,res){

    const entered = req.body.text;
    let imagePath ="images/qr_img.jpg"
    const url = entered
    
          var qr_svg = qr.image(url);
  qr_svg.pipe(fs.createWriteStream("./public/images/qr_img.jpg"));
  fs.writeFile("URL.txt", url, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");

})

    res.render("index.ejs", {textEntered: entered, imagePath:imagePath });

  
});


app.get("/download", function(req, res) {
    const fileName = "qr_img.jpg"; 
    const fileName2 = "./URL.txt"; 
    const filePath = path.join(__dirname, "public", "images", fileName); 
  

    fs.readFile(fileName2, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading the file:", err);
        return;
      }
    
      console.log("File content:", data);
      res.setHeader("Content-Disposition", `attachment; filename=${data}.jpg`);
      res.sendFile(filePath);

    });
    
  });
  
  
app.listen(port, function(){
    console.log('Server started on port 3000 successfully!')
})