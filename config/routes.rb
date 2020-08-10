Rails.application.routes.draw do
  resources :tags
  resources :likes
  resources :profile_pics
  resources :thoughts
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
