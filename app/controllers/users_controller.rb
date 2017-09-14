class UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      render "users/show"
    else
      errors = @user.errors.messages
      render json: errors, status: 422
    end
  end

  def index
    @users = User.all
    render 'users/index'
  end

  private

  def user_params
    params.require(:user).permit(
    :email, :role)
  end
end
