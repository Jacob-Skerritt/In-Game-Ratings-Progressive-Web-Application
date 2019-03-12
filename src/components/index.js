var circle = document.createElement("img");
circle.src = "src/assets/circle.png";
var button = document.createElement("button");

class Player extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
   
       this.state = {
          error: null,
          isLoaded: false,
          modalShow: false,
          players: []
        };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  componentDidMount(){
      fetch("http://localhost:1234/player_ratings_api/player/read.php")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            players: result.records
          });
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

  render() {
        let modalClose = () => this.setState({ modalShow: false });
        const { error, isLoaded, players } = this.state;
         
   if (error) {
     return <div>Error: {error.message}</div>;
   } else if (!isLoaded) {
     return <div>Loading...</div>;
   } else {
    return (
      <div>
        <div className="goal1">
        <ul>
         {players.map(player => (
           <li key={player.id}>
             {player.player_name} {player.player_no}
           </li>
         ))}
       </ul>
          <div className="player player1">
            <img alt="Neuer" src={circle} onClick={this.handleShow} />
            <p>Neuer</p>
          </div>
        </div>
        <div className="team1">
          <div className="player player2">
            <img alt="Rafinha" src={circle} onClick={this.handleShow} />
            <p>Rafinha</p>
          </div>

          <div className="player player3">
            <img alt="Sule" src={circle} onClick={this.handleShow} />
            <p>Sule</p>
          </div>

          <div className="player player4">
            <img alt="Hummels" src={circle} onClick={this.handleShow} />
            <p>Hummels</p>
          </div>

          <div className="player player5">
            <img alt="Alaba" src={circle} onClick={this.handleShow} />
            <p>Alaba</p>
          </div>

          <div className="player player6">
            <img alt="Thiago" src={circle} onClick={this.handleShow} />
            <p>Thiago</p>
          </div>

          <div className="player player7">
            <img alt="Rodriguez" src={circle} onClick={this.handleShow} />
            <p>Rodriguez</p>
          </div>

          <div className="player player8">
            <img alt="Matrinez" src={circle} onClick={this.handleShow} />
            <p>Matrinez</p>
          </div>

          <div className="player player9">
            <img alt="Gnabry" src={circle} onClick={this.handleShow} />
            <p>Gnabry</p>
          </div>

          <div className="player player10">
            <img alt="Lewandowski" src={circle} onClick={this.handleShow} />
            <p>Lewandowski</p>
          </div>

          <div className="player player11">
            <img alt="Coman" src={circle} onClick={this.handleShow} />
            <p>Coman</p>
          </div>
        </div>
        <div className="team2">
          <div className="player player12">
            <img alt="Mane" src={circle} onClick={this.handleShow} />
            <p>Mane</p>
          </div>

          <div className="player player13">
            <img alt="Firmino" src={circle} onClick={this.handleShow} />
            <p>Firmino</p>
          </div>

          <div className="player player14">
            <img alt="Salah" src={circle} onClick={this.handleShow} />
            <p>Salah</p>
          </div>

          <div className="player player15">
            <img alt="Wijnaldum" src={circle} onClick={this.handleShow} />
            <p>Wijnaldum</p>
          </div>

          <div className="player player16">
            <img alt="Henderson" src={circle} onClick={this.handleShow} />
            <p>Henderson</p>
          </div>

          <div className="player player17">
            <img alt="Keita" src={circle} onClick={this.handleShow} />
            <p>Keita</p>
          </div>

          <div className="player player18">
            <img alt="Robertson" src={circle} onClick={this.handleShow} />
            <p>Robertson</p>
          </div>
          <div className="player player19">
            <img alt="Van Dijk" src={circle} onClick={this.handleShow} />
            <p>Van Dijk</p>
          </div>

          <div className="player player20">
            <img alt="Lovren" src={circle} onClick={this.handleShow} />
            <p>Lovren</p>
          </div>
          <div className="player player21">
            <img
              alt="Alexander-Arnold"
              src={circle}
              onClick={this.handleShow}
            />
            <p>Alexander-Arnold</p>
          </div>

          <div className="goal2">
            <div className="player player22">
              <img src={circle} alt="Alisson" onClick={this.handleShow} />
              <p>Alisson</p>
            </div>
          </div>
        </div>
        
                
       
      </div>
    );
  }
}
};
class Modal extends React.Component {
  render() {
    return (
      <Modal
        
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
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


ReactDOM.render(
  <div>
    <Player />
    <Subs data={tableData} />
    <Managers data={managerData} />
    
  </div>,
  document.getElementById("root")
);

