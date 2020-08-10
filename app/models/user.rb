class User < ApplicationRecord
  has_many :likes
  has_many :thoughts
  belongs_to :profile_pic
end
