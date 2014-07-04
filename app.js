/**
 * @jsx React.DOM
 */
// The above declaration must remain intact at the top of the script.
// Your code here


var rowKeys = [
  "1234567890",
  "QWERTYUIOP",
  "ASDFGHJKL;",
  "ZXCVBNM,./"
];

var Keyboard = React.createClass({
  render: function() {
    var keys = rowKeys.map(function(keys, row) {
      var cols = keys.split("").map(function(c, col) {
        var disabled = !this.props.rows[row];
        var highlighted = "ASDFJKL;".split("").indexOf(c) != -1;
        var className = "btn kbd-key ";
        if (c == this.props.wrongChar) {
          className += "btn-danger";
        } else if (c == this.props.inputChar) {
          className += "btn-primary";
        } else if (highlighted) {
          className += "btn-info";
        } else {
          className += "btn-default";
        }
        return <button key={c} className={className} disabled={disabled} tabIndex="-1">{c}</button>;
      }.bind(this));
      var rowClasses = "keys-row keys-row-" + row;
      return (
        <div key={row} className={rowClasses}>
          <input type="checkbox" checked={this.props.rows[row]} onChange={this.props.toggleRow} value={row} />
          <span className="keys">{cols}</span>
        </div>
      );
    }.bind(this));

    return (
      <div className="keyboard" tabIndex="0">
        {keys}
      </div>
    );
  }
});

var MikaTypeApp = React.createClass({
  getInitialState: function() {
    var rows = [false, false, true, false];
    return {inputChar: null, rows: rows, count: 0, timer: 30, started: false};
  },
  componentWillMount: function() {
    this._chooseKey();
  },
  _chooseKey: function() {
    var keys = "";
    this.state.rows.forEach(function(enabled, row) {
      if (enabled) {
        keys += rowKeys[row];
      }
    });
    keys = keys.replace(this.state.lastChar, "");
    var index = Math.floor(Math.random() * keys.length);
    var c = keys.split("")[index];
    this.setState({lastChar: c});
  },
  _handleKeyDown: function(event) {
    //console.log("keyCode: " + event.keyCode);
    var c = {
      186: ";",
      188: ",",
      190: ".",
      191: "/",
    }[event.keyCode];
    if (c == undefined) {
      c = String.fromCharCode(event.keyCode);
    }
    this.setState({inputChar: c});
    var count = this.state.count;
    if (c == this.state.lastChar) {
      count += 1;
      this._chooseKey();
      this.setState({wrongChar: null});
    } else {
      count -= 1;
      this.setState({wrongChar: c});
    }
    if (this.state.timer > 0) {
      this.setState({count: count});
    }
    if (!this.state.started) {
      this.setState({started: true});
      setInterval(function() {
        var timer = this.state.timer;
        if (timer > 0) {
          this.setState({timer: timer - 1});
        }
      }.bind(this), 1000);
    }
  },
  _handleKeyUp: function(event) {
    this.setState({inputChar: null});
  },
  toggleRow: function(event) {
    var rows = this.state.rows;
    rows[Number(event.target.value)] = event.target.checked;
    console.log(rows);
    this.setState({rows: rows});
  },
  render: function() {
    var lastKeyClasses = "btn last-key " + (this.state.timer < 1 ? "btn-danger" : "btn-default");
    return (
      <div className="col-xs-12" onKeyDown={this._handleKeyDown} onKeyUp={this._handleKeyUp} tabIndex="0">
        <div className="row header">
          <button className={lastKeyClasses}>
            {this.state.lastChar}
          </button>
          <div className="col-xs-2 counter">
            timer: {this.state.timer}<br/>
            count: {this.state.count}
          </div>
        </div>
        <div className="row">
          <Keyboard
            inputChar={this.state.inputChar}
            wrongChar={this.state.wrongChar}
            rows={this.state.rows}
            toggleRow={this.toggleRow}
          />
        </div>
      </div>
    );
  }
});

React.renderComponent(
  <MikaTypeApp />,
  document.getElementById("app")
);
