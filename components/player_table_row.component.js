// component that renders a single player
window.PlayerName = React.createClass({
    displayName: "PlayerName",


    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { className: "Player", onClick: this.handleShow },
                this.props.player.player_name
            )
        );
    }
});