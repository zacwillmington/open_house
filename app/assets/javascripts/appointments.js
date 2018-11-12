
_.templateSettings = {
    interpolate: /\{\{\=(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g
};

function attachListenersAppointments() {
    $('.js-get-appointments-btn').on('click', (e) => {
        e.preventDefault();
        getUsersAppointments(e.currentTarget.href);
    });

    $('#async-form').on('submit', (e) => {
        e.preventDefault();
        const $inputs = $('#async-form :input');
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
    const dateStr = moment(this.time).format('MMMM Do YYYY, h:mm a');
    return dateStr;
 }


function getUsersAppointments(url) {
    $.get(`${url}`, (data) => {
        const appointments = createAppointments(data);
        addAppointmentsToUserShow(appointments);
        return appointments;
    });

}

function createAppointments(appointments) {
    const appointmentsArray = [];
    appointments.forEach((app) => {
        const appointment = new Appointment;
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
    $('.all-past-appointments-page').remove();
    $('.account').remove();
    $('#apartment-contact-previous-next').remove();
    $('.apartment').remove();
    $('.alert-success').remove();
    let div = $('.appointments');
    const h2Appointments = document.getElementById("appointments-title");
    if (h2Appointments === null) {
        appointments.forEach( (appointment) => {
            const url = `/apartments/${appointment.apartment_id}`;
            const appointmentTemplate = document.getElementById('appointment-template').innerHTML;
            const templateFn = _.template(appointmentTemplate);
            const templateHTML = templateFn({
                id: appointment.id,
                time: appointment.reformatDateTime(),
                apartmentId: appointment.apartment_id,
                apartmentUrl: `/apartments/${appointment.apartment_id}`,
                imageThumb: appointment.apartment.image.thumb.url,
                deletetUrl: `/apartments/${appointment.apartment_id}/appointments/${appointment.id}`
            });
            div.append(templateHTML);
        });
        $("#appointments-title-container").prepend('<div id="appointments-title"><h2>Appointments</h2></div>');
    }
}

function makeAppointment(values) {
    const appointment = new Appointment;
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

function deleteAppointment(data) {
    window.event.preventDefault();
    const appointmentDiv = $('.appointment');
    const apartmentId = appointmentDiv.data('apartmentid');
    const appointmentId = appointmentDiv.data('appointmentid');
    const deleteUrl = `/apartments/${apartmentId}/appointments/${appointmentId}`;
    $.ajax({
    url: deleteUrl,
    type: 'DELETE',
    dataType: 'script',
    format: 'js',
    contentType: 'application/json',
    success: function(result) {
        alert('Appointment Canceled');
        removeAppointment(appointmentId);
        }
    });
}

function removeAppointment(appointmentId) {
    $(".appointment").find(`[data-appointmentId='${appointmentId}']`).remove();
}
