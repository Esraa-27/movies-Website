
/** nav */

$(".x-header").click(function () {

    let listWidth = $(".sidebar-list").outerWidth();

    if ($(".sidebar-list").css("left") == "0px") {

        $(".sidebar-list").animate({ "left": -listWidth }, 1000);
        $(".list ").animate({ "top": "100%" }, 1000)
        $(".sidebar-header").animate({ "left": 0 }, 1000);
        $(".x-header").html(`<i class="fa-solid fa-align-justify"></i>`);


    }
    else {
        $(".sidebar-list").animate({ "left": 0 }, 1000);
        $(".sidebar-header").animate({ "left": listWidth }, 1000);
        $(".x-header").html(`<i class="fa-solid fa-xmark"></i>`);
        $(".list").animate({ "top": "50px" }, 1000)


    }

});

/********************************************************************************************* */

/** form */

let inpName = document.getElementById("name");
let inpEmail = document.getElementById("email");
let inpAge = document.getElementById("age");
let inpPhone = document.getElementById("phone");
let inpPassword = document.getElementById("password");
let inpRePassword = document.getElementById("rePassword");

$(inpName).keyup(function () {
    let rgxTest = /^[A-Z][a-z]+$/
    let flag = rgxTest.test(inpName.value);
    if (flag == false) {
        $("#namealert").show();
    }
    else {
        $("#namealert").hide();
    }
    return flag;
});
$(inpEmail).keyup(function () {
    let rgxTest = /^[A-Za-z1-9]{5,}@[a-z]{5}.[a-z]{3}$/
    let flag = rgxTest.test(inpEmail.value);
    if (flag == false) {
        $("#emailalert").show();
    }
    else {
        $("#emailalert").hide();
    }
})
$(inpAge).keyup(function () {
    let rgxTest = /^[1-9][0-9]?$/
    let flag = rgxTest.test(inpAge.value);
    if (flag == false) {
        $("#agealert").show();
    }
    else {
        $("#agealert").hide();
    }
});
$(inpPhone).keyup(function () {
    let rgxTest = /^\d{11}$/
    let flag = rgxTest.test(inpPhone.value);
    if (flag == false) {
        $("#phonealert").show();
    }
    else {
        $("#phonealert").hide();
    }
})
$(inpPassword).keyup(function () {
    let rgxTest = /^[A-Za-z1-9]{8,}$/
    let flag = rgxTest.test(inpPassword.value);
    if (flag == false) {
        $("#passwordalert").show();
    }
    else {
        $("#passwordalert").hide();
    }

})
$(inpRePassword).keyup(function () {
    if (inpPassword.value != inpRePassword.value) {
        $("#repasswordalert").show();
    }
    else {
        $("#repasswordalert").hide();
    }
})


/******************************************************************************* */

/** data api  */

let category = "movie"

let arrData = [];

(function () { getnowPlaying(); })();

$("#nowPlaying").click(function () {
    getnowPlaying();
});
$("#popular").click(function () {
    getPopular();
});
$("#topRated").click(function () {
    getTopRated();
});
$("#trending").click(function () {
    getTrending();
});
$("#upcoming").click(function () {
    getUpcoming();
});

function display() {
    var temp = "";
    for (i = 0; i < arrData.length; i++) {

        temp += `
        <div class=" col-md-6 col-lg-4 my-3  shadow">
        <div class="movie shadow rounded position-relative text-center">
            <div class="img ">
                <img src="https://image.tmdb.org/t/p/w500${arrData[i].poster_path}" class=" w-100" alt="">
            </div>

            <div class="layer p-1 d-flex align-items-center justify-content-center">
                <div>
                  <h2>${arrData[i].original_title}</h2>
                  <p>
                    ${arrData[i].overview}
                  </p>
                  <p>rate: ${arrData[i].vote_average}</p>
                  <p> ${arrData[i].release_date}</p>
                </div>
                                         
            </div>            
        </div>
    </div>  `

    }
    document.getElementById("data").innerHTML = temp;

}
async function getnowPlaying() {
    var myresponse = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=e1e351f56f7ec8ab6da0f8a2091e1244&language=en-US&page=1api_key=e1e351f56f7ec8ab6da0f8a2091e1244`);
    var responseData = await myresponse.json();
    arrData = responseData.results;
    display();
}
async function getPopular() {
    var myresponse = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=e1e351f56f7ec8ab6da0f8a2091e1244&language=en-US&page=1`);
    var responseData = await myresponse.json();
    arrData = responseData.results;
    display();
}
async function getTopRated() {
    var myresponse = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=e1e351f56f7ec8ab6da0f8a2091e1244&language=en-US&page=1`);
    var responseData = await myresponse.json();
    arrData = responseData.results;
    display();
}
async function getTrending() {
    var myresponse = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=e1e351f56f7ec8ab6da0f8a2091e1244`);
    var responseData = await myresponse.json();
    arrData = responseData.results;
    display();
}
async function getUpcoming() {
    var myresponse = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=e1e351f56f7ec8ab6da0f8a2091e1244&language=en-US&page=1`);
    var responseData = await myresponse.json();
    arrData = responseData.results;
    display();
}


/************************************************************************** */

/** search */


let allSearch = document.getElementById("allSearch");
let tempSearch = "";

async function getSearchData() {
    var myresponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=e1e351f56f7ec8ab6da0f8a2091e1244&query=${tempSearch}&language=en-US&page=1&include_adult=false`);
    var responseData = await myresponse.json();
    arrData = responseData.results;
    display();
}

$(allSearch).keyup(function () {
    tempSearch = allSearch.value;
    getSearchData();

})
