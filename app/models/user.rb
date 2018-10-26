class User < ApplicationRecord
    has_many :appointments
    has_many :apartments, through: :appointments
    has_secure_password

    validates :name, :presence => true
    validates :email, :presence => true, :uniqueness => true
    validates :email, email: true
    # validates_format_of :phone, with: /\A(\d{10}|\(?\d{3}\)?[-. ]\d{3}[-.]\d{4})\z/, message: "Must be format 760111222" I left this out because when a user is signed in through GitHub the model cannot validate the returned information from GitHub when the user's GitHub account does not have a phone number.
    validates :password, :presence => true


    def self.find_or_create_by_omniauth(auth_hash)
        oauth_email = auth_hash[:info][:email]

        self.where(:email => oauth_email).first_or_create do |user|
            user.name = auth_hash[:info][:name]
            user.email = auth_hash[:info][:email]
            user.password =  SecureRandom.hex
        end
    end

    def self.error_msg_for_signin_attempt(user)
        if user == nil
             "Email not found"
        else
            "Password does not match"
        end
    end

    def appointments_happening_soon
        within_30_days = Date.today + 30
        today = Date.today
        self.appointments.find_all do |appointment|
            within_30_days > appointment.time && today < appointment.time
        end
    end


    def order_by_date_acs
        self.appointments.sort_by do |appointment|
            appointment.time
        end
    end

    def attending_appointment?(apartment)
        self.appointments.any?{ |appointment|  apartment.appointments.include?(appointment)}
    end

    def destroy_all_associated_appointments_belonging_to_apartments
        self.appointments.each do |appointment|
            appointment.apartment.appointments.destroy_all #deletes all appointments tied to each apartment that the user created, which includes the appointments of people attending the showing.
        end
    end

    def destroy_all_apartments_belonging_to_appointments
        self.appointments.each do |appointment|
            appointment.apartment.destroy #deletes each apartment that the user created.
        end
    end
end
