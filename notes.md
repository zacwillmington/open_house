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


**** create apartment through appointment, but only allow admin to create appointment and apartment. The form will create and associate them simultaneously?  

which route will that run to, user/:id/apartments/new or user/:id/appointments/new, also apartments or appointments controller? (I think apartments_controller because the appointments controller is the join table.)



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

        1 - finish all crud actions for all models
            - #@user.attending_showing = returns a message under apartment
            - edit appointment for non-admin
            - thumbnail for appointments index page.

        2 - scope methods
        3 - Errors and flash messages
        4 - styling
        5 - Tidy up routes. Remove some
        6 - refactor
        7 - readme
        8 -

        Quick Question. I'm not quite sure if I am creating the correct routes for my project.

        I'm trying to keep them RESTful but should I have the user.id in my url? e.g. new_user_apartment_path. Because I have the apartment nested under the user.

        like this resources :users do
            resources :apartments
        end
         I think I remember you saying that it's not a good idea to show the user's id in the url, for the reason that if hackers can find out your id then they can potentially get up to some mischief.    


         EXTRA

         -  order_by_date_acs
         -  order_by_date_des
         - if appointments_happening_soon then show green border around apartment with happening soon displayed.
         - thumbnail for index view of appointments         
