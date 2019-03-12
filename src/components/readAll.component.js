var circle = document.createElement("img");
circle.src = "assets/circle.png";
// // // component that contains all the logic and other smaller components
// that form the Read Players view
var ReadPlayersComponent = React.createClass({
    getInitialState: function () {
        return {
            players: [],
            teams: []
        };
    },

    // on mount, fetch all players and store them as this component's state
    componentDidMount: function () {

        this.serverRequest = $.get("http://mysql02.comp.dkit.ie/D00196117/player_ratings_api/player/read.php", function (player) {
            
            this.setState({
                players: player.records
            });
        }.bind(this));
    },

    // on unmount, kill player fetching in case the request is still pending
    componentWillUnmount: function () {
        this.serverRequest.abort();
        
    },
    

    // render component on the page
    render: function () {
        // list of players
        var filteredPlayers = this.state.players
                .map(function (player, i) {
                    return (
                            <PlayerName
                                key={i}
                                player={player}
                                        />
                            );
                }.bind(this));
        
        return(
                
                <div>
                
                    <div className="goal1" >
                        <div className="player1">
                            <img alt="Neuer" src={circle} onClick={this.handleShow}/>
                            <p>{filteredPlayers[29]}</p>
                            
                        </div>
                    </div>
                    <div className="team1">            
                    <div className="player2">
                        <img alt="Rafinha" src={circle} onClick={this.handleShow}/>
                        <p>{filteredPlayers[3]}</p>
                
                    </div>
                
                    <div className="player3">
                        <img alt="Sule" src={circle} onClick={this.handleShow}/>
                        <p>{filteredPlayers[3]}</p>
                    </div> 
                
                    <div className="player4">
                        <img alt="Hummels" src={circle} onClick={this.handleShow}/>
                        <p>{filteredPlayers[3]}</p>
                    </div>
                
                    <div className="player5">
                        <img alt="Alaba" src={circle} onClick={this.handleShow} />
                        <p>{filteredPlayers[3]}</p>
                    </div>
                
                    <div className="player6">
                        <img alt="Thiago" src={circle} onClick={this.handleShow}/>
                        <p>{filteredPlayers[3]}</p>
                    </div>
                
                    <div className="player7">
                        <img alt="Rodriguez" src={circle} onClick={this.handleShow}/>
                        <p>{filteredPlayers[3]}</p>
                    </div>
                
                    <div className="player8">
                        <img alt="Matrinez" src={circle} onClick={this.handleShow}/>
                        <p>{filteredPlayers[3]}</p>
                    </div>
                
                    <div className="player9">
                        <img alt="Gnabry" src={circle} onClick={this.handleShow}/>
                        <p>{filteredPlayers[3]}</p>
                    </div>
                
                    <div className="player10">
                        <img  alt="Lewandowski" src={circle} onClick={this.handleShow}/>
                        <p>{filteredPlayers[3]}</p>
                    </div>
                
                    <div className="player11">
                        <img alt="Coman" src={circle}onClick={this.handleShow}/>
                        <p>{filteredPlayers[3]}</p>
                    </div>
                    </div>
                    <div className="team2">
                    <div className="player12">
                        <img alt="Alisson" src={circle} onClick={this.handleShow}/>
                        <p>{filteredPlayers[3]}</p>
                    </div>
                
                    <div className="player13">
                        <img alt="Alexander-Arnold" src={circle} onClick={this.handleShow}/>
                        <p>Alexander-Arnold</p>
                    </div>
                
                    <div className="player14">
                        <img alt="Lovren" src={circle} onClick={this.handleShow}/>
                        <p>Lovren</p>
                    </div>
                
                    <div className="player15">
                        <img alt="Van Dijk" src={circle} onClick={this.handleShow}/>
                        <p>Van Dijk</p>
                    </div>
                
                    <div className="player16">
                        <img alt="Robertson" src={circle} onClick={this.handleShow}/>
                        <p>Robertson</p>
                    </div>
                
                    <div className="player17">
                        <img alt="Wijnaldum" src={circle} onClick={this.handleShow}/>
                        <p>Wijnaldum</p>
                    </div>
                
                    <div className="player18">
                        <img alt="Henderson" src={circle} onClick={this.handleShow}/>
                        <p>Henderson</p>
                    </div>
                
                    <div className="player19">
                        <img alt="Keita" src={circle} onClick={this.handleShow}/>
                        <p>Keita</p>
                    </div>
                
                    <div className="player20">
                        <img alt="Salah" src={circle} onClick={this.handleShow}/>
                        <p>{filteredPlayers[3]}</p>
                    </div>
                
                    <div className="player21">
                        <img alt="Firmino" src={circle} onClick={this.handleShow}/>
                        <p>Firmino</p>
                    </div>
                    </div>
                    <div className="goal2">
                    <div className="player22">
                        <img src={circle} alt="Mane" onClick={this.handleShow}/>
                        <p>Mane</p>
                    </div>
                    </div>
                    
                </div>
                );
    }
});
ReactDOM.render(
        <ReadPlayersComponent />,
        document.getElementById('content')
        );
