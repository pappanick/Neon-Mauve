let $FilmTitle = $("#Film_title");
let $FilmGenre = $("#Film_Genre");
let $FilmsList = $("#Films_list");
let $addFilmBtn = $("#add-Film-btn");
let $sortBtn = $(".fa-sort");


function getFilmData() {
    let genre = [];
    let $allRows = $(".Film.tr")
    for (let i = 0; i < $allRows.length; i++) {
        genre.push({
            "title": $allRows[i].children[0].innerText,
            "genre": $allRows[i].children[1].innerText,
        })
    }
    // console.log(genre)
    return genre;
}


function sortByKeyDescending(array, key) {
    return array.sort(function(a, b) {
        let x = a[key];
        let y = b[key];
        return ((x > y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function sortByKeyAscending(array, key) {
    return array.sort(function(a, b) {
        let x = a[key];
        let y = b[key];
        return ((x < y) ? -1 : ((x < y) ? 1 : 0));
    });
}

function updateDOM(data) {
    $FilmsListCopy = $FilmsList.children();
    $FilmsList.children().remove()
    for (let j = 0; j < data.length; j++) {
        $FilmsList.append(`
            <div class="Film tr" value="${data[j]["genre"]}">
            <div class="text-center">
                    <div class="d-flex align-items-center">
                        <span class="Film-title">${data[j]["title"]}<span>
                    </div>
            </div>
            <div class="text-center">
                <div class="genre display-4">${data[j]["genre"]}</div>
            </div>  
            <div class="text-center">
                <div><button class="btn btn-danger delete_Film_btn">Delete</button></div>
            </div>
        </div>
            `)

    }
    return $FilmsList;
}

$(document).ready(function() {
    // This will save on the stupid form on .html
    // $FilmGenre.on("click", "genre", function(e) {
    //     let GenreList = ['Action', 'Adventure', 'Animation', 'Arthouse', 'Asian', 'Camp', 'Classics', 'Comedy', 'Crime', 'Cult', 'Documentary', 'Drama', 'Epic', 'Erotica', 'Experimental', 'Exploitation', 'Fantasy', 'Film Noir', 'Giallo', 'Horror', 'Martial', 'Arts', 'Musical', 'Mystery', 'Performance', 'Philosophy', 'Politics', 'Romance', 'Sci-Fi', 'Short', 'Silent', 'Thriller', 'TV', 'Video Art', 'War', 'Western']
    //     for (let j = 0; j < GenreList.length; j++) {
    //         $FilmGenre.append(`
    //             console.log(genre)
    //             e.preventDefault();
    //             <div class="d-flex align-items-center">
    //             <span class="Film_Genre">${$FilmGenre.val()}<span>
    //         </div>
    //         <select type="genre" class="form-select" id="Film_Genre" required>
    //         <option value="${GenreList[j]["Film_Genre"]}">${GenreList[j]["Film_Genre"]}</option>
    //         `)
    //         console.log($FilmGenre)
    //     }
    //     return $FilmGenre;
    // })

    $addFilmBtn.click(function(e) {
        e.preventDefault();
        if ($FilmTitle.val() && $FilmGenre.val()) {
            $FilmsList.append(`
                <div class="Film tr" value="${$FilmGenre.val()}">
                    <div class="text-center">
                            <div class="d-flex align-items-center">
                                <span class="Film-title">${$FilmTitle.val()}<span>
                            </div>
                    </div>
                    <div class="text-center">
                        <div class="genre">${$FilmGenre.val()}</div>
                    </div>  
                    <div class="text-center">
                        <div><button class="btn btn-danger delete_Film_btn">Delete</button></div>
                    </div>
                </div>
            `)
        }
    })

    $FilmsList.on("click", ".delete_Film_btn", function(e) {
        e.preventDefault();
        $(e.target).parent().parent().parent().remove();
    })

    $sortBtn.click(function(e) {
        e.preventDefault();
        if ($(e.target).hasClass("descending")) {
            let genre = getFilmData();
            // console.log(genre)
            let $sortedGenres = sortByKeyDescending(genre, "genre");
            updateDOM($sortedGenres);
            $(e.target).removeClass("descending");
        } else {
            let genre = getFilmData();
            let $sortedGenreValuesAsc = sortByKeyAscending(genre, "genre");
            updateDOM($sortedGenreValuesAsc);
            $(e.target).addClass("descending");
        }
    })

});