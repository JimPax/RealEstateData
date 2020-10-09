<template>
    <div id="body">
        <navigation-bar></navigation-bar>
        <div class="container-fluid">
            <div id="sub-header" class="row justify-content-center">
                <h2 class="pt-3">Housing Data For Rent</h2>
            </div>
            <div id="charts" class="row justify-content-md-center py-md-5">
                <div class="card-group col-12">
                    <div class="card col-md-6 mx-md-5">
                        <div class="card-body">
                            <h4 class="card-title">Price By City</h4>
                            <price-by-city-chart v-if="getLoadedRentAPI" />
                        </div>
                    </div>
                    <div class="card col-md-6 mx-md-5">
                        <div class="card-body">
                            <h4 class="card-title">Price By Month</h4>
                            <price-by-month-chart v-if="getLoadedRentAPI" />
                        </div>
                    </div>
                </div>
            </div>
            <div id="map-results" class="row justify-content-center pt-5">
                <div id="map" class="card col-lg-4 col-md-6">
                    <div class="card-header">
                        <h3>Average Price By District</h3>
                    </div>
                    <div class="card-body">
                        <Map @inputData="updateSearch" v-if="getLoadedRentAPI"></Map>
                    </div>
                </div>
                <div class="col-md-3">
                    <h3 class="mx-auto">District Data</h3>
                    <map-result :district="selectedDistrict" :cityGroup=selectedCity></map-result>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavigationBar from './NavigationBar.vue'
import PriceByMonthChart  from "./rent/PriceByMonthChart.vue"
import PriceByCityChart from "./rent/PriceByCityChart.vue"
import Map from './rent/Map.vue'
import MapResult from "./rent/MapResult.vue"
import {mapGetters} from 'vuex'

export default {
    name: 'RentDataPage',
    components: {
        NavigationBar,
        PriceByMonthChart,
        PriceByCityChart,
        Map,
        MapResult
    },
    data () {
        return {
            selectedDistrict: "",
            selectedCity: ""
        }
    },
    computed: {
        ...mapGetters([
            'rentData',
            'getLoadedRentAPI'
        ])
    },
    created: function() {
        this.$store.dispatch('getRentData')
    },
    methods: {
        updateSearch(variable1, variable2) {
            this.selectedDistrict = variable1;
            this.selectedCity = variable2;
        }
    }
}
</script>

<style scoped>
    #sub-header{
        background-color: #4b4b4b;
        color: #ffffff;
    }
    @media screen and (max-width: 600px) {
    #sub-header h2{
        font-size: 30px;
        }
    }
    th{
        color: #d5d6d2;

    }
    td{
        color: #ffffff;
    }
    #charts{
        background-color: #4b4b4b;
        color: #636363;
    }
    #map-results{
        background-color: #34675C;
        color: #d5d6d2;
    }
    #map{
        background-color: #4b4b4b;
        color: #d5d6d2;
    }
    #map h3{
        text-align: center;
    }
</style>