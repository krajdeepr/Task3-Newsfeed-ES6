"use strict";

var _model = require("./model.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function App() {
  _classCallCheck(this, App);

  new _model.Model();
};

new App();
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controller = void 0;

var _view = require("./view.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Controller = function Controller(Md) {
  var _this = this;

  _classCallCheck(this, Controller);

  _defineProperty(this, "getData", function () {
    return _this.Model.gData;
  });

  _defineProperty(this, "getChannels", function () {
    return _this.Model.channelList;
  });

  _defineProperty(this, "validate", function () {
    emailData = JSON.parse(window.localStorage.getItem("emails"));

    if (emailData == null) {
      var emailData = [];
    }

    var email = document.getElementById("side-input").value;

    if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email)) {
      emailData.push(email);
      window.localStorage.setItem("emails", JSON.stringify(emailData));
      alert("You have entered an valid email address!");
      return true;
    } else {
      alert("You have entered an invalid email address!");
      return false;
    }
  });

  _defineProperty(this, "closePopUp", function () {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  });

  _defineProperty(this, "popUpAll", function (ele) {
    document.getElementById("popUp_content").innerHTML = ele.content;
    document.getElementById("iHead").innerHTML = ele.source.name;
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    document.getElementById("myModal").addEventListener("click", _this.closePopUp);
  });

  this.Model = Md;
  new _view.View(this);
};

exports.Controller = Controller;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Headline = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Headline =
/*#__PURE__*/
function () {
  function Headline() {
    _classCallCheck(this, Headline);

    this.gData;
    this.completeData = '';
    this.getHeadlines();
  }

  _createClass(Headline, [{
    key: "getHeadlines",
    value: function getHeadlines() {
      var _this = this;

      console.log("hello");
      var url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=e8526ab8f30443fd9be16639d051dd48";
      var req = new Request(url);
      fetch(req).then(function (res) {
        return res.json();
      }).then(function (data) {
        _this.gData = data.articles;
        console.log(data.articles);
        data.articles.forEach(function (ele) {
          _this.completeData += "<div class=\"modal-content\">\n        <div id=\"headline_content\" class=\"modal-body\">".concat(ele.title, "<hr><a href=\"").concat(ele.url, "\">Read More</a></div>\n        </div>");
        });
        document.getElementById("myHeadline").innerHTML = _this.completeData;
        var modal = document.getElementById("myHeadline");
        modal.style.display = "block";

        window.onclick = function (event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        };
      }).catch(function (error) {
        console.log(error);
      });
    }
  }]);

  return Headline;
}();

exports.Headline = Headline;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Model = void 0;

var _controller = require("./controller.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Model =
/*#__PURE__*/
function () {
  function Model() {
    var _this = this;

    _classCallCheck(this, Model);

    _defineProperty(this, "fetch_Channels", function () {
      _this.gData.forEach(function (ci) {
        _this.channelList.push(ci.source.name);
      });

      _this.channelList = _toConsumableArray(new Set(_this.channelList));
    });

    _defineProperty(this, "showLoader", function () {
      document.getElementById("main").innerHTML = "<div class=\"loader\"></div>";
      document.querySelector(".loader").style.display = "block";
    });

    _defineProperty(this, "closeLoader", function () {
      document.querySelector(".loader").style.display = "none";
    });

    this.gData = [];
    this.channelList = ["ALL"];
    this.url = "https://newsapi.org/v2/top-headlines?" + "language=en&country=in&category=sports&" + "apiKey=e8526ab8f30443fd9be16639d051dd48";
    this.req = new Request(this.url);
    this.fetch_Data(this.req);
  }

  _createClass(Model, [{
    key: "fetch_Data",
    value: function () {
      var _fetch_Data = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req) {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.showLoader();
                _context.next = 3;
                return fetch(req).then(function (res) {
                  return res.json();
                }).then(function (data) {
                  _this2.gData = data.articles;

                  _this2.fetch_Channels();
                }).catch(function (error) {
                  console.log(error);
                });

              case 3:
                this.closeLoader();
                new _controller.Controller(this);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetch_Data(_x) {
        return _fetch_Data.apply(this, arguments);
      }

      return fetch_Data;
    }()
  }]);

  return Model;
}();

exports.Model = Model;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = void 0;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var View = function View(Cnt) {
  var _this = this;

  _classCallCheck(this, View);

  _defineProperty(this, "all", function () {
    _this.header();

    _this.footer();

    _this.body();
  });

  _defineProperty(this, "header", function () {
    var html = "<h1 id=\"news-heading1\">NEWSFEED</h1><h6 id=\"news-heading2\"><i>Yet another newsfeed</i></h6><label class=\"side-label2\"><strong>SUBSCRIBE</strong></label><br />\n                <input type=\"text\" placeholder=\"Email Address\" size=\"13\" id=\"side-input\">\n                <button class=\"side-button\" id=\"validateEvent\" type=\"button\">Subscribe</button>";
    document.getElementById("news").innerHTML = html;
    document.getElementById("validateEvent").addEventListener("click", function () {
      _this.Controller.validate();
    });
  });

  _defineProperty(this, "footer", function () {
    var html = "<p class=\"foot-text\">&copy;NewsFeed 2019</p>";
    document.getElementById("foot").innerHTML = html;
  });

  _defineProperty(this, "body", function () {
    var completeData = "";
    var ichannel = "";

    _this.Controller.getChannels().forEach(function (ele) {
      ichannel += "<option value='".concat(ele, "'>\n            ").concat(ele, " \n            </option>");
    });

    completeData = "<div id=\"entire\"><div id=\"total\"><div id=\"myHeadline\" class=\"modal\"></div>";

    _this.Controller.getData().forEach(function (ele, i) {
      completeData += "<div class=\"div-content\">\n            <img class=\"total-picture\" src=\"".concat(ele.urlToImage, "\">\n            <h2 class=\"total-heading\">\n            ").concat(ele.title, "\n            </h2> \n            <p class=\"total-date\">\n            ").concat(ele.publishedAt, " \n            </p> \n            <p class=\"total-content\">\n            ").concat(ele.description, " \n            </p>\n            <button id=\"myBtn").concat(i, "\" class=\"total-button\"\n            type=\"button\">Continue Reading</button></div>");
    });

    completeData += "<div id=\"myModal\" class=\"modal\"><div class=\"modal-content\"><div class=\"modal-header\">\n        <span id=\"closePopUp\" class=\"close\">&times;</span><h2 id=\"iHead\"></h2></div>\n        <div id=\"popUp_content\" class=\"modal-body\"></div>\n        <div class=\"modal-footer\">\n        <h3>Till Date</h3></div></div></div></div>\n        <div class=\"side\">\n          <label class=\"side-label\" ><strong>SELECT CATEGORY</strong></label><br />\n          <select id=\"side-select\">\n          ".concat(ichannel, "\n          </select><br /><br />\n        </div><div>\n        <button id=\"headBtn\" class=\"head-button\"\n        type=\"button\">Headlines</button>\n        </div>\n        </div>");
    document.getElementById("main").innerHTML = completeData;
    document.getElementById("side-select").addEventListener("change", function () {
      select();
    });

    _this.Controller.getData().forEach(function (ele, i) {
      document.getElementById("myBtn".concat(i)).addEventListener("click", function () {
        _this.Controller.popUpAll(ele);
      });
    });

    document.getElementById("headBtn").addEventListener("click", function () {
      Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./headline.js'));
      }).then(function (module) {
        new module.Headline();
      });
    });
    document.getElementById("closePopUp").addEventListener("click", function () {
      _this.Controller.closePopUp();
    });

    var select = function select() {
      var x = document.getElementById("side-select").value;

      if (x === "ALL") {
        var halfData = "";

        _this.Controller.getData().forEach(function (ele, i) {
          halfData += "<div class=\"div-content\">\n                <img class=\"total-picture\" src=\"".concat(ele.urlToImage, "\">\n                <h2 class=\"total-heading\">\n                ").concat(ele.title, "\n                </h2> \n                <p class=\"total-date\">\n                ").concat(ele.publishedAt, " \n                </p> \n                <p class=\"total-content\">\n                ").concat(ele.description, " \n                </p>\n                <button id=\"myBtn").concat(i, "\" class=\"total-button\"\n                type=\"button\">Continue Reading</button></div>");
        });

        halfData += "<div id=\"myModal\" class=\"modal\"><div class=\"modal-content\"><div class=\"modal-header\">\n          <span id=\"closePopUp\" class=\"close\">&times;</span><h2 id=\"iHead\"></h2></div>\n          <div id=\"popUp_content\" class=\"modal-body\"></div>\n          <div class=\"modal-footer\">\n          <h3>Till Date</h3></div></div></div>";
        document.getElementById("total").innerHTML = halfData;

        _this.Controller.getData().forEach(function (ele, i) {
          document.getElementById("myBtn".concat(i)).addEventListener("click", function () {
            _this.Controller.popUpAll(ele);
          });
        });

        document.getElementById("closePopUp").addEventListener("click", function () {
          _this.Controller.closePopUp();
        });
      }

      var html = "";
      var index = 0;
      var elemArray = [];

      _this.Controller.getData().forEach(function (ele, i) {
        if (x === ele.source.name) {
          elemArray.push(ele);
          html = html + "<div class=\"div-content\">\n               <img class=\"total-picture\" src=\"".concat(ele.urlToImage, "\">\n                     <h2 class=\"total-heading\">\n                     ").concat(ele.title, "\n                     </h2>\n                     <p class=\"total-date\">\n                     ").concat(ele.publishedAt, "\n                     </p>\n                     <p class=\"total-content\">\n                     ").concat(ele.description, "\n                     </p>\n                     <button id=\"myBtn").concat(index, "\" class=\"total-button\"  type=\"button\">Continue Reading</button>\n                     <div id=\"myModal\" class=\"modal\"><div class=\"modal-content\"><div class=\"modal-header\">\n                     <span id=\"closePopUp\" class=\"close\">&times;</span><h2 id=\"iHead\"></h2></div>\n                     <div id=\"popUp_content\" class=\"modal-body\"><p>\n                     </p></div>\n                     <div class=\"modal-footer\">\n                     <h3>Till Date</h3></div></div></div></div>");
          document.getElementById("total").innerHTML = html;
          index++;
        }
      });

      var _loop = function _loop(k) {
        document.getElementById("myBtn".concat(k)).addEventListener("click", function () {
          _this.Controller.popUpAll(elemArray[k]);
        });
      };

      for (var k = 0; k < elemArray.length; k++) {
        _loop(k);
      }

      document.getElementById("closePopUp").addEventListener("click", function () {
        _this.Controller.closePopUp();
      });
    };

    document.getElementById("side-select").addEventListener("change", function () {
      select();
    });
  });

  this.Controller = Cnt;
  this.all();
};

exports.View = View;
