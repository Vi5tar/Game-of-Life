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

var _pause = 0;

var LivingTile = function (_React$Component) {
  _inherits(LivingTile, _React$Component);

  function LivingTile(props) {
    _classCallCheck(this, LivingTile);

    return _possibleConstructorReturn(this, (LivingTile.__proto__ || Object.getPrototypeOf(LivingTile)).call(this, props));
  }

  _createClass(LivingTile, [{
    key: 'render',
    value: function render() {
      return React.createElement('div', { style: livingCell });
    }
  }]);

  return LivingTile;
}(React.Component);

;

var DeadTile = function (_React$Component2) {
  _inherits(DeadTile, _React$Component2);

  function DeadTile(props) {
    _classCallCheck(this, DeadTile);

    return _possibleConstructorReturn(this, (DeadTile.__proto__ || Object.getPrototypeOf(DeadTile)).call(this, props));
  }

  _createClass(DeadTile, [{
    key: 'render',
    value: function render() {
      return React.createElement('div', { style: deadCell });
    }
  }]);

  return DeadTile;
}(React.Component);

;

var Board = function (_React$Component3) {
  _inherits(Board, _React$Component3);

  function Board(props) {
    _classCallCheck(this, Board);

    var _this3 = _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this, props));

    _this3.state = {
      status: []
    };
    _this3.addStatus = _this3.addStatus.bind(_this3);
    _this3.createStatus = _this3.createStatus.bind(_this3);
    _this3.clearStatus = _this3.clearStatus.bind(_this3);
    _this3.changeStatus = _this3.changeStatus.bind(_this3);
    _this3.pause = _this3.pause.bind(_this3);
    return _this3;
  }

  _createClass(Board, [{
    key: 'changeStatus',
    value: function changeStatus() {
      var blap = this.state.status;
      for (var i = 0; i < this.state.status.length; i++) {
        var random1 = Math.random() > .5;
        if (random1) {
          blap[i] = 'Alive';
        } else {
          blap[i] = 'Dead';
        }
      }
      this.setState({
        status: blap
      });
    }
  }, {
    key: 'addStatus',
    value: function addStatus() {
      var blip = this.state.status;
      var random = Math.random() > .5;
      if (random) {
        blip.push('Alive');
      } else {
        blip.push('Dead');
      }
      this.setState({ status: blip });
    }
  }, {
    key: 'createStatus',
    value: function createStatus() {
      if (this.state.status.length == 0) {
        for (var x = 0; x < 16; x++) {
          for (var y = 0; y < 16; y++) {
            this.addStatus();
          }
        }
      } else {
        this.changeStatus();
      }
    }
  }, {
    key: 'clearStatus',
    value: function clearStatus() {
      this.setState({ status: [] });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (_pause === 0) {
        setTimeout(this.changeStatus, 1000);
      }
    }
  }, {
    key: 'pause',
    value: function pause() {
      if (_pause === 0) {
        _pause = 1;
      } else {
        _pause = 0;
        this.changeStatus();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var boardCreate = this.state.status.map(function mapper(thing, index) {
        if (thing === 'Alive') {
          return React.createElement(LivingTile, null);
        } else {
          return React.createElement(DeadTile, null);
        }
      });
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { style: board },
          boardCreate
        ),
        React.createElement(
          'button',
          { onClick: this.createStatus },
          'Go'
        ),
        React.createElement(
          'button',
          { onClick: this.clearStatus },
          'Clear'
        ),
        React.createElement(
          'button',
          { onClick: this.pause },
          'Pause'
        )
      );
    }
  }]);

  return Board;
}(React.Component);

ReactDOM.render(React.createElement(Board, null), document.getElementById("lifeGame"));