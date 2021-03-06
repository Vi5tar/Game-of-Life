'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var board = {
  width: 384, // set to boardDims * 12
  height: 384, // set to boardDims * 12
  margin: 'auto'
};

var livingCell = {
  width: 10,
  height: 10,
  margin: 1,
  borderRadius: 5,
  backgroundColor: '#F0FB8F', //F0FB8F EEF98D
  display: 'inline-block',
  float: 'left'
};

var deadCell = {
  width: 10,
  height: 10,
  margin: 1,
  //backgroundColor: 'black',
  display: 'inline-block',
  float: 'left'
};

var _pause = 0;
var delayOneSec;

var LivingTile = function (_React$Component) {
  _inherits(LivingTile, _React$Component);

  function LivingTile(props) {
    _classCallCheck(this, LivingTile);

    return _possibleConstructorReturn(this, (LivingTile.__proto__ || Object.getPrototypeOf(LivingTile)).call(this, props));
  }

  _createClass(LivingTile, [{
    key: 'render',
    value: function render() {
      return React.createElement('div', {
        style: livingCell,
        onClick: this.props.func });
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
      return React.createElement('div', {
        style: deadCell,
        onClick: this.props.func });
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
      status: [],
      genCount: 0,
      boardDims: 32
    };
    _this3.createStatus = _this3.createStatus.bind(_this3);
    _this3.changeStatus = _this3.changeStatus.bind(_this3);
    _this3.clearStatus = _this3.clearStatus.bind(_this3);
    _this3.pause = _this3.pause.bind(_this3);
    _this3.resume = _this3.resume.bind(_this3);
    _this3.cellClick = _this3.cellClick.bind(_this3);
    _this3.nextGeneration = _this3.nextGeneration.bind(_this3);
    return _this3;
  }

  _createClass(Board, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.createStatus();
      delayOneSec = setTimeout(this.nextGeneration, 1000);
    }

    // checks for living cells.

  }, {
    key: 'allDead',
    value: function allDead() {
      for (var a = 0; a < this.state.status.length; a++) {
        for (var b = 0; b < this.state.status[a].length; b++) {
          if (this.state.status[a][b] == 'Alive') {
            return false;
          }
        }
      }
    }

    //initializes status by randomly assigning Alive or Dead to all the cells

  }, {
    key: 'createStatus',
    value: function createStatus() {
      if (this.state.status.length == 0) {
        var arr = this.state.status;
        for (var x = 0; x < this.state.boardDims; x++) {
          arr.push([]);
          for (var y = 0; y < this.state.boardDims; y++) {
            var random = Math.random() > .5;
            if (random) {
              arr[x].push('Alive');
            } else {
              arr[x].push('Dead');
            }
          }
        }
        this.setState({ status: arr });
      } else {
        this.changeStatus();
      }
    }

    //re randomizes the cells status

  }, {
    key: 'changeStatus',
    value: function changeStatus() {
      var blap = this.state.status;
      for (var i = 0; i < blap.length; i++) {
        for (var y = 0; y < blap[i].length; y++) {
          var random1 = Math.random() > .5;
          if (random1) {
            blap[i][y] = 'Alive';
          } else {
            blap[i][y] = 'Dead';
          }
        }
      }
      this.setState({ status: blap });
    }

    //assigns all cells status to "Dead"

  }, {
    key: 'clearStatus',
    value: function clearStatus() {
      var statusArr = [];

      for (var i = 0; i < this.state.status.length; i++) {
        statusArr[i] = this.state.status[i].slice();
      }

      for (var k = 0; k < statusArr.length; k++) {
        for (var n = 0; n < statusArr[k].length; n++) {
          statusArr[k][n] = 'Dead';
        }
      }

      this.setState({ status: statusArr, genCount: 0 });
      this.pause();
    }

    //pauses the game

  }, {
    key: 'pause',
    value: function pause() {
      if (_pause === 0) {
        clearTimeout(delayOneSec);
        _pause = 1;
      }
    }

    //resumes the game

  }, {
    key: 'resume',
    value: function resume() {
      if (_pause === 1) {
        _pause = 0;
        this.nextGeneration();
      }
    }

    //takes the "location"/indexes of a cell as an argument and updates the cells
    //status from alive to dead and vice versa

  }, {
    key: 'cellClick',
    value: function cellClick(id) {
      var location = id.split(" ");
      var statusArr = [];

      //clones state.status to statusArr
      for (var i = 0; i < this.state.status.length; i++) {
        statusArr[i] = this.state.status[i].slice();
      }

      //Changes the status of the clicked cell in statusArr.
      if (statusArr[location[0]][location[1]] == "Alive") {
        statusArr[location[0]][location[1]] = "Dead";
      } else if (statusArr[location[0]][location[1]] == "Dead") {
        statusArr[location[0]][location[1]] = "Alive";
      }

      //updates state.status to statusArr
      this.setState({ status: statusArr });
    }

    //determines what the next generation will look like

  }, {
    key: 'nextGeneration',
    value: function nextGeneration() {
      var statusArr = this.state.status.slice();
      var updatedArr = [];

      //clones statusArr into updatedArr
      for (var i = 0; i < statusArr.length; i++) {
        updatedArr[i] = statusArr[i].slice();
      }

      //gets the status of the cells neighbors
      for (var y = 0; y < statusArr.length; y++) {
        for (var x = 0; x < statusArr[y].length; x++) {
          // top row neighbors
          if (y == 0) {
            var neighborStatus = [statusArr[y][x - 1], statusArr[y][x + 1], statusArr[y + 1][x - 1], statusArr[y + 1][x], statusArr[y + 1][x + 1]];
            updatedArr[y][x] = this.gameRules(neighborStatus, statusArr[y][x]);
            // bottom row neighbors
          } else if (y == statusArr.length - 1) {
            var neighborStatus = [statusArr[y - 1][x - 1], statusArr[y - 1][x], statusArr[y - 1][x + 1], statusArr[y][x - 1], statusArr[y][x + 1]];
            updatedArr[y][x] = this.gameRules(neighborStatus, statusArr[y][x]);
            // all other neighbors
          } else {
            var neighborStatus = [statusArr[y - 1][x - 1], statusArr[y - 1][x], statusArr[y - 1][x + 1], statusArr[y][x - 1], statusArr[y][x + 1], statusArr[y + 1][x - 1], statusArr[y + 1][x], statusArr[y + 1][x + 1]];
            updatedArr[y][x] = this.gameRules(neighborStatus, statusArr[y][x]);
          }
        }
      }

      this.setState({ status: updatedArr });
      if (_pause === 0 && this.allDead() === false) {
        this.setState({ genCount: this.state.genCount + 1 });
        delayOneSec = setTimeout(this.nextGeneration, 1000);
      }
    }

    //applies the game's rules

  }, {
    key: 'gameRules',
    value: function gameRules(neighborStatusArgument, cell) {
      //counts the living neighbors
      var tempCell = '';
      var livingNeighborCount = 0;

      for (var i = 0; i < neighborStatusArgument.length; i++) {
        if (neighborStatusArgument[i] == 'Alive') {
          livingNeighborCount++;
        }
      }

      //applies the game's rules and updates the tempCell's status accordingly
      if (cell == 'Dead' && livingNeighborCount == 3) {
        tempCell = 'Alive';
      } else if (cell == 'Alive' && (livingNeighborCount < 2 || livingNeighborCount > 3)) {
        tempCell = 'Dead';
      }

      //if a change occured returns the change. if not returns original value
      if (tempCell == '') {
        return cell;
      } else {
        return tempCell;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      //creates the board by mapping state.status. binds the indexes as an
      //argument to pass to the cellClick function. that way clicking a cell will
      //do something unique to the cell that was clicked.
      var boardCreate = this.state.status.map(function (thing, index) {
        return thing.map(function (thing2, index2) {
          if (thing2 === 'Alive') {
            return React.createElement(LivingTile, { key: index + " " + index2, func: _this4.cellClick.bind(_this4, index + " " + index2) });
          } else {
            return React.createElement(DeadTile, { key: index + " " + index2, func: _this4.cellClick.bind(_this4, index + " " + index2) });
          }
        });
      });
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { id: 'generation' },
          'Generation: ',
          this.state.genCount
        ),
        React.createElement(
          'div',
          { style: board },
          boardCreate
        ),
        React.createElement(
          'button',
          { type: 'button', className: 'btn btn-dark', onClick: this.resume },
          'Run'
        ),
        React.createElement(
          'button',
          { type: 'button', className: 'btn btn-dark', onClick: this.clearStatus },
          'Clear'
        ),
        React.createElement(
          'button',
          { type: 'button', className: 'btn btn-dark', onClick: this.pause },
          'Pause'
        )
      );
    }
  }]);

  return Board;
}(React.Component);

ReactDOM.render(React.createElement(Board, null), document.getElementById("lifeGame"));