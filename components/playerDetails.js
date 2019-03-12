// component that renders a single player
window.PlayerDetails = React.createClass({
  displayName: "PlayerDetails",
  constructor: function constructor() {

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  },
  handleClose: function handleClose() {
    this.setState({ show: false });
  },
  handleShow: function handleShow() {
    this.setState({ show: true });
  },

  render: function render() {
    return React.createElement(
      Modal,
      { show: this.state.show, onHide: this.handleClose },
      React.createElement(
        Modal.Title,
        null,
        "Player Name"
      ),
      React.createElement(
        Modal.Body,
        null,
        "Player Rating"
      ),
      React.createElement(
        Modal.Footer,
        null,
        React.createElement(
          Button,
          { variant: "secondary", onClick: this.handleClose },
          "Close"
        )
      )
    );
  }
});