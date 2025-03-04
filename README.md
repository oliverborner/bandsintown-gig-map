# bandsintown-gig-map
A vue3 component for integrating a map which is showing all your bandsintown gigs.

![Screenshot of the embeded component](https://github.com/oliverborner/bandsintown-gig-map/blob/main/src/assets/screenshot.png)

## First Setup
* Go to your BandsinTown artist profile (https://artists.bandsintown.com) 
* Copy your artist id (the number) from the url: <em>artists.bandsintown.com/artists/**1553223458**/home</em>
* Go to settings -> copy your API key

### BandsinTown Api documentation: 
https://help.artists.bandsintown.com/en/articles/9186477-api-documentation

## Installation
```
npm i bandsintown-gig-map
```

## How to import and use the component

1. Import the component and styles
```
import BandsinTownGigMap from 'bandsintown-gig-map'
import 'bandsintown-gig-map/style.css'; 
```

2. Use the component

```
<BandsinTownGigMap 

    :credentials="{
      artist_id: YOUR BANDINTOWN ARTIST ID,
      api_key: 'YOUR BANDSINTOWN API KEY'
    }" 

    :leaflet_settings="{
      height: '450px',
      width: '100%',
      start_latitude: 50.2334908498,
      start_longitude: 12,
      start_zoomlevel: 4.4
    }"

  />
```

## Dependencies
* Leaflet


# bandsintown-gig-map
* feel free to contribute or open pull requests. cheers