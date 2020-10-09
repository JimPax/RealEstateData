<template>
<div>
    <select v-model="selectedCity" @change="fillData()">
        <option disabled selected value>-- select a city --</option>
        <option v-for="city in cities" :key="city">
            {{city}}
        </option>
    </select>

    <line-chart :chart-data="datacollection"></line-chart>
</div>
</template>

<script>
import LineChart from '../charts/LineChart.vue'
import { mapGetters } from 'vuex'

const months = {"Jan": 1, "Feb": 2, "Mar" :3 , "Apr": 4, "May": 5, "Jun": 6, "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12}

export default {
    components: {
        LineChart
    },
    data () {
        return {
            datacollection: {},
            cities: [],
            selectedCity: ''
        }
    },
    computed: {
        ...mapGetters ([
            'rentData'
        ]),
        getPriceByMonth () {
            
            let pricebyMonth;
            let rentData = this.rentData;
            let avgPBM = [];
            Object.keys(months).forEach(function(month) {
            pricebyMonth = rentData.filter(rent => rent.date === month).map(rent => rent.price);
            avgPBM.push(pricebyMonth.reduce((acc, cur) => acc + cur, 0) / pricebyMonth.length);
            })
            return Array.from(avgPBM, item => item || 0);
            
        },
        getPBMByCity () {
            let choosedCity = this.rentData.filter(rent => rent.city === this.selectedCity).map(x => x.city) 
            choosedCity = choosedCity.filter((item,index) => choosedCity.indexOf(item) === index).toString()

            let pricebyMonth;
            let rentData = this.rentData;
            let avgPBMByCity = [];
            Object.keys(months).forEach(function(month) {
            pricebyMonth = rentData.filter(rent => rent.date === month && rent.city === choosedCity).map(rent => rent.price);
            avgPBMByCity.push(pricebyMonth.reduce((acc, cur) => acc + cur, 0) / pricebyMonth.length);
            })
            return Array.from(avgPBMByCity, item => item || 0);
        }
    },
    mounted () {
        this.fillData(),
        this.cities = this.rentData.map(x => x.city);
        return this.cities = this.cities.filter((item,index) => this.cities.indexOf(item) === index)
    },
    methods: {
        fillData () {
            this.datacollection = {
                labels: Object.keys(months),
                datasets: [
                    {
                        label: 'All Data',
                        backgroundColor: 'rgb(43,255,0,0.2)',
                        data: this.getPriceByMonth
                    }, {
                        label: 'By Selected City',
                        backgroundColor: 'rgb(255,0,239,0.3)',
                        data: this.getPBMByCity
                    }
                ]
            }
        },
    }
}
</script>