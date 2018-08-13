User
    - has many Apartments through Appointments

Apartment
    - has many users through Appointments

Appointment
    - belongs to a user
    - belongs to an Apartment    


User schema
    - name
    - email
    - password
    - admin

Apartment schema
    - address
    - available_time
    - image

Appointment schema
    - time
    - user_id   
    - apartment_id

Scope method
    - number_of_appointments_for_apartment
    - up_and_coming_appointments



    ROUTES
      ADMIN
        - user/:id/apartments = shows only apartments that belong to the user
        - user/:id/apartments/new = add new apartment to user's created apartments
        - user/:id/apartments/:id/edit = edit a single apartment
        - user/:id/apartments/:id/appointments = all appointments made on an apartment
        - user/:id/apartments/:id/destroy = cancels apartment(off the market)
        - user/:id/appointments = shows all appointments that have been RSVP'D to

      NON-ADMIN
        - user/:id/apartments = shows all Apartments
        - user/:id/appointments = shows all appointments RSVP'D to
        - user/:id/appointments/new = new appointment
        - user/:id/appointments/:id/destroy = cancels appointment
        - user/:id/appointments/:id/edit = change appointment time
        - user/:id/appointments/:id/apartment/:id = show apartment
