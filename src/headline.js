export class Headline {
  constructor() {
    this.gData;
    this.completeData = "";
    this.getHeadlines();
  }
  getHeadlines() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=e8526ab8f30443fd9be16639d051dd48";
    let req = new Request(url);
    fetch(req)
      .then(res => res.json())
      .then(data => {
        this.gData = data.articles;

        data.articles.forEach(ele => {
          this.completeData += `<div class="modal-content">
        <div id="headline_content" class="modal-body">${
          ele.title
        }<hr><a href="${ele.url}">Read More</a></div>
        </div>`;
        });
        console.log(document.getElementById("myHeadline")); //Test-Set up Babel to remove all console.log() in production mode.
        document.getElementById("myHeadline").innerHTML = this.completeData;
        let modal = document.getElementById("myHeadline");
        modal.style.display = "block";
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        };
      })
      .catch(error => {
        console.log(error);
      });
  }
}
