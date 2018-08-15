class Apartment < ApplicationRecord
    has_many :appointments
    has_many :users, through: :appointments


    def leasing_agent_contact
        self.users.find_by(:admin => true)
    end


end
