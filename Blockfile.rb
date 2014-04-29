# Build Settings

set :build_path, 'www/blocks'

# Application Includes

include 'casa-admin-outlet', 'app', 'controllers'
include 'casa-admin-outlet', 'app', 'view'

# Attribute Includes

include 'casa-admin-outlet', 'attribute', 'author'
include 'casa-admin-outlet', 'attribute', 'categories'
include 'casa-admin-outlet', 'attribute', 'description'
include 'casa-admin-outlet', 'attribute', 'explicit'
include 'casa-admin-outlet', 'attribute', 'organization'
include 'casa-admin-outlet', 'attribute', 'title'
include 'casa-admin-outlet', 'attribute', 'tags'

# Style Includes

include 'bootstrap', 'type'
include 'bootstrap', 'utilities'
include 'bootstrap', 'navbar'

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

  block 'attribute', :path => 'attribute' do |attribute|
    block 'core' do
      js_file 'core.js'
    end
    block 'abstract', :path => 'abstract' do |abstract|
      block 'core' do
        dependency attribute.route 'core'
        js_file 'core.js'
      end
      block 'boolean' do
        dependency abstract.route 'core'
        js_file 'boolean.js'
      end
      block 'string' do
        dependency abstract.route 'core'
        js_file 'string.js'
      end
      block 'string_set' do
        dependency abstract.route 'core'
        js_file 'string_set.js'
      end
      block 'text' do
        dependency abstract.route 'core'
        js_file 'text.js'
      end
    end
    block 'author' do
      dependency attribute.route 'abstract', 'core'
      js_file 'author.js'
    end
    block 'categories' do
      dependency attribute.route 'abstract', 'string_set'
      js_file 'categories.js'
    end
    block 'description' do
      dependency attribute.route 'abstract', 'text'
      js_file 'description.js'
    end
    block 'explicit' do
      dependency attribute.route 'abstract', 'boolean'
      js_file 'explicit.js'
    end
    block 'organization' do
      dependency attribute.route 'abstract', 'core'
      js_file 'organization.js'
    end
    block 'tags' do
      dependency attribute.route 'abstract', 'string_set'
      js_file 'tags.js'
    end
    block 'title' do
      dependency attribute.route 'abstract', 'string'
      js_file 'title.js'
    end
  end

  block 'app', :path => 'app' do |app|
    block 'core' do
      dependency outlet.route 'core'
      dependency outlet.route 'engine'
      dependency outlet.route 'config', 'app'
      dependency framework.route 'efx', 'driver'
      dependency framework.route 'ejs_production'
      dependency framework.route 'stash'
      js_file 'core.js'
      scss_file 'core.scss'
    end
    block 'controllers', :path => 'controller' do
      dependency app.route 'core'
      dependency framework.route 'DataTables'
      dependency framework.route 'bootstrap', 'js', 'modal'
      js_file 'attributes.js'
      js_file 'auth.js'
      js_file 'local_payloads.js'
      js_file 'settings.js'
    end
    block 'view', :path => 'view' do
      dependency app.route 'core'
      dependency outlet.route 'component', 'form'
      dependency framework.route 'bootstrap', 'form'
      dependency framework.route 'bootstrap', 'buttons'
      dependency framework.route 'bootstrap', 'alerts'
      dependency framework.route 'bootstrap', 'grid'
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

# Existing Block Modifications

block 'efx' do
  dependency framework.route 'jquery'
end

# Additional Block Definitions

block 'ejs_production', :path => 'bower_components/ejs_production' do
  js_file 'ejs.js'
end

block 'normalize-css', :path => 'bower_components/normalize-css' do
  scss_file 'normalize.css'
end

block 'DataTables', :path => 'bower_components/DataTables/media' do
  js_file 'js/jquery.dataTables.js'
  scss_file 'css/jquery.dataTables.css'
end

block 'stash', :path => 'bower_components/stash' do
  js_file 'index.js'
end

block 'bootstrap', :path => 'bower_components/bootstrap-sass/vendor/assets' do |bootstrap|

  block 'variables' do
    scss_file 'stylesheets/bootstrap/_variables.scss'
  end

  block 'base' do
    dependency bootstrap.route 'variables'
    scss_file 'stylesheets/bootstrap/_mixins.scss'
    scss_file 'stylesheets/bootstrap/_normalize.scss'
    scss_file 'stylesheets/bootstrap/_print.scss'
    scss_file 'stylesheets/bootstrap/_scaffolding.scss'
  end

  [
      'type',
      'code',
      'grid',
      'tables',
      'forms',
      'buttons',
      'component-animations',
      'glyphicons',
      'dropdowns',
      'button-groups',
      'input-groups',
      'navs',
      'navbar',
      'breadcrumbs',
      'pagination',
      'pager',
      'labels',
      'badges',
      'jumbotron',
      'thumbnails',
      'alerts',
      'progress-bars',
      'media',
      'list-group',
      'panels',
      'wells',
      'close',
      'utilities',
      'responsive-utilities'
  ].each do |name|
    block name do
      dependency bootstrap.route 'base'
      scss_file "stylesheets/bootstrap/_#{name}.scss"
    end
  end

  block 'navbar' do
    dependency bootstrap.route 'js', 'collapse'
    dependency bootstrap.route 'forms'
    dependency bootstrap.route 'navs'
  end

  block 'js' do |js|

    dependency bootstrap.route 'component-animations'

    block 'affix' do
      js_file 'javascripts/bootstrap/affix.js'
    end

    block 'alert' do
      js_file 'javascripts/bootstrap/alert.js'
    end

    block 'button' do
      js_file 'javascripts/bootstrap/button.js'
    end

    block 'carousel' do
      js_file 'javascripts/bootstrap/carousel.js'
      scss_file 'stylesheets/bootstrap/_carousel.scss'
    end

    block 'collapse' do
      dependency js.route 'transition'
      js_file 'javascripts/bootstrap/collapse.js'
    end

    block 'dropdown' do
      js_file 'javascripts/bootstrap/dropdown.js'
    end

    block 'modal' do
      js_file 'javascripts/bootstrap/modal.js'
      scss_file 'stylesheets/bootstrap/_modals.scss'
    end

    block 'popover' do
      dependency js.route 'tooltip'
      js_file 'javascripts/bootstrap/popover.js'
      scss_file 'stylesheets/bootstrap/_popovers.scss'
    end

    block 'scrollspy' do
      js_file 'javascripts/bootstrap/scrollspy.js'
    end

    block 'tab' do
      js_file 'javascripts/bootstrap/tab.js'
    end

    block 'tooltip' do
      js_file 'javascripts/bootstrap/tooltip.js'
      scss_file 'stylesheets/bootstrap/_tooltip.scss'
    end

    block 'transition' do
      js_file 'javascripts/bootstrap/transition.js'
    end

  end

end