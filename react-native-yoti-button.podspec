require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name           = 'react-native-yoti-button'
  s.version        = package['version']
  s.summary        = package['description']
  s.description    = package['description']
  s.license        = package['license']
  s.author         = package['author']
  s.homepage       = 'https://github.com/getyoti/react-native-sdk-button'
  s.source         = { :git => "https://github.com/getyoti/react-native-sdk-button.git", :tag => "#{s.version}" }
  s.source_files   = "ios/**/*.{h,m}"
  s.platform       = :ios, "12.0"
  s.dependency "React"
  s.dependency 'yoti-sdk', '4.0.0'
end
