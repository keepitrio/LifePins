
# LifePins :round_pushpin:

Map app that lets users who need help in the event of disasters find a place where they can get help.

People who can provide help can place their location on the map and provide information on what they can help (ie. food, water, bed, shower) with and the number of people they can accommodate.

[Live Demo](https://lifepins.herokuapp.com/)


## User stories

- A user can view the map and markers where they can find help
- A user can fill out the form
- A user can add a location to the map
- A user can remove a marker from the map

## Segments

### Landing page
![Landing page](./lifepins/images/landing-page.png)

### Remove marker
![Remove marker](./lifepins/images/remove-marker.png)


## Things we covered on this project:

- Ruby on Rails
- React
- JavaScript
- jQuery
- MapQuest API
- Git Workflow

## Documentation

All items have following properties

Field | Description
------|------------
**id** | The posting's unique id.
name | Name of person providing aid.
contact | Phone number of person providing aid.
latitude | Latitude of marker on the map.
longitude | Longitude of marker on the map.
categories | Categories of help available (food, shower, water, bed).
number_of_people | Number of people the provider can accommodate.
created_at | Date and time of creation.
updated_at | Date and Time of last update.


## Endpoints

### GET /info

#### Sample response
```JSON
[
  {
    id: 1,
    name: "Dr. Aurore Reinger",
    contact: "1-818-577-3713",
    latitude: "28.497661",
    longitude: "-81.059875",
    categories: "water, bed, shower, food",
    number_of_people: 2,
    created_at: "2017-09-17T11:43:31.205Z",
    updated_at: "2017-09-17T11:43:31.205Z"
  },
  {
    id: 2,
    name: "Francesco Kertzmann",
    contact: "740.242.0957",
    latitude: "28.496341",
    longitude: "-81.075454",
    categories: "food",
    number_of_people: 3,
    created_at: "2017-09-17T11:43:31.213Z",
    updated_at: "2017-09-17T11:43:31.213Z"
  },
  {
    id: 3,
    name: "Dusty Pouros DVM",
    contact: "1-573-871-8977",
    latitude: "28.504487",
    longitude: "-81.070862",
    categories: "water, shower",
    number_of_people: 3,
    created_at: "2017-09-17T11:43:31.221Z",
    updated_at: "2017-09-17T11:43:31.221Z"
  },
...
]
```
[Full frontend repo is here](https://github.com/rnose512/LifePins-Frontend)

