import React from 'react';
import './task.css';
import { Link } from 'react-router-dom';
import Context from './context';
import { Pane, Dialog ,SelectMenu,Button} from "evergreen-ui";
import Component from "@reactions/component";
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Redirect } from "react-router-dom";
import { Table, Navbar } from 'react-bootstrap';
import Cookies from "universal-cookie";
import axios from 'axios';
import Lottie from "lottie-react-web";
import animation from "./animation.json";
import load from "./load.json";
import { make_cols } from './MakeColumns';
import { SheetJSFT } from './types';
import Tooltip from '@material-ui/core/Tooltip';
import XLSX from 'xlsx';
import Select from 'react-select';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import GetAppIcon from '@material-ui/icons/GetApp';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const cookies = new Cookies();

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? '#ffbf41e0' : 'blue',
    width: '100%'
  }),
  control: () => ({

    borderRadius: '4px',
    boxShadow: ' 0px 0px 1px 2px #b4b1b1',
    border: 'none',
    height: '33px',
    direction: 'rtl',
    textAlign: 'center',
    display: 'flex',
    width: '100%',

  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}
class Si extends Component {
  constructor(props) {
    super(props);
    this.state = {
        spindevice:false,
        name1:'',
        check:'',
        data1:[],
        name:'',
        id:'',

    }
   
  }

 

 


  componentDidMount() {

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');
    const name = urlParams.get('access_token');
    this.setState({ name1: name })
    console.log("name", urlParams.get('access_token'));
    cookies.set("token", name);

    axios({
      url: `http://hst-api.wialon.com/wialon/ajax.html?svc=token/login&params={"token":"${urlParams.get('access_token')}","fl":2}`,
      method: "get",
      crossDomain: true,
      dataType: "jsonp",
      enctype: "application/json",
      processData: !1,
      contentType: !1,

    })


      .then(res1 => {

        this.setState({
          data1: res1.data,
          check: "login"
        })
        console.log('sssdd', this.state.data1);
        cookies.set("sid", this.state.data1.eid);
        cookies.set("id", this.state.data1.user.id);
        cookies.set("name", this.state.data1.user.nm);
        this.setState({name:this.state.data1.user.nm,
        id:this.state.data1.user.id})
        this.get_users();
      })
      .catch(err => {
        console.log('error:' + err);
        this.setState({
          check: "notlogin"
        });
      })
    setInterval(() => {
      axios.post('https://sdk.wialon.com/wiki/en/sidebar/remoteapi/apiref/requests/avl_evts')
    }, 20000);


  }

  get_users() {
  
    axios
      .get(`https://hst-api.wialon.com/wialon/ajax.html?svc=core/search_items&params={ "spec":{"itemsType": "user","propName": "sys_name","propValueMask": "*","sortType": "sys_name","propType": "property"},"force": 0,"flags": 5,"from": 0,"to":0}&sid=${cookies.get("sid")}`, {
        headers: {
          Accept: "application/json"
        }
      })
      .then(res => {
        this.setState({
          user: res.data.items,
         
        });
        console.log("imie", this.state.user);
        let arr = [];
        for (let index = 0; index < this.state.user.length; index++) {
          let obj = {
            value: this.state.user[index].id,
            label:this.state.user[index].nm
           
            
          };
          arr.push(obj);
        }
        this.setState({
          kitch1: arr
        });
      })
      .catch(err => {

        console.log("error:", err);
       
      });
  }




  render() {

    const { selectedOption } = this.state;
    return (
      <Context.Consumer>
        {ctx => {
          if (this.state.check === "notlogin") {
            return  <Redirect to='/'></Redirect>;
          } else if (this.state.check === "login" && this.state.spindevice === false) {

            return (

              <div id='homediv' >
                <ToastContainer
                  position="bottom-center"
                  autoClose={5000}
                  hideProgressBar
                  newestOnTop
                  closeOnClick
                  rtl
                  pauseOnVisibilityChange
                  draggable
                  pauseOnHover
                />

                <Navbar expand="lg" id="navmai">


                  <Navbar.Brand style={{ paddingLeft: '3%' }}>  <img src={require('./logo.png')} style={{ height: 30 }} /> </Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ color: 'white' }} />
                  <Navbar.Collapse id="basic-navbar-nav" style={{ color: 'white' }} >

                    <div id='itemnav' >


                      <div id='teamnav'>
                      <div> <span style={{color:'#327093',fontSize:'15px'}} >Login as : </span> 
                      <Component initialState={{ selected: cookies.get("name") }}>
                          {({ setState, state }) => (
                            <SelectMenu
                              title="Select name"
                              options={
                                this.state.kitch1
                              }
                              selected={state.selected}
                              onSelect={item => {
                                setState({ selected: item.label })
                                this.setState({
                                  name:item.label,
                                  id:item.value
                                })
                            
                               
                                
                            
                            
                            }}
                            >
                              <Button>{state.selected || 'Select name...'}</Button>
                            </SelectMenu>
                          )}
                        </Component>
 </div>
                    
                      
                     
                        <Tooltip title="Logout" onClick={() => {
                          cookies.remove("token");
                          window.location.href = "/"
                        }}   >
                          <IconButton aria-label="Logout">
                            <ExitToAppIcon />
                          </IconButton>
                        </Tooltip>
                      </div>

                    </div>




                  </Navbar.Collapse>

                </Navbar>
             
             
               <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
            width:'100%'}} >

<div style={{display:'flex',alignItems:'center',justifyContent:'space-evenly',
            width:'90%',height:'90vh'}} >
               
<div id='imgexel' onClick={()=>{
  window.location.href = `/User?id=${this.state.id}&nm=${this.state.name}`;
}}  >
    <div id='inimg' >Adding from Excel</div>
     <img src={require('./xlsx.png')} style={{width:'150px',height:'150px'}} alt='alt' />

</div>

  <div id='imgexel' >
    <div id='inimg' >Adding from Template</div>
                 <img src={require('./template.png')} style={{width:'150px',height:'150px'}} alt='alt' />
            </div>
</div>

               </div>
                       



                


                 


               


               




              </div>




            )
          }

          else if (this.state.check === "" || this.state.spindevice !== false) {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: '90vh'
                }}
              >
                <Lottie
                  options={{
                    animationData: animation
                  }}

                  height={250}
                />
              </div>
            );
          }


        }}
      </Context.Consumer>
    );





  }
}
export default Si;
