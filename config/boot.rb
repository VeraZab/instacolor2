require 'bundler/setup' # Set up gems listed in the Gemfile.
# require 'rails/commands/server'

ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../../Gemfile', __FILE__)

# module Rails
#   class Server
#     new_defaults = Module.new do
#       def default_options
#         environment = ENV['RAILS_ENV'] || ENV['RACK_ENV'] || 'development'
#         default_host = environment == 'development' ? '192.168.1.8' : '0.0.0.0'

#         super.merge( Host: default_host )
#       end
#     end
 
#     # Note: Module#prepend requires Ruby 2.0 or later
#     prepend new_defaults
#   end
# end
