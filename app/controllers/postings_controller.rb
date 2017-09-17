class PostingsController < ApplicationController
  def all
    @postings = Posting.all
    render json: @postings
  end

  def create
    coords = Geocoder.coordinates(params[:address])
    p params
    @posting = Posting.new(name: params[:name], contact: params[:latitude], latitude: coords[0], longitude: coords[1],categories: params[:categories], number_of_people: params[:number_of_people])
    p coords
    p "butts" * 100

    if @posting.save
      @posting
      render json: @posting
    else
      render :json, { errors: ["Sign up failed!"], status: 422 }
    end
  end
end
