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


    TODO

        1 - validates email and phone
            - validates for phone number length and syntax
            - validates for email length and syntax

        2 - Errors and flash messages
            - user.attending_appointment(apartment)? if attending true then show green box of some sort.    
            - if appointments_happening_soon then show green border around apartment with happening soon displayed.
            - if past_appointments then show red around appointment      
            
        3 - styling
        4 - Tidy up routes. Remove some
        5 - refactor
        6 - readme
        7 -

        Quick Question. I'm not quite sure if I am creating the correct routes for my project.

        I'm trying to keep them RESTful but should I have the user.id in my url? e.g. new_user_apartment_path. Because I have the apartment nested under the user.

        like this resources :users do
            resources :apartments
        end
         I think I remember you saying that it's not a good idea to show the user's id in the url, for the reason that if hackers can find out your id then they can potentially get up to some mischief.            
