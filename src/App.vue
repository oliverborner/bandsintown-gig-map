<script setup lang="ts">
  import GigMap from './components/BandsinTownGigMap.vue'
</script>

<template>

<!--  
  /**
  * @param {object} credentials
  * @param {number} artist_id - bandsintown artist id
  * @param {string} api_key - your bandsintown api key
  *
  * @param {object} leaflet_settings
  * @param {string} height - has to be determined in pixels
  * @param {string} width - percentage or pixels
  * @param {number} start_latitude - latitude of the starting position of the map
  * @param {number} start_longitude - longitude of the starting position of the map
  * @param {number} start_zoomlevel - zoomlevel of the map (near < 5 > far away)
  *
  */ 
-->

  <GigMap 

    :credentials="{
      artist_id: 15532658,
      api_key: 'd50a015e4d6ccf1a0204a4cc9aa32d09'
    }" 

    :leaflet_settings="{
      height: '450px',
      width: '100%',
      start_latitude: 50.2334908498,
      start_longitude: 12,
      start_zoomlevel: 4.4
    }"

  />

</template>

