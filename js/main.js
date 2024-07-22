$(document).ready(function() {
    showHideLoader();
});

function  showHideLoader(){
    var state = document.readyState;
    if (state == 'interactive') {
            $('.contents').css('display','none');
            $('.loader').css('display','block');
    } else if (state == 'complete') {
        setTimeout(function(){
            fetchData('Now Playing');
            $('.loader').css('display','none');
            $('.contents').css('display','block');
        }, 2000);
    }
}

$('#btnOpenClose').on('click', function(){
    var res = $('#btnOpenClose>i').hasClass('fa fa-times');
    
    if(res){
    // لمن يكون مفتوح وعاوز تقفل
        $('#btnOpenClose>i').removeClass("fa fa-times");
        $('#btnOpenClose>i').addClass("fa fa-bars");
        $('.side').css('transition', '0.5s');

        $('.side>ul>li').each(function(index) {
            var $this = $(this);
            setTimeout(function() {
                $this.css({
                    'display': 'flex',
                    'position': 'relative',
                    'left': '-120',
                });
                
            }, index * 300/3);
        });

        setTimeout(function() {
            $('.side').css({
                'width': '0px',
                'position': 'relative',
                'left': '-100',
            });

            $('.side-bar').css('width', '0px');
            $('.side-bar').css('transition', '0.5s');
            $('.side>ul>li').css('top', '0');
            $('.side>ul>li').css('display', 'none');
        }, 1000);

    }else{
        // لمن يكون مقفول وعاوز تفتح
        $('#btnOpenClose>i').removeClass("fa fa-bars");
        $('#btnOpenClose>i').addClass("fa fa-times");
        
        $('.side>ul>li').each(function(index) {
            var $this = $(this);
            setTimeout(function() {
                $this.css({
                    'display': 'flex',
                    'position': 'relative',
                    'top': '50',
                });
                
            $('.side>ul>li').css('transition', '0.5s');
            $('.side>ul>li').css('left', '20');
            }, index * 500);
        });

        setTimeout(function() {
            $('.side').css({
                'display': 'flex',
                'width': '270px',
                'left': '20',
            });
        }, 100);
        
        setTimeout(function() {
            $('.side-bar').css({
                'display': 'flex',
                'width': '340px',
            });
        }, 100);
    }
});

$('.my-input').on('keyup', function(){
    var leng = this.value.length;
    if(leng > 0){
        $('.search>i').css('display', 'inline');
        fetchData(this.value);
    }else{
        $('.search>i').css('display', 'none');
    }
});

document.querySelectorAll(".cat").forEach((link) =>
    link.addEventListener("click", function (event) {
        event.preventDefault();
        document
        .querySelectorAll(".cat")
        .forEach((ele) => {
            ele.classList.remove("active");
            link.classList.add("active");

        });
        link.setAttribute("aria-current", "page");
        
        fetchData(link.innerHTML);
        // alert(link.innerHTML);
    })
);
var url = '';
function setUrl(cat){
    switch(cat){
        case 'Now Playing':
            url='https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&page=1';
            break;
        case 'Popular':
            url='https://api.themoviedb.org/3/tv/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&page=1';
            break;
        case 'Top Rated':
            url='https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&page=1';
            break;
        case 'Trending':
            url='https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&page=1';
            break;
        case 'upcoming':
            url='https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&page=1';
            break;

        default:
            url='https://api.themoviedb.org/3/search/movie?query='+ cat +'&api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&page=1';
        break;
    }
}

async function fetchData(cat) {
    setUrl(cat);
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDdiYjcxMTU1ZDgzMDQ0MWNmMmE4MjdjMDU2Y2FiMCIsIm5iZiI6MTcyMTUwNDYyMS4xODQ5MjgsInN1YiI6IjY5NWI1MGQyZGE2ZDY3N2E5YjA5OWNmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-G2fSrQ2QHHbJ_m2uQ_hY_N22P4na1Mv7-PEfboKhlc'
        }
    };

    let obj = '';
    var item = document.querySelector('.contents-row');

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        data.results.forEach(ele=>{
            const fullStars = Math.floor(ele.vote_average * 10) / 10;
            const halfStar = (ele.vote_average / 2) - fullStars >= 0.5;
            const halfStareeee =  halfStar?(fullStars/2)+1:(fullStars/2);
      
            obj += '<div class="col-lg-4 mt-5 my-1">' + 
              '<div class="item">' + 
                '<img src="https://image.tmdb.org/t/p/w500' + ele.poster_path + '" class="img-fluid" alt="item image">' + 
                '<div class="item-details">' +
                  '<h1 class="title">' +ele.original_title+'</h1>' +
                  '<p class="overview">' + ele.overview + '</p>' + 
                  '<div class="rating1">'+
                    '<h3>Release Date:<span class="release-date">' +ele.release_date + '</span></h3>' +
                    '<div class="rating">';
                        for (let i = halfStareeee - 1; i > 0; i--) {
                            obj += '<label for="star' + i + '-' + ele.id + '" title="' + i + ' stars">★</label>';
                        }
                        obj += '</div></div>' +
                    '<span class="rate-val">' + Math.round(ele.vote_average * 10)/10 + '</span>'+ 
                '</div></div></div>';
        });
        item.innerHTML= obj;
        
        // Add mouseenter and mouseleave event listeners
    const items = document.querySelectorAll('.item');
    
    items.forEach(item => {
        item.addEventListener('mouseover', function() {
            const title = item.querySelector('.title');
            title.style.animation = 'slideInFromTop 1s forwards';
            const overview = item.querySelector('.overview');
            overview.style.animation = 'slideInFromTop 2s forwards';
            const rating1 = item.querySelector('.rating1');
            rating1.style.animation = 'slideInFromBottom 2s forwards';
        });
        
        item.addEventListener('mouseenter', function() {
            const title = item.querySelector('.title');
            title.style.animation = 'slideOutToLeft 1s forwards';
            const overview = item.querySelector('.overview');
            overview.style.animation = 'slideOutToLeft 2s forwards';
            const rating1 = item.querySelector('.rating1');
            rating1.style.animation = 'slideOutToLeft 2s forwards';
            // rating1.style.animationDelay  = '2s';
        });
        

    });
    } catch (err) {
        console.error('Fetch error: ', err);
    }
}

$('#clearText').on('click', function(){
    $('.my-input').val('');
    $('#clearText').css('display', 'none');
    $('.my-input').focus();
    
    fetchData('Now Playing');
});

/** Validation */
const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const phoneRegEx = /^\+?(\d{1,5})?[-.●]?\d{9,}$/;

$('#Email').on('keyup', function(){
    var res = $(this).val();
if (!emailRegEx.test(res)) {
    $('.btn-submit').addClass('vibrate');
    $("#errEmail").text('Invalid Email , try example@domain.com');
    $('#errEmail').removeClass('d-none');
    $('.btn-submit').addClass('btn-submit-error');
} else {
    $("#errEmail").text('');
    $('#errEmail').addClass('d-none');
    $('.btn-submit').removeClass('btn-submit-error');
    $('.btn-submit').removeClass('vibrate');
}
});

$('#password').on('keyup', function(){
    var res = $(this).val();
if (!passwordRegEx.test(res)) {
    $("#errPassword").text('password must contain numbers & letters at least 8 character');
    $('#errPassword').removeClass('d-none');
    $('.btn-submit').addClass('btn-submit-error');
} else {
    $("#errPassword").text('');
    $('#errPassword').addClass('d-none');
    $('.btn-submit').removeClass('btn-submit-error');
}
});

$('#rePassword').on('keyup', function(){
    var res = $(this).val();
    var password = $('#password').val();
if (res !== password) {
    $("#errRePassword").text('Password not match');
    $('#errRePassword').removeClass('d-none');
    $('.btn-submit').addClass('btn-submit-error');
    $('.btn-submit').addClass('vibrate');
} else {
    $("#errRePassword").text('');
    $('#errRePassword').addClass('d-none');
    $('.btn-submit').removeClass('btn-submit-error');
    $('.btn-submit').removeClass('vibrate');
}
});

$('#phone').on('keyup', function(){
    var res = $(this).val();
    if (!phoneRegEx.test(res)) {
        $("#errPhone").text('Invalid Phone Number, try +249-123456789');
        $('#errPhone').removeClass('d-none');
        $('.btn-submit').addClass('btn-submit-error');
    } else {
        $("#errPhone").text('');
        $('#errPhone').addClass('d-none');
        $('.btn-submit').removeClass('btn-submit-error');
    }
});
