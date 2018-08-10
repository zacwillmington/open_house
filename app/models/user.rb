class User < ApplicationRecord
    has_many :apartments, through: :appointments
    has_many :apartments
    has_secure_password

    validates :name, :presence => true
    validates :email, :presence => true, :uniqueness => true
    validates :password, :presence => true

    #add validation for email address

end
