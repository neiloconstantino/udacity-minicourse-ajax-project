
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $("#street").val();//get user input for "#street"
    var cityStr = $("#city").val(); //get user input for "#city"
    var address = streetStr + ", " + cityStr;

    var streetViewURL = "http://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + address;
    $body.append("<img class='bgimg' src='" + streetViewURL + "'>"); 

    //New York Times AJAX request
    var nytimesURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + cityStr + "&sort=newest&api-key=91b3f4fc57f641c28fcfe790d382f507";

    $.getJSON(nytimesURL, function(data) {
        // console.log(data);

        $nytHeaderElem.text("New York Times Articles About " + cityStr);

        var articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];

            $nytElem.append("<li class='article'>" + 
                                "<a href='" + article.web_url + "' target='_blank'>" + article.headline.main + "</a>" +
                                "<p>" + article.snippet + "</p>"
                            );
        }
    }).error(function(e){
        $nytHeaderElem.text("New York Times Articles Could Not Be Loaded");
    });


    //Wikipedia AJAX request
    var wikipediaURL = "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + cityStr + "&format=json&callback=wikiCallback";
    var wikipediaRequestTimeout = setTimeout(function(){
        $wikiElem.text("Failed to get Wikipedia resources");
    }, 8000); 

    $.ajax({
        url: wikipediaURL,
        dataType: "jsonp",
        success: function( response ) {
            // console.log(response);
                        
            var articleList = response[1];
            var articleURLList = response[3];

            for(var i = 0; i < articleList.length; i++) {
                $wikiElem.append("<li><a href='" + articleURLList[i] + "' target='_blank'>" + articleList[i] + "</a>");
            }

            clearTimeout(wikipediaRequestTimeout);
        }
    })

    return false;
};

$('#form-container').submit(loadData);
