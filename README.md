# DB設計

## users table

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: ture, index: true|
|mail|string|null: false|

### Association
- has_many :groups, through: :groups_users
- has_many :messages
- has_many :groups_users

## groups table 

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|

### Association
- has_many :users, through: :groups_users
- has_many :messages, through: :groups_users

## messages table
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|user|references|null: false, foreign_key: ture|
|group|references|null: false, foreign_key: ture|

### Association
- belongs_to :user
- belongs_to :group

## groups_users table
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group