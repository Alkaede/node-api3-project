const express = require('express');
const Posts = require('../posts/posts-model');
const router = express.Router();

// GET api
router.get('/',(req, res)=>{
  console.log(req)
  Posts.get(req.body)
    .then(post => {
      res.status(200).send(post)
    })
    .catch(err=>{
      console.log(err)
      res.status(500).send({message: 'Something bad happened'})
    })
})

// GET getbyid
router.get('/:id', (req, res)=>{
  const {id} = req.params
  console.log(id)
  Posts.getById(id)
    .then(post =>{
      if(!post){
        res.status(404).send({message: 'Post does not exist'})
      }else{
        res.status(200).send(post)
      }
    })
    .catch(()=>{
      res.status(500).send({message: 'Something happened retrieving post'})
    })
})

//POST insert
router.post('/', (req, res)=>{
  // remember that it requires a req.body to insert
  Posts.insert(req.body)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err=>{
      console.error(err)
      res.status(500).json({message: 'Something happened trying to send that post'})
    })
})


module.exports = router;