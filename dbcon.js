let mysql = require('mysql')

let pool = mysql.createPool({
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs290_leeyeh',
    password: '3028',
    database: 'cs290_leeyeh'

})

module.exports.pool = pool;