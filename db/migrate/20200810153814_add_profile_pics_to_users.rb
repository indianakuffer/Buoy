class AddProfilePicsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_reference :users, :profile_pic, foreign_key: true
  end
end
