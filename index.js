// Pure javascript - Add 'submit' event listener to form with id="myForm"
// more info: https://www.w3schools.com/js/
// document.querySelector('#myForm').addEventListener('submit', function (e) {
//     console.log("Submittied");
// });

// or JQuery - Add 'submit' event listener to form with id="myForm"
// more info: https://www.w3schools.com/jquery/default.asp
// $("myform").submit(function (e) {
//     console.log("Submitted");
// });

showTable()

$('#submit').click(() => {
    if ($('#name').val() == '' || $('#name').val() == null) $('#name').focus()
    else if ($('#urlWeb').val() == '' || $('#urlWeb').val() == null || !validURL($('#urlWeb').val())) {
        $('#urlWeb').val('');
        $('#urlWeb').focus();
    }
    else {
        const data = {
            name: $('#name').val(),
            url: $('#urlWeb').val(),
        }
        window.localStorage.setItem(data.name, JSON.stringify(data));
        alert('Bookmark Added !');
        $('#name').val('');
        $('#urlWeb').val('');
        showTable();
        $('#name').focus()
    }
})

function showTable() {
    let table = $('tbody')[0]
    $('tbody tr').remove()
    for (let i = 0; i < localStorage.length; i++) {
        let d = JSON.parse(localStorage.getItem(localStorage.key(i)));
        let row = table.insertRow(-1);
        let firstCell = row.insertCell(0);
        let secondCell = row.insertCell(1);
        let thirdCell = row.insertCell(2);
        firstCell.textContent = d.name;
        $('<a href="' + d.url + '" target="_blank">' + d.url + '</a>').appendTo(secondCell);
        thirdCell.innerHTML = "<button id='delete' type='button' class='btn btn-danger btn-xs' onclick='deleted();'>X</button>"
        $("#delete").click(function () { // using the unique ID of the button
            console.log($(this).val());
        });
    }
    // localStorage.clear()
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str);
}

function deleted() {
    var $item = $(this).closest("tr")   // Finds the closest row <tr> 
        .find(".nr")     // Gets a descendent with class="nr"
        .text();
}