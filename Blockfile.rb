# Build Settings

set :build_path, 'www/blocks'

# Application Includes

include 'casa-admin-outlet', 'app', 'controllers'
include 'casa-admin-outlet', 'app', 'view'

# Application Block Definition

block 'casa-admin-outlet', :path => 'src' do |outlet|

  block 'config', :path => 'config' do
    block('app'){ js_file 'app.js' }
    block('engine'){ js_file 'engine.js' }
  end

  block 'component', :path => 'component' do |component|
    block 'settings', :path => 'settings' do
      block('button') { scss_file 'button.scss' }
      block('form') { scss_file 'form.scss' }
    end
    block 'form' do
      dependency component.route 'settings', 'button'
      scss_file 'button.scss'
    end
    block 'form' do
      dependency framework.route 'WebBlocks-breakpoints'
      dependency component.route 'settings', 'form'
      scss_file 'form.scss'
    end
  end

  block 'core' do
    js_file 'core.js'
    scss_file 'core.scss'
    dependency framework.route 'normalize-css'
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
      js_file 'local_payloads.js'
      js_file 'settings.js'
    end
    block 'view', :path => 'view' do
      dependency app.route 'core'
      dependency outlet.route 'component', 'form'
      scss_file 'common.scss'
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
    block 'local_payloads' do
      dependency engine.route 'core'
      dependency engine.route 'search', 'driver', 'elasticsearch'
      js_file 'local_payloads.js'
    end
    block 'settings' do
      dependency engine.route 'core'
      js_file 'settings.js'
    end
    block 'search', :path => 'search' do
      dependency engine.route 'core'
      block('base'){ js_file 'base.js' }
      block 'driver' do
        dependency engine.route 'search', 'base'
        block('elasticsearch'){ js_file 'elasticsearch.js' }
        block('query'){ js_file 'query.js' }
      end
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