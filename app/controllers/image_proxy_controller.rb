require 'base64'
require 'net/http'

class ImageProxyController < ActionController::Base
  	def get
    	url = URI.parse(params[:url]) 
    	image = Net::HTTP.get_response(url) 	
        send_data image.body, type: image.content_type, disposition: 'inline'#return it 
        logger.info "HERE'S THE IMAGECT#{image.content_type}"
	end

end



