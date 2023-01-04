const { query } = require("../functions/database.js");
const crypto = require("crypto");
const { clear } = require("console");
const router = require("express").Router();

let user;

router.get("/blog", (req, res) => {
  res.render("home");
});

router.get("/", (req, res) => {
  if (req.cookies["loggedin_id"] !== undefined) {
    console.log("here", req.cookies["loggedin_id"]);
    res.render("account", {
      type: req.cookies["loggedin_type"],
    });
  } else {
    res.render("index");
  }
  // res.render('index')
});

router.get("/getEmployeeNames", async (req, res) => {
  await getUserInfo()[0];
});

router.get("/addTask", (req, res) => {
  if (req.cookies["loggedin_id"]) {
    res.render("addtask", { type: req.cookies["loggedin_type"] });
  } else {
    res.render("index");
  }
});

router.get("/getTasksall", async (req, res) => {
  const id_cookie = req.cookies["loggedin_id"];
  if (id_cookie) {
    const sql = `SELECT d.id as "tid", d.title, d.description, d.time, d.submission_time, d.project_point, d.deadline, e.name,e.id FROM daily_work as d JOIN employees as e ON e.id = d.employeesid `;
    console.log(sql);
    `SELECT t.id,t.title,t.description,t.points,t.time,t.deadline,t.submission_time,e.name
FROM task_by_others as t 
JOIN
employees as e 
on e.id = t.employeesid`;
    const response = await query(sql);
    console.log(response);
    res.render("account", {
      type: req.cookies["loggedin_type"],
      todos: response,
    });
  } else {
    res.render("index");
  }
});

router.get("/getTasks", async (req, res) => {
  const id_cookie = req.cookies["loggedin_id"];
  if (id_cookie) {
    const sql = `SELECT id, title, description, project_point,time, deadline, submission_time FROM daily_work WHERE employeesid=${parseInt(
      req.cookies["loggedin_id"]
    )}`;
    const sql_another = `SELECT t.id,t.title,t.description,t.points,t.time,t.deadline,t.submission_time,e.name,t.employeesid FROM task_by_others as t JOIN employees as e on e.id = t.employeesid where t.given_to=${parseInt(
      req.cookies["loggedin_id"]
    )}`;
    // console.log(sql);
    // console.log(sql_another);
    const response = await query(sql);
    const response_another = await query(sql_another);
    // console.log(response);
    // console.log(response_another);
    res.render("account", {
      type: req.cookies["loggedin_type"],
      todos: response,
      task_by_others: response_another,
    });
  } else {
    res.render("index");
  }
});

router.get("/logOut", (req, res) => {
  res.cookie("loggedin_id", { maxAge: 0 });
  res.cookie("loggedin_type", { maxAge: 0 });
  res.clearCookie("loggedin_id");
  res.clearCookie("loggedin_type");
  res.redirect("/");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/seeAllEmployees", async (req, res) => {
  let sql;

  if (req.query.searchTerm) {
    sql = `SELECT id, name,email,points,country,phone,type FROM employees WHERE name LIKE "%${req.query.searchTerm}%"`;
    // console.log(sql);
  } else {
    sql = "SELECT id, name,email,points,country,phone,type FROM employees WHERE 1";
  }
  const employees = await query(sql);
  // console.log(employees);
  if (req.cookies["loggedin_id"]) {
    res.render("account", {
      type: req.cookies["loggedin_type"],
      employees,
    });
  } else {
    res.render("index");
  }
});

router.get("/updateEmployee", async (req, res) => {
  const id = req.query.id;
  if (req.cookies["loggedin_id"]) {
    const sql = `SELECT id, name,email,points,country,phone,type FROM employees WHERE id=${id}`;
    const employees = await query(sql);
    res.render("updateEmployee", {
      type: req.cookies["loggedin_type"],
      employees,
    });
  } else {
    res.render("index");
  }
});

router.post("/updateUser", async (req, res) => {
  const sent = req.body;
  const pass = crypto.createHash("sha256").update(sent.password).digest("hex");
  console.log(pass);
  const sql = `UPDATE employees
  SET name="${sent.name}",
  email="${sent.email}",
  password="${pass}",
  phone="${sent.phone}",
  country="${sent.country}",
  type="${sent.type}",
  points=${sent.points}
  WHERE id=${req.query.id}`;
  console.log(sql);
  await query(sql);

  if (req.cookies["loggedin_id"]) {
    res.render("account", {
      type: req.cookies["loggedin_type"],
    });
  } else {
    res.render("index");
  }
});

router.get("/deleteEmployee", async (req, res) => {
  const id = req.query.id;
  let sql = `DELETE FROM daily_work WHERE daily_work.employeesid = ${id}`;
  await query(sql);
  sql = `DELETE FROM comment WHERE comment.employeesid = ${id}`;
  await query(sql);
  sql = `DELETE FROM post WHERE post.employeesid = ${id}`;
  await query(sql);
  sql = `DELETE FROM report WHERE report.reported_to = ${id}`;
  await query(sql);
  sql = `DELETE FROM report WHERE report.employeesid = ${id}`;
  await query(sql);
  sql = `DELETE FROM task_by_others WHERE task_by_others.employeesid = ${id}`;
  await query(sql);
  sql = `DELETE FROM task_by_others WHERE task_by_others.given_to = ${id}`;
  await query(sql);
  sql = `DELETE FROM employees WHERE employees.id = ${id}`;
  await query(sql);
  if (req.cookies["loggedin_id"]) {
    res.render("account", {
      type: req.cookies["loggedin_type"],
    });
  } else {
    res.render("index");
  }
});

router.get("/submitTask", async (req, res) => {
  console.log("here");
  const id = req.query.id;
  const sql = `UPDATE daily_work SET submission_time=NOW() WHERE id=${id}`;

  const point_sql = `SELECT points FROM employees WHERE id=${parseInt(
    req.cookies["loggedin_id"]
  )}`;
  const points = await query(point_sql);
  console.log(point_sql, points);
  const update_point_sql = `UPDATE employees SET points=${points[0].points + parseInt(req.query.point)
    } WHERE id=${parseInt(req.cookies["loggedin_id"])}`;
  await query(update_point_sql);

  console.log(sql);
  await query(sql);
  res.redirect("/getTasks");
});

router.get("/submitTaskByOthers", async (req, res) => {
  console.log("here");
  const id = req.query.id;
  const sql = `UPDATE task_by_others SET submission_time=NOW() WHERE id=${id}`;

  const point_sql = `SELECT points FROM employees WHERE id=${parseInt(
    req.cookies["loggedin_id"]
  )}`;
  const points = await query(point_sql);
  console.log(point_sql, points);
  const update_point_sql = `UPDATE employees SET points=${points[0].points + parseInt(req.query.point)
    } WHERE id=${parseInt(req.cookies["loggedin_id"])}`;
  await query(update_point_sql);

  console.log(sql);
  await query(sql);
  res.redirect("/getTasks");
});

router.get("/seeAllReports", async (req, res) => {
  const sql =
    "SELECT r.time,r.id ,r.title,r.description, r.feedback_from_reported, r.admin_feedback, e.name,e1.name as 'name2' FROM employees as e JOIN report as r on e.id = r.employeesid JOIN employees as e1 on e1.id =r.reported_to";
  const reports = await query(sql);
  // console.log(reports);
  // console.log(employees);
  if (req.cookies["loggedin_id"]) {
    res.render("account", {
      type: req.cookies["loggedin_type"],
      reports,
    });
  } else {
    res.render("index");
  }
});

router.get("/seeMyReports", async (req, res) => {
  const id = req.cookies["loggedin_id"];
  const sql = `SELECT * FROM report WHERE reported_to=${id}`;
  const reports = await query(sql);

  // console.log(employees);
  if (req.cookies["loggedin_id"]) {
    res.render("account", {
      type: req.cookies["loggedin_type"],
      reports,
    });
  } else {
    res.render("index");
  }
});

router.post("/setFeedback", async (req, res) => {
  const id = req.query.id;
  const sql = `UPDATE report SET feedback_from_reported="${req.body.feedback}" WHERE id=${id}`;
  console.log(sql);
  await query(sql);
  if (req.cookies["loggedin_id"]) {
    res.render("account", {
      type: req.cookies["loggedin_type"]

    });
  } else {
    res.render("index");
  }
})
router.post("/setFeedbackadmin", async (req, res) => {
  const id = req.query.id;
  const sql = `UPDATE report SET admin_feedback="${req.body.feedback}" WHERE id=${id}`;
  console.log(sql);
  await query(sql);
  if (req.cookies["loggedin_id"]) {
    res.render("account", {
      type: req.cookies["loggedin_type"]

    });
  } else {
    res.render("index");
  }
})


router.post("/createTask", async (req, res) => {
  console.log(req.body);

  const sql = `INSERT INTO daily_work (title, description, time, deadline, project_point, employeesid) VALUES ('${req.body.title}','${req.body.description}',NOW(),'${req.body.deadline}',${req.body.point},${req.body.eid})`;
  await query(sql);
  // console.log(sql);
  // console.log(req.cookies["loggedin_id"]);
  const id = await getUserInfo("id", parseInt(req.cookies.loggedin_id));
  // res.render("account", { type: req.cookies['loggedin_type'] });
  if (req.cookies["loggedin_id"]) {
    res.render("account", {
      type: req.cookies["loggedin_type"],
    });
  } else {
    res.render("index");
  }
});

router.post("/createTaskByEmployee", async (req, res) => {
  console.log(req.body);

  const sql = `INSERT INTO task_by_others (title, given_to,  description, time, deadline, points, employeesid) VALUES ('${req.body.title}', ${req.body.eid} , '${req.body.description}',NOW(),'${req.body.deadline}',${req.body.point},${req.cookies["loggedin_id"]})`;
  await query(sql);
  // console.log(sql);
  // console.log(req.cookies["loggedin_id"]);
  // const id = await getUserInfo("id", parseInt(req.cookies.loggedin_id));
  // res.render("account", { type: req.cookies['loggedin_type'] });
  if (req.cookies["loggedin_id"]) {
    res.render("account", {
      type: req.cookies["loggedin_type"],
    });
  } else {
    res.render("index");
  }
});

router.post("/userLogin", async (req, res) => {
  // console.log(req.body, req.query);
  const EMAIL = req.body.email;
  let PASS = req.body.pass;
  const response = await getUserInfo("email", `'${EMAIL}'`);
  PASS = crypto.createHash("sha256").update(PASS).digest("hex");
  if (PASS === response[0].password) {
    console.log("user login successfull");
    user = response[0];
    res.cookie("loggedin_id", response[0].id);
    res.cookie("loggedin_type", response[0].type);

    res.render("account", {
      type: response[0].type,
    });
  } else {
    console.log("user login failed");
    res.render("index", { error: "Invalid username/password ⚠️" });
  }
});

router.post("/createUser", async (req, res) => {
  const sent = req.body;
  const pass = crypto.createHash("sha256").update(sent.password).digest("hex");
  console.log(pass);
  const sql = `INSERT INTO employees (name, email, password, country, phone, type, join_date) VALUES ("${sent.name}","${sent.email}", "${pass}", "${sent.country}", "${sent.phone}", "${sent.type}", NOW())`;
  console.log(sql);
  await query(sql);
  res.render("account", { type: "admin" });
});

const getUserInfo = async (feild, val) => {
  const sql = `SELECT * FROM employees WHERE ${feild}=${val}`;
  console.log(sql);
  let result = await query(sql);
  console.log(result);
  return result;
};

module.exports = router;
