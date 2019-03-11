import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class Player extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
        };
    }
    

    handleClose() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }
    render(){
        return(
                <div>
                <div className="Player">
                            <img alt="Neuer" src={circle} onClick={this.handleShow}/>
                            <p>Neuer</p>
                        </div>
                        <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Title>Player Name</Modal.Title>
                        <Modal.Body>Player Rating</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                        </div>
                );
    }
}



ReactDOM.render(<Player />, document.getElementById('root')
        );