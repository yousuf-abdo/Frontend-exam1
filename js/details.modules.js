class Details {
    constructor(category = "mmorpg") {
      this.category = category;
      this.apiKey = 'd4d73567e5mshd17ee84803d557dp1cfee1jsn8f47d9467dd6';
      this.apiHost = 'free-to-play-games-database.p.rapidapi.com';
      this.gameItem = document.querySelector("#games");
    }
    
    async FetchDataFromAPI() {
      const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?category=' + this.category;
      
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': this.apiKey,
          'x-rapidapi-host': this.apiHost
        }
      };
  
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        this.renderGames(data);
      } catch (error) {
        console.error(error);
      }
    }
    
    renderGames(games) {
      let obj = '';
      games.forEach(currentelement => {
        obj += 
          '<div class="col-lg-4 col-sm-12 gameItem">' +
          '<div class="card text-center bg-transparent mb-5 item">' +
          '<h2 class="px-2 text-danger d-none item-id">'+currentelement.id+'</h2>'+ 
          '<div class="card-body p-3">' +
          '<img src="'+currentelement.thumbnail+'" class="card-img-top object-fit-cover img-fluid" alt="Item">' +
          '<div class="row mt-3">' +
          '<label class="pull-left text-white w-auto">'+currentelement.title+'</label>' +
          `<a class="ms-auto btn btn-primary w-auto" href="#">Free</a>` +
          `<p class="text-white-50 h-100">` +
            currentelement.short_description +
          `</p></div></div>` + 
          `<div class="card-footer">` + 
          `<div class="row"><a href="`+currentelement.game_url+`" class="btn btn-dark w-auto">`+currentelement.genre+`</a>` + 
          `<a href="#" class="btn btn-dark w-auto ms-auto">`+currentelement.platform+`</a></div></div></div></div>`;
      });
      this.gameItem.innerHTML = obj;

      document.querySelectorAll('.gameItem').forEach(item => {
        item.addEventListener('click', () => {
          this.handleItemClick(item);
        });
      });
    }
    
    handleItemClick(item) {
      const itemId = item.querySelector('.item-id').textContent;
      const currentelement = this.getItemDataById(itemId);
  
      if (currentelement) {
        const detailsView = `
        <div class="container">
          <div class="mt-5 mb-5 d-flex flex-row justify-content-between p-5">
            <h3>Details Game</h3>
            <a href="#" class="btn-close btn-close-white text-white" id="btnClose"></a>
          </div>
          <div class="row pb-5 detail-item">
            <div class="col-lg-4 col-sm-12">
                <img src="` + currentelement.thumbnail + `" width="100%" alt="Details Image">
            </div>
            <div class="col-lg-8 col-sm-12">
               <label class="detaile-title">Title:</label> <label for="title" class="detaile-title">` + currentelement.title + `</label><br>
            <label class="detaile-sub-title">Category:</label> <label for="Category" class="badge mt-2 p-1 bg-info detaile-sub-title">` + this.category + `</label><br>
            <label class="detaile-sub-title">Platform:</label> <label for="Platform" class="badge mt-2 p-1 bg-info detaile-sub-title">` + currentelement.platform + `</label><br>
            <label class="detaile-sub-title">Status:</label> <label for="Status" class="badge mt-2 p-1 bg-info detaile-sub-title">Free</label><br>
            <p class="mt-3">` +
              currentelement.short_description + 
            `</p>
            <a href="` + currentelement.game_url + `" target="_blank" class="btn btn-outline-warning text-white">Show Game</a>
            </div> 
            </div> 
        </div>`;

          const detailSection = document.querySelector(".detail-section");
          const games = document.querySelector("#games");

          detailSection.innerHTML = detailsView;
          detailSection.style.display = "flex";
          detailSection.style.minHeight = "100vh";
          games.style.display = "none";

        // Add event listener for the close button
        document.getElementById("btnClose").addEventListener("click", (event) => {
            event.preventDefault();

            detailSection.style.display = "none";
            games.style.display = "flex";
        });

      } else {
        console.error("Item data not found for ID:", itemId);
      }
    }
    
    getItemDataById(id) {
      const gameItems = Array.from(document.querySelectorAll('.gameItem'));
      const itemElement = gameItems.find(item => item.querySelector('.item-id').textContent === id);
      
      if (itemElement) {
        const title = itemElement.querySelector('.pull-left').textContent;
        const thumbnail = itemElement.querySelector('img').src;
        const short_description = itemElement.querySelector('p').textContent;
        const platform = itemElement.querySelector('.btn-dark.ms-auto').textContent;
        const game_url = itemElement.querySelector('.btn-dark').href;
        
        return { id, title, thumbnail, short_description, platform, game_url };
      }
      
      return null;
    }

   /* end close details */
  }
  
  // Instantiate the Details class and call the FetchDataFromAPI method
  const details = new Details();
  details.FetchDataFromAPI();