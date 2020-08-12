class Thought < ApplicationRecord
  belongs_to :user
  has_many :likes, dependent: :destroy
  has_and_belongs_to_many :tags

  validates :content, presence: true, length: { maximum: 40 }
  validates :color, presence: true, inclusion: { in: %w(e64c3c f0c419 086788 fbffe2 2a9d8f), message: "%{value} is not an approved hex code" }
end
