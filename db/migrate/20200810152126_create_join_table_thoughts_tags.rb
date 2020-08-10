class CreateJoinTableThoughtsTags < ActiveRecord::Migration[6.0]
  def change
    create_join_table :thoughts, :tags do |t|
      # t.index [:thought_id, :tag_id]
      # t.index [:tag_id, :thought_id]
    end
  end
end
