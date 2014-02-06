require 'spec_helper'

describe 'selecting event source' do
  it "should have a nice look" do
    visit root_path
    page.should have_selector('#events li.pending', visible: true)
    5.times {
      page.save_screenshot("spec/screenshots/viewing_event_sources_spec.png")
    }
  end
end
