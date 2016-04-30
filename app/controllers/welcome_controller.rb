class WelcomeController < ApplicationController
	def index

	end

	def search
		@username = params[:q]
		findingUserIdUrl = "https://api.instagram.com/v1/users/search?q=#{@username}&client_id=a18072f0007143b981c7e80d0717b538"
		gettingUserId = JSON.parse(RestClient.get findingUserIdUrl)

		gettingUserId['data'].each do |user|
			if user['username'] == @username 
			@userId = user['id'].to_i
			end
		end

		@url = "https://api.instagram.com/v1/users/#{@userId}/media/recent/?count=250&client_id=a18072f0007143b981c7e80d0717b538"
		@urls = []


		i = 0
		until i == 4
			@content = JSON.parse(RestClient.get @url)	
			@result = @content["data"]
			@url_next = @content['pagination']['next_url']	
			@result.each do |picture|
				imageproxy = download_path(url: picture['images']['standard_resolution']['url'])
				@urls.push(imageproxy) 
			end

			if @url_next != nil
				@url = @content['pagination']['next_url'] 
				i+=1
			else
				break
			end	
		end	

		render json: @urls
	end

end