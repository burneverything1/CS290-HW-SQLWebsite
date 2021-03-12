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

        var req = new XMLHttpRequest();
        var payload = {
            "name" : document.getElementById('name').value,
            "reps" : document.getElementById('reps').value,
            "weight" : document.getElementById('weight').value,
            "date" : document.getElementById('date').value,
            "unit" : document.getElementById('unit').value
        }
        req.open('PUT', baseUrl, true)
        req.setRequestHeader('Content-Type', 'application/json')
        req.addEventListener('load', function() {
            if(req.status >= 200 && req.status <= 400) {

            }
            else {
                console.log('Error in network request: ' + req.statusText)
            }
        })
        req.send(JSON.stringify(payload))
        event.preventDefault()

    })
}

function createTable(req_json) {

}
