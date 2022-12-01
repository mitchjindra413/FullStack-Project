Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :update, :destroy] do 
      resources :reservations, only: [:index]
      resources :listings, only: [:index]
      resources :reviews, only: [:index]
    end
    resources :listings, only: [:show, :index] do
      resources :reservations, only: [:index]
      resources :reviews, only: [:index]
    end
    resources :reservations, only: [:show, :create, :update, :destroy]
    resource :session, only: [:create, :destroy, :show]
    resources :reviews, only: [:create, :destroy, :update, :show]

    get '/listings/tags/:tags', to: 'listings#tags_index', as: 'tags_index'
  end

  get '*path', to: "static_pages#frontend_index"
end
