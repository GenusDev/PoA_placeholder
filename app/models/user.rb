class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true
  validates :role, presence: true
end
