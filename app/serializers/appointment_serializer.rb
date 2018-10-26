class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :time, :name, :user_id, :apartment_id
  belongs_to :user
  belongs_to :apartment
end
