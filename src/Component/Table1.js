import React from 'react';
import './task.css';
import Context from './context';
import { SelectMenu, Button , Pane, Dialog, Spinner} from "evergreen-ui";
import Component from "@reactions/component";
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import { Redirect } from "react-router-dom";
import { Table, Navbar } from 'react-bootstrap';
import Cookies from "universal-cookie";
import AddBoxIcon from '@material-ui/icons/AddBox';
import MaterialDatatable from "material-datatable";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import Lottie from "lottie-react-web";
import animation from "./animation.json";
import Tooltip from '@material-ui/core/Tooltip';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const cookies = new Cookies();

class Table1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spindevice: true,
   
    
    }

  }

  getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MuiPaper: {
        elevation4: {
          width: "100%"
        }
      },
      MuiTableCell: {
        head: {

          color: '#2e6b95',
          fontSize:'15px',
          fontWeight:'700' 
        },
        root: {
          textAlign: 'center',
        
        }
      },
   
    }
  });




 

  render() {
    const columns = [
        { name: " # ", field: "hash" },
          { name: " Name  ", field: "name" },
          { name: "Create_Units", field: "create_units" },
          {name: "Import_Export" ,field:"import_export"},
       
  
        ];
    
        const options = {
          selectableRows: false,
          print: false,
          responsive: "scroll",
          rowCursorHand: true,
          sort: true,
          filter: false,
           rowsPerPageOptions:[15,30,50,100],
          download:true,
          rowHover:true,
          border:true
        };

    return (
     
<MuiThemeProvider theme={this.getMuiTheme()}>
        <MaterialDatatable  data={this.props.accountData} columns={columns} options={options} />
      </MuiThemeProvider>


             




    )





  }
}
export default Table1;
