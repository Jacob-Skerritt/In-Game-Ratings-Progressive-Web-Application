class GameInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
      if(this.props.players.id !== -1){
    return (
      <div className="gameInfo">
        <div className="home">
          <img alt="Home Crest" src={this.props.players.teams[1].crest} />
          <p>{this.props.players.teams[1].team_name}</p>
        </div>
        <div className="away">
          <img alt="Away Crest" src={this.props.players.teams[0].crest} />
          <p>{this.props.players.teams[0].team_name}</p>
        </div>
        <div className="info">
          <h1>{this.props.players.team1_score}-{this.props.players.team2_score}</h1>
          <p>{this.props.players.match_elapsed_time}</p>{" "}
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

    let output;
    
        if(props.value.average_rating === 0){
        output = false;
    }
    else{
        output = true;
    }
    
    if(props.value.id === props.specialPlayers[0][0] && props.specialPlayers[0][0] !== -1 ){

        return(
                <div  id="star-player" onClick={props.onClick}>
        <img src="star1.png" id="star-player-image" />
                
                        
      { output
      ?<div className="average1">{parseFloat(props.value.average_rating).toFixed(1)} </div>
      :<div className="average1"> {"N/A"} </div>}
      <div className ="playerName1">{props.value.player_name} </div>
      { props.userRating.rating 
      ?  <button className ="square2" onClick={props.onClick}>{props.userRating.rating} </button>
      :  <button className ="square2" onClick={props.onClick}>{"-"} </button>}
     
                </div>
                );
        
    }else if( props.specialPlayers[1][0] != -1 && props.value.id === props.specialPlayers[1][0]){

        return(
                <div  id="trash-player" onClick={props.onClick}>
        <img src="trashcan.png" id="trash-player-image" />
                
           { output
      ?<div className="average1">{parseFloat(props.value.average_rating).toFixed(1)} </div>
      :<div className="average1"> {"N/A"} </div>}
      <div className ="playerName1">{props.value.player_name} </div>
      { props.userRating.rating 
      ?  <button className ="square2" onClick={props.onClick}>{props.userRating.rating} </button>
      :  <button className ="square2" onClick={props.onClick}>{"-"} </button>}
     
                </div>
                );
        
    }else if(props.userRating.player_id !== -1){
      
     
  return (

    <button className={props.class} id={props.id} onClick={props.onClick} >
         { output
      ?<div className="average1">{parseFloat(props.value.average_rating).toFixed(1)} </div>
      :<div className="average1"> {"N/A"} </div>}
      <div className ="playerName">{props.value.player_name} </div>
      <button className ="square2" onClick={props.onClick}>{props.userRating.rating} </button>
    </button>

  );}else{
    //If no user rating has been made for this particular player then a button with the default value "0" will be output instead of the a button with the users ratings.
    return (

      <button className={props.class} id={props.id} onClick={props.onClick} >
            { output
      ?<div className="average1">{parseFloat(props.value.average_rating).toFixed(1)} </div>
      :<div className="average1"> {"N/A"} </div>}
        <div className ="playerName">{props.value.player_name} </div>
        <button className ="square2" onClick={props.onClick}>{"-"} </button>
      </button>

    );
  }
}

//This componenet is responsible for housing all of the "players" (buttons).

class Board extends React.Component {
  renderSquare(i,track) {
       let obj2={player_id: -1};
       let teamClass;
    if(this.props.players.id !== -1){
      let obj = {id: -1, player_name: "N/A", average_rating: 0, position: -1};


      if( i < 4){
        for(let c = 0; c < this.props.players.teams[1].players.length;c++){
          if(this.props.players.teams[1].players[c].position == track && track < 11)
          {
            obj = this.props.players.teams[1].players[c];
          }
        }
        teamClass = "team1-players";
      }else if( i >=4){
        for(let c = 0; c < this.props.players.teams[0].players.length;c++){
          if(this.props.players.teams[0].players[c].position ==10 -(track-11))
          {
            obj = this.props.players.teams[0].players[c];

          }
        }
        teamClass ="team2-players";
      }

      if(this.props.players.user_ratings.length > 0){
        for(let c2 =0; c2 < this.props.players.user_ratings.length;c2++){
          if(this.props.players.user_ratings[c2].player_id == obj.id ){
            obj2 = this.props.players.user_ratings[c2];
          }
        }
      }

    return (
      <Square value={obj} userRating={obj2} id={track} class={teamClass} specialPlayers={this.props.specialPlayers} onClick={() => this.props.onClick(obj.id)} />
    );

  }else{
    return (
      <Square value={0}  userRating={obj2} id={track} class={teamClass} specialPlayers={this.props.specialPlayers} onClick={() => this.props.onClick()}/>
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
      let id = "team-row-id-"+i;


      //Inner loop to create children
      if(i < 4){
      for (let j = 0; j <formation[i]; j++) {
        team1.push(this.renderSquare(i,track));
        track++;
      }
      //Create the parent and add the children
      rows.push(<div id={id} className="board-row1">{team1}</div>);

    }else if(i>3){
      for (let j = 0; j <formation[i]; j++) {
        team2.push(this.renderSquare(i,track));
        track++;
      }
      rows.push(<div id={id} className="board-row2">{team2}</div>);
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



class GameOver extends React.Component{
    

    render(){

        return(                
            <div className="gameOver-board">
                  <div className="gameOverText">
                  <h1>Game over!</h1>
                  <h2>{this.props.players.teams[1].team_name} Vs {this.props.players.teams[0].team_name}</h2>
                  <h1>&nbsp;&nbsp;{this.props.players.team2_score}:{this.props.players.team1_score}</h1>
                  <h3>Thank you for rating players in this match, we look forward to you joining us again.</h3>
                  
                  </div>
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
      body: JSON.stringify({id: 2, user_id: this.state.userId})
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
    this.intervalId = setInterval(() => this.loadData(), 1000);
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
    
    setTimeout(function() {this.closeModalHandler();}.bind(this), 1500);
  }
  
  specialPlayers(){
      let max = 0;
      let min = 6.2;
      let starPlayer = [];
      let trashPlayer = [];
      let specialPlayers=[];
      
      if(this.state.players.id !== -1){
      for(let i = 0; i< this.state.players.teams.length; i++){
          
          for(let c =0; c<this.state.players.teams[i].players.length; c++){
              
              if(this.state.players.teams[i].players[c].average_rating >= max){
                  max = this.state.players.teams[i].players[c].average_rating;
              }
              
              if(min > this.state.players.teams[i].players[c].average_rating && this.state.players.teams[i].players[c].average_rating !==0 ){
                  min = this.state.players.teams[i].players[c].average_rating;
              }
              
          }
      }
      
      
       for(let i =0;i< this.state.players.teams.length;i++){
          
          for(let c = 0; c<this.state.players.teams[i].players.length; c++){
              
              if(max < 6 && this.state.players.teams[i].players[c].average_rating ===0 && this.state.players.teams[i].players[c].position >=0){
                  starPlayer.push(this.state.players.teams[i].players[c].id);
              }
              else if(this.state.players.teams[i].players[c].average_rating === max){
                  starPlayer.push(this.state.players.teams[i].players[c].id);
              }
              
              if(this.state.players.teams[i].players[c].average_rating === min){
                  trashPlayer.push(this.state.players.teams[i].players[c].id);
              }
          }

      }
  }
      
      if(starPlayer.length > 0){
          specialPlayers[0] = starPlayer;
      }else 
      {
          specialPlayers.push([-1]);
      }
      
      if(trashPlayer.length > 0){
          specialPlayers[1] = trashPlayer;
      }else 
      {
          specialPlayers.push([-1]);
      }
      
      return specialPlayers;
  }
  
  
  
  
  render() {
      
            if(this.state.players.match_elapsed_time === "fin"){
           return (
                   <GameOver players={this.state.players}/>);            
        }else{

    if(Object.keys(this.state.players).length !== 0 && this.state.players.id !== -1){
      return (
        <div className="game">
          <GameInfo players={this.state.players}/>
          <div className="game-board">
            <Board players={this.state.players}  specialPlayers={this.specialPlayers()}  onClick={(i) => this.handleClick(i)}/>
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
                 <Board players={this.state.players}  specialPlayers={this.specialPlayers()} onClick={(i) => this.handleClick(i)}/>
            </div>
   </div>
    
    );}
        }

  }
}

class Modal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      user: -1,
      selectedOption: "6",
      display: true   
    };

  }
  
    changeDisplay(obj){
      this.setState({
          display: false,
      });
      this.props.vote(this.state.selectedOption,obj.id, this.props.players.id, this.state.user);
      setTimeout(function() {this.setState({display: true})}.bind(this), 2500);
 
  }
  
  handleOptionChange = changeEvent => {
  this.setState({
    selectedOption: changeEvent.target.value
  });
};

  onChange(e){
      this.setState({user: e.target.value}, function(){

  });}
  
 
  
getPlayerRating(obj){
    let playerRating =0;
        if(this.props.user_ratings.length>0){
            for(let i = 0; i < this.props.user_ratings.length;i++){
            if(this.props.user_ratings[i].player_id == obj.id)
            {
              playerRating = this.props.players.user_ratings[i].rating;
            }
          }
        }
      return playerRating;
}


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
                        <div>&nbsp;</div>
                        User: &nbsp;
                        <select id="users" onChange={this.onChange.bind(this)}>
                        <option> 0 - No User </option>
                        {this.props.players.users.map(function(user, index){return <option value={user.id}>{user.id} - {user.username}</option> })}
                        </select>
                    </p>
                </div>
                
            </div>
        </div>
      );

    }
    else if(this.props.id !== -1 && this.state.display === true){
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

if(obj.average_rating === 0){
          obj.average_rating =6;
      }
      
      
    if(obj.id !== -1 && obj.position != -1){
        
        
        let currentRating = 0;
      
      if(this.props.players.user_ratings.length >0){
      for(let i = 0; i < this.props.players.user_ratings.length;i++){
          if (this.props.players.user_ratings[i].player_id == obj.id){
              currentRating = this.props.players.user_ratings[i].rating;
          }
      }
      
  }
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
                    <img alt="Player" src={obj.player_image}/><br/>
                    <div className="playerInfo">Club: &nbsp;{obj.team_name} <br/>
                    
                    Crowd Rating:<div className="crowdRating"><h1>{parseFloat(obj.average_rating).toFixed(1)}</h1></div></div>             
                    </p>
                    <h2>Your Rating: {currentRating}</h2>
                    <h3 class="h3Custom">Enter New Rating:</h3>
                    <br/>
                    <div className="ratePlayersDiv">
  <div className="form-check">
  
    <label class="container">
        1
      <input type="radio" name="react-tips" id="button1" value="1"  onChange={this.handleOptionChange} className="form-check-input" />
      <span class="checkmark"></span>
    </label>
  </div>

  <div className="form-check">
    <label class="container">
     2
      <input type="radio" name="react-tips" value="2" onChange={this.handleOptionChange} className="form-check-input" />
      <span class="checkmark"></span>
      </label>
  </div>

  <div className="form-check">
    <label class="container">
          3
      <input type="radio" name="react-tips" value="3" onChange={this.handleOptionChange} className="form-check-input"/>
      <span class="checkmark"></span>
      </label>
  </div>
  
    <div className="form-check">
   <label class="container">
          4
      <input type="radio" name="react-tips" value="4" onChange={this.handleOptionChange} className="form-check-input"/>
      <span class="checkmark"></span>
      </label>
  </div>
  
    <div className="form-check">
    <label class="container">
          5
      <input type="radio" name="react-tips" value="5"  onChange={this.handleOptionChange} className="form-check-input"/>
      <span class="checkmark"></span>
      </label>
  </div>
  <br class="rwd-break" /><br class="rwd-break" />
  
    <div className="form-check">
    <label class="container">
          6
      <input type="radio" name="react-tips" value="6"  onChange={this.handleOptionChange} className="form-check-input"/>
      <span class="checkmark"></span>
      </label>
  </div>
  
    <div className="form-check">
    <label class="container">
          7
      <input type="radio" name="react-tips" value="7"  onChange={this.handleOptionChange} className="form-check-input"/>
      <span class="checkmark"></span>
      </label>
  </div>
  
    <div className="form-check">
    <label class="container">
          8
    
      <input type="radio" name="react-tips" value="8"  onChange={this.handleOptionChange} className="form-check-input"/>
      <span class="checkmark"></span>
      </label>
  </div>
  
    <div className="form-check">
    <label class="container">
          9
    
      <input type="radio" name="react-tips" value="9"  onChange={this.handleOptionChange} className="form-check-input"/>
      <span class="checkmark"></span>
      </label>
  </div>
  
    <div className="form-check">
    <label class="container">
          10
    
      <input type="radio" name="react-tips" value="10"  onChange={this.handleOptionChange} className="form-check-input"/>
      <span class="checkmark"></span>
      </label>
  </div>
  </div>
  


                    

                </div>
                 
                <div className="modal-footer">
                    <button className="btn-continue" onClick={() =>this.changeDisplay(obj)}>Submit</button>
                </div>
            </div>
            
        </div>
      );
    }else if( obj.id !== -1 && this.state.display === true){
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
                        Crowd Rating:<br/><h2>{parseFloat(obj.average_rating).toFixed(1)}</h2></div>
                    </p>
                </div>
                <div className="modal-footer">
                </div>
            </div>
        </div>
      );
    }

  }else if(this.state.display != true){
      
            return(
        <div>
            <div className="modal-wrapper"
                style={{
                    transform: this.props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                <div className="modal-header">
                    <span className="close-modal-btn" onClick={this.props.close}>×</span>
                </div>
                <div className="modal-body">
                <br />
                <h1>Rating complete!</h1>
                <br /><br />
                <h2>Please rate more players!</h2>
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
      <h3> {this.props.players.teams[1].team_name}</h3>
      <ul>
      {this.renderListPlayers(1)}
       </ul>
       <h3>Managers</h3>
         <ul><li> {this.props.players.teams[1].manager} </li></ul>
       </div>
      <div id="team2-info">
      <h3> {this.props.players.teams[0].team_name}</h3>
      <ul>
      {this.renderListPlayers(0)}
      </ul>
      <h3> &nbsp; </h3>
      <ul><li> {this.props.players.teams[0].manager} </li></ul>
      </div>
      </div>

      );
  }
}


// ========================================

ReactDOM.render(<Game />,document.getElementById('root'));
