(function() {
  //[變數命名區]===============================================
  const baseURL = "https://movie-list.alphacamp.io/api/v1";
  const indexURL = baseURL + "/movies";
  const showURL = baseURL + "/movies/"; //+id
  const postURL = "https://movie-list.alphacamp.io/posters/";
  const listPanel = document.getElementById("genres_pannel");
  const moviesPannel = document.getElementById("movies_pannel");

  const genres = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  };
  const data = [];

  //[功能撰寫區]===============================================

  //取得電影資料-存到data  中
  axios.get(indexURL).then(response => {
    data.push(...response.data.results);
    displayMovieCard(data, 1);
  });

  //顯示列表-DOM-API
  displayGenres(genres);

  //[功能撰寫區-事件監聽區]======
  listPanel.addEventListener("click", function(event) {
    let typeNuber = parseInt(event.target.dataset.id);
    displayMovieCard(data, typeNuber);
  });

  //[function區]===============================================
  //展示列表資料-取值-HTML處理-塞進前端
  function displayGenres(data) {
    let dataKeys = Object.keys(data);
    let dataValues = Object.values(data);
    let dataacount = dataKeys.length;
    let listContent = "";
    for (let i = 0; i < dataacount; i++) {
      listContent += `
        <li class="list-group-item" data-id=${dataKeys[i]} >${
        dataValues[i]
      }</li>
        `;
    }

    listPanel.innerHTML = listContent;
  }

  //展示電影卡片
  function displayMovieCard(data, typeNuber) {
    let moviePannelContent = "";

    data.forEach(function(item, index, array) {
      if (item.genres.includes(typeNuber)) {
        let tag = movieTaggenerate(item.genres);
        moviePannelContent += `
      <div class="col-sm-4">
        <div class='card' style="width: 18rem">
        <img class="card-img-top" src="${postURL}${item.image}" alt="${
          item.id
        }" >
        <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        ${tag}
        </div>
        </div>
        </div>
        `;
      }
    });

    moviesPannel.innerHTML = moviePannelContent;
  }

  //展示電影卡片 - 生成卡片tag
  function movieTaggenerate(movieArray) {
    let tagHTML = "";
    movieArray.forEach(item => {
      let tag = genres[item];
      tagHTML += `
        <span class="badge badge-secondary">${tag}</span>
        `;
    });
    return tagHTML;
  }
})();
