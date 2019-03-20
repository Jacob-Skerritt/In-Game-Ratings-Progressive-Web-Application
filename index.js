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
    <button className="square" id={props.id} onClick={props.onClick} >
      {props.value}
    </button>
  );
}
class Board extends React.Component {
  renderSquare(i,track) {
    if(this.props.players.id !== -1){
    return (
      <Square value={this.props.players.teams[0].players[track].player_name} id={track}  onClick={() => this.props.onClick(track)} />
    );
  } else {
    return (
      <Square value={0}  onClick={() => this.props.onClick()}/>
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
      for (let j = 0; j < 3; j++) {
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
      <Square value={this.props.players.teams[1].players[track].player_name} id={track}  onClick={() => this.props.onClick(track)} />
    );
  } else {
    return (
      <Square value={0}  onClick={() => this.props.onClick()}/>
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
      for (let j = 0; j < 3; j++) {
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
      isShowing: false,
      players: {id:-1},
      buttonId: -1,
    };
  }


    openModalHandler = () => {
        this.setState({
            isShowing: true
        });
    }

    closeModalHandler = () => {
        this.setState({
            isShowing: false
        });
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
    
    this.setState({
        isShowing: true,
        buttonId: i,
    });
  }
  vote(rating ,player_id, match_id){
    fetch('http://mysql02.comp.dkit.ie/D00196117/player_ratings_api/rating/add_rating.php', {
      method:'post',
      header: {
        'Accept' : 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({match_id: match_id, player_id: player_id, rating: rating, user_id: 2})
    });
  }
  
  render() {


    if(Object.keys(this.state.players).length !== 0 && this.state.players.id !== -1){
      return (
<div>
            <GameInfo/>
                <div className="game">

        <div>
               { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }
               <Modal className="modal" id={this.state.buttonId} vote={(rating ,player_id, match_id) =>this.vote(rating ,player_id, match_id)}show={this.state.isShowing} close={this.closeModalHandler} players={this.state.players}/>
        </div>

          <div className="game-board">
            <Board players={this.state.players}   onClick={(i) => this.handleClick(i)}/>
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

class Modal extends React.Component{

  render() {
    if(this.props.id !== -1){
    return(
      <div>
          <div className="modal-wrapper"
              style={{
                  transform: this.props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                  opacity: this.props.show ? '1' : '0'
              }}>
              <div className="modal-header">
                  <h3>Modal Header</h3>
                  <span className="close-modal-btn" onClick={this.props.close}>×</span>
              </div>
              <div className="modal-body">
                  <p>
                      Player#: &nbsp;{this.props.players.teams[0].players[this.props.id].id} <br/>
                      Player Name: &nbsp;{this.props.players.teams[0].players[this.props.id].player_name} <br/>
                      Crowd Rating: &nbsp;{this.props.players.teams[0].players[this.props.id].average_rating}<br/>
                      Enter Rating: &nbsp; <input id="vote" type="text" name="fname"/><br/>
                  </p>
              </div>
              <div className="modal-footer">
                  <button className="btn-cancel" onClick={this.props.close}>CLOSE</button>
                  <button className="btn-continue" onClick={() =>this.props.vote(document.getElementById('vote').value,this.props.players.teams[0].players[this.props.id].id, this.props.players.id)}>Vote</button>
              </div>
          </div>
      </div>
    );
  }
  else{
    return(
      <div>
          <div className="modal-wrapper"
              style={{
                  transform: this.props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                  opacity: this.props.show ? '1' : '0'
              }}>
              <div className="modal-header">
                  <h3>Modal Header</h3>
                  <span className="close-modal-btn" onClick={this.props.close}>×</span>
              </div>
              <div className="modal-body">
                  <p>
                      ??
                  </p>
              </div>
              <div className="modal-footer">
                  <button className="btn-cancel" onClick={this.props.close}>CLOSE</button>
                  <button className="btn-continue">CONTINUE</button>
              </div>
          </div>
      </div>
    );
    }

}};


// ========================================

ReactDOM.render(<Game />,document.getElementById('root'));
