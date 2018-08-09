class Apartments < ActiveRecord::Migration[5.2]
  def change
      create_table :apartments do |t|
          t.string :address
          t.datetime :available_times
          t.string :image
      end
  end
end
