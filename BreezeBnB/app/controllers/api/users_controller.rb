class Api::UsersController < ApplicationController
  wrap_parameters :user, include: User.attribute_names + ['password']
  before_action :require_logged_out, only: [:create]

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render render 'api/users/show'
    else
      render @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :email, 
      :password, 
      :first_name, 
      :last_name,
      :birthdate,
      :bio
    )
  end
end
