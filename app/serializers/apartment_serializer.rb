class ApartmentSerializer < ActiveModel::Serializer
    attributes :id, :address, :available_times, :image, :bedrooms, :bathrooms, :parking, :price
    has_many :appointments
    has_many :users, through: :appointments
end
