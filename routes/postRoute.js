const router = require('express').Router();
const { query, db } = require('../functions/database.js');

// Route.
router.get('/', (req, res) => {
   const sql = `SELECT category FROM post GROUP BY category`;
   query(sql, (err, result) => {
      res.render('post', {categories: result});
   })
});

router.post('/', (req, res) => {
   console.log(req.body);
   const id = req.cookies["loggedin_id"]
   const sql = `INSERT INTO post(title, category, content, time, employeesid)
                           VALUES(${db.escape(req.body.title)}, ${db.escape(req.body.category)}, ${db.escape(req.body.content)}, now(), ${id})`;
   query(sql);
   res.redirect('/blog');
});


router.get('/showpost', (req, res) => {
   const sql = `SELECT * FROM post`;
   query(sql, (err, result) => {
      res.render('showPost', {posts: result});
   });
});

router.get('/showpost/:id', (req, res) => {
   const sql = `SELECT p.title as postTitle, p.category as postCategory,
               p.content as postContent, p.time as postTime,
               c.comment as commentContent, c.time as commentTime,
               e.name as employeesName
               FROM post as p
               LEFT JOIN comment as c
               ON c.postid = p.id
               LEFT JOIN employees as e
               ON e.id = c.employeesid
               WHERE p.id = ${req.params.id}`;
   query(sql, (err, result) => {
      if(err) {
         console.error(err);
         res.json(err);
      }
      else {
         res.render('singlePost', {post: result[0], comments: result});
      }
   })
});

router.get('/searchpost', (req, res) => {
   res.render('searchPost');
});


module.exports = router;
