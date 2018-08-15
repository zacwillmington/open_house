class Appointment < ApplicationRecord
    belongs_to :user
    belongs_to :apartment

    def update_admin_appointment_time
         self.update(:time => self.apartment.available_times)
    end
end
