var baseUrl = 'http://localhost:3000/'

// get all the rows of server
document.addEventListener('DOMContentLoaded', getWorkouts)


function getWorkouts() {
    var req = new XMLHttpRequest();
    req.open('GET', baseUrl, true)
    req.addEventListener('load', function() {
        if(req.status >= 200 && req.status <= 400) {
            createTable(req.responseText)
        }
        else {
            console.log("Error in network request: " + req.statusText)
        }
    })
    req.send(null)
}

document.addEventListener('DOMContentLoaded', bindbuttons);

function bindbuttons() {
    document.getElementById('workoutsubmit').addEventListener('click', function(event) {
        event.stopImmediatePropagation()
        event.preventDefault()
        var req = new XMLHttpRequest();
        var payload = {
            "name" : document.getElementById('name').value,
            "reps" : null,
            "weight" : null,
            "date" : null,
            "unit" : null
        }
        // conditional adds
        if (document.getElementById('reps').value){
            payload.reps = document.getElementById('reps').value
        }
        if (document.getElementById('weight').value){
            payload.weight = document.getElementById('weight').value
        }
        if (document.getElementById('date').value){
            payload.date = document.getElementById('date').value
        }
        if (document.getElementById('pounds').checked){
            payload.unit = document.getElementById('pounds').value
        }
        else if (document.getElementById('kilograms').checked){
            payload.unit = document.getElementById('kilograms').value
        }

        req.open('PUT', baseUrl, true)
        req.setRequestHeader('Content-Type', 'application/json')
        req.addEventListener('load', function() {
            if(req.status >= 200 && req.status <= 400) {
                console.log('requestsent')
            }
            else {
                console.log('Error in network request: ' + req.statusText)
            }
        })
        req.send(JSON.stringify(payload))
    })
}

function createTable(req_json) {

}
