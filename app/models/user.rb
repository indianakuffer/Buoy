class User < ApplicationRecord
  has_many :likes
  has_many :thoughts
end
