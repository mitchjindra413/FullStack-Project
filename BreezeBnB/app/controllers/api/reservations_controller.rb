class Api::ReservationsController < ApplicationController
    before_action :require_logged_in
    def index
        if params[:listing_id]
            @reservations = Reservation.where(listing_id: params[:listing_id])
            render :index
        end

        if params[:user_id]
            @reservations = Reservation.where(user_id: params[:user_id])
        end
    end

    def show
        @reservation = Reservation.find_by(id: params[:id])
        if @reservation.user_id == current_user.id
            render :show
        else
            render json: {errors: ['Must be logged in as creator of reservation']}, status: :unprocessable_entity
        end
    end

    def create
        @reservation = Reservation.new(reservation_params)
        if @reservation.save
            render :show
        else
            render json: {errors: @reservation.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        @reservation = Reservation.find_by(id: params[:id])
        
        if @reservation.user_id == current_user.id
            if @reservation.update(reservation_params)
                render :show
            else
                render json: {errors: @reservation.errors.full_messages}, status: :unprocessable_entity
            end
        else
            render json: {errors: ['Not reservation owner']}
        end
    end

    def destroy
        @reservation = Reservation.find_by(id: params[:id])
        if current_user.id == @reservation.user_id
            @reservation.delete
            render json: {message: ['sucess']}
        else
            render json: {errors: ['Must be the creator of reservation to delete']}
        end
    end


    private
    def reservation_params
        params.require(:reservation).permit(
            :id,
            :user_id,
            :listing_id,
            :start_date,
            :end_date,
            :num_guests
        )
    end

end
