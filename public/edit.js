var baseUrl = 'http://localhost:3000/'
var editURL = 'http://localhost:3000/edit'

document.addEventListener('DOMContentLoaded', loadWorkout)

function loadWorkout() {
    var req = new XMLHttpRequest()
    var queryString = window.location.search
    var urlParams = new URLSearchParams(queryString)
    var edit_id = urlParams.get('q')
    var payload = { "id": edit_id }
    req.open('POST', editURL, true)
    req.setRequestHeader('Content-Type', 'application/json')
    req.addEventListener('load', function() {
        if(req.status >= 200 && req.status <= 400) {
            fillPage(JSON.parse(req.responseText))
        }
        else {
            console.log('Error in network request: ' + req.statusText)
        }
    })
    req.send(JSON.stringify(payload))
}

function fillPage(req_json) {
    document.getElementById('name').value = req_json[0].name
    document.getElementById('reps').value = req_json[0].reps
    document.getElementById('weight').value = req_json[0].weight
    document.getElementById('date').value = req_json[0].date.slice(0, 10)
    let e_unit = req_json[0].unit
    if (e_unit === "pounds"){
        document.getElementById('pounds').checked = true
    } else if (e_unit === "kilograms"){
        document.getElementById('kilograms').checked = true
    }
}

document.addEventListener('DOMContentLoaded', bindbuttons)

function bindbuttons() {
    document.getElementById('editsubmit').addEventListener('click', function(event) {
        event.stopImmediatePropagation()
        event.preventDefault()
        var req = new XMLHttpRequest()
        var queryString = window.location.search
        var urlParams = new URLSearchParams(queryString)
        var edit_id = urlParams.get('q')
        var payload = {
            "name" : document.getElementById('name').value,
            "reps" : null,
            "weight" : null,
            "date" : null,
            "unit" : null,
            "id" : edit_id
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
        req.open('POST', baseUrl, true)
        req.setRequestHeader('Content-Type', 'application/json')
        req.addEventListener('load', function(){
            if (req.status >= 200 && req.status <= 400){
                window.location.href = baseUrl + 'home.html'
            }
            else {
                console.log('Error in network request: ' + req.statusText)
            }
        })
        req.send(JSON.stringify(payload))
    })
}