'use strict';

const p = React.createElement;

class Player extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            error: null,
            isLoaded: false,
            players: []
        };
    }

    handleClose() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }
    componentDidMount() {
        fetch("http://localhost:1234/player_ratings_api/player/read.php")
                .then(res => res.json())
                .then(
                        (result) => {
                    this.setState({
                        isLoaded: true,
                        players: result.records
                    });
                },
                        // Note: it's important to handle errors here
                                // instead of a catch() block so that we don't swallow
                                        // exceptions from actual bugs in components.
                                                (error) => {
                                            this.setState({
                                                isLoaded: true,
                                                error
                                            });
                                        }
                                        );
                            }
  render() {
   const { error, isLoaded, players } = this.state;
   if (error) {
     return <div>Error: {error.message}</div>;
   } else if (!isLoaded) {
     return <div>Loading...</div>;
   } else {
     return p(
       <ul>
         {players.map(player => (
           <li key={player.id}>
             {player.player_name} {player.player_no}
           </li>
         ))}
       </ul>
     );
   }
 }
 }
                        

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(p(Player), domContainer);