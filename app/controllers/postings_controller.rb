class PostingsController < ApplicationController
  protect_from_forgery with: :null_session

  def all
    @postings = Posting.all
    render json: @postings
  end

  def create
    @posting = Posting.new(
      name: params[:name], 
      contact: params[:contact], 
      latitude: params[:latitude], 
      longitude: [:longitude],
      categories: params[:categories], 
      number_of_people: params[:numberOfPeople]
    )
    coords = Geocoder.coordinates(params[:address])
    @posting = Posting.new(name: params[:name], contact: params[:contact], latitude: coords[0], longitude: coords[1],categories: params[:categories], number_of_people: params[:number_of_people])

    if @posting.save
      @posting
      render json: @posting
    else
      render :json, 
      { errors: ["Sign up failed!"], 
        status: 422 }
    end
  end
end