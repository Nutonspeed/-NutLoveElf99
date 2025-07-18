class CreateCsatSurveys < ActiveRecord::Migration[7.0]
  def change
    create_table :csat_surveys do |t|
      t.bigint :account_id, null: false
      t.bigint :conversation_id, null: false
      t.bigint :message_id, null: false
      t.timestamps
    end
    add_index :csat_surveys, :account_id
    add_index :csat_surveys, :conversation_id
    add_index :csat_surveys, :message_id, unique: true
  end
end
