window.onload = function() {
  var container = document.getElementById('map');
  var coords = {lat: 51.6032, lng: 0.0657};  
  var mainMap = new MapWrapper(container, coords, 6);

  // mainMap.setLocation(coords);


  var table = new PremierLeagueTable();
  var fixtures = new PremierLeagueFixtures();
  var feed = new FootballFeed();


  var url = 'http://localhost:3000/api/accounts';
  makeRequest(url, function(){
    if (this.status !== 200) return;
  var jsonString = this.responseText;
  var stadiums = JSON.parse(jsonString);
  var allStadiums = getStadiumData(stadiums);
  getClubNames(allStadiums);

  for(var stadium of allStadiums){
    var icon = {
              url: stadium.crest, // url
              scaledSize: new google.maps.Size(20, 30), // scaled size
              origin: new google.maps.Point(0,0), // origin
              anchor: new google.maps.Point(0, 0) // anchor
            };
    mainMap.addMarker(stadium.latlng, icon);
  };

    })

  mainMap.initDirections();

  // console.log(getStadiumCoords(1));

  var select = document.querySelector('#team');
  select.addEventListener('change', function(e){
    console.log(e.target.value)
    var coords = getStadiumCoords(1);
    mainMap.setCenter(coords);
  })


  }


var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

// var requestComplete = function(){
//   if (this.status !== 200) return;
//   var jsonString = this.responseText;
//   var stadiums = JSON.parse(jsonString);
//   getStadiumData(stadiums);
// }

var getStadiumData = function(stadiums){
  var data = [];
  stadiums.forEach(function(stadium){
    var stadiData = {};
    stadiData = {name: stadium.name, crest: stadium.crestURL, stadium: stadium.stadium, latlng: {lat: stadium.latlng[0], lng: stadium.latlng[1]}};
    data.push(stadiData);

  })
    return data;
}

var getClubNames = function(stadiums){
  var select = document.querySelector('#team');
  for (var i = 0; i < stadiums.length; i++) {
    var option = document.createElement('option') ;
    option.innerText = stadiums[i].name;
    option.value = stadiums[i];
    select.appendChild(option); 
  }

  var getStadiumCoords = function(index){
    var coords = {};
    coords = {lat: allStadiums[index].latlng[0], lng: allStadiums[index].latlng[0]};
    return coords;
  }


}
