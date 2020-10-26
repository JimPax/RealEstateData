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

export default {
    components:{
        BarChart
    },
    props: ['houseData'],
    data () {
        return {
            datacollection: {},
            years: [],
            selectedYear: ''
        }
    },
    computed: {
        getPriceByCity () {
            let citiesNames = this.houseData.map(data => data.city);
            citiesNames = citiesNames.filter((item,index) => citiesNames.indexOf(item) === index);
            let sortedCities = citiesNames.sort();
            let houseData = this.houseData;
            let citiesAvgPrice = [];
            sortedCities.forEach(function(city) {
                let cities = houseData.filter(data => data.city === city).map(data => data.price);
                citiesAvgPrice.push(cities.reduce((a, b) => a + b, 0) / cities.length);
            })
            return citiesAvgPrice;
        },
        getPBCByYear () {
            let citiesNames = this.houseData.map(data => data.city);
            citiesNames = citiesNames.filter((item,index) => citiesNames.indexOf(item) === index);
            let sortedCities = citiesNames.sort();
            let houseData = this.houseData;
            let citiesAvgPrice = [];
            let selectedYear = this.selectedYear;
            sortedCities.forEach(function(city) {
                let cities = houseData.filter(data => data.city === city && data.year === selectedYear).map(data => data.price);
                citiesAvgPrice.push(cities.reduce((a, b) => a + b, 0) / cities.length);
            })
            return citiesAvgPrice;
        },
        getCitiesLabels () {
            let cityNames = this.houseData.map(data => data.city);
            return cityNames.sort().filter((item,index) => cityNames.indexOf(item) === index);
        }
    },
    mounted () {
        this.fillData(),
        this.years = this.houseData.map(x => x.year);
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