// component that renders a single player
window.PlayerName = React.createClass({
    
    render: function () {
        return (
                <div>
                <div className="Player" onClick={this.handleShow}>
                    {this.props.player.player_name} 
                    {this.props.player.player_no} 
                </div>
                 
                </div>
                );
    }
});