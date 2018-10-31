$( document ).ready( () => attachListenersAppointments());


// Change Lodash template interpolation characters from <%- foo %> to mustache style {{= foo }}. Erb syntax interferes with lodash.
_.templateSettings = {
    interpolate: /\{\{\=(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g
};

function attachListenersAppointments() {
    $('.js-make-appointment').on('click', (e) => {
        e.preventDefault();
        showAppointmentForm(e);
    });
    $('#async-form').on('submit', (e) => {
        e.preventDefault();
        let $inputs = $('#async-form :input');
        makeAppointment($inputs);
    });
    $('.js-get-appointments-btn').on('click', (e) => {
        e.preventDefault();
        getUsersAppointments(e.currentTarget.href);
    });
}

class Appointment {
    constructor(id, time, user_id, apartment_id, name) {
            self.id = id;
            self.time = time;
            self.user_id = user_id;
            self.apartment_id = apartment_id;
            self.name = name;
    }

    getAppointmentsApartment(appointment) {
        debugger;
    }
}

function getUsersAppointments(url) {
    $.get(`${url}`, (data) => {
        let appointments = createAppointments(data);
        addAppointmentsToUserShow(appointments);
    });
}

function createAppointments(appointments) {
    let appointmentsArray = [];
    // Look into adding appointment.apartment method to model seeing as Rails sends back the apartment object too. Then you can mass assign data.
    appointments.forEach( (app) => {
        let appointment = new Appointment;
        appointment.id = app.id;
        appointment.time = app.time;
        appointment.user_id = app.user_id;
        appointment.apartment_id = app.apartment_id;
        appointment.name = app.name;
        // appointment.user = new User(app.user); Only time this user object is return is when the request is sent from appointments controller
        appointmentsArray.push(appointment);
    });
    return appointmentsArray;
}

function addAppointmentsToUserShow(appointments) {

    let div = $('.appointments');
    let h2Appointments = document.getElementById("appointments-title");
    if (h2Appointments === null) {
        appointments.forEach( (appointment) => {
            // let apartment;
            //  $.get(`apartments/${appointment.apartment_id}`).done( (data) => {
            //      debugger;
            //     apartment = createApartment(data);
            // });
            let appointmentTemplate = document.getElementById('appointment-template').innerHTML;
            let templateFn = _.template(appointmentTemplate);
            let templateHTML = templateFn({
                id: appointment.id,
                time: appointment.time,
                userId: appointment.user_id,
                apartmentId: appointment.apartment_id,
                name: appointment.name,
                apartmentUrl: `/apartments/${appointment.apartment_id}`
            });
            // image: apartment.image.thumb.url,
            // showing: apartment.reformatDateTime,
            // attending: apartment.appointments.length - 1
            div.append(templateHTML);
        });
        $(".appointments").prepend('<div id="appointments-title"><h2>Appointments</h2></div>');
    }
}

function showAppointmentForm() {
    $('.js-make-appointment').fadeOut("slow", function() {
        $(this).addClass('hidden');
    });
    $('form.hidden').fadeIn("slow", function() {
        $(this).removeClass('hidden');
    });
}

function makeAppointment(values) {
    let appointment = new Appointment;
    appointment.name  = values[2].value;
    appointment.user_id  = values[3].value;
    appointment.apartment_id = values[4].value;
    appointment.time = values[5].value;
    $.post(`/apartments/${appointment.apartment_id}/appointments`, { appointment }).done( (data) => {
        $('#async-form').addClass('hidden');

        let alertDiv = document.createElement('div');
        alertDiv.className = "alert alert-success";
        alertDiv.innerText = "You RSVP'D to this apartment";
        $('div.apartment-info').append(alertDiv);
    });
}
