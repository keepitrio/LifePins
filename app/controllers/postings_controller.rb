class PostingsController < ApplicationController
  def all
    @postings = Posting.all
    render json: @postings
  end

  def create
    @posting = Posting.new(name: params[:name], contact: params[:latitude], latitude: params[:latitude], longitude: [:longitude],categories: params[:categories], number_of_people: params[:numberOfPeople])

    if @posting.save
      @posting
      render json: @posting
    else
      render :json, { errors: ["Sign up failed!"], status: 422 }
    end
  end
end
