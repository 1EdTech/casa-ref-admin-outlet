require 'pathname'
require 'sinatra/base'

module CASA
  module AdminOutlet
    class App < Sinatra::Base

      configure do
        set :base_path, Pathname.new(__FILE__).parent.parent.parent.parent
        set :static, true
        set :public_folder, settings.base_path + 'www'
      end

      get '/' do
        redirect to '/index.html'
      end

      def self.base_path
        Pathname.new(__FILE__).parent.parent.parent.parent
      end

    end
  end
end