class CreatePhotosTags < ActiveRecord::Migration[5.0]
  def change
    create_table :photos_tags do |t|

      t.timestamps
    end
  end
end
