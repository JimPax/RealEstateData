<script>
import { Line,mixins } from "vue-chartjs";
const { reactiveProp } = mixins

export default {
    extends: Line,
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
                            display: true
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