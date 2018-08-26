class AddNameToAppointment < ActiveRecord::Migration[5.2]
  def change
      add_column :appointments, :name, :string
  end
end
