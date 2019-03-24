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