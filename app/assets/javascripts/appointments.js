$( document ).ready( () => attachListenersAppointments());


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
    $('.js-get-appointment-btn').on('click', (e) => {
        e.preventDefault();
        getUsersAppointments(e.currentTarget.href);
        // createAppointments(appointments);
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
}

function getUsersAppointments(url) {
    $.get(`${url}`, (data) => {
        let appointments = createAppointments(data);
        addAppointmentsToUserShow(appointments);
    });
}

function createAppointments(appointments) {
    let appointmentsArray = [];
    appointments.forEach( (app) => {
        let appointment = new Appointment;
        appointment.id = app.id;
        appointment.time = app.time;
        appointment.user_id = app.user_id;
        appointment.apartment_id = app.apartment_id;
        appointment.name = app.name;
        appointment.user = new User(app.user);
        appointmentsArray.push(appointment);
    });
    return appointmentsArray;
}

function addAppointmentsToUserShow(appointments) {
    debugger;
    
}

function showAppointmentForm(e) {
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
