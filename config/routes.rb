Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post '/create' => 'postings#create'
  get '/info' => 'postings#all'
end
