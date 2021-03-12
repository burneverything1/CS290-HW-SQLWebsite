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
var insertQuery = ``
var updateQuery = ``
var deleteQuery = ``
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
    content = JSON.parse(req.body)
    console.log(content)
    res.send(content)
})

  
app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});