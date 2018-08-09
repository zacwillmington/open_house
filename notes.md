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
    - open_house_time

Appointment schema
    - time
    - user_id   
    - apartment_id

    
