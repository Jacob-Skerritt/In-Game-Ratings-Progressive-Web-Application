// component that decides which main component to load: read or create/update
var MainApp = React.createClass({
 
    // initial mode is 'read' mode
    getInitialState: function(){
        return {
            currentMode: 'read',
            playerId: null
        };
    },
 
    // used when use clicks something that changes the current mode
    changeAppMode: function(newMode, playerId){
        this.setState({currentMode: newMode});
            if(playerId !== undefined){
            this.setState({playerId: playerId});
        }
    },
 
    // render the component based on current or selected mode
    render: function(){
 
       
            <ReadPlayersComponent
            changeAppMode={this.changeAppMode} />;
 
        switch(this.state.currentMode){
            case 'read':
                break;
            case 'readOne':
                modeComponent = <ReadOnePlayerComponent playerId={this.state.playerId} changeAppMode={this.changeAppMode}/>;
                break;
            case 'create':
                modeComponent = <CreatePlayerComponent changeAppMode={this.changeAppMode}/>;
                break;
            case 'update':
                modeComponent = <UpdatePlayerComponent playerId={this.state.playerId} changeAppMode={this.changeAppMode}/>;
                break;
            case 'delete':
                modeComponent = <DeletePlayerComponent playerId={this.stateplayerIdid} changeAppMode={this.changeAppMode}/>;
                break;
            default:
                break;
        }
 
        return modeComponent;
    }
});
 
// go and render the whole React component on to the div with id 'content'
ReactDOM.render(
    <MainApp />,
    document.getElementById('content')
);