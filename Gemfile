source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '> 4.0.0'

# CoffeeScript adapter for the Rails asset pipeline. Also adds support to use CoffeeScript to respond to JavaScript requests (use .js.coffee views)
gem 'coffee-rails'

# Foreman is a manager for Procfile-based applications.
gem 'foreman', :git => 'git@github.com:ddollar/foreman.git'

# Capistrano is a utility and framework for executing commands in parallel on multiple remote machines, via SSH.
gem 'capistrano'

# a capistrano recipe to manage rubies with rbenv.
gem 'capistrano-rbenv'

# A ruby web server built for concurrency
gem 'puma'

# New Relic RPM Ruby Agent
gem 'newrelic_rpm'

# FFI bindings for ZeroMQ so the library can be used under JRuby and other FFI-compliant ruby runtimes
gem 'ffi-rzmq'

# Celluloid actors that talk over the 0MQ protocol
gem 'celluloid-zmq', :git => 'git@github.com:celluloid/celluloid-zmq', :branch => 'master'

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', :require => false
end

group :development, :test do
  # Poltergeist is a driver for Capybara. It allows you to run your Capybara tests on a headless WebKit browser, provided by PhantomJS.
  gem "poltergeist"

  # Rake is a Make-like program implemented in Ruby. Tasks and dependencies arespecified in standard Ruby syntax.
  gem "rake"

  # rspec-rails is a testing framework for Rails 3.x and 4.x.
  gem "rspec-rails"
end
