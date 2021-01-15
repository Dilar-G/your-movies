searchInput = document.getElementById('searchInput');

searchInput.onkeypress = function(event) {
    if (event.keyCode === 13) {
        search();
    }
  };

// searchInput.onkeypress = function() {
//     doDelayedSearch()
// }

var timeout = null;
function doDelayedSearch() {
if (timeout) {  
    clearTimeout(timeout);
}
    timeout = setTimeout(function() {
        search();
    }, 500);
}

searchResults = document.getElementById('searchResults');

function search(){
    keyword = searchInput.value;
    function render(){
        let response = this.responseText;
        let movies = JSON.parse(response).data.movies;

        if(typeof movies == 'undefined') {
            searchResults.innerHTML = 'no results found'
            let li = document.createElement('li');
            let img_wrapper = document.createElement('div');
            let img = document.createElement('img');
            let properties = document.createElement('div');
            let title = document.createElement('span');

            img_wrapper.className = 'hidden-img';
            properties.className = 'hidden-properties';
            li.className = 'hidden-search-single';

            li.appendChild(img_wrapper);
            li.appendChild(properties);
            img_wrapper.appendChild(img);
            properties.appendChild(title);

            img.alt = 'not found';
            img.src = '../images/loading.gif';
            title.innerText = '0 შედეგი :(';
            searchResults.innerHTML = '';
            searchResults.appendChild(li);
            return 0;
        }

        let fragment = document.createDocumentFragment();

        movies.forEach(el => {
            let link = document.createElement('a');
            let img_wrapper = document.createElement('div');
            let img = document.createElement('img');
            let properties = document.createElement('div');
            let title = document.createElement('span');
            let year = document.createElement('p');

            img_wrapper.className = 'hidden-img';
            properties.className = 'hidden-properties';
            link.className = 'hidden-search-single';

            link.appendChild(img_wrapper);
            link.appendChild(properties);
            img_wrapper.appendChild(img);
            properties.appendChild(title);
            properties.appendChild(year);

            link.href = 'movie-detailed.html?movie_id=' + el.id;
            img.alt = el.title_long;
            img.src = el.small_cover_image;
            title.innerText = el.title;
            year.innerText = el.year;

            fragment.appendChild(link);
        });
        searchResults.innerHTML = '';
        searchResults.appendChild(fragment);

    }
    let req = new XMLHttpRequest();
    req.addEventListener('load', render);
    req.open('GET', 'https://yts.mx/api/v2/list_movies.json?limit=5&query_term=' + keyword);
    req.send();       
}

document.getElementById('body').onclick = function() {
    searchResults.innerHTML = '';
}