class AddParkingToApartments < ActiveRecord::Migration[5.2]
  def change
      add_column :apartments, :parking, :integer

  end
end
