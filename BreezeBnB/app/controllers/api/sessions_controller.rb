class Api::SessionsController < ApplicationController
  before_action :require_logged_in, only: [:destroy]
  before_action :require_logged_out, only: [:create]

  def show
    @user = current_user
    if(@user)
      render render 'api/users/show'
    else
      render json: { user: nil }
    end
  end

  def create
    email = params[:email]
    password = params[:password]

    @user = User.find_by_credentials(email, password)
    if @user
      login!(@user)
      render render 'api/users/show'
    else
      render json: { errors: ['Invalid credentials'] }, status: 422
    end
  end

  def destroy
    logout!
    render json: { message: 'success' }
  end
end
