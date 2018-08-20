class Apartment < ApplicationRecord
    has_many :appointments
    has_many :users, through: :appointments
    mount_uploader :image, ImageUploader


    validates :address, :presence => true, :uniqueness => true
    validates :available_times, :presence => true
    validates :available_times, :uniqueness =>  {:message => "You have an appointment clash."}





    def leasing_agent_contact
        @appointment ||= self.appointments.find_by(:time => self.available_times)
        @agent ||= User.find_by(:id => @appointment.user_id)
    end

    def reformat_date_time
        self.available_times.strftime("%m/%d/%Y at %H:%M %P")
    end
end
