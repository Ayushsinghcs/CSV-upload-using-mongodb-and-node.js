const express = require("express");
const path = require("path");
const app = express();
const csvParser = require("csv-parse");
const fs = require("fs");
const mongoose = require("mongoose");
const Diamond = require("./models/diamond");
const fileUpload = require("express-fileupload");
const cors = require("cors");
app.use(cors());

mongoose.connect("mongodb://localhost:27017/testing");
mongoose.connection.once("open", () => {
  console.log("connected to database");
});
// app.use(express.static(__dirname));
app.use(fileUpload());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public", "index.html"));
});

app.post("/upload", (req, res) => {
  console.log(req.files);
  let Fname = req.files.file;
  // console.log(name);
  // var fileName = ELANSTARS + ".csv";
  var newpath = "./public/images/" + Fname.name;
  Fname.mv(newpath, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("File uploaded");
    }
  });

  fs.readFile(
    newpath,
    {
      encoding: "utf-8"
    },
    function(err, csvData) {
      if (err) {
        console.log(err);
      }

      csvParser(
        csvData,
        {
          delimiter: ","
        },
        function(err, data) {
          if (err) {
            console.log(err);
          } else {
            // console.log(data);
            for (i = 1; i < data.length; i++) {
              let diamond = new Diamond({
                stock_no: data[i][0],
                certificate_no: data[i][1],
                lab: data[i][2],
                shape: data[i][4],
                size: data[i][5],
                color: data[i][6],
                clarity: data[i][7],
                cut: data[i][8],
                polish: data[i][9],
                symmetry: data[i][10],
                fluorescence: data[i][11],
                rap: data[i][12],

                discount: data[i][13],
                pr_ct: data[i][14],
                total_price: data[i][15],
                measurements: data[i][16],
                total_depth: data[i][17],
                table: data[i][18],
                link: data[i][19],
                key_to_symbols: data[i][20]
              });
              diamond.save();
            }
            // popupS.alert({
            //   content: "Hello World!"
            // });

            setTimeout(function() {
              res.json({ msg: "Your file has been uploaded" });
            }, 5000);
          }
        }
      );
    }
  );
});
app.listen(8080);
