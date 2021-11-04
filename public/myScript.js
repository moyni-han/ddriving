

var button = document.querySelector("#button");

button.addEventListener('click', sendReq);

function sendReq() {
  fetch('/someroute')
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      // console.log(data.message);
      console.log(data);
    })
    .catch(function (err){
      console.log(err);
    })
}
