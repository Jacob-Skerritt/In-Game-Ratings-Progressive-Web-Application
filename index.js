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

function Square(props) {
  if(props.userRating.player_id !== -1){
  return (

    <button className="square" id={props.id} onClick={props.onClick} >
      <div>{parseFloat(props.value.average_rating).toFixed(2)} </div>
      <div className ="playerName">{props.value.player_name} </div>
      <button className ="square2" onClick={props.onClick}>{props.userRating.rating} </button>
    </button>

  );}else{
    //If no user rating has been made for this particular player then a button with the default value "0" will be output instead of the a button with the users ratings.
    return (

      <button className="square" id={props.id} onClick={props.onClick} >
        <div>{parseFloat(props.value.average_rating).toFixed(2)}  </div>
        <div className ="playerName">{props.value.player_name} </div>
        <button className ="square2" onClick={props.onClick}>{0} </button>
      </button>

    );
  }
}

//This componenet is responsible for housing all of the "players" (buttons).

class Board extends React.Component {
  renderSquare(i,track) {
          let obj2={player_id: -1};
    if(this.props.players.id !== -1){
      let obj = {id: -1, player_name: "N/A", average_rating: 0, position: -1};


      if( i < 4){
        for(let c = 0; c < this.props.players.teams[0].players.length;c++){
          if(this.props.players.teams[0].players[c].position == track && track < 11)
          {
            obj = this.props.players.teams[0].players[c];
          }
        }
      }else if( i >=4){
        for(let c = 0; c < this.props.players.teams[1].players.length;c++){
          if(this.props.players.teams[1].players[c].position ==10 -(track-11))
          {
            obj = this.props.players.teams[1].players[c];

          }
        }
      }

      if(this.props.players.user_ratings.length > 0){
        for(let c2 =0; c2 < this.props.players.user_ratings.length;c2++){
          if(this.props.players.user_ratings[c2].player_id == obj.id ){
            obj2 = this.props.players.user_ratings[c2];
          }
        }
      }

    return (
      <Square value={obj} userRating={obj2} id={track}  onClick={() => this.props.onClick(obj.id)} />
    );

  }else{
    return (
      <Square value={0}  userRating={obj2} onClick={() => this.props.onClick()}/>
    );
  }
  }

  boardButtons(){
    let rows = [];
    let formation = [1,4,3,3,3,3,4,1];
    let track = 0;
    // Outer loop to create parent
    for (let i = 0; i < 8; i++) {
      let team1 = [];
      let team2=[];


      //Inner loop to create children
      if(i < 4){
      for (let j = 0; j <formation[i]; j++) {
        team1.push(this.renderSquare(i,track));
        track++;
      }
      //Create the parent and add the children
      rows.push(<div className="board-row1">{team1}</div>);

    }else if(i>3){
      for (let j = 0; j <formation[i]; j++) {
        team2.push(this.renderSquare(i,track));
        track++;
      }
      rows.push(<div className="board-row2">{team2}</div>);
    }
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
}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowing: false,
      players: {id:-1},
      buttonId: -1,
      userId: -1,
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
      body: JSON.stringify({id: 1, user_id: this.state.userId})
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
      )
  }

  componentDidMount() {
    this.intervalId = setInterval(() => this.loadData(), 3000);
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
  
  
  vote(rating ,player_id, match_id, user_id){
    fetch('http://mysql02.comp.dkit.ie/D00196117/player_ratings_api/rating/add_rating.php', {
      method:'post',
      header: {
        'Accept' : 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({match_id: match_id, player_id: player_id, rating: rating, user_id: user_id})
    });
    this.setState({
      userId : user_id,
    });
    this.closeModalHandler();
  }
  
  render() {


    if(Object.keys(this.state.players).length !== 0 && this.state.players.id !== -1){
      return (
        <div className="game">
          <GameInfo players={this.state.players}/>
          <div className="game-board">
            <Board players={this.state.players}   onClick={(i) => this.handleClick(i)}/>
          </div>
              <TeamInfo players={this.state.players} onClick={(i) => this.handleClick(i)}/>
              { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }
          <Modal className="modal" id={this.state.buttonId} vote={(rating ,player_id, match_id,user_id) =>this.vote(rating ,player_id, match_id,user_id)} show={this.state.isShowing} close={this.closeModalHandler} players={this.state.players} />    
        </div>
    
    
      );
    }else{return (
                
    <div className="game">
            <GameInfo players={this.state.players}/>
            <div className="game-board">
                 <Board players={this.state.players}   onClick={(i) => this.handleClick(i)}/>
            </div>
   </div>
    
    );}


  }
}

class Modal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      user: -1,
      
    };

  }

  onChange(e){
      this.setState({user: e.target.value}, function(){

  });}


  render() {

    if(this.state.user == -1){
      return(
        <div>
            <div className="modal-wrapper"
                style={{
                    transform: this.props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                <div className="modal-header">
                    <h3>User Selection</h3>
                    <span className="close-modal-btn" onClick={this.props.close}>×</span>
                </div>
                <div className="modal-body">
                    <p>
                        Please Select User -  <br/>
                        User: &nbsp;
                        <select id="users" onChange={this.onChange.bind(this)}>
                        <option> 0 - No User </option>
                        {this.props.players.users.map(function(user, index){return <option value={user.id}>{user.id} - {user.username}</option> })}
                        </select>
                    </p>
                </div>
                <div className="modal-footer">
                </div>
            </div>
        </div>
      );

    }
    else if(this.props.id !== -1){
      let obj = {id: -1, player_name: "N/A", average_rating: 0, position: -1};
     
      
      for(let i = 0; i < this.props.players.teams[0].players.length;i++){
        if(this.props.players.teams[0].players[i].id == this.props.id)
        {
          obj = this.props.players.teams[0].players[i];
        }
      }

      for(let i = 0; i < this.props.players.teams[1].players.length;i++){
        if(this.props.players.teams[1].players[i].id == this.props.id)
        {
          obj = this.props.players.teams[1].players[i];
        }
      }


      
      
    if(obj.id !== -1 && obj.position != -1){
      return(
        <div>
            <div className="modal-wrapper"
                style={{
                    transform: this.props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                <div className="modal-header">
                    <h3>{obj.player_no}. {obj.player_name} <br/></h3>
                    <span className="close-modal-btn" onClick={this.props.close}>×</span>
                </div>
                <div className="modal-body">
                    <p>
                    <img alt="Player" src={obj.player_image}/><br></br>
                    <div className="playerInfo">Club: &nbsp;{obj.team_name} <br/>
                        Crowd Rating:<br/><h3>{parseFloat(obj.average_rating).toFixed(2)}</h3></div>
                        Enter Rating: &nbsp; <input id="vote" type="text" name="fname"/><br/>
                        
                    </p>
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={this.props.close}>CLOSE</button>
                    <button className="btn-continue" onClick={() =>this.props.vote(document.getElementById('vote').value,obj.id, this.props.players.id, this.state.user)}>Vote</button>
                </div>
            </div>
        </div>
      );
    }else if( obj.id !== -1){
      return(
        <div>
            <div className="modal-wrapper"
                style={{
                    transform: this.props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                <div className="modal-header">
                    <h3>{obj.player_no}. {obj.player_name} <br/></h3>
                    <span className="close-modal-btn" onClick={this.props.close}>×</span>
                </div>
                <div className="modal-body">
                    <p>
                    <img alt="Player" src={obj.player_image}/><br></br>
                    <div className="playerInfo">Club: &nbsp;{obj.team_name} <br/>
                        Crowd Rating:<br/><h3>{parseFloat(obj.average_rating).toFixed(2)}</h3></div>
                        Enter Rating: &nbsp; <input id="vote" type="text" name="fname"/><br/>
                        
                    </p>
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={this.props.close}>CLOSE</button>
                </div>
            </div>
        </div>
      );
    }

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
                      Database Error: Contact Admin!
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

}}


class TeamInfo extends React.Component{
  renderListPlayers(team){
    let list=[];


    for(let i =0; i <this.props.players.teams[team].players.length;i++){
      if(this.props.players.teams[team].players[i].position == -1){
        let listId="list" + i;
        list.push(<li  id={listId} onClick={() => this.props.onClick(this.props.players.teams[team].players[i].id)}>{this.props.players.teams[team].players[i].player_name} </li>);
      }
    }

    return list;

  }
  render(){

    return(
      <div id="team-info">

      <div id="team1-info">
      <h2> {this.props.players.teams[0].team_name} Subs </h2>
       <ul >
       {this.renderListPlayers(0)}
       </ul>
       <h2> {this.props.players.teams[0].team_name} Manager </h2>
         <ul><li> {this.props.players.teams[0].manager} </li></ul>
       </div>
      <div id="team2-info">
      <h2> {this.props.players.teams[1].team_name} Subs </h2>
      <ul>
      {this.renderListPlayers(1)}
      </ul>
      <h2> {this.props.players.teams[1].team_name} Manager </h2>
      <ul><li> {this.props.players.teams[1].manager} </li></ul>
      </div>
      </div>


      );
  }
}


// ========================================

ReactDOM.render(<Game />,document.getElementById('root'));
