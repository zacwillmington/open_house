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

function createAppointments(appointments) {
    let appointmentsArray = [];
    appointments.forEach( (app) => {
        appointment = new Appointment;
        appointment.id = app.id;
        appointment.time = app.time;
        appointment.user_id = app.user_id;
        appointment.apartment_id = app.apartment_id;
        appointment.name = app.name;
        appointmentsArray.push(appointment);
    });
    return appointmentsArray;
}

function showAppointmentForm(e) {
    $('.js-make-appointment').addClass('hidden');
    $('form.hidden').removeClass('hidden');

}

function makeAppointment(values) {
    appointment = new Appointment;
    appointment.name  = values[2].value;
    appointment.user_id  = values[3].value;
    appointment.apartment_id = values[4].value;
    appointment.time = values[5].value;
    $.post(`/apartments/${appointment.apartment_id}/appointments`, { appointment }).done( (data) => {
        $('#async-form').addClass('hidden');
        alert("Thank you for making an appointment.");
    });
}
