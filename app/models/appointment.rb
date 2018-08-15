class Appointment < ApplicationRecord
    belongs_to :user
    belongs_to :apartment

    def update_admin_appointment_time
        self.apartment.available_times = self.time
    end
end
