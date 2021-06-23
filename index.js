// (1) require core moduls
const http = require("http");
const path = require("path");
const fs = require("fs");
const { prototype } = require("stream");

// (2) create the server
const server = http.createServer((req, res) => {
  // // (6) add root url and about url
  // if (req.url == "/") {
  //   fs.readFile(
  //     path.join(__dirname, "public", "index.html"),
  //     (err, content) => {
  //       if (err) throw err;
  //       res.writeHead(200, { "Content-Type": "text/html" });
  //       res.end(content);
  //     }
  //   );
  // }

  // if (req.url == "/about") {
  //   fs.readFile(
  //     path.join(__dirname, "public", "about.html"),
  //     (err, content) => {
  //       if (err) throw err;
  //       res.writeHead(200, { "Content-Type": "text/html" });
  //       res.end(content);
  //     }
  //   );
  // }

  // // (7) hardcode user data
  // if (req.url == "/api/users") {
  //   const users = [
  //     { name: "Hordur", age: 63 },
  //     { name: "Tóti", age: 61 },
  //     { name: "Jóel", age: 55 },
  //     { name: "Nenne", age: 65 },
  //     { name: "Ella", age: 57 },
  //   ];
  //   res.writeHead(200, { "Content-Type": "text/json" });
  //   res.end(JSON.stringify(users));
  // }
  // (8) Comment out all above in this function and start over

  // (9) build Filepath
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  // (10) get extension of served file
  let extName = path.extname(filePath);
  //(11) set inital content type
  let contentType = "text/html";

  function processHeader(htmlcontent) {
    // console.log(htmlcontent);
  }

  // (12) chech ext and set content type based on it
  switch (extName) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    case ".inc":
      contentType = "text/plain";
      break;
  }

  // (14) Read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // page not found - load 404 page
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        // if any other error
        res.writeHead(500);
        res.end(`Server Error ${err.code}`);
      }
    } else {
      //processHeader(content);
      console.log(filePath);

      res.writeHead(200, { "content-Type": contentType });

      res.end(content, "utf8");
    }
  });
});

// (3) create port variable
const PORT = process.argv.PORT || 5000;

// (4) Tell server to listen to the PORT
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
