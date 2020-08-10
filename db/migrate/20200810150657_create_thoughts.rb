class CreateThoughts < ActiveRecord::Migration[6.0]
  def change
    create_table :thoughts do |t|
      t.string :content
      t.references :user, null: false, foreign_key: true
      t.string :color
      t.string :location

      t.timestamps
    end
  end
end
