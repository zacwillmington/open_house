class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :password_digest, :admin, :uid, :phone
  has_many :appointments
  has_many :apartments, through: :appointments
end
