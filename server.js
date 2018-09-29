const express = require('express');
const fs = require('fs');
const multer  = require('multer');
const uuidv1 = require('uuid/v1');



const PORT = 8888;
const app = express();

const delayMiddleware = (req, res, next) => {
	setTimeout(next, 2000)
};
const allowCrossDomain = (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", 'Origin, Accept, Authorization, X-Requested-With, Content-Type');
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
};

app.use(allowCrossDomain);
app.use(delayMiddleware);



app.post('/api/upload/', (req, res) => {
	const upload = multer({ dest:'upload/' }).any();

	upload(req, res, function (err) {
    //添加错误处理
     if (err) {
        console.log(err);
        return;
      } 
      req.file = req.files[0];
			var tmp_path = req.file.path;
			
      console.log(tmp_path);

      var target_path = 'uploads/' + req.file.originalname;

      console.log(target_path);

      if (!fs.existsSync('uploads/')) {
      	fs.mkdirSync('uploads/');
      }

      var src = fs.createReadStream(tmp_path);
			var dest = fs.createWriteStream(target_path);
	
      src.pipe(dest);
      src.on('end', function() { 
        res.send({
          fileId: uuidv1(),
					filename: req.file.originalname,
					filepath: target_path,
				}); 
      });
      src.on('error', function(err) { 
        res.end(); 
      });
    });
});

app.listen(PORT, () => {
	console.log('http server running on:%d', PORT);
});