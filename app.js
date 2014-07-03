/**
 * @jsx React.DOM
 */
// The above declaration must remain intact at the top of the script.
// Your code here


var rowKeys = [
  "1234567890",
  "QWERTYUIOP",
  "ASDFGHJKL",
  "ZXCVBNM"
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
    return {inputChar: null, rows: rows};
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
    var c = String.fromCharCode(event.keyCode);
    this.setState({inputChar: c});
    if (c == this.state.lastChar) {
      this.setState({wrongChar: null})
      this._chooseKey();
    } else {
      this.setState({wrongChar: c})
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
    return (
      <div onKeyDown={this._handleKeyDown} onKeyUp={this._handleKeyUp} tabIndex="0">
        <h2>{this.state.lastChar}</h2>
        <Keyboard
          inputChar={this.state.inputChar}
          wrongChar={this.state.wrongChar}
          rows={this.state.rows}
          toggleRow={this.toggleRow}
        />
        <p>Click to focus the gray area before typing...</p>
      </div>
    );
  }
});

React.renderComponent(
  <MikaTypeApp />,
  document.getElementById("app")
);
