class Api::ListingsController < ApplicationController
    def index
        if params[:user_id]
            @listings = User.find_by(id: params[:user_id]).trips
            @owners = {}
            @listings.each do |listing|
                @owners[listing.owner_id] = User.find_by(id: listing.owner_id)
            end
            render :trips_index
        else
            @listings = Listing.all
            @owners = {}
            @listings.each do |listing|
                @owners[listing.owner_id] = User.find_by(id: listing.owner_id)
            end
            render :trips_index
        end
    end

    def location_index
        @listings = Listing.where(city: params[:city], state: params[:state], country: params[:country])
        render :location_index
    end

    def show
        @listing = Listing.find_by(id: params[:id])
        if @listing 
            @owner = User.find_by(id: @listing.owner_id)
            render :show
        else
            render json: {errors: 'Lisitng not found'}, status: 422
        end
    end

    private
    def listings_params 
        params.require(:listing).permit(
            :owner_id,
            :street_address,
            :apt,
            :city,
            :zip_code,
            :state,
            :country,
            :lat,
            :long,
            :tags,
            :property_type,
            :max_guests,
            :night_price,
            :cleaning_fee,
            :description,
            :num_bedrooms,
            :num_beds,
            :num_baths,
            :amenities,
            :tag_line,
            :user_id
        )
    end
end