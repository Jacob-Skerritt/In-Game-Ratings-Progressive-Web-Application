class GameInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
      if(this.props.players.id !== -1){
    return (
      <div className="gameInfo">
        <div className="home">
          <img alt="Home Crest" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/220px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png" />
          <p>{this.props.players.teams[1].team_name}</p>
        </div>
        <div className="away">
          <img alt="Away Crest" src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png" />
          <p>{this.props.players.teams[0].team_name}</p>
        </div>
        <div className="info">
          <h1>{this.props.players.team1_score}-{this.props.players.team2_score}</h1>
          <p>25:46</p>{" "}
        </div>
      </div>
    );
  }else
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
    <button  id={props.id} className="square" onClick={props.onClick} >
      {props.value}
    </button>
  );
}
class Board extends React.Component {
  renderSquare(i,track) {
    if(this.props.players.id !== -1 && i <4){

      let obj;

      for(let c = 0; c < this.props.players.teams[0].players.length;c++){
        if(this.props.players.teams[0].players[c].position == track)
        {
          obj = this.props.players.teams[0].players[c];
        }
      }
    return (
      <Square value={obj.player_name} id={track}  onClick={() => this.props.onClick(track)} />
    );

  } else if (this.props.players.id !== -1 && i >=4)
  {
    let obj;

    for(let c = 0; c < this.props.players.teams[1].players.length;c++){
      if(this.props.players.teams[1].players[c].position ==10 -(track-11))
      {
        obj = this.props.players.teams[1].players[c];
      }
    }
      return (
            <Square value={obj.player_name} id={track}  onClick={() => this.props.onClick(track)} />
  );
        }
  else{
    return (
      <Square value={0}  onClick={() => this.props.onClick()}/>
    );
  }
  }

  boardButtons(){
    let rows = [];
    let formation = [1,4,3,3,3,3,4,1];
    let track = 0;
    // Outer loop to create parent
    for (let i = 0; i < 8; i++) {
      let buttons = [];

      //Inner loop to create children
      for (let j = 0; j <formation[i]; j++) {
        buttons.push(this.renderSquare(i,track));
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

        {this.boardButtons()}



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
          <GameInfo players={this.state.players}/>
            
            <div className="game">
                <div className="game-board">
                    <Board players={this.state.players}   onClick={(i) => this.handleClick(i)}/>
                </div>
                 
            </div>
        <div className="subs">

            <Subs data={tableData} />
            </div>
            <div className="managers">
            <Managers data={managerData} />

        </div>

            <div>
                    { this.state.isShowing ? <div onClick={this.closeModalHandler}></div> : null }
                    <Modal className="modal" id={this.state.buttonId} vote={(rating ,player_id, match_id) =>
                    this.vote(rating ,player_id, match_id)} show={this.state.isShowing} 
                    close={this.closeModalHandler} players={this.state.players} />
            </div>     
    </div>
    
    
      );
    }else{return (
                
    <div>
            <GameInfo players={this.state.players}/>
        <div className="game">
            <div className="game-board">
                 <Board players={this.state.players}   onClick={(i) => this.handleClick(i)}/>
            </div>
            
        </div>
        <div className="subs">

            <Subs data={tableData} />
            </div>
            <div className="managers">
            <Managers data={managerData} />

        </div>
        <div>
        { this.state.isShowing ? <div onClick={this.closeModalHandler}></div> : null }
                    <Modal className="modal" id={this.state.buttonId} vote={(rating ,player_id, match_id) =>
                    this.vote(rating ,player_id, match_id)} show={this.state.isShowing} 
                    close={this.closeModalHandler} players={this.state.players} />
                            </div>
    </div>
    );}


  }
}

class Modal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      user: 0,
    };

  }

  onChange(e){
      this.setState({user: e.target.value}, function(){

  });}


  render() {


    if(this.props.id !== -1 && this.props.id <= 10){
      let obj;

      for(let i = 0; i < this.props.players.teams[0].players.length;i++){
        if(this.props.players.teams[0].players[i].position == this.props.id)
        {
          obj = this.props.players.teams[0].players[i];
        }
      }
    return(
      <div>
          <div className="modal-wrapper"
              style={{
                  transform: this.props.show ? 'translateY(10vh)' : 'translateY(-110vh)',
                  opacity: this.props.show ? '1' : '0',
                  zIndex: this.props.show ? '1000' : '-1000'
              }}>
              <div className="modal-header">
                  <h3>{obj.player_name}</h3>
                  <span className="close-modal-btn" onClick={this.props.close}>×</span>
              </div>
              <div className="modal-body">
                  <p>
                      Player ID: &nbsp;{obj.id} <br/>
                      Player#: &nbsp;{obj.player_no} <br/>
                     Team: &nbsp;{obj.team_name}<br/>
                      Crowd Rating: &nbsp;{obj.average_rating}<br/><br/>
                      User: &nbsp;
                      <select id="users" onChange={this.onChange.bind(this)}>
                      <option> 0 - No user </option>
                      {this.props.players.users.map(function(user, index){return <option value={user.id}>{user.id} - {user.username}</option> })}
                      </select>
                      <br/><br/>
                      <h3>Rate the Player </h3> <br/><input id="vote" type="text" name="fname"/><br/><br/>
                  </p>
              </div>
              <div className="modal-footer">
                  <button className="btn-cancel" onClick={this.props.close}>CLOSE</button>
                  <button className="btn-continue" onClick={() =>this.props.vote(document.getElementById('vote').value,obj.id, this.props.players.id, this.state.user)}>Vote</button>
              </div>
          </div>
      </div>
    );
  }else if(this.props.id !== -1 && this.props.id > 10){

    let obj;

    for(let i = 0; i < this.props.players.teams[1].players.length;i++){
      if(this.props.players.teams[1].players[i].position == 10 -(this.props.id-11))
      {
        obj = this.props.players.teams[1].players[i];
      }
    }
    return(
      <div>
          <div className="modal-wrapper"
              style={{
                  transform: this.props.show ? 'translateY(10vh)' : 'translateY(-100vh)',
                  opacity: this.props.show ? '1' : '0',
                  zIndex: '1000'
              }}>
              <div className="modal-header">
                  <h3>{obj.player_name}</h3>
                  <span className="close-modal-btn" onClick={this.props.close}>×</span>
              </div>
              <div className="modal-body">
                  <p>
                      Player ID: &nbsp;{obj.id} <br/>
                      Player#: &nbsp;{obj.player_no} <br/>
                      Team: &nbsp;{obj.team_name}<br/>
                      Crowd Rating: &nbsp;{obj.average_rating}<br/><br/>
                        User: &nbsp;
                      <select id="users" onChange={this.onChange.bind(this)}>
                      <option> 0 - No user </option>
                      {this.props.players.users.map(function(user, index){return <option value={user.id}>{user.id} - {user.username}</option> })}
                      </select>
                      <br/><br/>
                      <h3>Rate the Player </h3><br/><input id="vote" type="text" name="fname"/><br/><br/>
                  </p>
              </div>
              <div className="modal-footer">
                  <button className="btn-cancel" onClick={this.props.close}>CLOSE</button>
                  <button className="btn-continue" onClick={() =>this.props.vote(document.getElementById('vote').value,obj.id, this.props.players.id, this.state.user)}>Vote</button>
              </div>
          </div>
      </div>
    );

  }else{
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
