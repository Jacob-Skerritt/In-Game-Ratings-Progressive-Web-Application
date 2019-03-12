class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      players: []
    };
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
      )
  }
  render() {
   const { error, isLoaded, players } = this.state;
   if (error) {
     return <div>Error: {error.message}</div>;
   } else if (!isLoaded) {
     return <div>Loading...</div>;
   } else {
     return (
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

function Sort(players){
    

    
}

// ========================================

ReactDOM.render(<MyComponent />,document.getElementById('root'));