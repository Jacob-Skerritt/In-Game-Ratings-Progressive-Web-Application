class GameInfo extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <div className="gameInfo">
        <div className="home">
          <img alt="Home Crest" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/220px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png" />
          <p>Bayern Munich</p>
        </div>
        <div className="away">
          <img alt="Away Crest" src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png" />
          <p>Liverpool</p>
        </div>
        <div className="info">
          <h1>0-0</h1>
          <p>25:46</p>{" "}
        </div>
      </div>
    );
  }
}
class Subs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var dataColumns = this.props.data.columns;
    var dataRows = this.props.data.rows;

    var tableHeaders = (
      <thead>
        <tr>
          {dataColumns.map(function(column) {
            return <th>{column}</th>;
          })}
        </tr>
      </thead>
    );

    var tableBody = dataRows.map(function(row) {
      return (
        <tr>
          {dataColumns.map(function(column) {
            return <td>{row[column]}</td>;
          })}
        </tr>
      );
    });
    return (
      <table className="subs">
        {tableHeaders}
        {tableBody}
      </table>
    );
  }
}

var tableData = {
  columns: ["Bayern Munich", "Liverpool"],
  rows: [
    {
      "Bayern Munich": "Ulreich",
      Liverpool: "Mignolet"
    },
    {
      "Bayern Munich": "Hummels",
      Liverpool: "Milner"
    },
    {
      "Bayern Munich": "Shabani",
      Liverpool: "Fabinho"
    },
    {
      "Bayern Munich": "Jeong",
      Liverpool: "Lallana"
    },
    {
      "Bayern Munich": "Mai L",
      Liverpool: "Shaqiri"
    },
    {
      "Bayern Munich": "Sanches",
      Liverpool: "Sturridge"
    },
    {
      "Bayern Munich": "Davies",
      Liverpool: "Origi"
    }
  ]
};

class Managers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var dataColumns = this.props.data.columns;
    var dataRows = this.props.data.rows;

    var tableHeaders = (
      <thead>
        <tr>
          {dataColumns.map(function(column) {
            return <th>{column}</th>;
          })}
        </tr>
      </thead>
    );

    var tableBody = dataRows.map(function(row) {
      return (
        <tr>
          {dataColumns.map(function(column) {
            return <td>{row[column]}</td>;
          })}
        </tr>
      );
    });
    return (
      <table className="managers">
        {tableHeaders}
        {tableBody}
      </table>
    );
  }
}

var managerData = {
  columns: ["Managers", " "],
  rows: [
    {
      Managers: "N.Kovac",
      " ": "J.Klopp"
    }
  ]
};
function Square(props) {
  return (
    <button className="square"  >
      {props.value}
    </button>
  );
}
class Board extends React.Component {
  renderSquare(i,track) {
    if(this.props.players.id !== -1){
    return (
            
      <Square value={this.props.players.teams[0].players[track].player_name}   />

    );
  } else {
    return (
      <Square value={0}  />
    );
  }
  }

  boardButtons(){
    let rows = [];
    let count = 0;
    let track = 0;
    // Outer loop to create parent
    for (let i = 0; i < 3; i++) {
      let buttons = [];

      //Inner loop to create children
      for (let j = 0; j < 5; j++) {
        buttons.push(this.renderSquare(count,track));
        count++;
        track++;
      }
      //Create the parent and add the children
      rows.push(<div className="board-row">{buttons}</div>);
    }
    return rows;

  }
  
  renderSquare2(i,track) {
    if(this.props.players.id !== -1){
    return (
            
      <Square value={this.props.players.teams[1].players[track].player_name}  />

    );
  } else {
    return (
      <Square value={0}  />
    );
  }
  }

  boardButtons2(){
    let rows = [];
    let count = 0;
    let track = 0;
    // Outer loop to create parent
    for (let i = 0; i < 3; i++) {
      let buttons = [];

      //Inner loop to create children
      for (let j = 0; j < 5; j++) {
        buttons.push(this.renderSquare2(count,track));
        count++;
        track++;
      }
      //Create the parent and add the children
      rows.push(<div className="board-row">{buttons}</div>);
    }
    return rows;

  }
  render() {
    return (
      <div>
          <div className="team1">
        {this.boardButtons()}
        </div>
        <div  className="team2">
        {this.boardButtons2()}
        </div>

      </div>
    );
  }
};

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      position: Array(9).fill(null),
      players: {id:-1}
    };
  }


  loadData(){
    fetch('http://mysql02.comp.dkit.ie/D00196117/player_ratings_api/match/all_match_data.php', {
      method:'post',
      header: {
        'Accept' : 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: 1})
    }).then(res => res.json())
      .then((result) => {
          this.setState({ players: result});
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

  componentDidMount() {
    this.intervalId = setInterval(() => this.loadData(), 5000);
    this.loadData();
  }

  componentWillUnmount() {
  clearInterval(this.interval);
}

  handleClick(i) {

  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    if(Object.keys(this.state.players).length !== 0 && this.state.players.id !== -1){
      return (
<div>
            <GameInfo/>
        <div className="game">
            <div className="game-board">
                <Board players={this.state.players} />
            </div>
            <div className="game-info">
          
            </div>
        </div>
        <div className="subs">

            <Subs data={tableData} />
            </div>
            <div className="managers">
            <Managers data={managerData} />

        </div>
    </div>
      );
    }else{return (
                
    <div>
            <GameInfo/>
        <div className="game">
            <div className="game-board">
                <Board players={this.state.players} />
            </div>
            <div className="game-info">
          
            </div>
        </div>
        <div className="subs">

            <Subs data={tableData} />
            </div>
            <div className="managers">
            <Managers data={managerData} />

        </div>
    </div>
    );}


  }
}



// ========================================

ReactDOM.render(<Game />,document.getElementById('root'));
