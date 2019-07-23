import { Controller } from "./controller.js";
export class Model {
  constructor() {
    this.gData = [];
    this.channelList = ["ALL"];
    this.url =
      "https://newsapi.org/v2/top-headlines?" +
      "language=en&country=in&category=sports&" +
      "apiKey=e8526ab8f30443fd9be16639d051dd48";
    this.req = new Request(this.url);
    this.fetch_Data(this.req);
  }

  async fetch_Data(req) {
    this.showLoader();
    await fetch(req)
      .then(res => res.json())
      .then(data => {
        this.gData = data.articles;
        this.fetch_Channels();
      })
      .catch(error => {
        console.log(error);
      });
    this.closeLoader();
    new Controller(this);
  }

  fetch_Channels = () => {
    this.gData.forEach(ci => {
      this.channelList.push(ci.source.name);
    });
    this.channelList = [...new Set(this.channelList)];
  };
  showLoader = () => {
    document.getElementById("main").innerHTML = `<div class="loader"></div>`;
    document.querySelector(".loader").style.display = "block";
  };
  closeLoader = () => {
    document.querySelector(".loader").style.display = "none";
  };
}
