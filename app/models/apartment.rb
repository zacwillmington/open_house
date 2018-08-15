class Apartment < ApplicationRecord
    has_many :appointments
    has_many :users, through: :appointments


    def leasing_agent_contact
        binding.pry

        @appointmet = self.appointments.where(:time => self.available_times)

        @agent = Users.find_by(:id => @appointmet.user_id)



    end

    def reformat_date_time
        self.available_times.strftime("%m/%d/%Y %H:%M %P")
    end
end
