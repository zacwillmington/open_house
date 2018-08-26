class User < ApplicationRecord
    has_many :appointments
    has_many :apartments, through: :appointments
    has_secure_password

    validates :name, :presence => true
    validates :email, :presence => true, :uniqueness => true
    validates :email, email: true
    # validates_format_of :phone, with: /\A(\d{10}|\(?\d{3}\)?[-. ]\d{3}[-.]\d{4})\z/, message: "Must be format 760111222"
    validates :password, :presence => true


    #add validation for email address?


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

    def past_appointments
        today = Date.today
        self.appointments.all.find_all do |appointment|
            today > appointment.time && appointment.user.admin
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

end
