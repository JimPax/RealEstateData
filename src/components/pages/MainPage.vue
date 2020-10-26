<template>
    <div>
        <navigation-bar></navigation-bar>
        <header class="masthead">
            <div class="container h-100">
                <div class="row h-100 align-items-center">
                    <div class="col-md-12 text-center">
                        <h1 class="display-4 font-weight-light mb-5">Housing Data In Greece</h1>
                        <button class="col-md-3 btn-color btn mr-md-3" role="button"><router-link class="nav-link" :to="{name: 'RentDataPage'}">Rent</router-link></button>
                        <button class="col-md-3 btn-color btn ml-md-3" role="button"><router-link class="nav-link" :to="{name: 'SaleDataPage'}">Sale</router-link></button>
                    </div>
                </div>
            </div>
        </header>
        <div class="card-deck col-md-12 my-5">
            <div class="card">
                <img class="card-img-top" src="../../assets/img/mcard1.png" alt="Card image cap">
                <div class="card-body">
                <h5 class="card-title">Real Estate Data Charts</h5>
                <p class="card-text">Data charts for real estate to rent or sale, by every city at any year or month.</p>
                <button class="btn btn-dark" role="button"><a class="nav-link" href="/rent-data#charts">Rent</a></button>
                <button class="btn btn-dark" role="button"><a class="nav-link" href="/sale-data#charts">Sale</a></button>
                </div>
            </div>
            <div class="card">
                <img class="card-img-top" src="../../assets/img/mcard2.png" alt="Card image cap">
                <div class="card-body">
                <h5 class="card-title">Real Estate Predictions</h5>
                <p class="card-text">Future Features..</p>
                </div>
            </div>
            <div class="card">
                <img class="card-img-top" src="../../assets/img/mcard3.png" alt="Card image cap">
                <div class="card-body">
                <h5 class="card-title">Real Estate Data On Map</h5>
                <p class="card-text">Αverage property price for each city district</p>
                <button class="btn btn-dark" role="button"><a class="nav-link" href="/rent-data#map-results">Rent</a></button>
                <button class="btn btn-dark" role="button"><a class="nav-link" href="/sale-data#map-results">Sale</a></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavigationBar from '../NavigationBar';
export default {
    name: 'MainPage',
    components: {NavigationBar},
    data() {
        return{
        }
    }
}
</script>

<style scoped>
    .masthead {
  height: 100vh;
  min-height: 500px;
  background-image: url("../../assets/img/mainp.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
h1{
    color:white;
}
.btn-color{
    background-color: rgba(255, 255, 255, 0.8);
}
header .nav-link{
    color: black;
    font-size:20px;
}
#info-card{
        background-color: #4b4b4b;
        color: white;
}
.card .nav-link{
    color: white;
}
header button:hover{
    background: linear-gradient(to bottom right, rgb(165, 194, 0), white);
}
</style>
