
_.templateSettings = {
    interpolate: /\{\{\=(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g
};

function attachListenersAppointments() {
    // const profileUrl = "http://0.0.0.0:3000/users/33";
    // if (window.location.href === profileUrl){
        $('.js-get-appointments-btn').on('click', (e) => {
            e.preventDefault();
            getUsersAppointments(e.currentTarget.href);
        });
    // }

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

 Appointment.prototype.reformatDateTime = function () {
    let dateStr = moment(this.time).format('MMMM Do YYYY, h:mm a');
    return dateStr;
 }



function getUsersAppointments(url) {
    $.get(`${url}`, (data) => {
        let appointments = createAppointments(data);
        addAppointmentsToUserShow(appointments);
        return appointments;
    });

}

function createAppointments(appointments) {
    let appointmentsArray = [];
    appointments.forEach( (app) => {
        let appointment = new Appointment;
        if (app.apartment){
            appointment.apartment = createApartment(app.apartment);
        }
        appointment.id = app.id;
        appointment.time = app.time;
        appointment.user_id = app.user_id;
        appointment.apartment_id = app.apartment_id;
        appointment.name = app.name;
        appointmentsArray.push(appointment);
    });
    return appointmentsArray;
}

function addAppointmentsToUserShow(appointments) {
    let div = $('.appointments');
    let h2Appointments = document.getElementById("appointments-title");
    if (h2Appointments === null) {
        appointments.forEach( (appointment) => {
            let url = `/apartments/${appointment.apartment_id}`;
            let appointmentTemplate = document.getElementById('appointment-template').innerHTML;
            let templateFn = _.template(appointmentTemplate);
            let templateHTML = templateFn({
                id: appointment.id,
                time: appointment.reformatDateTime(),
                apartmentId: appointment.apartment_id,
                apartmentUrl: `/apartments/${appointment.apartment_id}`,
                imageThumb: appointment.apartment.image.thumb.url
            });
            div.append(templateHTML);
        });
        $("#appointments-title-container").prepend('<div id="appointments-title"><h2>Appointments</h2></div>');
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
