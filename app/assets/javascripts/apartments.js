$( document ).ready(function() {
    attachListeners();
});


function attachListeners() {
    $('.js-get-all-apartments-btn').on('click', function(e) {
        e.preventDefault();
         getApartments(e);
    });
}

function getApartments(e) {
    $.get(`${e.target.href}`).done(function(data) {
        debugger;
        // ES6 create class for each apartment. Then
        // addToUsersShow(data);
    });
}

function
