const {query, db} = require("../functions/database.js");

const router = require('express').Router();

router.get('/', (req, res) => {
   const id = req.cookies["loggedin_id"]
   const sql = `SELECT * FROM post WHERE employeesid = ${db.escape(id)}`;
   query(sql , (err, posts) => {
      if (err) {
         console.error(err);
         res.json(err);
      }
      else {
         const sql = `SELECT * FROM report WHERE employeesid = ${db.escape(id)}`;
         query(sql , (err, complains) => {
            if (err) {
               console.error(err);
               res.json(err);
            }
            else {
               res.render('user',{posts, complains});
            }
         })
      }
   })
});

router.get('/post/:id/delete', (req, res) => {
   let sql = `DELETE FROM comment WHERE postid = ${db.escape(req.params.id)}`;
   query(sql , (err, result) => {
      const sql = `DELETE FROM post WHERE id = ${db.escape(req.params.id)}`;
      query(sql , (err, result) => {
         if(err) {
            console.error(err);
            res.json(err);
         }
         res.redirect('/user');
      })
   })
});

router.get('/post/:id/update', (req, res) => {
   res.render('postUpdate', {postId: req.params.id});
});

router.post('/post/:id/update', (req, res) => {
   console.log(req.params.id);
   const sql = `UPDATE post
               SET title = ${db.escape(req.body.title)},
               category = ${db.escape(req.body.category)},
               content = ${db.escape(req.body.content)}
               WHERE id = ${db.escape(req.params.id)}`;
   query(sql , (err) => {
      if(err) {
         console.error(err);
      }
      else {
         res.redirect('/blog');
      }
   })
});


router.get('/complain/:id/delete', (req, res) => {
   const sql = `DELETE FROM report WHERE id = ${db.escape(req.params.id)}`;
   query(sql , (err, result) => {
      if(err) {
         console.error(err);
         res.json(err);
      }
      res.redirect('/user');
   })
});

router.get('/complain/:id/update', (req, res) => {
   res.render('complainUpdate', {complainId: req.params.id});
});

router.post('/complain/:id/update', (req, res) => {
   const sql = `UPDATE report
               SET title = ${db.escape(req.body.title)},
               description = ${db.escape(req.body.description)},
               reported_to = ${db.escape(req.body.id)}
               WHERE id = ${db.escape(req.params.id)}`;
   query(sql , (err) => {
      if(err) {
         console.error(err);
      }
      else {
         res.redirect('/blog');
      }
   })
});

module.exports = router;