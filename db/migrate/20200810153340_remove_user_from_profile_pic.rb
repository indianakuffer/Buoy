class RemoveUserFromProfilePic < ActiveRecord::Migration[6.0]
  def change
    change_table :profile_pics do |t|
      t.remove :user_id
    end
  end
end
