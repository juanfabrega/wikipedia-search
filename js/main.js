"use strict";

var searchQuery = '';
var searchURL = '';

function getQuery() {
    $('#query').change(function() {
        searchQuery = $('#query').val();
    });
}

function doSearch() {
    $('#search-button').click(function() {
        searchURL = 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchQuery + '&format=json&limit=20';
        getResults();
    });
}

function getResults() {
    $.getJSON(searchURL, function(results){
        console.log(results);
        insertResults(results);
    });
}

function insertResults(results) {
    $('#search-results').html('');
    let singleResult = '';

    if (results[1].length === 0) {
        $('#search-results').html('<p style="margin: 0 auto; display: block; width: 250px;">No articles found, please try again</p>')
    } else {
        for (let i = 0; i < results[1].length; i++) {
            singleResult = $('<div class="row"><div class="col"><div class="card"><div class="card-block"><h4 class="card-title">' + results[1][i] + '</h4><p class="card-text">' + results[2][i] + '</p><a href="' + results[3][0] + '"target="_blank"><button class="btn">View Article</button></a></div></div></div></div>');
            $('#search-results').append(singleResult);
        }
    }


}

$(document).ready(function() {
    //quick status check.
    console.log("Good to go!");
    getQuery();
    doSearch();

});
