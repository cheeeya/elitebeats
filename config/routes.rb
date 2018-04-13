Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :create, :destroy, :update] do
      resources :follows, only: [:create]
    end
    resource :session, only: [:create, :destroy]
    resources :songs, only: [:index, :create, :destroy, :update] do
      resources :comments, only: [:create]
    end
    resources :comments, only: [:destroy]
    post '/users/find', to: 'users#verify_user_exists'
    get '/users/:profile_url', to: 'users#get_user'
    get '/users/:profile_url/songs/:permalink', to: 'songs#fetch_song'
    delete '/users/:user_id/follows', to: 'follows#destroy'
  end

  # namespace :api, defaults: { format: :plain } do
  # end
  root to: 'static_pages#root'
end
