var completeData;
var gData;
var channelList = [];

var all = () => {
  header();
  footer();
  body();
};

var header = () => {
  var html = `<h1 id="news-heading1">NEWSFEED</h1><h6 id="news-heading2"><i>Yet another newsfeed</i></h6>`;
  document.getElementById("news").innerHTML = html;
};

var footer = () => {
  var html = `<p class="foot-text">&copy;NewsFeed 2019</p>`;
  document.getElementById("foot").innerHTML = html;
};

var body = () => {
  var url =
    "https://newsapi.org/v2/top-headlines?" +
    "country=us&" +
    "apiKey=e8526ab8f30443fd9be16639d051dd48";
  var req = new Request(url);
  fetch(req)
    .then(res => res.json())
    .then(data => {
      gData = data.articles;
      gData.forEach(ci => {
        channelList.push(ci.source.name);
      });
      channelList = [...new Set(channelList)];
      var ichannel = "";
      channelList.forEach(ele => {
        ichannel =
          ichannel +
          `<option value='${ele}'>
          ${ele} 
          </option>`;
      });
      completeData = `<div id="total">`;
      gData.forEach((ele, i) => {
        completeData =
          completeData +
          `<div class="div-content">
          <img class="total-picture" src="${ele.urlToImage}">
          <h2 class="total-heading">
          ${ele.title}
          </h2> 
          <p class="total-date">
          ${ele.publishedAt} 
          </p> 
          <p class="total-content">
          ${ele.description} 
          </p>
          <button id="myBtn" class="total-button" onclick="popUpAll(gData[${i}])" 
          type="button">Continue Reading</button></div>`;
      });
      completeData += `<div id="myModal" class="modal"><div class="modal-content"><div class="modal-header">
         <span onclick="closePopUp()" class="close">&times;</span><h2 id="iHead"></h2></div>
         <div id="popUp_content" class="modal-body"><p>
         </p></div>
         <div class="modal-footer">
        <h3>Till Date</h3></div></div></div></div><div class="side">
        <label class="side-label"><strong>SELECT CATEGORY</strong></label><br />
        <select onchange="select()" id="side-select">
        ${ichannel}
        </select><br /><br />
        <label class="side-label2"><strong>SUBSCRIBE</strong></label><br />
        <input type="text" placeholder="Email Address" size="13" id="side-input">
        <button class="side-button" onclick="validate()" type="button">Subscribe</button>
        </div>`;
      document.getElementById("main").innerHTML = completeData;
    });
};

var select = () => {
  var x = document.getElementById("side-select").value;
  console.log(x);
  console.log(gData[0].source.name);
  var html = "";
  gData.forEach(ele => {
    if (x === ele.source.name) {
      console.log(ele);
      html =
        html +
        `<div class="div-content">
        <img class="total-picture" src="${ele.urlToImage}">
              <h2 class="total-heading">
              ${ele.title}
              </h2>
              <p class="total-date">
              ${ele.publishedAt}
              </p>
              <p class="total-content">
              ${ele.description}
              </p>
              <button id="myBtn" class="total-button" onclick="showPopUp()" type="button">Continue Reading</button><div id="myModal" class="modal"><div class="modal-content"><div class="modal-header">
              <span onclick="closePopUp()" class="close">&times;</span><h2 id="iHead">${
                ele.title
              }</h2></div>
              <div id="popUp_content" class="modal-body"><p>${ele.content}
              </p></div>
              <div class="modal-footer">
              <h3>Till Date</h3></div></div></div></div>`;
      document.getElementById("total").innerHTML = html;
    }
  });
};

var validate = () => {
  emailData = JSON.parse(window.localStorage.getItem("emails"));
  if (emailData == null) {
    var emailData = [];
  }
  var email = document.getElementById("side-input").value;
  if (
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email)
  ) {
    emailData.push(email);
    window.localStorage.setItem("emails", JSON.stringify(emailData));
    alert("You have entered an valid email address!");
    return true;
  } else {
    alert("You have entered an invalid email address!");
    return false;
  }
};

var showPopUp = () => {
  let modal = document.getElementById("myModal");
  modal.style.display = "block";
};

var closePopUp = () => {
  let modal = document.getElementById("myModal");
  modal.style.display = "none";
};
window.onclick = event => {
  modal = document.getElementById("myModal");

  if (event.target == modal) {
    modal.style.display = "none";
  }
};

var popUpAll = i => {
  document.getElementById("popUp_content").innerHTML = i.content;
  document.getElementById("iHead").innerHTML = i.title;
  let modal = document.getElementById("myModal");
  modal.style.display = "block";
};
