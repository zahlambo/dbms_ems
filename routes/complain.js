const { query, db } = require("../functions/database.js");

const router = require('express').Router();

router.get('/create', (req, res) => {
   
   res.render('complain');
})

router.post('/create', (req, res) => {
   const id = req.cookies["loggedin_id"];
   const sql = `INSERT INTO report(reported_to, time, title, description, employeesid)
                           VALUES(${db.escape(req.body.id)}, now(), ${db.escape(req.body.title)}, ${db.escape(req.body.description)}, ${id})`;

   query(sql, (err, result) => {
      if(err) {
         console.error(err);
         res.json(err);
      }
      else {
         res.redirect('/blog');
      }
   })
  
})

router.get('/allcomplain', (req, res) => {
   const sql = `SELECT * FROM report`;
   query(sql, (err, result) => {
      if(err) {
         console.error(err);
         res.json(err);
      }
      else {
         res.render('allcomplain', {complains: result});
      }
   })
})

module.exports = router;