require 'faker'

Posting.destroy_all

coords_arr = [[37.790862, -122.401093],
              [37.792355, -122.402523],
              [37.790998, -122.403939],
              [37.78993, -122.404282],
              [37.792236, -122.402222],
              [37.794389, -122.398725],
              [37.789862, -122.397544],
              [37.78837,  -122.399926],
              [37.788878, -122.405097],
              [37.7911, -122.393575]]

categories_arr = ["food", "water", "shower", "bed"]


coords_arr.each do |coord|
  Posting.create({ name: Faker::Name.name,
                contact: Faker::PhoneNumber.cell_phone,
                latitude: coord[0],
                longitude:coord[1],
                categories: categories_arr.sample,
                number_of_people: [1,2,3].sample})
end
