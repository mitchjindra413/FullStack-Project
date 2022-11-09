class Api::UsersController < ApplicationController
  wrap_parameters :user, include: User.attribute_names + ['password']
  before_action :require_logged_out, only: [:create]
  def show
    @user = User.find_by(id: params[:id])
    if @user
      render :show
    else
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render 'api/users/show'
    else
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :id,
      :email, 
      :password, 
      :first_name, 
      :last_name,
      :birthdate,
      :bio
    )
  end
end
