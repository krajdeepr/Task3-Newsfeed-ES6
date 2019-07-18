class Controller {
  constructor(Md) {
    this.Model = Md;
    new View(this);
  }

  getData = () => {
    return this.Model.gData;
  };

  getChannels = () => {
    return this.Model.channelList;
  };
}
