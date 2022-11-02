class Api::ReservationsController < ApplicationController
    before_action :require_logged_in

    def show
        @reservation = Reservation.find_by(id: params[:id])
        if @reservation.user_id == current_user.id
            render :show
        else
            render json: {errors: @reservation.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def create
        @reservation = Reservation.new(reservation_params)
        if @reservation.save
            render :create
        else
            render json: {errors: @reservation.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        @reservation = Reservation.find_by(id: params[:id])
        if @reservation.update
            render :update
        else
            render json: {errors: @reservation.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        @reservation = Reservation.find_by(id: params[:id])
        if current_user.id == @reservation.user_id
            @reservation.delete
        else
            render json: {errors: ['Must be the creator of reservation to delete']}
        end
    end


    private
    def reservation_params
        require(:reservation).permit(
            :id,
            :user_id,
            :listing_id,
            :start_date,
            :end_date,
            :num_guests
        )
    end

end
