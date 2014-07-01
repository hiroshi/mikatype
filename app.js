/**
 * @jsx React.DOM
 */
// The above declaration must remain intact at the top of the script.
// Your code here

var MikaTypeApp = React.createClass({
  getInitialState: function() {
    return {c: null};
  },
  _handleKeyDown: function(event) {
    var c = String.fromCharCode(event.keyCode);
    this.setState({c: c});
  },
  _handleKeyUp: function(event) {
    this.setState({c: null});
  },
  render: function() {
    var keys = [
      "1234567890",
      "QWERTYUIOP",
      "ASDFGHJKL",
      "ZXCVBNM"
    ].map(function(row, y) {
      var cols = row.split("").map(function(c, x) {
        var className = "btn key " + ((c == this.state.c) ? "btn-primary" : "btn-default");
        return <button className={className} tabIndex="-1">{c}</button>;
      }.bind(this));
      var rowClasses = "keys-row-" + y;
      return (
        <div className={rowClasses}>
          {cols}
        </div>
      );
    }.bind(this));

    return (
      <div>
        <div className="keyboard" onKeyDown={this._handleKeyDown} onKeyUp={this._handleKeyUp} tabIndex="0">
          {keys}
        </div>
        <p>Click to focus the gray area before typing...</p>
      </div>
    );
  }
});

React.renderComponent(
  <MikaTypeApp />,
  document.getElementById("app")
);
