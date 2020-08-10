class Tag < ApplicationRecord
  has_and_belongs_to_many :thoughts

  validate :name, presence: true, uniqueness: true, length: { maximum: 20 }
end
