var PremierLeagueFixtures = function(){
  var url = 'http://api.football-data.org/v1/competitions/398/fixtures?matchday=8';
  makeRequest(url, requestComplete);
}


var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.setRequestHeader("X-Auth-Token", "795581b721014c898569d2bee06c9012");
  request.onload = callback;
  request.send();
}

var requestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var fixtures = JSON.parse(jsonString);
  // console.log(fixtures);
}


  

