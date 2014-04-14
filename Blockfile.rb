# Build Settings

set :build_path, 'www/blocks'

# Application Includes

include 'casa-admin-outlet', 'app', 'controllers'

# Application Block Definition

block 'casa-admin-outlet', :path => 'src' do |outlet|

  block 'config', :path => 'config' do
    block('app'){ js_file 'app.js' }
    block('engine'){ js_file 'engine.js' }
  end

  block 'core' do
    js_file 'core.js'
    scss_file 'core.scss'
  end

  block 'app', :path => 'app' do |app|
    block 'core' do
      dependency outlet.route 'core'
      dependency outlet.route 'engine'
      dependency outlet.route 'config', 'app'
      dependency framework.route 'efx', 'driver'
      dependency framework.route 'ejs_production'
      js_file 'core.js'
      scss_file 'core.scss'
    end
    block 'controllers', :path => 'controller' do
      dependency app.route 'core'
      js_file 'attributes.js'
      js_file 'payloads.js'
      js_file 'settings.js'
    end
  end

  block 'engine', :path => 'engine' do |engine|
    block 'core' do
      dependency outlet.route 'core'
      dependency outlet.route 'config', 'engine'
      js_file 'core.js'
    end
    block 'attributes' do
      dependency engine.route 'core'
      js_file 'attributes.js'
    end
    block 'payloads' do
      dependency engine.route 'core'
      js_file 'payloads.js'
    end
    block 'settings' do
      dependency engine.route 'core'
      js_file 'settings.js'
    end
  end

end

# Additional Block Definitions

block 'ejs_production', :path => 'bower_components/ejs_production' do
  js_file 'ejs.js'
end

block 'normalize-css', :path => 'bower_components/normalize-css' do
  scss_file 'normalize.css'
end

# Existing Block Modifications

block 'efx' do
  dependency framework.route 'jquery'
end