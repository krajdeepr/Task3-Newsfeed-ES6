import { View } from "./view.js";

export class Controller {
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

  validate = () => {
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

  closePopUp = () => {
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
  };
  popUpAll = ele => {
    document.getElementById("popUp_content").innerHTML = ele.content;
    document.getElementById("iHead").innerHTML = ele.source.name;
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
    document
      .getElementById("myModal")
      .addEventListener("click", this.closePopUp);
  };
}
