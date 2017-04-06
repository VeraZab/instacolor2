class WelcomeController < ApplicationController
	def index

	end

	def search
		@username = params[:q]
		@url = "https://www.instagram.com/#{@username}/media/"
		@urls = []

		@content = JSON.parse(RestClient.get @url)
		@result = @content["items"]
		@result.each do |picture|
			imageproxy = download_path(url: picture['images']['standard_resolution']['url'])
			@urls.push(imageproxy)
		end

		render json: @urls
	end

end
