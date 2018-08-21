class AddBathroomsToApartments < ActiveRecord::Migration[5.2]
  def change
      add_column :apartments, :bathrooms, :integer

  end
end
