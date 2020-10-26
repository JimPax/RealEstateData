<template>
    <div>
        <select v-model="selectedDistrict" @change="searchArea(selectedDistrict,$event)" class="custom-select mb-3" style="max-width:300px">
            <option disabled selected value>-- select a district --</option>
            <optgroup v-for="(key,index) in this.cities" :key="index" :label=index>
                <option v-for="(district,index) in key" :key="index">
                    {{district}}
                </option>
            </optgroup>
        </select>

        <!-- <div class="input-group mb-3" style="margin:auto;max-width:300px">
            <input type="text" class="form-control" v-on:keyup.enter="searchArea(search)" v-model="search" placeholder="Search..">
            <div class="input-group-append">
                <button class="btn btn-secondary" type="button" @click="searchArea(search)"><i class="fa fa-search"></i></button>
            </div>
        </div> -->
        <div class="map">
            <l-map :zoom="zoom" :center="center" :options="{scrollWheelZoom:false}" noBlockingAnimations>
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                <l-marker
                    v-for="area in cityData" :key="area.id"
                    :lat-lng="latLng(area.lat, area.lon)"
                >
                <l-popup>{{'City: '+cityLabel}}<br>{{'District: '+selectedDistrict}}</l-popup>
                </l-marker>
            </l-map>
        </div>
    </div>
</template>

<script>
import {LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'
import {Icon} from 'leaflet'
import MapResult from './MapResult.vue'

// Fix Marker Icons are missing
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
    name:'Map',
    components: { LMap, LTileLayer, LMarker, LPopup },
    props: ['houseData'],
    data() {
        return {
            cityLabel:'',
            selectedDistrict: '',
            cities: [],
            districts: [],
            search: '',
            cityData: [],
            zoom: 7,
            center: L.latLng(39.139352, 22.623773),
            currentCenter: L.latLng(22.623773, 22.623773),
            url:'https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=eabfeb01009640d7a33df51b05f3d782',
            attribution:'Maps &copy; <a href="http://thunderforest.com">Thunderforest</a>, Data &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    },
    mounted() {
        this.cities = this.houseData.map(x => x.city);
        this.cities = [...new Set(this.cities)].sort();
        let houseData = this.houseData;
        this.cities.forEach(city => {
            let dbc = [...new Set(houseData.filter(data => data.city === city).map(data => data.district).sort())];
            this.districts.push(dbc);
        });
        console.log(this.districts);
        let cities = this.cities
        this.cities = this.districts.reduce(function(res, field, index){
            res[cities[index]] = field;
            return res;
        },{})
    },
    methods: {
        latLng: function(lat, lng) {
            return L.latLng(lat, lng);
        },
        searchArea(area,event) {
            // 1. Get the selected index
            const index = event.target.selectedIndex;

            // 2. Find the selected option
            const option = event.target.options[index];

            // 3. Select the parent element (optgroup) for the selected option
            const optgroup = option.parentElement;

            // 4. Finally, get the label (Country group)
            const cityGroup = optgroup.getAttribute('label');
            this.cityLabel = cityGroup;
            axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${area}+' '+${cityGroup}&limit=1`).then((response) => {
            this.cityData = response.data;
            this.center = L.latLng(this.cityData[0].lat, this.cityData[0].lon);
            this.zoom = 11;
            })
            this.$emit("inputData", this.selectedDistrict, cityGroup);
            //this.search = '';
            console.log(this.cityLabel);
        }
    }
}
</script>

<style scoped>
    .map {
        height: 60vh;
    }
</style>