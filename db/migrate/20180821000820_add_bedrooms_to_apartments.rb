class AddBedroomsToApartments < ActiveRecord::Migration[5.2]
  def change
      add_column :apartments, :bedrooms, :integer
  end
end
