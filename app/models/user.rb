class User < ApplicationRecord
    has_many :apartments, through: :appointments
    has_many :apartments
    has_secure_password

    # validates :name, :presence => true
    validates :email, :presence => true, :uniqueness => true
    validates :password, :presence => true

    #add validation for email address

    def self.find_or_create_by_omniauth(auth_hash)
        oauth_email = auth_hash[:info][:email]
        self.where(:email => oauth_email).first_or_create do |user|
            user.name = auth_hash[:info][:name]
            user.password =  SecureRandom.hex
        end
    end

    def self.authenticate_and_login_existing_user(params)
        @user = User.find_by(:email => params[:email])
        if @user && @user.authenticate(params[:password])
            session[:user_id] = @user.id
            @user
        else
            false
        end
    end

    def error_msg_for_signin_attempt
        if self == nil
             "Email not found"
        else
            "Password does not match"
        end
    end

end
