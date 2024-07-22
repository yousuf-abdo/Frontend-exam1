class UI {
    showData(res){
        var data = [];

        res.then(d => {
            data.push(d);
        });

        return data;
    }
    /* start show / hide loader */
    showHideLoader(){
        document.onreadystatechange = function () {
            var state = document.readyState;
            if (state == 'interactive') {
                 document.getElementById('contents').style.display="none";
                 document.getElementById('loader').style.display="block";
            } else if (state == 'complete') {
                setTimeout(function(){
                   document.getElementById('loader').style.display="none";
                   document.getElementById('contents').style.display="block";
                },2000);
            }
          }
    }
    /* end show / hide loader */
    /* start window scrolling */
    changePos() {
        var myNav = document.querySelector("#myNav");
        if (window.scrollY <= 100 ) {
            // myNav.style.position = "fixed";
            myNav.style.top = "0 !important";
            myNav.style.marginTop = "0 !important";
        }
    }
    /* end window scrolling */
    
    /* start close details */
    closeDetails(){
         document.querySelector(".detail-section").style.display="none";
        document.getElementById('contents').style.display="block";
    }
    /* end close details */
    /* start navigation (active-class) */
    SetActiveClass(){
        document.querySelectorAll(".nav-link").forEach((link) =>
            link.addEventListener("click", function (event) {
              event.preventDefault();
              document
                .querySelectorAll(".nav-link")
                .forEach((ele) => {
                    ele.classList.remove("active");
                    link.classList.add("active");

                });
                link.setAttribute("aria-current", "page");
                new Details(link.innerHTML).FetchDataFromAPI();
            })
        );
    }
    /* end navigation (active-class) */
}

var ui = new UI();
ui.SetActiveClass();
ui.changePos();
ui.showHideLoader();
window.onscroll = ui.changePos();