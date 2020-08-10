class ProfilePic < ApplicationRecord
  has_many :users
  validates :image, presence: true, uniqueness: true
end
