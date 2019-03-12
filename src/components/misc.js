 <link href="src/assets/styles.css" rel="stylesheet" media="screen" />
        <style>
            .container {

                background-image: url('Capture.png');
                background-size: 100%;
                background-repeat: no-repeat;

            }
            ul{
                list-style: none;
            }
            .player1 {
                position: absolute;
                width: 25%;
                height:15%;
                top: 10%;
                left: 50%;
            }
            .player1 img {
                width:15%;
            }
            /*button{border-radius: 50%;
                   border: none;
                   
                   padding: 5px;
                   text-align: center;
                   text-decoration: none;
                   display: inline-block;
                   font-size: 10px;
                   margin: 4px 2px;
                  }*/
            img{
                background-image: url('circle.png');
            }
        </style>
        
        
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