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
        // get data and insert into users/show page
    });
}
