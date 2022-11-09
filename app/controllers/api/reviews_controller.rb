class Api::ReviewsController < ApplicationController
    def index
        if params[:listing_id]
            @reviews = Review.where(listing_id: params[:listing_id])
            render :index
        end

        if params[:user_id]
            @reviews = Review.where(user_id: params[:user_id]).order(start_date: :desc)
            render :user_index
        end
    end

    def show
        @review = Review.find_by(id: params[:id])
        render :show
    end

    def create
        @review = Review.new(review_params)
        if @review.save
            render :show
        else
            render json: {errors: @review.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        @review = Review.find_by(id: params[:id])
        
        if @review.user_id == current_user.id
            if @review.update(review_params)
                render :show
            else
                render json: {errors: @review.errors.full_messages}, status: :unprocessable_entity
            end
        else
            render json: {errors: ['Not review owner']}
        end

    end

    def destroy
        @review = Review.find_by(id: params[:id])
        if current_user.id == @review.user_id
            @review.delete
            render json: {message: ['sucess']}
        else
            render json: {errors: ['Must be the creator of review to delete']}
        end
    end

    private
    def review_params
        params.require(:review).permit(
            :id,
            :listing_id,
            :user_id,
            :description, 
            :cleanliness, 
            :accuracy, 
            :location, 
            :value, 
            :communication, 
            :check_in
        )
    end
end
