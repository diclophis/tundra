require 'spec_helper'

describe 'selecting event source' do
  it "should have a nice look" do
    visit root_path
    page.save_screenshot("spec/screenshots/viewing_event_sources_spec.png")
  end
end
