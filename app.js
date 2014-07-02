/**
 * @jsx React.DOM
 */
// The above declaration must remain intact at the top of the script.
// Your code here


var Keyboard = React.createClass({
  render: function() {
    var keys = [
      "1234567890",
      "QWERTYUIOP",
      "ASDFGHJKL",
      "ZXCVBNM"
    ].map(function(row, y) {
      var cols = row.split("").map(function(c, x) {
        var highlighted = (this.props.highlightKeys.indexOf(c) != -1);
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
        return <button key={c} className={className} disabled={!highlighted} tabIndex="-1">{c}</button>;
      }.bind(this));
      var rowClasses = "keys-row-" + y;
      return (
        <div key={y} className={rowClasses}>
          {cols}
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
    return {inputChar: null};
  },
  componentWillMount: function() {
    this._chooseKey();
  },
  _chooseKey: function() {
    var keys = "ASDFJKL".replace(this.state.lastChar, "");
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
  render: function() {
    return (
      <div onKeyDown={this._handleKeyDown} onKeyUp={this._handleKeyUp} tabIndex="0">
        <h2>{this.state.lastChar}</h2>
        <Keyboard
          inputChar={this.state.inputChar}
          wrongChar={this.state.wrongChar}
          highlightKeys={"ASDFJKL;"}
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
