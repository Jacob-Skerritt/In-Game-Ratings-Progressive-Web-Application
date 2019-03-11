// component that renders a single player
window.PlayerDetails = React.createClass({

    render: function () {
        return (
                <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Title>Player Name</Modal.Title>
                        <Modal.Body>Player Rating</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>


                );
    }
});