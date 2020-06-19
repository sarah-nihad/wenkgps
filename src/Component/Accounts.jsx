import React from 'react';
import './task.css';
import Context from './context';
import { SelectMenu, Button, Pane, Dialog, Spinner } from "evergreen-ui";
import Component from "@reactions/component";
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import { Redirect } from "react-router-dom";
import { Table, Navbar } from 'react-bootstrap';
import Cookies from "universal-cookie";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import Lottie from "lottie-react-web";
import animation from "./animation.json";
import Tooltip from '@material-ui/core/Tooltip';
import load from "./load.json";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import $ from "min-jquery";
const cookies = new Cookies();

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
      spindevice: true,
      name1: '',
      check: '',
      data1: [],
      name: '',
      id: '',
      spin: false,
      show: false,
      accountData: [],
      dataLength: '',
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
            fontSize: '15px',
            fontWeight: '700'
          },
          root: {
            textAlign: 'center',

          }
        },

      }
    });




   componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);



    cookies.set("iduser", urlParams.get('id'));
    cookies.set("username", urlParams.get('nm'));
  
    if (cookies.get("sid")) {
      this.getAccounts()
    }


  }

  async getAccounts() {

    await $.ajax({
      type: "GET",
      enctype: "application/json",
      processData: !1,
      contentType: !1,
      crossDomain: true,
      dataType: "jsonp",
      url: `https://hst-api.wialon.com/wialon/ajax.html?svc=core/search_items&params={"spec":{"itemsType":"avl_resource","propName":"rel_is_account,sys_name","propValueMask":"1,*","sortType":"sys_name"},"force":1,"flags":5,"from":0,"to":0}&sid=${cookies.get("sid")}`,
      success: function (result) {
        // console.log(result.items);
        var newLength = result.items.length - 1
        var counter3 = 0;
        // console.log(newLength);
        var arr = []; var arr1 = []; var arr2 = [];
           for (let index = 0; index < newLength; index++) {





          counter3++;

          let ind0 = index
          let ind1 = index += 1
          console.log('tt', ind0);
          console.log('tt1', ind1);

          $.ajax({
            type: "GET",
            enctype: "application/json",
            processData: !1,
            contentType: !1,
            crossDomain: true,
            dataType: "jsonp",
            url:`https://hst-api.wialon.com/wialon/ajax.html?svc=core/batch&params={"params":[{"svc":"account/get_account_data","params":{"itemId":${result.items[ind0].id},"type":2}},{"svc":"core/search_item","params":{"id":${result.items[ind0].id},"flags":4294967295}},{"svc":"account/get_account_data","params":{"itemId":${result.items[ind1].id},"type":2}},{"svc":"core/search_item","params":{"id":${result.items[ind1].id},"flags":4294967295}}],"flags":0}
            &sid=${cookies.get("sid")}`,






            // params={"itemId":[${result.items[ind0].id},${result.items[ind1].id}],"type":2}&sid=${cookies.get("sid")}`,
            success: function (res1) {
console.log('res1',res1);

              var resArr = []

              var entry = res1;
                for (var a in entry) {
                console.log('entry[a]',entry[a]);
                console.log('a',a);
                resArr.push(entry[a])
               
              }
              console.log('resArr',resArr[2]);
                if (resArr[0].settings !== undefined) {
                  if (resArr[0].settings.personal.services.create_units !== undefined && resArr[0].settings.personal.services.import_export !== undefined) {
                    if (resArr[0].settings.personal.services.create_units.cost === "" || resArr[0].settings.personal.services.import_export.cost === "") {
  
                      var obj = {
                        name: resArr[1].item.nm,
                        id: resArr[1].item.id,
                        create_units: (resArr[0].settings.personal.services.create_units !== undefined ? (resArr[0].settings.personal.services.create_units.cost) : (null)),
                        import_export: resArr[0].settings.personal.services.import_export,
                      }
  
                      arr.push(obj);
                    }
                  }
                }
              
                if (resArr[2] !== undefined  && resArr[2].settings !== undefined ) {
                  if (resArr[2].settings.personal.services.create_units !== undefined && resArr[2].settings.personal.services.import_export !== undefined) {
                    if (resArr[2].settings.personal.services.create_units.cost === "" || resArr[2].settings.personal.services.import_export.cost === "") {
  
                      var obj2 = {
                        name: resArr[3].item.nm,
                        id: resArr[3].item.id,
                        create_units: (resArr[2].settings.personal.services.create_units !== undefined ? (resArr[2].settings.personal.services.create_units.cost) : (null)),
                        import_export: resArr[2].settings.personal.services.import_export,
                      }
  
                      arr.push(obj2);
                    }
                  }
                }
              // Object.keys(res1).forEach(function (resID) {

              //   var singleResData = res1[resID];
              //   // resArr.push(singleResData)

              //   console.log('singleResData',singleResData);
              // });


              // if (resArr[1].settings !== undefined) {

              //   if (resArr[1].settings.personal.services.create_units !== undefined && resArr[1].settings.personal.services.import_export !== undefined) {
              //     if (resArr[1].settings.personal.services.create_units.cost === "" || resArr[1].settings.personal.services.import_export.cost === "") {
              //       var obj2 = {
              //         name: result.items[ind1 - 1].nm,
              //         id: result.items[ind1 - 1].id,
              //         create_units: (resArr[1].settings.personal.services.create_units !== undefined ? (resArr[1].settings.personal.services.create_units.cost) : (null)),
              //         import_export: resArr[1].settings.personal.services.import_export,
              //       }
              //       arr.push(obj2);
              //     }
              //   }
             




            }.bind(this),
          })

        }


        this.setState({ accountData: arr })
        // if (counter3 === result.items.length) {
        this.setState({ spindevice: false, check: 'login' })
        this.setState({ accountData: arr })
        // console.log(counter3===res.data.items.length);
        // }
      }.bind(this),
      error: function (error) {
        console.log('Error from response: ' + JSON.stringify(error))
      }
    })

  }




  async closeAllUnit() {
    this.setState({ spin: true })
    var counter3 = 0;
    for (let index = 0; index < this.state.accountData.length; index++) {
      await $.ajax({
        type: "PUT",
        enctype: "application/json",
        processData: !1,
        contentType: !1,
        crossDomain: true,
        dataType: "jsonp",
        url: `https://hst-api.wialon.com/wialon/ajax.html?svc=core/batch&params={"params":[{"svc":"account/update_billing_service","params":{"itemId":${this.state.accountData[index].id},"name":"create_units","type":1,"intervalType":0,"costTable":"-1"}}],"flags":0}&sid=${cookies.get("sid")}`,
        success: function (result) {
          counter3++;
          if (counter3 === this.state.accountData.length) {
            toast.success("All Units Closed");
            this.setState({ spin: false });
            this.componentDidMount();
          }
        }.bind(this),
      })
    }
  }
  async closeAllImport() {
    this.setState({ spin: true })
    var counter3 = 0;
    for (let index = 0; index < this.state.accountData.length; index++) {

      await $.ajax({
        type: "PUT",
        enctype: "application/json",
        processData: !1,
        contentType: !1,
        crossDomain: true,
        dataType: "jsonp",
        url: `https://hst-api.wialon.com/wialon/ajax.html?svc=core/batch&params={"params":[{"svc":"account/update_billing_service","params":{"itemId":${this.state.accountData[index].id},"name":"import_export","type":1,"intervalType":0,"costTable":"-1"}}],"flags":0}&sid=${cookies.get("sid")}`,
        success: function (result) {
          counter3++;
          if (counter3 === this.state.accountData.length) {
            toast.success("All Import Export Closed");
            this.setState({ spin: false });
            this.componentDidMount();
          }
        }.bind(this),

      })
    }
  }

  render() {

    return (
      <Context.Consumer>
        {ctx => {
          if (this.state.check === "notlogin") {
            return <Redirect to='/'></Redirect>;

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


                  <Navbar.Brand style={{ paddingLeft: '3%' }}>  <img src={require('./logo.png')} style={{ height: 30 }} alt='img' /> </Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ color: 'white' }} />
                  <Navbar.Collapse id="basic-navbar-nav" style={{ color: 'white' }} >

                    <div id='itemnav' >
                      {cookies.get("name")}

                      <div id='teamnav'>


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


                <div ref={this.wrapper} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  width: '100%'
                }} >
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-around',
                    width: '100%', margin: '3%'
                  }}  >
                    <button onClick={() => {
                      // console.log(this.state.accountData);

                      this.setState({ check: 'login', show: true })
                    }} >Update Data</button>
                    <button onClick={() => {
                      this.closeAllUnit()
                    }} >Close All Unit</button>
                    <button onClick={() => {
                      this.closeAllImport()
                    }} >Close All Import Exports</button>
                    {this.state.spin === true ? (
                      <div
                        style={{
                          width: "90%",
                          position: "absolute",

                        }}>
                        <Lottie
                          options={{
                            animationData: load
                          }}
                          width={300}
                          height={100}
                          position="absolute"
                        />
                      </div>
                    ) : null}
                  </div>
                  {this.state.accountData.length}
                  <Table striped bordered hover responsive ref={this.wrapper} >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Account_Name</th>

                        <th> Create_units </th>
                        <th> import_export</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.accountData.map((item, i) =>
                        <tr key={i} >
                          <td> {i + 1} </td>
                          <td>{item.name}</td>
                          <td>
                            {item.create_units !== undefined ? (
                              <Component initialState={{ isShown: true, spin: false }}>
                                {({ state, setState }) =>
                                  state.spin ? (
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >  <Spinner size={16} /></div>
                                  ) : item.create_units === "" ? (
                                    <DoneIcon
                                      style={{
                                        color: "#5bb061",
                                        fontSize: 30,
                                        cursor: "pointer"
                                      }}
                                      onClick={() => {
                                        setState({ spin: true });

                                        $.ajax({
                                          type: "POST",
                                          enctype: "application/json",
                                          processData: !1,
                                          contentType: !1,
                                          crossDomain: true,
                                          dataType: "jsonp",
                                          url: `https://hst-api.wialon.com/wialon/ajax.html?svc=core/batch&params={"params":[{"svc":"account/update_billing_service","params":{"itemId":${item.id},"name":"create_units","type":1,"intervalType":0,"costTable":"-1"}}],"flags":0}&sid=${cookies.get("sid")}`,
                                          success: function (result) {
                                            toast.success("Done");
                                            setState({ spin: false });
                                            // this.getAccounts();
                                          }.bind(this),
                                        })
                                      }}
                                    />
                                  ) : (
                                        <CloseIcon
                                          style={{
                                            color: "rgb(169, 16, 16)",
                                            fontSize: 30,
                                            cursor: "pointer"
                                          }}
                                          onClick={() => {
                                            setState({ spin: true });

                                            $.ajax({
                                              type: "POST",
                                              enctype: "application/json",
                                              processData: !1,
                                              contentType: !1,
                                              crossDomain: true,
                                              dataType: "jsonp",
                                              url: `https://hst-api.wialon.com/wialon/ajax.html?svc=core/batch&params={"params":[{"svc":"account/update_billing_service","params":{"itemId":${item.id},"name":"create_units","type":1,"intervalType":0,"costTable":""}}],"flags":0}&sid=${cookies.get("sid")}`,
                                              success: function (result) {
                                                toast.success("Done");
                                                setState({ spin: false });
                                                // this.getAccounts();
                                              }.bind(this),

                                            })
                                          }}
                                        />
                                      )}
                              </Component>
                            ) : (null)}
                          </td>

                          <td>
                            {item.import_export !== undefined ? (
                              <Component initialState={{ isShown: true, spin: false }}>
                                {({ state, setState }) =>
                                  state.spin ? (
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >  <Spinner size={16} /></div>
                                  ) : item.import_export.cost === "" ? (
                                    <DoneIcon
                                      style={{
                                        color: "#5bb061",
                                        fontSize: 30,
                                        cursor: "pointer"
                                      }}
                                      onClick={() => {
                                        setState({ spin: true });

                                        $.ajax({
                                          type: "POST",
                                          enctype: "application/json",
                                          processData: !1,
                                          contentType: !1,
                                          crossDomain: true,
                                          dataType: "jsonp",
                                          url: `https://hst-api.wialon.com/wialon/ajax.html?svc=core/batch&params={"params":[{"svc":"account/update_billing_service","params":{"itemId":${item.id},"name":"import_export","type":1,"intervalType":0,"costTable":"-1"}}],"flags":0}&sid=${cookies.get("sid")}`,
                                          success: function (result) {
                                            toast.success("Done");
                                            setState({ spin: false });
                                            // this.getAccounts();
                                          }.bind(this),
                                        })
                                      }}
                                    />
                                  ) : (
                                        <CloseIcon
                                          style={{
                                            color: "rgb(169, 16, 16)",
                                            fontSize: 30,
                                            cursor: "pointer"
                                          }}
                                          onClick={() => {
                                            setState({ spin: true });

                                            $.ajax({
                                              type: "POST",
                                              enctype: "application/json",
                                              processData: !1,
                                              contentType: !1,
                                              crossDomain: true,
                                              dataType: "jsonp",
                                              url: `https://hst-api.wialon.com/wialon/ajax.html?svc=core/batch&params={"params":[{"svc":"account/update_billing_service","params":{"itemId":${item.id},"name":"import_export","type":1,"intervalType":0,"costTable":""}}],"flags":0}&sid=${cookies.get("sid")}`,
                                              success: function (result) {
                                                toast.success("Done");
                                                setState({ spin: false });
                                                // this.getAccounts();
                                              }.bind(this),

                                            })
                                          }}
                                        />
                                      )}
                              </Component>

                            ) : (null)}
                          </td>




                        </tr>

                      )}

                    </tbody>
                  </Table>
                  {/* ):(null)}  */}

                  {/* 
<MuiThemeProvider theme={this.getMuiTheme()}>
        <MaterialDatatable  data={this.state.accountData} columns={columns} options={options} />
      </MuiThemeProvider> */}


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
export default Accounts;
