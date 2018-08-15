class Apartment < ApplicationRecord
    has_many :appointments
    has_many :users, through: :appointments


    def leasing_agent_contact
        @appointmet = self.appointments.find_by(:time => self.available_times)

        @agent = User.find_by(:id => @appointmet.user_id)


    end

    def reformat_date_time
        self.available_times.strftime("%m/%d/%Y at %H:%M %P")
    end
end
