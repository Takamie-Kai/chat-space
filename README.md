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
- belongs_to :users, through: :groups_users
- has_many :message, through: :groups_users

## messages table
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|
|user_id|integer|null: false, unique :true|
|group_id|integer|null: false|

### Association
- belongs_to :user, through: :groups_users
- belongs_to :group, through: :groups_users

## groups_users table
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :users
- belongs_to :groups