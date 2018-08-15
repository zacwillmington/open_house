class User < ApplicationRecord
    has_many :appointments
    has_many :apartments, through: :appointments
    has_secure_password

    validates :name, :presence => true
    validates :email, :presence => true, :uniqueness => true
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

end
