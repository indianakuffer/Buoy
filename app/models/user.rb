class User < ApplicationRecord
  has_secure_password
  
  has_many :likes, dependent: :destroy
  has_many :thoughts, dependent: :destroy
  belongs_to :profile_pic, optional: true

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 6 }
end
