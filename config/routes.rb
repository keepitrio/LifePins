Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/create' => 'postings#create'
  get '/postings' => 'postings#index'
  get '/delete' => 'postings#delete'
  get '/text' => 'sms#text'

  resources :static_pages, only: [:index]

  root 'static_pages#index'
end
