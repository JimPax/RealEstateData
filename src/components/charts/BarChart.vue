<script>
import { Bar,mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
    extends: Bar,
    mixins: [reactiveProp],
    data () {
        return {
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            callback: value => '€' + value
                        },
                        gridLines: {
                            display: true
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    mounted () {
        this.renderChart(this.chartData, this.options)
    }
}
</script>