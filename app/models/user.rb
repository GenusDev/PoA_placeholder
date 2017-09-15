class User < ApplicationRecord
  validates :email, presence: { message: 'email must be present' }
  validates :email, uniqueness: { message: 'email has already been taken' }
  validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, message: 'invalid email format'
  validates :role, presence: true
end
