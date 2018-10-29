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
