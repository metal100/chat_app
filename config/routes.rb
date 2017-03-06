Rails.application.routes.draw do

  get 'pages/index'

  get'/notes/:id'=> 'notes#show',as:'note'
  devise_for :users, controllers: {confirmations: 'confirmations', omniauth_callbacks: 'users/omniauth_callbacks' }
  resources :users, :only => [:show]
  resources :chats
  root to: 'chats#index'

  namespace :api, { format: 'json' } do
    resources :chats
  end
end
