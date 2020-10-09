<template>
    <div>
        <select v-model="selectedYear" @change="fillData()">
            <option disabled selected value>-- select a year --</option>
            <option v-for="year in years" :key="year">
                {{year}}
            </option>
        </select>
        <bar-chart :chart-data="datacollection"></bar-chart>
    </div>
</template>

<script>
import BarChart from '../charts/BarChart.vue'
import { mapGetters } from 'vuex'

export default {
    components:{
        BarChart
    },
    data () {
        return {
            datacollection: {},
            years: [],
            selectedYear: ''
        }
    },
    computed: {
        ...mapGetters ([
            'saleData'
        ]),
        getPriceByCity () {
            let citiesNames = this.saleData.map(sale => sale.city);
            citiesNames = citiesNames.filter((item,index) => citiesNames.indexOf(item) === index);
            let sortedCities = citiesNames.sort();
            let saleData = this.saleData;
            let citiesAvgPrice = [];
            sortedCities.forEach(function(city) {
                let cities = saleData.filter(sale => sale.city === city).map(sale => sale.price);
                citiesAvgPrice.push(cities.reduce((a, b) => a + b, 0) / cities.length);
            })
            return citiesAvgPrice;
        },
        getPBCByYear () {
            let citiesNames = this.saleData.map(sale => sale.city);
            citiesNames = citiesNames.filter((item,index) => citiesNames.indexOf(item) === index);
            let sortedCities = citiesNames.sort();
            let saleData = this.saleData;
            let citiesAvgPrice = [];
            let selectedYear = this.selectedYear;
            sortedCities.forEach(function(city) {
                let cities = saleData.filter(sale => sale.city === city && sale.year === selectedYear).map(sale => sale.price);
                citiesAvgPrice.push(cities.reduce((a, b) => a + b, 0) / cities.length);
            })
            return citiesAvgPrice;
        },
        getCitiesLabels () {
            let cityNames = this.saleData.map(sale => sale.city);
            return cityNames.sort().filter((item,index) => cityNames.indexOf(item) === index);
        }
    },
    mounted () {
        this.fillData(),
        this.years = this.saleData.map(x => x.year);
        return this.years = this.years.filter((item,index) => this.years.indexOf(item) === index)
    },
    methods: {
        fillData () {
            this.datacollection = {
                labels: this.getCitiesLabels,
                datasets: [
                    {
                        label: 'All Years',
                        backgroundColor: 'rgb(0,239,255,0.5)',
                        data: this.getPriceByCity
                    },
                    {
                        label: 'By Selected Year',
                        backgroundColor: 'rgb(0,0,255,0.5)',
                        data: this.getPBCByYear
                    }
                ]
            }
        }
    }

}
</script>