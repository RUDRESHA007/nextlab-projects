const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const fs = require("fs");
const url = require('url');

const path = require("path");
app.use(bodyParser.urlencoded({ extended: true }));
let public_path = path.join(__dirname, '../public')
app.use(express.static(public_path + '/css'))
app.use(express.static(public_path + '/js'))


function structure(your_path) {

  const name = path.basename(your_path)

  // Create an arry 

  const parent_name = [name]
  const folder_arr = []
  parent_name.push(folder_arr)

  // child files or folders of the current path
  const childs = fs.readdirSync(your_path);

  // Recursively build the folder structure for each child folder
  for (const child of childs) {
    const child_path = path.join(your_path, child);
    const childStats = fs.statSync(child_path);

    //check child is folder or file
    if (childStats.isDirectory()) {
      const child_folder = structure(child_path);
      folder_arr.push(child_folder);
    }
    else {

      const childFile = {
        name: `${child}`,
      };

      folder_arr.push(child);

    }

  }

  return parent_name;
}






app.post('/structure', (req, res) => {
// var your_path = "C:\\Users\\admin\\Desktop\\MyComputer";
var location =req.body.location;

const folder_structure = structure(location);
  res.send(folder_structure[1]);
});



// file manager 




// Create file
// const location ='C:\\Users\\admin\\Desktop\\MyComputer'


app.post('/create', (req, res) => {

  const fileName = req.body.fileName;
  const content = req.body.content;
  const location = req.body.location;
  const full_location = path.join(location, fileName);

  fs.writeFile(full_location, content, (err) => {
    if (err) {
      res.send('Error creating file: ' + err);
    } else {
      res.send('File created successfully.');
    }
  });
});
// Create folder
app.post('/create_folder', (req, res) => {
  const folder_name = req.body.folder_name;
  const location = req.body.location;
  const full_location = path.join(location, folder_name);


  fs.mkdir(full_location, (err) => {
    if (err) 
     res.send('folder alredy exist');
    res.send('Folder created successfully');
  });
});

// Update file
app.post('/update', (req, res) => {
  const fileName = req.body.fileName;
  const location = req.body.location;
  const content = req.body.content;
  const full_location = path.join(location, fileName);


  fs.appendFile(full_location, content, (err) => {
    if (err) {
      res.send('this file not exist');
    } else {
      res.send('File updated successfully.');
    }
  });
});

// Delete file
app.post('/delete', (req, res) => {
  const fileName = req.body.fileName;
  const location = req.body.location;
  const full_location = path.join(location, fileName);


  fs.unlink(full_location, (err) => {
    if (err) {
      res.send('this file not exist');
    } else {
      res.send('File deleted successfully.');
    }
  });
});


// delete folder
app.post('/delete_folder', (req, res) => {
  const folder_name = req.body.folder_name;
  const location = req.body.location;
  const full_location = path.join(location, folder_name);


  fs.rmdir(full_location, { recursive: true }, (err) => {
    if (err) res.send('this folder not exist');
    res.send('Folder deleted successfully');
  });
});

// desired location 

app.get('/', (req, res) => {


  res.sendFile(__dirname + '/index.html');
});



// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
