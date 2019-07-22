export class View {
  constructor(Cnt) {
    this.Controller = Cnt;
    this.gData = [];
    this.channelList = [];
    this.all();
  }
  all = () => {
    this.header();
    this.footer();
    this.body();
  };

  header = () => {
    var html = `<h1 id="news-heading1">NEWSFEED</h1><h6 id="news-heading2"><i>Yet another newsfeed</i></h6><label class="side-label2"><strong>SUBSCRIBE</strong></label><br />
                <input type="text" placeholder="Email Address" size="13" id="side-input">
                <button class="side-button" id="validateEvent" type="button">Subscribe</button>`;
    document.getElementById("news").innerHTML = html;
    document.getElementById("validateEvent").addEventListener("click", () => {
      this.Controller.validate();
    });
  };

  footer = () => {
    var html = `<p class="foot-text">&copy;NewsFeed 2019</p>`;
    document.getElementById("foot").innerHTML = html;
  };

  body = () => {
    var completeData = "";
    var halfData = "";
    var ichannel = "";
    this.Controller.getChannels().forEach(ele => {
      ichannel =
        ichannel +
        `<option value='${ele}'>
            ${ele} 
            </option>`;
    });
    completeData = `<div id="total">`;
    this.Controller.getData().forEach((ele, i) => {
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
            <button id="myBtn${i}" class="total-button"
            type="button">Continue Reading</button></div>`;
    });
    completeData += `<div id="myModal" class="modal"><div class="modal-content"><div class="modal-header">
        <span id="closePopUp" class="close">&times;</span><h2 id="iHead"></h2></div>
        <div id="popUp_content" class="modal-body"><p>
        </p></div>
        <div class="modal-footer">
        <h3>Till Date</h3></div></div></div></div>
        <div class="side">
          <label class="side-label" ><strong>SELECT CATEGORY</strong></label><br />
          <select id="side-select">
          ${ichannel}
          </select><br /><br />
        </div>`;
    document.getElementById("main").innerHTML = completeData;

    document.getElementById("side-select").addEventListener("change", () => {
      select();
    });
    this.Controller.getData().forEach((ele, i) => {
      document.getElementById(`myBtn${i}`).addEventListener("click", () => {
        this.Controller.popUpAll(ele);
      });
    });
    document.getElementById(`closePopUp`).addEventListener("click", () => {
      this.Controller.closePopUp();
    });
    var select = () => {
      var x = document.getElementById("side-select").value;
      if (x === "ALL") {
        this.Controller.getData().forEach((ele, i) => {
          halfData =
            halfData +
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
                <button id="myBtn${i}" class="total-button"
                type="button">Continue Reading</button></div>`;
        });
        halfData += `<div id="myModal" class="modal"><div class="modal-content"><div class="modal-header">
          <span id="closePopUp" class="close">&times;</span><h2 id="iHead"></h2></div>
          <div id="popUp_content" class="modal-body"><p>
          </p></div>
          <div class="modal-footer">
          <h3>Till Date</h3></div></div></div></div>`;
        document.getElementById("total").innerHTML = halfData;
        this.Controller.getData().forEach((ele, i) => {
          document.getElementById(`myBtn${i}`).addEventListener("click", () => {
            this.Controller.popUpAll(ele);
          });
        });
        document.getElementById(`closePopUp`).addEventListener("click", () => {
          this.Controller.closePopUp();
        });
      }
      var html = "";
      let index = 0;
      let elemArray = [];
      this.Controller.getData().forEach((ele, i) => {
        if (x === ele.source.name) {
          elemArray.push(ele);

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
                     <button id="myBtn${index}" class="total-button"  type="button">Continue Reading</button>
                     <div id="myModal" class="modal"><div class="modal-content"><div class="modal-header">
                     <span id="closePopUp" class="close">&times;</span><h2 id="iHead"></h2></div>
                     <div id="popUp_content" class="modal-body"><p>
                     </p></div>
                     <div class="modal-footer">
                     <h3>Till Date</h3></div></div></div></div>`;
          document.getElementById("total").innerHTML = html;
          index++;
        }
      });
      document.getElementById("side-select").addEventListener("change", () => {
        select();
      });
      for (let k = 0; k < elemArray.length; k++) {
        document.getElementById(`myBtn${k}`).addEventListener("click", () => {
          this.Controller.popUpAll(elemArray[k]);
        });
      }
      document.getElementById(`closePopUp`).addEventListener("click", () => {
        this.Controller.closePopUp();
      });
    };
  };
}
