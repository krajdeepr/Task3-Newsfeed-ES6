class Model {
  constructor() {
    this.gData = [];
    this.channelList = [];
    this.url =
      "https://newsapi.org/v2/top-headlines?" +
      "country=us&" +
      "apiKey=e8526ab8f30443fd9be16639d051dd48";
    this.req = new Request(this.url);

    this.fetch_Data(this.req);
  }

  fetch_Data = req => {
    fetch(req)
      .then(res => res.json())
      .then(data => {
        this.gData = data.articles;
        this.fetch_Channels();
        new Controller(this);
      });
  };

  fetch_Channels = () => {
    this.gData.forEach(ci => {
      this.channelList.push(ci.source.name);
    });
    this.channelList = [...new Set(this.channelList)];
  };
}
