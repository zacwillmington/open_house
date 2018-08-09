class Appointments < ActiveRecord::Migration[5.2]
  def change
      create_table :appointments do |t|
          t.datetime :time
          t.integer :user_id
          t.integer :apartment_id
      end
  end
end
