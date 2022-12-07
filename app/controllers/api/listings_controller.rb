class Api::ListingsController < ApplicationController
    def index
        @listings = Listing.all
        @listings = @listings.in_bounds(bounds) if bounds
        render :index
        
    end

    def tags_index
        @listings = Listing.where("tags LIKE ?","%" + Listing.sanitize_sql_like(params[:tags]) + "%" )
        render :index
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

    def bounds
        if params[:bounds]
            params[:bounds].split(',').map(&:to_f)
        end
    end
end