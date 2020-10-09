<template>
    <header>
        <nav class="navbar fixed-top navbar-expand-lg navbar-light py-md-0">
            <div class="navbar-brand pl-md-5">
                <h1 class="site-logo pt-1"><router-link :to="{name: 'MainPage'}">{{ sitename }}</router-link></h1>
            </div>
             <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="nav navbar-nav mr-auto pl-md-5">
                    <li class="nav-item"><router-link class="nav-link" :to="{name: 'MainPage'}">Home</router-link></li>
                    <li class="nav-item"><router-link class="nav-link" :to="{name: 'RentDataPage'}">Rent</router-link></li>
                    <li class="nav-item"><router-link class="nav-link" :to="{name: 'SaleDataPage'}">Sale</router-link></li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'NavigationBar',
    data () {
        return {
            sitename: 'Real Estate Data',
        }
    }
    // --On scroll toggle transparent--
    // mounted() {
    //     $(window).scroll(function(){
    //         $('nav').toggleClass('scrolled', $(this).scrollTop() > 100);
    //     });
    // }
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: black;
}
.navbar-light {
    /* transition: 750ms ease; */
    background-color: rgb(165, 194, 0);
}
/* .navbar-light.scrolled{
    background-color: rgb(162, 197, 35, 0.9);
} */
.nav-item{
    font-size: 20px;
}
nav li a.router-link-exact-active{
    font-weight: 700;
}
nav li .nav-link:hover{
    background: linear-gradient( rgb(165, 194, 0),white);
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
}
.site-logo{
    font-family: "Times New Roman", Times, serif;
}
@media screen and (max-width: 600px) {
  h1.site-logo {
    font-size: 30px;
  }
}
.navbar-brand{
    font-size:20px;
}
header{
    margin-top:65px; /*fix the space back of fixed-bar*/
}
</style>