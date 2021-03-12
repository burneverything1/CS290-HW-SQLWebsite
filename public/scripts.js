var baseUrl = 'http://localhost:3000/'

// get all the rows of server
document.addEventListener('DOMContentLoaded', getWorkouts)


function getWorkouts() {
    var req = new XMLHttpRequest();
    req.open('GET', baseUrl, true)
    req.addEventListener('load', function() {
        if(req.status >= 200 && req.status <= 400) {
            createTable(JSON.parse(req.responseText))
        }
        else {
            console.log("Error in network request: " + req.statusText)
        }
    })
    req.send(null)
}

document.addEventListener('DOMContentLoaded', bindbuttons);

function bindbuttons() {
    // submit workout button
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
                createRow(JSON.parse(req.responseText))
            }
            else {
                console.log('Error in network request: ' + req.statusText)
            }
        })
        req.send(JSON.stringify(payload))
    })
}

function createTable(req_json) {
    var body = document.getElementById('workoutbody')
    req_json.forEach(element => {

        let row = body.insertRow()
        let w_name = row.insertCell(0)
        w_name.innerHTML = element.name
        let w_reps = row.insertCell(1)
        w_reps.innerHTML = element.reps
        let w_weight = row.insertCell(2)
        w_weight.innerHTML = element.weight
        let w_date = row.insertCell(3)
        w_date.innerHTML = element.date
        let w_unit = row.insertCell(4)
        w_unit.innerHTML = element.unit
        // buttons
        let w_inputs = row.insertCell(5)
        let w_buttons = document.createElement('form')

        let hidden_id = document.createElement('input')
        hidden_id.type = 'hidden'
        hidden_id.name = `${element.id}`
        hidden_id.value = `${element.id}`
        w_buttons.appendChild(hidden_id)

        let w_delete = document.createElement('input')
        w_delete.type = 'submit'
        w_delete.name = 'delete'
        w_delete.value = 'Delete'
        w_delete.id = `${element.id}delete`
        w_buttons.appendChild(w_delete)
        let w_edit = document.createElement('input')
        w_edit.type = 'submit'
        w_edit.name = 'edit'
        w_edit.value = 'Edit'
        w_edit.id = `${element.id}edit`
        w_buttons.appendChild(w_edit)

        w_inputs.appendChild(w_buttons)
    });
}

function createRow(req_json){
    var body = document.getElementById('workoutbody')
    let row = body.insertRow()
    let w_name = row.insertCell(0)
    w_name.innerHTML = req_json.name
    let w_reps = row.insertCell(1)
    w_reps.innerHTML = req_json.reps
    let w_weight = row.insertCell(2)
    w_weight.innerHTML = req_json.weight
    let w_date = row.insertCell(3)
    w_date.innerHTML = req_json.date
    let w_unit = row.insertCell(4)
    w_unit.innerHTML = req_json.unit        
    // buttons
    let w_inputs = row.insertCell(5)
    let w_buttons = document.createElement('form')

    let hidden_id = document.createElement('input')
    hidden_id.type = 'hidden'
    hidden_id.name = `${req_json.id}`
    hidden_id.value = `${req_json.id}`
    w_buttons.appendChild(hidden_id)

    let w_delete = document.createElement('input')
    w_delete.type = 'submit'
    w_delete.name = 'delete'
    w_delete.value = 'Delete'
    w_delete.id = `${req_json.id}delete`
    w_buttons.appendChild(w_delete)
    let w_edit = document.createElement('input')
    w_edit.type = 'submit'
    w_edit.name = 'edit'
    w_edit.value = 'Edit'
    w_edit.id = `${req_json.id}edit`
    w_buttons.appendChild(w_edit)

    w_inputs.appendChild(w_buttons)  
}