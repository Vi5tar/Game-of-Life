'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var board = {
  backgroundColor: 'gray',
  width: 192,
  height: 192
};

var livingCell = {
  width: 10,
  height: 10,
  margin: 1,
  backgroundColor: 'red',
  display: 'inline-block',
  float: 'left'
};

var deadCell = {
  width: 10,
  height: 10,
  margin: 1,
  backgroundColor: 'black',
  display: 'inline-block',
  float: 'left'
};

var Tile = function (_React$Component) {
  _inherits(Tile, _React$Component);

  function Tile(props) {
    _classCallCheck(this, Tile);

    var _this = _possibleConstructorReturn(this, (Tile.__proto__ || Object.getPrototypeOf(Tile)).call(this, props));

    _this.state = {
      status: 'Dead'
    };
    return _this;
  }

  _createClass(Tile, [{
    key: 'render',
    value: function render() {
      if (this.state.status === 'Alive') {
        return React.createElement('div', { style: livingCell });
      } else {
        return React.createElement('div', { style: deadCell });
      }
    }
  }]);

  return Tile;
}(React.Component);

;

var Board = function (_React$Component2) {
  _inherits(Board, _React$Component2);

  function Board(props) {
    _classCallCheck(this, Board);

    return _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this, props));
  }

  _createClass(Board, [{
    key: 'render',
    value: function render() {
      var boardCreate = [];
      for (var x = 0; x < 16; x++) {
        for (var y = 0; y < 16; y++) {
          boardCreate.push(React.createElement(Tile, null));
        }
      }
      return React.createElement(
        'div',
        { style: board },
        boardCreate
      );
    }
  }]);

  return Board;
}(React.Component);

ReactDOM.render(React.createElement(Board, null), document.getElementById("lifeGame"));