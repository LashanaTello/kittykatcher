const express = require('express');
const router = express.Router();

// Load input validation
const validatePostInput = require('../../validation/post');

//  Load Post model
const Post = require('../../models/Post');

const upload = require('../../services/uploadImage');
const multiUpload = upload.array('fileInput');

router.post('/upload', (req, res) => {
  multiUpload(req, res, (err) => {
    if (err) {
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
    }
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    var urls = [...req.files.map(singleFile => singleFile.location)];
    var colors = req.body.furColors.split(',');
    var newCoords = req.body.coords.split(',');

    const newPost = new Post({
      posterUsername: req.body.user,
      //claimerUsername: "",
      title: req.body.postTitle,
      age: req.body.age,
      sex: req.body.sex,
      furColors: [...colors],
      furPattern: req.body.furPattern,
      friendly: req.body.friendly,
      otherInfo: req.body.details,
      pics: urls,
      //status: "UNCLAIMED",
      location: {
        //type: "Point",
        coordinates: [...newCoords]
      }
    }).save()
      .then(post => res.json(post))
      .catch(err => console.log(err));
  });
});

router.get('/allCats', (req, res) => {
  Post.find({}, (err, allPosts) => {
    if (err) {
      res.send("Something went wrong");
      next();
    }
    res.json(allPosts)
  });
});

router.get('/userposts/:username', (req, res) => {
  Post.find({ posterUsername: req.params.username }, (err, usersPosts) => {
    if (err) {
      res.send("Something went wrong");
      next();
    }
    res.status(200).json(usersPosts)
  });
});

module.exports = router;
