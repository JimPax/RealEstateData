<template>
    <table class="table" v-if="getLoadedRentAPI">
        <tbody>
            <tr>
                <th>City</th>
                <td>{{cityGroup}}</td>
            </tr>
            <tr>
                <th>District</th>
                <td>{{district}}</td>
            </tr>
            <tr>
                <th>Avg Price</th>
                <td>{{getAvgPrice}}</td>
            </tr>
            <tr>
                <th>Date</th>
                <td v-if="cityGroup != ''">{{getDate}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name:'MapResult',
    props: ['district', 'cityGroup', 'houseData'],
    data() {
        return {
            cityName: "",
            avgPrice: "",
        }
    },
    computed: {
        ...mapGetters([
            'getLoadedRentAPI'
        ]),
        getAvgPrice() {
            let price = this.houseData.filter(data => data.district === this.district & data.city === this.cityGroup).map(data => data.price);
            this.avgPrice = price.reduce((acc, cur) => acc + cur, 0) / price.length;
            if(isNaN(this.avgPrice)){
                return '';
            }else {
                return this.avgPrice + '€'
            }
        },
        getDate() {
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            const d = new Date();
            return monthNames[d.getMonth()]+' '+d.getFullYear();
        }
    }
}
</script>

<style scoped>
    th{
        color: #d5d6d2;

    }
    td{
        color: #ffffff;
    }
</style>