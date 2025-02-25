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
let show_info_box = ref(false);
let countPastGigs = ref(0);
let countUpcomingGigs = ref(0);

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
            // Set marker for past gigs
            if (new Date(marker.datetime) < new Date()) {
                L.marker([marker.venue.latitude, marker.venue.longitude])
                .bindPopup('<b>' + marker.venue.name + '</b>' + '<br>' 
                + new Date(marker.datetime).toLocaleDateString() + '<br>' 
                + marker.venue.city + ', (' 
                + marker.venue.country + ')')
                .addTo(map);
            }
            // Set marker for upcoming gigs
            const redIcon = new L.Icon({
                iconUrl:
                    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
                shadowUrl:
                    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            if (new Date(marker.datetime) > new Date()) {
                L.marker([marker.venue.latitude, marker.venue.longitude], {icon: redIcon})
                .bindPopup('<b>' + marker.venue.name + '</b>' + '<br>' 
                + new Date(marker.datetime).toLocaleDateString() + '<br>' 
                + marker.venue.city + ', (' 
                + marker.venue.country + ')')
                .addTo(map);
            }
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
    stored_data.value.forEach((marker: Artist) => {
        if (new Date(marker.datetime) < new Date()) {
            countPastGigs.value++;  
        } else {
            countUpcomingGigs.value++;
        }
    });
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
        
        <div class="artist-info-button" v-if="stored_data.length && !show_info_box" @click="show_info_box = true">
            i
        </div>

        <div class="artist-info" v-if="stored_data.length && show_info_box" @click="show_info_box = false">
            <p class="artist-name">{{ stored_data[0].artist.name }}</p>
            <p v-if="countPastGigs > 0">Past Gigs: {{ countPastGigs }}</p>
            <p v-if="countUpcomingGigs > 0">Upcoming Gigs: {{ countUpcomingGigs }}</p>
            <p v-if="checkDifferentCountries() > 0">In {{ checkDifferentCountries() }} different countries</p>
        </div>

    </div>

</template>


<style scoped>

    #gigmap-container {
        width: 100%;
        height: 100%;
    }

    #map {
        z-index: 50;
    }
    .artist-info-button {
        transform: 300ms all;
        opacity: 90%;
        z-index: 100;
        position: absolute;
        right: 0;
        top: 0;
        background-color: white;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        border-radius: 50%;
        margin: 1.5rem;
        padding: .5rem 1rem;
        color: #1c1c1c;
        font-size: .8rem;
    }

    .artist-name {
        font-weight: 600;
    }

    .artist-info{
        transform: 300ms all;
        opacity: 90%;
        z-index: 100;
        position: absolute;
        right: 0;
        top: 0;
        background-color: white;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        border-radius: .5rem;
        margin: 1.5rem;
        padding: .5rem;
        color: #1c1c1c;
        font-size: .8rem;
    }

    .error_msg {
      color:#b83c3c;
    }

    .loading {
      color:#3cb844;
    }

</style>