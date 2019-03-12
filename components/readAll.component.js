var circle = document.createElement("img");
circle.src = "assets/circle.png";
// // // component that contains all the logic and other smaller components
// that form the Read Players view
var ReadPlayersComponent = React.createClass({
    displayName: "ReadPlayersComponent",

    getInitialState: function getInitialState() {
        return {
            players: [],
            teams: []
        };
    },

    // on mount, fetch all players and store them as this component's state
    componentDidMount: function componentDidMount() {

        this.serverRequest = $.get("http://mysql02.comp.dkit.ie/D00196117/player_ratings_api/player/read.php", function (player) {

            this.setState({
                players: player.records
            });
        }.bind(this));
    },

    // on unmount, kill player fetching in case the request is still pending
    componentWillUnmount: function componentWillUnmount() {
        this.serverRequest.abort();
    },

    // render component on the page
    render: function render() {
        // list of players
        var filteredPlayers = this.state.players.map(function (player, i) {
            return React.createElement(Player, {
                key: i,
                player: player });
        }.bind(this));

        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { className: "goal1" },
                React.createElement(
                    "div",
                    { className: "player1" },
                    React.createElement("img", { alt: "Neuer", src: circle, onClick: this.handleShow }),
                    React.createElement(
                        "p",
                        null,
                        filteredPlayers[29]
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "team1" },
                React.createElement(
                    "div",
                    { className: "player2" },
                    React.createElement("img", { alt: "Rafinha", src: circle, onClick: this.handleShow }),
                    React.createElement(
                        "p",
                        null,
                        filteredPlayers[3]
                    )
                ),
                React.createElement(
                    "div",
                    { className: "player3" },
                    React.createElement("img", { alt: "Sule", src: circle, onClick: this.handleShow }),
                    React.createElement(
                        "p",
                        null,
                        filteredPlayers[3]
                    )
                ),
                React.createElement(
                    "div",
                    { className: "player4" },
                    React.createElement("img", { alt: "Hummels", src: circle, onClick: this.handleShow }),
                    React.createElement(
                        "p",
                        null,
                        filteredPlayers[3]
                    )
                ),
                React.createElement(
                    "div",
                    { className: "player5" },
                    React.createElement("img", { alt: "Alaba", src: circle, onClick: this.handleShow }),
                    React.createElement(
                        "p",
                        null,
                        filteredPlayers[3]
                    )
                ),
                React.createElement(
                    "div",
                    { className: "player6" },
                    React.createElement("img", { alt: "Thiago", src: circle, onClick: this.handleShow }),
                    React.createElement(
                        "p",
                        null,
                        filteredPlayers[3]
                    )
                ),
                React.createElement(
                    "div",
                    { className: "player7" },
                    React.createElement("img", { alt: "Rodriguez", src: circle, onClick: this.handleShow }),
                    React.createElement(
                        "p",
                        null,
                        filteredPlayers[3]
                    )
                ),
                React.createElement(
                    "div",
                    { className: "player8" },
                    React.createElement("img", { alt: "Matrinez", src: circle, onClick: this.handleShow }),
                    React.createElement(
                        "p",
                        null,
                        filteredPlayers[3]
                    )
                ),
                React.createElement(
                    "div",
                    { className: "player9" },
                    React.createElement("img", { alt: "Gnabry", src: circle, onClick: this.handleShow }),
                    React.createElement(
                        "p",
                        null,
                        filteredPlayers[3]
                    )
                ),
                React.createElement(
                    "div",
                    { className: "player10" },
                    React.createElement("img", { alt: "Lewandowski", src: circle, onClick: this.handleShow }),
                    React.createElement(
                        "p",
                        null,
                        filteredPlayers[3]
                    )
                ),
                React.createElement(
                    "div",
                    { className: "player11" },
                    React.createElement("img", { alt: "Coman", src: circle, onClick: this.handleShow }),
                    React.createElement(
                        "p",
                        null,
                        filteredPlayers[3]
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "team2" },
                React.createElement(
                    "div",
                    { className: "player12" },
                    React.createElement("img", { alt: "Alisson", src: circle, onClick: this.handleShow }),
                    React.createElement(
                        "p",
                        null,
                        filteredPlayers[3]
                    )
                ),
                React.createElement(
                    "div",
                    { className: "player13" },
                    React.createElement("img", { alt: "Alexander-Arnold", src: circle, onClick: this.handleShow }),
                    React.createElement(
                        "p",
                        null,
                        "Alexander-Arnold"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "player14" },
                    React.createElement("img", { alt: "Lovren", src: circle, onClick: this.handleShow }),
                    React.createElement(
                        "p",
                        null,
                        "Lovren"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "player15" },
                    React.createElement("img", { alt: "Van Dijk", src: circle, onClick: this.handleShow }),
                    React.createElement(
                        "p",
                        null,
                        "Van Dijk"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "player16" },
                    React.createElement("img", { alt: "Robertson", src: circle, onClick: this.handleShow }),
                    React.createElement(
                        "p",
                        null,
                        "Robertson"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "player17" },
                    React.createElement("img", { alt: "Wijnaldum", src: circle, onClick: this.handleShow }),
                    React.createElement(
                        "p",
                        null,
                        "Wijnaldum"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "player18" },
                    React.createElement("img", { alt: "Henderson", src: circle, onClick: this.handleShow }),
                    React.createElement(
                        "p",
                        null,
                        "Henderson"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "player19" },
                    React.createElement("img", { alt: "Keita", src: circle, onClick: this.handleShow }),
                    React.createElement(
                        "p",
                        null,
                        "Keita"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "player20" },
                    React.createElement("img", { alt: "Salah", src: circle, onClick: this.handleShow }),
                    React.createElement(
                        "p",
                        null,
                        filteredPlayers[3]
                    )
                ),
                React.createElement(
                    "div",
                    { className: "player21" },
                    React.createElement("img", { alt: "Firmino", src: circle, onClick: this.handleShow }),
                    React.createElement(
                        "p",
                        null,
                        "Firmino"
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "goal2" },
                React.createElement(
                    "div",
                    { className: "player22" },
                    React.createElement("img", { src: circle, alt: "Mane", onClick: this.handleShow }),
                    React.createElement(
                        "p",
                        null,
                        "Mane"
                    )
                )
            )
        );
    }
});
ReactDOM.render(React.createElement(ReadPlayersComponent, null), document.getElementById('content'));