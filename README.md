# bandsintown-gig-map

![Screenshot of the embeded component](https://github.com/oliverborner/bandsintown-gig-map/tree/main/src/assets/screenshot.png)

## First Setup
* Go to your BandsinTown artist profile (https://artists.bandsintown.com) 
* Copy your artist id (the number) from the url: <em>artists.bandsintown.com/artists/**1553223458**/home</em>
* Go to settings -> copy your API key

### BandsinTown Api documentation: 
https://help.artists.bandsintown.com/en/articles/9186477-api-documentation

## How to import and use the component

1. Import the component
```
  import GigMap from './components/BandsinTownGigMap.vue'
```

2. Use the component

```
<GigMap 

    :credentials="{
      artist_id: YOUR BANDINTOWN ARTIST ID,
      api_key: YOUR BANDSINTOWN API KEY
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


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
# bandsintown-gig-map
* feel free to contribute or open pull requests. cheers