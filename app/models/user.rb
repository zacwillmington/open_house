class User < ApplicationRecord
    has_many :apartments, through: :appointments
    has_many :apartments
    has_secure_password
end
