# bandsintown-gig-map

## First Setup
Go to your BandsinTown artist profile (https://artists.bandsintown.com)   
Settings -> Copy API Key

More info: https://help.artists.bandsintown.com/en/articles/9186477-api-documentation

## How to import and use the component

1.) Import the copmponent
```
<script setup lang="ts">
  import GigMap from './components/BandsinTownGigMap.vue'
</script>
```

2.) Use the component

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

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

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
