class Appointment < ApplicationRecord
    belongs_to :user
    belongs_to :apartment

    def update_admin_appointment_time
         self.update(:time => self.apartment.available_times)
    end

    def self.past_appointments
        today = Date.today
        self.all.find_all do |appointment|
            today > appointment.time
        end
    end

end
