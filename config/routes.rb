Rails.application.routes.draw do
  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'
  get '/thoughts/search', to: 'thoughts#search'
  put '/thoughts/:id/tags/:tag_name', to: 'thoughts#add_tag'
  put '/thoughts/:id/like', to: 'thoughts#toggle_like'
  get '/users/:id/thoughts', to: 'users#thoughts'

  resources :tags
  resources :likes
  resources :profile_pics
  resources :thoughts
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
