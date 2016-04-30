Rails.application.routes.draw do

	root :to => 'welcome#index'

 	get '/search', to: 'welcome#search'

	get 'download', to: "image_proxy#get"
end
