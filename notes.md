TODO
    - redesign 
    - Fix Github factor authentication
    - Fix errors in Rails Console
    - remove previous and next buttons when on the first and last apts.
    - Look into moving all lodash templates to one file and requiring file of some sort of partial
    - apartment show AJAx need to update the Agent contact info.
    - accessibility

----------------------------------------------------------------

App information

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



        *** If SASS is an issue.

        Ruby Sass is deprecated and will be unmaintained as of 26 March 2019.

        * If you use Sass as a command-line tool, we recommend using Dart Sass, the new
          primary implementation: https://sass-lang.com/install

        * If you use Sass as a plug-in for a Ruby web framework, we recommend using the
          sassc gem: https://github.com/sass/sassc-ruby#readme

        * For more details, please refer to the Sass blog:
          http://sass.logdown.com/posts/7081811
