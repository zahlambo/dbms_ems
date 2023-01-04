const router = require('express').Router();
const { query, db } = require("../functions/database.js");

router.get('/post/:title', (req, res) => {
   title = `%${db.escape(req.params.title).slice(1, req.params.title.length + 1)}%`;
   const sql = `SELECT * FROM post WHERE title LIKE '${title}'`;
   query(sql, (err, results) => {
      if(err) {
         console.error(err);
         res.json(err);
      }
      else {
         res.json(results);
      }
   })
});


router.post('/post/:id/comment', (req, res) => {
   const id = req.cookies["loggedin_id"]
   const sql = `INSERT INTO comment(comment, time, employeesid, postid)
                              VALUES(${db.escape(req.body.comment)}, now(), ${id}, ${db.escape(req.params.id)})`;

   query(sql, (err, result) => {
      if(err) {
         console.error(err);
         res.json(err);
      }
   })
});


module.exports = router;
