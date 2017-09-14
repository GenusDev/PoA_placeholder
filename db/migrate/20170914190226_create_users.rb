class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :email, unique: true
      t.string :role
      t.timestamps
    end
  end
end
