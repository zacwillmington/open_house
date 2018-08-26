class Apartment < ApplicationRecord
    has_many :appointments
    has_many :users, through: :appointments
    mount_uploader :image, ImageUploader


    validates :address, :presence => true, :uniqueness => true
    validates :bathrooms, :presence => true
    validates :bedrooms, :presence => true
    validates :parking, :presence => true
    validates :price, :presence => true

    validates :available_times, :uniqueness =>  {:message => "You have an appointment clash."}



    def leasing_agent_contact
        # First appointment for each apartments is the creator/admin's appointment.
        @agent = self.appointments.first.user
    end

    def reformat_date_time
        self.available_times.strftime("%m/%d/%Y at %H:%M %P")
    end

end
