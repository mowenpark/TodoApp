class CreateTodos < ActiveRecord::Migration[4.2]
  def change
    create_table :todos do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.boolean :done, null: false

      t.timestamps null: false
    end
  end
end
