
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

    // YOUR CODE GOES HERE!
    var streetStr = $("#street").val();//get user input for "#street"
    var cityStr = $("#city").val(); //get user input for "#city"
    var address = streetStr + ", " + cityStr;

    var streetViewURL = "http://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + address;
    $body.append("<img class='bgimg' src='" + streetViewURL + "'>"); 

    //New York Times AJAX request
    var nytimesURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + cityStr + "&sort=newest&api-key=91b3f4fc57f641c28fcfe790d382f507";



    $.getJSON(nytimesURL, function(data) {
        console.log(data);

        $nytHeaderElem.text("New York Times Articles About " + cityStr);

        var articles = data.response.docs;
        





        //FIRST TRY
        // var items = [];

        // $.each( data, function( key, val ) {
        //     items.push("<li id='" + key + "'>" + val + "</li>");
        // });

        // $( "<ul/>", {
        //     "class" : "my-new-list",
        //     html: items.join( "" )
        // }).appendTo( "body" );

        // EXAMPLE FROM jQuery WEBSITE
        // $.getJSON( "ajax/test.json", function( data ) {
        //     var items = [];
        //     $.each( data, function( key, val ) {
        //         items.push( "<li id='" + key + "'>" + val + "</li>" );
        //     });
        
        //     $( "<ul/>", {
        //         "class": "my-new-list",
        //         html: items.join( "" )
        //     }).appendTo( "body" );
        // });
    });

            




    // "<ul id='nytimes-articles' class='article-list'>" +
    //     FOR EACH ARTICLE
    //     "<li class='article'>" +
    //         "<a href='" + nytimesArticleURL + "'>" + nytimesArticleDescription + "</a>" +
    //             "<p>" + nytimesArticle1stParagraph + "</p>" +
    //     "</li>" + 
    // "</ul>"

    return false;
};

$('#form-container').submit(loadData);
