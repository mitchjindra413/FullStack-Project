Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :update, :destroy]
    resources :listings, only: [:show, :index]
    resources :reservations, only: [:show, :create, :update, :destroy]
    resource :session, only: [:create, :destroy, :show]
  end
end
