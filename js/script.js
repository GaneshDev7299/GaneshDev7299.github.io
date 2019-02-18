/* Own Script */
var articleLength = 0 ;
var gotItems = 0;
var query = null;

$(document).ready(function(){
    // Timer
    var timer = 30;
    
    setInterval(function(){ 
        timer--;
        $(".timer").text(timer);
        if(timer == 0){
            timer = 30; 
        }
    }, 1000);

    // Check URL
    query  = getSearchParams("query");
    if((query != "") && (query != undefined) && (query != null)){
        $(".pre-loader").show();
        $(".search-input").val(query);
        loadAll();
        setTimeout(function(){
            searchArticle();
            $(".pre-loader").hide();
        },3000);
    }else{
        // Get Data From API
        $.ajax({
            url:
            "https://newsapi.org/v2/everything?q=reactjs&apiKey=363d26dd3d664d199ca63adc371e22aa",
            method: "GET",
            error: function() {
                console.log("error in connection");
            },
            success: function(data) {
                processData(data);
            }
        });
    }
});

// API Function
function processData(data) {
        
    var articleItems = [], i;

    articleLength = data.articles.length;

    if(gotItems >= articleLength){
        return false;
    }
  
    // for (i = 0; i < data.articles.length; i++) {
    for (i = gotItems; i < gotItems+5; i++) {

        var author = data.articles[i].author;
        var title = data.articles[i].title;
        var description = data.articles[i].description;
        var artUrl = data.articles[i].url;
        var imgUrl = data.articles[i].urlToImage;          
        var artDate = data.articles[i].publishedAt;       

        var $article = $('<div class="news-item"><div class="news-inner-container"><div class="news-image-container"><img src="'+imgUrl+'" alt="news-images"></div><div class="news-content-container lazy"><h3 class="news-title news-title-'+i+'">'+title +'</h3><div class="news-source-date"><span class="news-author"> By '+ author + '</span> | <span class="news-date">'+ artDate+'</span></div><div class="title-description"><p>'+description+'</p></div><a href="'+artUrl+'" class="goto-button">Continue Reading</a></div></div></div>');

        $(".news-wrapper").append($article);
    }

    gotItems += 5;

    if(gotItems >= articleLength){
        $(".item-loader").hide();
    }

  }


  function processAllData(data) {
        
    var articleItems = [], i;

    $(".item-loader").hide();

    articleLength = data.articles.length;
  
    for (i = 0; i < data.articles.length; i++) {

        var author = data.articles[i].author;
        var title = data.articles[i].title;
        var description = data.articles[i].description;
        var artUrl = data.articles[i].url;
        var imgUrl = data.articles[i].urlToImage;          
        var artDate = data.articles[i].publishedAt;       

        var $article = $('<div class="news-item"><div class="news-inner-container"><div class="news-image-container"><img src="'+imgUrl+'" alt="news-images"></div><div class="news-content-container lazy"><h3 class="news-title news-title-'+i+'">'+title +'</h3><div class="news-source-date"><span class="news-author"> By '+ author + '</span> | <span class="news-date">'+ artDate+'</span></div><div class="title-description"><p>'+description+'</p></div><a href="'+artUrl+'" class="goto-button">Continue Reading</a></div></div></div>');

        $(".news-wrapper").append($article);
    }

  }

//
function loadAll(){
    // Get Data From API
    $.ajax({
        url:
            "https://newsapi.org/v2/everything?q=reactjs&apiKey=363d26dd3d664d199ca63adc371e22aa",
        method: "GET",
        error: function() {
            console.log("error in connection");
        },
        success: function(data) {
            processAllData(data);
        }
    });
}

// Search 
function searchArticle() {

    var filter, item, i, txtValue, titleda;
    filter = $(".search-input").val().toUpperCase();
    //console.log(filter);
    debugger;
    for (i = 0; i < articleLength; i++) {
        titleda = $(".news-title-"+i )[0];
        item = titleda.closest(".news-item");
        txtValue = titleda.textContent || titleda.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    }
    
}

//URL get value
function getSearchParams(k){
    var p={};
    location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){p[k]=v})
    return k?p[k]:p;
   }


//Lazy load
$(window).scroll(function()
{
    if($(window).scrollTop() == $(document).height() - $(window).height())
    {
        if((query != "") && (query != undefined) && (query != null)){
            //do Nothing
        }else{
          // load your content
          $.ajax({
            url:
              "https://newsapi.org/v2/everything?q=reactjs&apiKey=363d26dd3d664d199ca63adc371e22aa",
            method: "GET",
            error: function() {
              console.log("error in connection");
            },
            success: function(data) {
              processData(data);
            }
          });
        }
    }
});


