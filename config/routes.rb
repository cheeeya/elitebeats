Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :destroy, :update]
    resource :session, only: [:create, :destroy]
    resources :songs, only: [:index, :create, :destroy, :update]

    post '/users/find', to: 'users#verify_user_exists'
    get '/users/:profile_url', to: 'users#get_user'
  end

  # namespace :api, defaults: { format: :plain } do
  # end
  root to: 'static_pages#root'
end
