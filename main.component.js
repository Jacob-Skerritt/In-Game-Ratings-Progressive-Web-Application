// component that decides which main component to load: read or create/update
var MainApp = React.createClass({
    displayName: 'MainApp',


    // initial mode is 'read' mode
    getInitialState: function getInitialState() {
        return {
            currentMode: 'read',
            playerId: null
        };
    },

    // used when use clicks something that changes the current mode
    changeAppMode: function changeAppMode(newMode, playerId) {
        this.setState({ currentMode: newMode });
        if (playerId !== undefined) {
            this.setState({ playerId: playerId });
        }
    },

    // render the component based on current or selected mode
    render: function render() {

        React.createElement(ReadPlayersComponent, {
            changeAppMode: this.changeAppMode });

        switch (this.state.currentMode) {
            case 'read':
                break;
            case 'readOne':
                modeComponent = React.createElement(ReadOnePlayerComponent, { playerId: this.state.playerId, changeAppMode: this.changeAppMode });
                break;
            case 'create':
                modeComponent = React.createElement(CreatePlayerComponent, { changeAppMode: this.changeAppMode });
                break;
            case 'update':
                modeComponent = React.createElement(UpdatePlayerComponent, { playerId: this.state.playerId, changeAppMode: this.changeAppMode });
                break;
            case 'delete':
                modeComponent = React.createElement(DeletePlayerComponent, { playerId: this.stateplayerIdid, changeAppMode: this.changeAppMode });
                break;
            default:
                break;
        }

        return modeComponent;
    }
});

// go and render the whole React component on to the div with id 'content'
ReactDOM.render(React.createElement(MainApp, null), document.getElementById('content'));