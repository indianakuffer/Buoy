class CreateProfilePics < ActiveRecord::Migration[6.0]
  def change
    create_table :profile_pics do |t|
      t.string :image
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
