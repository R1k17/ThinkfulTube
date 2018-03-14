// Step 1 - endpoint url
const searchUrl = 'https://www.googleapis.com/youtube/v3/search';

// Step 2 - get data from API
function getApiData(searchTerm, callback){
    const query = {
      part: 'snippet',
      q: searchTerm,     
      type: 'video',
      key: 'AIzaSyBac9cFNnhK6shArenZzYFA742-SBGSVM0'
    }
    $.getJSON(searchUrl, query, callback);
  }
  
// Step 3 - define the html structure for the data
const resultsTemplate = (
  '<div class="cssResults">'+'<p class="resultTitle"></p>'+'<a class="js_image_link" href=""><img class="js_image" src="" alt=""></a>'+'</div>'
);

// Step 4 - Render the data in the template
function renderResults(result){
  let template = $(resultsTemplate);
  template.find('.js_image_link').attr('href', `https://www.youtube.com/watch?v=${result.id.videoId}`);
  template.find('.js_image').attr('src', result.snippet.thumbnails.medium.url);
  template.find('.js_image').attr('alt', result.snippet.title)
  template.find('.resultTitle').text(result.snippet.title);
  return template;
}

// Step 4 - displaying the data
function displayData(data){
  let results = data.items.map(function(item){ 
      return renderResults(item);
  });
  $('#searchContainer').html(results);
};

// Step 5 - watch for submitting
function searchSubmit(){
$('.searchForm').submit(function(event){
  event.preventDefault();
  let queryTarget = $(event.currentTarget).find('#searchTerm');
  let query = queryTarget.val();
  getApiData(query, displayData);
})
};

$(searchSubmit);