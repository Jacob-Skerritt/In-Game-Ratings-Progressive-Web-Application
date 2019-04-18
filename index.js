class CountdownTimer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            time:180,
        }
    }
    
    timeCountdown(){
        
        this.state.time = this.state.time -1;
    }
    
    render(){
        let countdown = false;
        
        if(this.state.time > 0){
            countdown = true;
            setInterval(this.timeCountdown(),1000);
        }
        
      let minutes = Math.floor(this.state.time/60);
      let seconds = Math.floor(this.state.time%60);

      let elapsed_time;


        if(minutes >= 10 && seconds >= 10){
          elapsed_time = minutes + ":" + seconds;
        }else if(minutes > 10 && seconds < 10){
          elapsed_time = minutes + ":" + "0" + seconds ;
        } else if(minutes < 10 && seconds >= 10){
          elapsed_time = ("0"+ minutes) + ":"  + seconds;
        }else {
          elapsed_time = "0" + minutes + ":" + "0" + seconds  ;
        }
        
        return(
                
                <div id="coutndown-timer">
 
                    {countdown
                    ?elapsed_time
                    :null}
                        
                </div>
                
        );
    }
    
        
    
    
}

class GameInfo extends React.Component {
  constructor(props) {
    super(props);
  }
    findPlayerName(teamLoc, playerId){
        for(let i=0; i < this.props.players.teams[teamLoc].players.length; i++){
            if(this.props.players.teams[teamLoc].players[i].id == playerId){
                return this.props.players.teams[teamLoc].players[i].player_name;
            }
        }
    }

        goals(teamLoc,teamId){

        let list=[];

        for(let i =0; i <this.props.players.events.length;i++){
            if(this.props.players.events[i].event_id == 3 && this.props.players.events[i].team_id == teamId)
            {
                var playerName = this.findPlayerName(teamLoc, this.props.players.events[i].player_id);
                if (teamId==8) {
                    list.push(<li>
                    <p>{playerName} 64' <img src="public/images/events/goalSolid.png"  /></p>
                      </li>)
                }
                else {
                    list.push(<ul>
                <p><img src="public/images/events/goalSolid.png"/> {playerName} 64'</p>
                      </ul>)
                }
            }
        } 
        return list;
    }
    
    ownGoals(teamLoc,teamId){

        let list=[];

        for(let i =0; i <this.props.players.events.length;i++){
            if(this.props.players.events[i].event_id == 6 && this.props.players.events[i].team_id == teamId)
            {
                var playerName = this.findPlayerName(teamLoc, this.props.players.events[i].player_id);
                if (teamId==8) {
                    list.push(<ul>
                    <p>{playerName}(OG)25' <img src="public/images/events/ownGoal.png"  /> </p>
                      </ul>)
                }
                else {
                    list.push(<ul>
                <p><img src="public/images/events/ownGoal.png"/> {playerName}(OG) 29'</p>
                      </ul>)
                }
            }
        } 
        return list;
    }
     
  render() {
      if(this.props.players.id !== -1){
    return (
      <div className="gameInfo">
        <div className="home">
          <img alt="Home Crest" src={this.props.players.teams[0].crest} />
          <p>{this.props.players.teams[0].team_name}</p>
          <div className="homeEvents">
            <div className="homeGoals">
            <ul>{this.goals(0,8)}</ul>
                <div className="ownGoalsHome">
                    {this.ownGoals(1,7)}
                </div>
            </div>
          </div>
        </div>
        <div className="away">
            <img alt="Away Crest" src={this.props.players.teams[1].crest} />
            <p>{this.props.players.teams[1].team_name}</p>
            <div className="awayEvents">
                <div className="awayGoals">
                    {this.goals(1,7)}
                    <div className="ownGoalsAway">
                        {this.ownGoals(0,8)}
                    </div>
                </div>
            </div>
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
        
        let goal=0,ownGoal=0;
        let yellowCard=0;
        let redCard = false;
         let sub = false;
        
        if(props.value.events.length>0){
            
            for(let c=0; c<props.value.events.length;c++){
                
                if(props.value.events[c].event_id == 3 ){
                    goal++;
                }
                
                if(props.value.events[c].event_id == 6){
                    ownGoal++;
                }
                
                
                
                if(props.value.events[c].event_id ==4){
                    yellowCard++;
                }
                
                if(props.value.events[c].event_id ==5){
                   redCard= true;
                }
                
                if(props.value.events[c].sub_player == props.value.player_name || props.value.events[c].starting_player == props.value.player_name){
                   sub = true;
                }
                
            }
            
        }
        
        if(goal === 0){
            goal = null;
        }
        
        if(ownGoal ===0){
            ownGoal=null;
        }
        
        if(yellowCard === 0){
            yellowCard = null;
        }

        return(
                <div  id="star-player" onClick={props.onClick}>
        <img src="star1.png" id="star-player-image" />
                
                        
      { output
      ?<div className="average1">{parseFloat(props.value.average_rating).toFixed(1)} </div>
      :<div className="average1"> {"?"} </div>}
      
      { goal
      ?<div className="eventGoal"><img src="public/images/events/goalSolid.png"  /></div>
      :null}
      
       { ownGoal
       ?<div className="eventOwnGoal"><img src="public/images/events/ownGoal.png"  /> </div>
      :null}

      
      
      
      
      { redCard
      ?<div className="eventRedCard"><img src="public/images/events/redCard.png" /> </div>
      :null}
      
      { yellowCard
      ?<div className="eventYellowCard"><img src="public/images/events/yellowCard.png" /> </div>
      :null}


      { sub
      ?<div className="eventSub"> <img src="public/images/events/substitution.png"  /></div>
      :null}


      
      <div className ="playerName1">{props.value.player_no}.{props.value.player_name} </div>
      { props.userRating.rating 
      ?  <button className ="square2" onClick={props.onClick}>{props.userRating.rating} </button>
      :  <button className ="square2" onClick={props.onClick}>{"-"} </button>}
     
                </div>
                );
        
    }else if( props.specialPlayers[1][0] != -1 && props.value.id === props.specialPlayers[1][0]){
        let goal=0,ownGoal=0;
        let yellowCard=0;
        let redCard = false;
         let sub = false;
        
        if(props.value.events.length>0){
            
            for(let c=0; c<props.value.events.length;c++){
                
                if(props.value.events[c].event_id == 3 ){
                    goal++;
                }
                
                if(props.value.events[c].event_id == 6 ){
                    ownGoal++;
                }
                
                if(props.value.events[c].event_id ==4){
                    yellowCard++;
                }
                
                if(props.value.events[c].event_id ==5){
                   redCard= true;
                }
                
                if(props.value.events[c].sub_player == props.value.player_name || props.value.events[c].starting_player == props.value.player_name){
                   sub = true;
                }
                
            }
            
        }
        
        if(goal === 0){
            goal = null;
        }
        
        if(ownGoal ===0){
            ownGoal=null;
        }
        
        if(yellowCard === 0){
            yellowCard = null;
        }

        return(
                <div  id="trash-player" onClick={props.onClick}>
        <img src="trashcan.png" id="trash-player-image" />
                
           { output
      ?<div className="average1">{parseFloat(props.value.average_rating).toFixed(1)} </div>
      :<div className="average1"> {"?"} </div>}
      
      { goal
      ?<div className="eventGoal"><img src="public/images/events/goalSolid.png"  /></div>
      :null}
      
       { ownGoal
       ?<div className="eventOwnGoal"><img src="public/images/events/ownGoal.png"  /> </div>
      :null}

      
      
      
      
      { redCard
      ?<div className="eventRedCard"><img src="public/images/events/redCard.png" /> </div>
      :null}
      
      { yellowCard
      ?<div className="eventYellowCard"><img src="public/images/events/yellowCard.png" /> </div>
      :null}


      { sub
      ?<div className="eventSub"> <img src="public/images/events/substitution.png"  /></div>
      :null}
      
      <div className ="playerName1">{props.value.player_no}.{props.value.player_name} </div>
      { props.userRating.rating 
      ?  <button className ="square2" onClick={props.onClick}>{props.userRating.rating} </button>
      :  <button className ="square2" onClick={props.onClick}>{"-"} </button>}
     
                </div>
                );
        
    }else if( props.value !== 0){
        
        let rating = false;
        
        if(props.userRating.player_id !== -1){
            rating = true;
        }
        
        let goal=0,ownGoal=0;
        let yellowCard=0;
        let redCard = false;
        let sub = false;
        
        if(props.value.events.length>0){
            
            for(let c=0; c<props.value.events.length;c++){
                
                if(props.value.events[c].event_id == 3 ){
                    goal++;
                }
                
                if(props.value.events[c].event_id == 6){
                    ownGoal++;
                }
                
                if(props.value.events[c].event_id ==4){
                    yellowCard++;
                }
                
                if(props.value.events[c].event_id ==5){
                   redCard= true;
                }
                
                if(props.value.events[c].sub_player == props.value.player_name || props.value.events[c].starting_player == props.value.player_name){
                    sub = true;
                }
                
            }
            
        }
        
        if(goal === 0){
            goal = null;
        }
        
        if(ownGoal ===0){
            ownGoal=null;
        }
        
        if(yellowCard === 0){
            yellowCard = null;
        }
        

     
  return (

    <button className={props.class} id={props.id} onClick={props.onClick} >
         { output
      ?<div className="average">{parseFloat(props.value.average_rating).toFixed(1)} </div>
      :<div className="average1"> {"?"} </div>}
      
      

      { goal
      ?<div className="eventGoal"><img src="public/images/events/goalSolid.png"  /></div>
      :null}
      
       { ownGoal
       ?<div className="eventOwnGoal"><img src="public/images/events/ownGoal.png"  /> </div>
      :null}

      
      
      
      
      { redCard
      ?<div className="eventRedCard"><img src="public/images/events/redCard.png" /> </div>
      :null}
      
      { yellowCard
      ?<div className="eventYellowCard"><img src="public/images/events/yellowCard.png" /> </div>
      :null}


      { sub
      ?<div className="eventSub"> <img src="public/images/events/substitution.png"  /></div>
      :null}
      
      
      <div className ="playerName">{props.value.player_no}.{props.value.player_name} </div>
      {rating
      ?<button className ="square2" onClick={props.onClick}>{props.userRating.rating} </button>
      :<button className ="square2" onClick={props.onClick}>- </button>}
      
    </button>

  );}else{

    //If no user rating has been made for this particular player then a button with the default value "0" will be output instead of the a button with the users ratings.
    return (

      <button className={props.class} id={props.id} onClick={props.onClick} >
        <div className="average1"> {"?"} </div>
        <div className ="playerName">N/A </div>
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
       let obj = {id: -1, player_name: "N/A", average_rating: 0, position: -1, events: []};
    
        if(this.props.players.id !== -1){
      


      if( i < 4){
        for(let c = 0; c < this.props.players.teams[0].players.length;c++){
          if(this.props.players.teams[0].players[c].position == track && track < 11)
          {
            obj = this.props.players.teams[0].players[c];
          }
        }
        teamClass = "team1-players";
      }else if( i >=4){
        for(let c = 0; c < this.props.players.teams[1].players.length;c++){
          if(this.props.players.teams[1].players[c].position ==10 -(track-11))
          {
            obj = this.props.players.teams[1].players[c];


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
      let events_array= new Array() ;
            if(this.props.players.events.length >0){
          for(let c3=0; c3 <this.props.players.events.length;c3++){
              if(this.props.players.events[c3].player_id == obj.id){
                  events_array.push(this.props.players.events[c3]);
              }
              
              if(this.props.players.events[c3].starting_player == obj.player_name || this.props.players.events[c3].sub_player == obj.player_name){
                  events_array.push(this.props.players.events[c3]);
              }
              
          }
          
      }
      obj.events = events_array;

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

class PreGame extends React.Component{


    CountDownTimer(dt, id)
    {
        var end = new Date(dt);

        var _second = 1000;
        var _minute = _second * 60;
        var _hour = _minute * 60;
        var _day = _hour * 24;
        var timer;

        function showRemaining() {
            var now = new Date();
            var distance = end - now;
            if (distance < 0) {

                clearInterval(timer);
                document.getElementById(id).innerHTML = 'Game On!';

                return;
            }
            var days = Math.floor(distance / _day);
            var hours = Math.floor((distance % _day) / _hour);
            var minutes = Math.floor((distance % _hour) / _minute);
            var seconds = Math.floor((distance % _minute) / _second);

            document.getElementById(id).innerHTML = days + ' days ';
            document.getElementById(id).innerHTML += hours + 'h ';
            document.getElementById(id).innerHTML += minutes + 'm ';
            document.getElementById(id).innerHTML += seconds + 's';
        }

        timer = setInterval(showRemaining, 1000);
    }

    render(){
          if(this.props.players.id !==-1){
              let year = (this.props.players.match_date_time).slice(0,4);
              let month = (this.props.players.match_date_time).slice(5,7);
              let day = (this.props.players.match_date_time).slice(8,10);
              let hour = (this.props.players.match_date_time).slice(11,13);
              let min = (this.props.players.match_date_time).slice(14,16);
              let match_time = month + "/"+ day + "/" + year + " " + hour + ":" + min + " GMT+0100";
          
            return(    
                    
                <div className="preGame-board">
                    <div class="preGameLogo">
                    <img src="public/images/misc/InGameRatingsLogo.png" />
                        <h2>In-Game Ratings</h2>
                    </div>
                    <div className="preGameText">
                      <h2>Match Countdown!</h2>
                      <h1 id="preGameTeamNames">{this.props.players.teams[0].team_name} Vs {this.props.players.teams[1].team_name}</h1>
                      <img alt="Home Crest" src={this.props.players.teams[0].crest} /><img alt="Away Crest" src={this.props.players.teams[1].crest} />
                      <h3 id="preGameLocation">{this.props.players.match_location}</h3>
                      <h3 id="preGameCompetition">Premier League</h3>
                      <h3>Rate all the players live!</h3>
                      <h1 id="countdown">{this.CountDownTimer(match_time, 'countdown')}</h1>
                    </div>
                    <div className="preGameFacts">
                    <h3>Predicted team line up</h3>
                    <div id="predictedTeamLineUp">                    
                        <ul>
                            <h1>Man Utd.</h1>
                            <li>De Gea</li>
                            <li>Young</li>
                            <li>Smalling</li>
                            <li>Lindelof</li>
                            <li>Shaw</li>
                            <li>Fred</li>
                            <li>McTominay</li>
                            <li>Pogba</li>
                            <li>Lingard</li>
                            <li>Rashford</li>
                            <li>Martial</li>
                        </ul>
                        <ul>
                            <h1>Man City</h1>
                            <li>Ederson</li>
                            <li>Walker</li>
                            <li>Otamendi</li>
                            <li>Laporte</li>
                            <li>Mendy</li>
                            <li>De Bruyne</li>
                            <li>Fernandinho</li>
                            <li>Gundogan</li>
                            <li>B.Silva</li>
                            <li>Aguero</li>
                            <li>Sterling</li>
                        </ul>
                    </div>
                    <h3>Previous results</h3>
                        <div id="previousMatches">
                            <table>
                                <tr>
                                    <th>Man Utd.</th>
                                    <th>Vs</th>
                                    <th>Man City</th>
                                </tr>
                                <tr>
                                    <td>1</td><td>-</td><td>3<img alt="Away Crest" src={this.props.players.teams[1].crest} /></td>
                                </tr>
                                <tr>
                                    <td><img alt="Home Crest" src={this.props.players.teams[0].crest} />3</td><td>-</td><td>2</td>
                                </tr>
                                <tr>
                                    <td>1</td><td>-</td><td>2<img alt="Away Crest" src={this.props.players.teams[1].crest} /></td>
                                </tr>
                                <tr>
                                    <td><img alt="Home Crest" src={this.props.players.teams[0].crest} />2</td><td>-</td><td>0</td>
                                </tr>
                                <tr>
                                    <td><img alt="Home Crest" src={this.props.players.teams[0].crest} />0</td><td>-</td><td>0<img alt="Away Crest" src={this.props.players.teams[1].crest} /></td>
                                </tr>
                            </table>
                        </div>
                    <h3>Premiership standings</h3>

                    <iframe id="frameyMcFrameFace" frameborder="0" 
                    src="https://www.fctables.com/england/premier-league/iframe/?type=table&lang_id=2&country=67&template=10&team=180231&timezone=Europe/London&time=24&po=1&ma=1&wi=1&dr=1&los=1&gf=1&ga=1&gd=1&pts=1&ng=1&form=1&width=450&height=580&font=Verdana&fs=12&lh=12&bg=FFFFFF&fc=333333&logo=1&tlink=1&ths=1&thb=1&thba=FFFFFF&thc=000000&bc=dddddd&hob=f5f5f5&hobc=ebe7e7&lc=333333&sh=1&hfb=1&hbc=3bafda&hfc=FFFFFF"/>
                    

                    </div>
                     
                </div>
            );
          }else{
          return(
                <div className="gameOver-board">
                    <div className="gameOverText">
                        <h2>Match Countdown!</h2>
                        <h1>Man Utd Vs Man city</h1>
                    </div>
                </div>   
                );
    }
    }
};

class GameOver extends React.Component{
    
    findPlayerName(teamLoc, playerId){
        for(let i=0; i < this.props.players.teams[teamLoc].players.length; i++){
            if(this.props.players.teams[teamLoc].players[i].id == playerId){
                return this.props.players.teams[teamLoc].players[i].player_name;
            }
        }
    }
    
        renderListEvents(teamLoc,teamId){        
        let list=[];        
        for(let i =0; i <this.props.players.events.length;i++){
            if(this.props.players.events[i].event_id == 3 && this.props.players.events[i].team_id == teamId){
                var playerName = this.findPlayerName(teamLoc, this.props.players.events[i].player_id);
                var elapsedTime = "'67";
                if(teamId == this.props.players.teams[0].id){
                    list.push(<li>
                      {playerName} {elapsedTime} <img src="public/images/events/goalSolid.png"/>
                      </li>)
                }else{
                    list.push(<li>
                    <img src="public/images/events/goalSolid.png"/> {elapsedTime} {playerName}
                      </li>)
                }                
            }              
      }
            
            return list;
    }
    
    
        ownGoals(teamLoc,teamId){

        let list=[];

        for(let i =0; i <this.props.players.events.length;i++){
            if(this.props.players.events[i].event_id == 6 && this.props.players.events[i].team_id == teamId)
            {
                var playerName = this.findPlayerName(teamLoc, this.props.players.events[i].player_id);
                if (teamId==8) {
                    list.push(<li>
                    <img src="public/images/events/ownGoal.png"/> {playerName}(OG) 25'
                      </li>)
                }
                else {
                    list.push(<li>
                 {playerName}(OG) 29' <img src="public/images/events/ownGoal.png"  />
                      </li>)
                }
            }
        } 
        return list;
    }
    
    renderListPlayers(team){
        
        let teamSort = this.props.players.teams[team].players;
        teamSort.sort(function(a,b){return b.average_rating - a.average_rating});
        let list=[];
        
        for(let i =0; i <teamSort.length;i++){
        if(teamSort[i].position >=-1){
                    if(this.props.specialPlayers[0] == teamSort[i].id){
                        list.push(<div>                        
                        <img src={teamSort[i].player_image}/>
                        <p>{teamSort[i].player_name}</p>
                        <img id="resultsStar" src="star1.png" />
                        <p>{parseFloat(teamSort[i].average_rating).toFixed(1)}</p>
                                
                      </div>)
        }else{
                        list.push(<li>
                        <img src={teamSort[i].player_image}/>
                        <p>{teamSort[i].player_name}</p>
                        <p>{parseFloat(teamSort[i].average_rating).toFixed(1)}</p>
                      </li>)
        }
        

		        }    
            
      }
            
            return list;
    }
    render(){
        return(                
            <div className="gameOver-board">
                <div className="gameOverInfo">
                <h1>Game Over!</h1>
                    <div className="gameOverText">
                          <div>Man Utd. </div>
                          <div> {this.props.players.team1_score} - {this.props.players.team2_score} </div>  
                          <div> Man City</div>
                    </div>

                        <div id="resultEvents">
                            <ul>
                                {this.renderListEvents(0,8)}
                                {this.ownGoals(1,7)}
                            </ul>
                            <ul>
                                {this.renderListEvents(1,7)}
                                {this.ownGoals(0,8)}
                            </ul>
                        </div>
                </div>
                <div id="ratingResults">
                <h2>Crowd rating results!</h2>
                <ul>
                    <h1>Man Utd.</h1>
                    {this.renderListPlayers(0)}     
                </ul>
                <ul>
                    <h1>Man City</h1>
                    {this.renderListPlayers(1)}     
                </ul>
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
      userId: -1,
      dispaly: 0,
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
    fetch('http://localhost/player_ratings_api/match/all_match_data.php', {
      method:'post',
      header: {
        'Accept' : 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: 4, username: localStorage.getItem('player_ratings_username')})
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
  
  
  vote(rating ,player_id, match_id){
    fetch('http://localhost/player_ratings_api/rating/add_rating.php', {
      method:'post',
      header: {
        'Accept' : 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({match_id: match_id, player_id: player_id, rating: rating, username: localStorage.getItem('player_ratings_username')})
    });

    
    setTimeout(function() {this.closeModalHandler();}.bind(this), 1400);
  }
  
  specialPlayers(){
      let max = 0;
      let min = 10;
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
      
      let showEndGameButton = false;
      if(this.state.players.match_elapsed_time === "FT"){
          showEndGameButton = true;
      }
    if(localStorage.getItem('player_ratings_username')=== null){
            this.state.isShowing = true;
    }
    
    if(this.state.players.match_elapsed_time === "preGame"){
        return(    
        <PreGame players={this.state.players} /> );
    }
    else if(this.state.players.match_elapsed_time === "fin" || this.state.dispaly ===1){
        return (
            <GameOver players={this.state.players} specialPlayers={this.specialPlayers()}/>);            
    }else if(Object.keys(this.state.players).length !== 0 && this.state.players.id !== -1 && this.state.dispaly !== 1){
      return (
        <div className="game">
          <GameInfo players={this.state.players}/>
            
          <div className="game-board">
          {showEndGameButton
          ?<img id="final-ratings-image" src="public/images/game_over_3d_transparent_words.png" onClick={() => this.state.dispaly = 1} />
          :null}

          <div className="displayInfo">
              <p className="homeNameDisplay">{this.state.players.teams[0].team_name}</p>
              <p className="homeFormationDisplay">4-3-3</p>
              <p className="awayNameDisplay">{this.state.players.teams[1].team_name}</p>
              <p className="awayFormationDisplay">4-3-3</p> 
            </div>
            {this.state.players.match_elapsed_time === "HT"
          ?<div id="halfTimeMessage"><h1>Half-Time</h1></div>
          :null}
            
            <Board players={this.state.players}  specialPlayers={this.specialPlayers()}  onClick={(i) => this.handleClick(i)}/>
          </div>
              <TeamInfo players={this.state.players} onClick={(i) => this.handleClick(i)}/>
              { this.state.isShowing ? <div className="back-drop"></div> : null }
          <Modal className="modal" id={this.state.buttonId} vote={(rating ,player_id, match_id) =>this.vote(rating ,player_id, match_id)} show={this.state.isShowing} close={this.closeModalHandler} players={this.state.players} />    
                  
     </div>
    
    
      );
    }else{return (
                <div id="work">     
     <img alt="Work" src="work2.png" />
     </div>
    );}
        }
  }


class Modal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "6",
      display: true
    };
  }
  
    changeDisplay(obj){
        
    
      this.props.vote(this.state.selectedOption,obj.id, this.props.players.id, this.state.user); 
  }
  
  rateDiseappear(obj){
          
    var boxOne = document.getElementsByClassName('btn-continue')[0];
    var boxTwo = document.getElementsByClassName('ratingConfirmMessage')[0];
    boxOne.classList.add('puff-out-center');
    boxTwo.classList.add('puff-in-center');
    boxTwo.style.display="block";
    
    this.changeDisplay(obj);
    setTimeout(function(){boxOne.classList.remove('puff-out-center');},2000); 
    setTimeout(function(){boxTwo.classList.remove('puff-in-center');boxTwo.style.display="none";},2000);
  }
  

     
  handleOptionChange = changeEvent => {
     
        this.setState({
    selectedOption: changeEvent.target.value
  });

};

  addNickname(nickname){
      var $usernames;
          fetch('http://localhost/player_ratings_api/user/user_count.php', {
      method:'post',
      header: {
        'Accept' : 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: nickname})
    }).then(res => res.json())
      .then((result) => {
          $usernames = result;
        nickname = nickname +"#" + $usernames.usernames;
    fetch('http://localhost/player_ratings_api/user/create.php', {
      method:'post',
      header: {
        'Accept' : 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: nickname})
    });
    localStorage.setItem('player_ratings_username', nickname);
    
      this.props.close();
        }
      )
      

                  
    }
    
    

  render() {
      
    if(localStorage.getItem('player_ratings_username') === null){
      return(
        <div>
            <div className="modal-wrapper"
                style={{
                    transform: this.props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                <div className="modal-header">
                <img src="inGameRatingsLogo.png"/>
                    <h2>In-Game Ratings</h2>
                    
                </div>
                <div id="modal-body-nickname">
                <p>Enter username to rate players</p>
                
 
                        <input id="nickname" type="text" placeholder="Username" autofocus/>
                        <br/>
                        <br/>
                        <button id="submit-nickname" className="btn-continue" onClick={() =>this.addNickname(document.getElementById('nickname').value)}> Submit </button>

                </div>
                
            </div>
        </div>
      );

    }
    else if(this.props.id !== -1 && this.state.display === true){
      let obj = {id: -1, player_name: "N/A", average_rating: 0, position: -1,crest:""};
      
      
      for(let i = 0; i < this.props.players.teams[0].players.length;i++){
        if(this.props.players.teams[0].players[i].id == this.props.id)
        {
          obj = this.props.players.teams[0].players[i];
          obj.crest = this.props.players.teams[0].crest;
        }
      }

      for(let i = 0; i < this.props.players.teams[1].players.length;i++){
        if(this.props.players.teams[1].players[i].id == this.props.id)
        {
          obj = this.props.players.teams[1].players[i];
          obj.crest = this.props.players.teams[1].crest;
        }
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
                <span id="ratings-span" className="close-modal-btn" onClick={this.props.close}>×</span>
                <div className="modal-body">
                
                    <div className="modal-player-info">
                        <img alt="Player" src={obj.player_image}/>
                        <h2>{obj.player_no}.<br class="rwd-break" /> {obj.player_name}</h2>
                        <p>{obj.team_name}</p>
                        <p>{obj.player_role}</p>
                        <img class="playerDetailsCrest" alt="Team Crest" src={obj.crest} />
                    </div>
                    
                    <div className="modal-player-ratings">
                        <table>
                            <tr>
                              <th>Crowd</th>
                              { localStorage.getItem('player_ratings_username').slice(0,localStorage.getItem('player_ratings_username').indexOf('#')).length ==0
                                ?<th>You</th>
                                :<th>{localStorage.getItem('player_ratings_username').slice(0,localStorage.getItem('player_ratings_username').indexOf('#'))}</th>}
                              
                            </tr>
                            <tr>
                                { obj.average_rating !=0
                                ?<td>{parseFloat(obj.average_rating).toFixed(1)} </td>
                                :<td>{"?"}</td> }    
                              <td>{currentRating}</td>
                            </tr>
                      </table>
                    </div>
                    { this.props.players.match_elapsed_time ==="00:00"
                    ?<h2>Rating players available when game is live!</h2>
                    :<div>
                    

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
                                  <input type="radio"  className="form-check-input" name="react-tips" value="2" onChange={this.handleOptionChange}  />
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
                                  <span id="checkmark10" class="checkmark"></span>
                                  </label>
                              </div>
                  </div>
                  </div> }   
            </div>
            
                { this.props.players.match_elapsed_time ==="00:00"
                ?<p></p>
                    :
                <div className="modal-footer">
                    <button id="rateSubmit" className="btn-continue" onClick={() =>this.rateDiseappear(obj)}>Rate Player</button>
                    <p className="ratingConfirmMessage"><img src="public/images/events/tick.png"/> Rating submitted!</p>
                </div>} 
            </div>
            
        </div>
      );
    }else if( obj.id !== -1 && this.state.display === true){
      //subs modal
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
                <span id="ratings-span" className="close-modal-btn" onClick={this.props.close}>×</span>
                <div className="modal-body">
                    <div className="modal-player-info">
                    <img alt="Player" src={obj.player_image}/>
                    <h2>{obj.player_no}.<br class="rwd-break" /> {obj.player_name}</h2>
                    <p>{obj.team_name}</p>
                    <p>Position</p>
                    <img class="playerDetailsCrest" alt="Team Crest" src={obj.crest} />
                </div>
                <div className="modal-player-ratings">
                    <table>
                        <tr>
                            <th>Crowd</th>
                            <th>{localStorage.getItem('player_ratings_username').slice(0,localStorage.getItem('player_ratings_username').indexOf('#'))}</th>
                            </tr>
                        <tr>
                            { obj.average_rating !=0
                            ?<td>{parseFloat(obj.average_rating).toFixed(1)} </td>
                            :<td>{"?"}</td> } 
                            <td>{currentRating}</td>
                        </tr>
                    </table>
                 </div>
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
                <img src="public/images/misc/rate02.png"/>
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
                      Oopsy, there was an error, please try again
                  </p>
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
        
        
        let goal=0,ownGoal=0;
        let yellowCard=0;
        let redCard = false;
        let sub = false;
        
        if(this.props.players.events.length>0){
            
            for(let c=0; c<this.props.players.events.length;c++){
                
                if(this.props.players.events[c].player_id ==this.props.players.teams[team].players[i].id ){
                if(this.props.players.events[c].event_id == 3 ){
                    goal++;
                }
                
                if(this.props.players.events[c].event_id == 6){
                    ownGoal++;
                }
                
                if(this.props.players.events[c].event_id ==4){
                    yellowCard++;
                }
                
                if(this.props.players.events[c].event_id ==5){
                   redCard= true;
                }
                
                
                
            }
            if(this.props.players.events[c].sub_player == this.props.players.teams[team].players[i].player_name || this.props.players.events[c].starting_player == this.props.players.teams[team].players[i].player_name){
                    sub = true;
                }
        }
            
        }
        
        if(goal === 0){
            goal = null;
        }
        
        if(ownGoal ===0){
            ownGoal=null;
        }
        
        if(yellowCard === 0){
            yellowCard = null;
        }
        
        
        
        
        
        list.push
        (
            <li  
                id={listId} 
                onClick={() => this.props.onClick(this.props.players.teams[team].players[i].id)}>
                {this.props.players.teams[team].players[i].player_name} 
                { goal
                ?<img src="public/images/events/goalSolid.png"/>
      :null}
      
      { ownGoal
      ?<img src="public/images/events/ownGoal.png"  />
      :null}
      
      { yellowCard
      ?<img src="public/images/events/yellowCard.png" /> 
      :null}
      
      { redCard
      ?<img src="public/images/events/redCard.png" />
      :null}
      
      { sub
      ?<img src="public/images/events/substitution.png"  />
      :null}
            </li>
        );
      }
    }

    return list;

  }
  render(){

    return(
      <div id="team-info">

      <div id="team1-info">
      <h3> {this.props.players.teams[0].team_name}</h3>
      <ul>
      {this.renderListPlayers(0)}
       </ul>
       <h3>Managers</h3>
         <ul><li> {this.props.players.teams[0].manager} </li></ul>
       </div>
      <div id="team2-info">
      <h3> {this.props.players.teams[1].team_name}</h3>
      <ul>
      {this.renderListPlayers(1)}
      </ul>
      <h3> &nbsp; </h3>
      <ul><li> {this.props.players.teams[1].manager} </li></ul>
      </div>
      </div>

      );
  }
}


// ========================================

ReactDOM.render(<Game />,document.getElementById('root'));
