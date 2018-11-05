Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # root 'sessions#index'
  root 'users#show'

  resources :users do
      resources :appointments
  end

  resources :users do
      resources :apartments
  end

  resources :apartments do
      resources :appointments
  end



  get '/past_appointments' => 'apartments#past_appointments'

  get '/apartments' => 'apartments#index'


  get '/signup' => 'users#new'
  post '/signup' => 'users#create'

  get '/signin' => 'sessions#new'
  post '/signin' => 'sessions#create'

  get '/auth/:provider/callback' => 'sessions#create'

  get 'logout' => 'sessions#destroy'

end
