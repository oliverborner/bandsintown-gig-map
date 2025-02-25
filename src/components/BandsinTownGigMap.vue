<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as L from 'leaflet';  
import 'leaflet/dist/leaflet.css';  

interface Props {
    credentials: {artist_id: number, api_key: string},
    leaflet_settings: {
        height: string,
        width: string,
        start_latitude: number,
        start_longitude: number,
        start_zoomlevel: number
    }
}

const props = defineProps<Props>()

interface Artist {
    artist: {name: string},
    venue: Venue,
    datetime: Date,
    gigs_count: number,
}

interface Venue {
    latitude: number,
    longitude: number,
    city: string,
    country: string,
    name?: string
}

let error_msg = ref("");
let has_error = ref(false);
let is_loading = ref(true);

let stored_data = ref<Artist[]>([])


// TODO: Difference / Upcoming und Past gigs / URL /past/ &date=past??

async function getData() {

    const url = 'https://rest.bandsintown.com/artists/id_' + props.credentials.artist_id + '/events/?app_id=' + props.credentials.api_key + '&date=all';
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            is_loading.value = false;
            throw new Error(`Response status: ${response.status}`);
            
        }
        const data = await response.json();
        // console.log(data)
        
        let map = L.map('map').setView([props.leaflet_settings.start_latitude, props.leaflet_settings.start_longitude], props.leaflet_settings.start_zoomlevel); // Config

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        data.forEach((marker: Artist) => {
            L.marker([marker.venue.latitude, marker.venue.longitude])
            .bindPopup('<b>' + marker.venue.name + '</b>' + '<br>' 
            + new Date(marker.datetime).toLocaleDateString() + '<br>' 
            + marker.venue.city + ', (' 
            + marker.venue.country + ')')
            .addTo(map);
        })

        is_loading.value = false;
        stored_data.value = data;
        countGigs();
        checkDifferentCountries();
      
    } catch (error: any) {
        is_loading.value = false;
        has_error.value = true;
        error_msg = error.message;
    }

}

const countGigs = () => {
    return stored_data.value.length;
}

const checkDifferentCountries = () => {

    let countryArray: string[] = [];

    stored_data.value.forEach((marker: Artist) => {
        countryArray.push(marker.venue.country)  
    });

    return new Set(countryArray).size
}


onMounted(() => {

    getData();

});

</script>


<template>

	<div id="gigmap-container">

		<div class="error_msg" v-if="has_error">
            <p>You probably provided the wrong credentials for connecting to the bandsintown API.</p>
            {{ error_msg }}
		</div>

		<div class="loading" v-if="is_loading">Loading...</div>

		<div id="map" :style="{ height: props.leaflet_settings.height, width: props.leaflet_settings.width }"></div>
        
        <div class="artist-info" v-if="stored_data.length">
            <p v-if="countGigs() > 0">{{ stored_data[0].artist.name }} played: {{ countGigs() }} gigs</p>
            <p v-if="checkDifferentCountries() > 0">in {{ checkDifferentCountries() }} different countries.</p>
        </div>

    </div>

</template>


<style scoped>
    .error_msg {
      color:#b83c3c;
    }
    .loading {
      color:#3cb844;
    }
</style>