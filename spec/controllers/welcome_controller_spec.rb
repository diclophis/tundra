require 'spec_helper'

describe WelcomeController do
  describe "#index" do
    it "should have an :index resource that renders a template" do
      get :index
      response.should render_template("index")

      get :index, :message => "foo"
      response.should render_template("index")
    end
  end
end