Rails.application.routes.draw do

  get '/users/search' => 'users#search'
  devise_for :users, controllers: {confirmations: 'confirmations', omniauth_callbacks: 'users/omniauth_callbacks' }
  resources :users, :only => [:show] do
    collection do
       get '/search', to: 'users#search'
    end
  end
  resources :chats
  root to: 'chats#index'

  namespace :api, { format: 'json' } do
    resources :chats
    resources :users, :only => [] do
      collection do
        get :search
      end
    end
  end
end
