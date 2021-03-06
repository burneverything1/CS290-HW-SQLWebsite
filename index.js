var express = require('express')
var app = express()

var mysql = require('./dbcon')

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.set('port', 3000)

// queries
var tableName = 'workouts'
var getAllQuery = `SELECT * FROM ${tableName}`
var insertQuery = `INSERT INTO ${tableName}(name, reps, weight, date, unit) VALUES (?, ?, ?, ?, ?)`
var findQuery = `SELECT * FROM ${tableName} WHERE id = (?)`
var updateQuery = `UPDATE ${tableName} SET name=?, reps=?, weight=?, date=?, unit=? WHERE id=?`
var deleteQuery = `DELETE FROM ${tableName} WHERE id = (?)`
var deleteTableQuery = `DROP TABLE IF EXISTS ${tableName}`

app.get('/reset-table',function(req,res,next){
    var context = {};
    mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){
        var createString = "CREATE TABLE workouts("+
        "id INT PRIMARY KEY AUTO_INCREMENT,"+
        "name VARCHAR(255) NOT NULL,"+
        "reps INT,"+
        "weight INT,"+
        "date DATE,"+
        "unit VARCHAR(255))";
      mysql.pool.query(createString, function(err){
        res.send("Table reset");
      })
    });
  });

// handle getWorkouts
app.get('/', (req, res) => {
    mysql.pool.query(getAllQuery, (err, rows) => {
        res.send(rows)
    })
})

// add workout
app.put('/', (req, res) => {
    var content = {};
    content = req.body
    mysql.pool.query(insertQuery, ([content.name, content.reps, content.weight, content.date, content.unit]), (err, result) =>{
      res.send(content)
    })
})

// delete workout
app.delete('/', (req, res) => {
  var content = {}
  content = req.body
  mysql.pool.query(deleteQuery, ([content.delete]), (err, result) =>{
    res.send(content)
  })
})

// edit workout
app.post('/edit', (req, res) =>{
  var content = {}
  content = req.body
  mysql.pool.query(findQuery, ([content.id]), (err, result) =>{
    res.send(result)
  })
})

app.post('/', (req, res) =>{
  var content = {}
  content = req.body
  mysql.pool.query(updateQuery, ([content.name, content.reps, content.weight, content.date, content.unit, content.id]), (err, result) =>{
    res.send(result)
  })
})
  
app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});