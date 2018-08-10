class Apartment < ApplicationRecord
    has_many :users, through: :appointments
    has_many :users
    
end
