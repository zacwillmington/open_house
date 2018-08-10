class User < ApplicationRecord
    has_many :apartments, through: :appointments
    has_many :apartments
    has_secure_password

    validates :name, :presence => true
    validates :email, :presence => true
    validates :password, :presence => true

    validates :email, inclusion: { in: %w(.com), message: 'Must be valid email' }
end
