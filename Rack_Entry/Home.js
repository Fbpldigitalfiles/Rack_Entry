/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useLayoutEffect,useEffect, useRef,useState } from "react"
import {
  AppState ,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  
  Alert,
  Colors,
  Image,
  KeyboardAvoidingView ,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,Keyboard,Dimensions,Picker,ActivityIndicator
  
} from "react-native"


  import { Appbar, FAB, useTheme, TextInput, RadioButton,Provider ,DefaultTheme,Menu, Divider,Snackbar,Button  } from 'react-native-paper';
  // import { Dropdown } from 'react-native-element-dropdown';
  import { URL } from './constants';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { useNavigation,useRoute  } from '@react-navigation/native';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
  // import shift from './assets/shift.png';
  // import DropdownComponent from './DropdownComponent';
  // import QRCodeScanner from 'react-native-qrcode-scanner';
  // import RNFS from 'react-native-fs';
  // import RNFetchBlob from 'rn-fetch-blob';



function Home({ navigation }) {
  const isDarkMode = useColorScheme() === "dark"
  const [selectedtool, setSelectedtool] = React.useState("");
  const [selectedtoolindex, setSelectedtoolindex] = React.useState(0);
  const [Selectedtransport, setSelectedtransport] = React.useState("");
  const [Selectedtransportindex, setSelectedtransportindex] = React.useState(0);
  const [Selectedcustomer, setSelectedcustomer] = React.useState("");
  const [Selectedcustomerindex, setSelectedcustomerindex] = React.useState(0);
  const [selectedletter, setSelectedletter] = React.useState("");
  const [selectedindex, setSelectletterindex] = React.useState(0);
  const [selectedstage, setSelectedstage] = React.useState("");
  const [selectedstageindex, setSelectedstageindex] = React.useState(0);
  const [value, setValue] = React.useState(null);
  const [isFocus, setIsFocus] = React.useState(false);
  const [punch_no, setpunch_no] = React.useState(0);
  const [invoice, setinvoice] = React.useState('');

  const [job_no, setjob_no] = React.useState("");
  const [part_no, setpart_no] = React.useState("");
  const [machine_no, setmachine_no] = React.useState("");
  const [punch_url, setpunch_url] = React.useState("");
  const [part_url, setpart_url] = React.useState("");
  const [machine_url, setmachine_url] = React.useState("");
  const [checked, setChecked] = React.useState("");
  const [shiftchecked, setshiftChecked] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [production, setproduction] = React.useState(0);
  const [boxes, setboxes] = React.useState(0);
  const [bstages, setbstages]= React.useState([]);
  const [gstages, setgstages]= React.useState([]);
  const [tools, settools]= React.useState([]);
  const [toolimage, settoolimage]= React.useState([]);
  const [punchimage, setpunchimage]= React.useState([]);
  const [search, setSearch] = React.useState('');
  const [searchTransport,setSearchTransport] = React.useState('');
  const [searchcustomer,setsearchcustomer] = React.useState('');
  const [clicked, setClicked] = React.useState(false);
  const [clicked1, setClicked1] = React.useState(false);
  const [clicked2, setClicked2] = React.useState(false);
  const [searchstage, setSearchstage] = React.useState('');
  const [clickedstage, setClickedstage] = React.useState(false);
  const [data, setData] = React.useState();
  const [filterdata, setfilterdata] = React.useState();
  const [marginvale, setmarginvale] = React.useState(5);
  const [existperson, setexistperson] = React.useState({});
  const [containerStyle, setContainerStyle] = React.useState(styles.keyboardc);
  const [punchverified, setpunchverified]=React.useState(false);
  const [errorms, seterrorms] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [enterdlist, setenterdlist] = React.useState([]);
  const [onsearchstart, setonsearchstart] = React.useState(false);
  const [Trasnportdata, setTrasnportdata] = React.useState([]);
  const [fTrasnportdata, setfTrasnportdata] = React.useState([]);
  const [CustomerData, setCustomerData] = React.useState();
  const [fCustomerData, setfCustomerData] = React.useState();
  const [done, setdone] = React.useState(false);
  const [notdone, setnotdone] = React.useState(false);
  const [zindexstatus,setzindexstatus] = React.useState(false);
  const [processDataReceived, setProcessDataReceived] = React.useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState('');

  const onSuccess = (e) => {
    setScanned(true);
    setQrData(e.data);
    setinvoice(e.data)
    setShowScanner(false); // Turn off the scanner after successful scan
    // Any additional actions after successful scan
  };

  const startScanner = () => {
    setShowScanner(true);
    setScanned(false); // Reset scanned state
  };

const cancelscan = () => {
  console.log('scanned')
  // setScanned()
  setScanned(false);
  setShowScanner(false);
}
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handleCloseAlertdata = () => {
    setdone(false);
    setnotdone(false);
    resetstate();
  };

  // const [selectedtool, setSelectedstage] = React.useState('');
  const searchRef = useRef();
  const textInputRef = useRef(null);
  const { width, height } = Dimensions.get('window');
  // const navigation = useNavigation();
  const route = useRoute();
  const handleFocusTextInput = () => {
    // if (textInputRef.current) {
      textInputRef.current.focus();
    // }
  };
  const handleBlurTextInput = () => {
    // if (textInputRef.current) {
      textInputRef.current.blur(); // This will remove focus from the TextInput
    // }
  };
  useLayoutEffect(() => {
 
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  const handleRadioPress = (value) => {
    setChecked(value);
    // display_location(value);
  };
  const handleRadioPresss = (value) => {
    setshiftChecked(value);
    // display_location(value);
  };

//   useEffect(() => {
    
  


    
        
//     serverstatus();

//     // Set up a timer to call the function every 5 seconds (5000 milliseconds)
//     const interval = setInterval(serverstatus, 10000);

//     // Clean up the timer when the component unmounts
//     return () => clearInterval(interval);



// }, []);
  
    function serverstatus(){
      fetch(`${URL}/check`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
       
      })
        .then((response) => response.json())
        .then((responseData) => {
          handleCloseAlert();
            console.log(responseData)
        }).catch(error => {
          handleShowAlert();
          console.log('Server disconnected:');
        });
    }

 
  useEffect( () => {





  retrieveData();
      

      
       
    }, []);

    useEffect(() => {
      if (route.params?.functionName === 'resetstate') {
        resetstate();
      }
    }, [route.params]);
 
  
   function retrieveData(){
    console.log('this one excuted!!!')
     fetch(`${URL}/getalldata`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
     
    })
      .then((response) => response.json())
      .then((responseData) => {
        fetch(`${URL}/gettransporters`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
         
        })
          .then((response) => response.json())
          .then((responseData1) => {
    
      const tooldata = [];
      const toolimages = [];
      const punchimages = [];
      const f_tooldata = [];
      const exist = {};
      const transport = [];
       

  //      responseData.tooldata.map((item, index)=>{
  //       tooldata[index] = {key:(index + 1), value:item[0]};
  //         toolimages[index] = item[1];
      
  //   })
    
  //   responseData.f_tooldata.map((item, index)=>{
  //     f_tooldata[index] = {key:item[1], value:item[2]};
      
    
  // })
    responseData.punchdata.map((item, index)=>{
  
      punchimages[index] = item[1];
      exist[item[3]] = item[2];
    
  })

 


// setCustomerData(responseData1.customerdata)
// setfCustomerData(responseData1.customerdata)
//   settools(tooldata);
//   setData(tooldata);
  setpunchimage(punchimages);
  // settoolimage(toolimages);
  setexistperson(exist);
  // setfilterdata(f_tooldata)
  // setfTrasnportdata( responseData1.transportdata)
  // setTrasnportdata( responseData1.transportdata)
  setProcessDataReceived(true)

      }).catch((error) => console.error(error))
    }).catch((error) => console.error(error))
   }





  
    
      const resetstate = () => {
       
   setpunch_no(0);
  setinvoice("")
 
   }

  function refreshpage(){
    setProcessDataReceived(false)
    resetstate();
    retrieveData();
  }
 

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text;
};
  




  // srote the tghe value into the local storage
  const storeData = async (key, value) => {
    try {
      if(key === "punch"){
        await AsyncStorage.setItem(key,JSON.stringify(value));
        console.log(key);
      }else{
        await AsyncStorage.setItem(key,value);
        console.log('Value stored successfully!');
      }
      
      
    } catch (error) {
      console.log('Error storing value:', error);
    }
  };
 


 
  function check_punch(){

    // setpunchverified(true);
    //     seterrorms(false);
    //     insertdata();


    // console.log(existperson[punch_no]);
       if(existperson[punch_no]){
        setpunchverified(true);
        seterrorms(false);
        
      fetch(`${URL}/read_empname`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        punch_no: punch_no,
          }),
      })
        .then((response) => response.json())
        .then((Data) => {
          navigation.navigate('lots', {punch_no,resetstate,punch_name : Data.name[0][0]})
          // navigation.navigate('dispatch', {punch_no,resetstate,punch_name : Data.name[0][0], invoice:invoice})
        })
       
       }else{
        setpunchverified(false);
         handleFocusTextInput() ;
        seterrorms(true);
       }
   }

   const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'red', // Change the border color here
      
    },
  };
 
  const renderItemf = ({ item }) => (
    <TouchableOpacity

      style={{  zIndex: 1,   padding: 9,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        backgroundColor: '#FFFFFF',}}
      // activeOpacity={1}
      onPress={() => {
                setSelectedletter(item.value);
                setSelectletterindex(item.key);
                setClicked1(!clicked1);
               
              }}
      pointerEvents="box-none"
    >
      <Text style={{textAlign:'center', fontSize:20, color:'black'}}>{item.value}</Text>
    </TouchableOpacity>
  );
 
  const TimeDisplay = () => {
    const [currentDateTime, setCurrentDateTime] = React.useState(new Date());
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentDateTime(new Date());
      }, 1000);
  
      return () => {
        clearInterval(interval);
      };
    }, []);
  
    const formattedDateTime = currentDateTime.toLocaleString();
  
    return <Text style={{paddingRight:20, fontWeight:'bold'}}>{formattedDateTime}</Text>;
  };

  const listdata = async () =>{
  
    navigation.navigate('list')
   
  }
  const listreworkdata = async () =>{
  
    navigation.navigate('r_list')
   
  }

  // JSON.stringify(value)
  return (
     
   
    <KeyboardAvoidingView
    behavior={ null}
    style={{ flex: 1,}}
  >
  <ScrollView keyboardShouldPersistTaps="always" scrollEnabled={true} nestedScrollEnabled={true}> 
      <View style={{   flex: 1,
        width: width,
        height: height,
        backgroundColor: '#D1EDF7',}}>
         
      <View style={styles.body}>
         <Appbar.Header style={{height:80,backgroundColor:'#A3DAF0'}}>
      {/* <Appbar.BackAction onPress={() => {}} /> */}
      <TouchableOpacity onPress={refreshpage} style={{paddingLeft:40}}>
      <FontAwesomeIcon icon="refresh" size={40} color="green" />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={listdata} style={{paddingLeft:70}}>
    <FontAwesomeIcon icon="list" size={50} color="green" />
    
          </TouchableOpacity> */}
            {/* <TouchableOpacity onPress={playVideo} style={{paddingLeft:50}}>
      <FontAwesomeIcon icon="video" size={40} color="blue" style={{ marginLeft:15 }} />
            </TouchableOpacity> */}
      <Appbar.Content title="Coil Rack Monitoring System" style={{ alignItems: 'center',  }} titleStyle={{ fontSize: 28 , marginTop:20, paddingBottom:20, paddingLeft:'15%',fontWeight:'bold' }}/>
      {/* <Appbar.Action icon="calendar" onPress={() => {}} />
      <Appbar.Action icon="magnify" onPress={() => {}} /> */}
       <TimeDisplay />
    </Appbar.Header>
    {/* <Modal visible={showVideoPlayer} animationType="slide" transparent={true}>
          <View style={styles.modalContainer} >
          <TouchableOpacity style={styles.closeButton1} onPress={closeVideoPlayer}>
              <Text style={styles.closeButtonText1}> <FontAwesomeIcon icon="rectangle-xmark" size={55} color="red"  /></Text>
            </TouchableOpacity>
            <View style={styles.videoContainer}>
            
              <VideoPlayerscreen videoSource={videoSource} />
            </View>
          </View>
        </Modal> */}
  <View> 
    {showAlert && (
      <Modal isVisible={showAlert} backdropOpacity={0.5}>
        <View style={styles.alertContainer}>
          <View style={styles.alertBox}>
            <Text style={styles.messageText}>Network Disconnected!!!</Text>
            <TouchableOpacity onPress={handleCloseAlert}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  
    )}
  
  {(processDataReceived) ? (
  <View  style={{ height:450, marginRight:300,marginLeft:300,marginTop:100,alignContent:'center', alignItems:'center', borderWidth:3, borderColor:'grey', paddingLeft:50, paddingTop:90, paddingRight:50, backgroundColor:'#C5E0EF', borderRadius:10}}>
    <View style={[styles.box, { width:'75%',borderColor:  errorms ? 'red' : 'grey'}]} >
   
    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom:0, paddingTop:10 , paddingBottom: errorms ? 5 :  20, paddingLeft:20}}>
       
       <TouchableOpacity style={{marginRight:30,  alignItems:'center'}}  activeOpacity={1}>
       {/* <FontAwesomeIcon icon={['fab', 'house']} /> */}
   <Text style={{paddingTop:5, paddingRight:10}} >   <FontAwesomeIcon icon="person" size={60} color="black" /></Text>
       {/* <Text ><Icon name="user" size={50} color = { errorms ? 'red' : 'black'} /></Text> */}
      <Text style={{color: errorms ? 'red' : 'black' , fontSize:18}}>Punch No</Text>
        </TouchableOpacity>
        <Provider theme={errorms ? theme : null}>
        <View>
       
        <TextInput
          label="Enter Punch No"
          editable
          multiline
           numberOfLines={1}
           maxLength={4}
          // maxLength={40}
          keyboardType='numeric'
          onChangeText={Number => setpunch_no(Number)}
          //  onBlur={check_punch}
          value={punch_no}
          ref={textInputRef}
          //  returnKeyType="send" 
          // onSubmitEditing={handleSubmit}
          //  style={styles.label}
          mode='outlined'
           style={{ flex: 0, height: 70, width:'93%', marginLeft:0 , marginRight:10, borderColor: 'red',marginTop:15, fontSize:20 }}
        />
       
    
    </View>
      </Provider>
      
      </View>
  
    { errorms && (  <Text style={{color:'red',textAlign:'center', fontSize:20, paddingBottom:20, marginLeft:80}}>punch Number Doesn't exist!!!</Text>)}
      </View>
      {/* <View style={[styles.box, { width:'75%',borderColor:  errorms ? 'red' : 'grey'}]} > */}
   
   {/* <View style={{flexDirection: 'row', alignItems: 'center', marginBottom:0, paddingTop:10 , paddingBottom: errorms ? 5 :  20, paddingLeft:20}}>
      
      <TouchableOpacity style={{marginRight:30,  alignItems:'center'}}  activeOpacity={1}>
    
  <Text style={{paddingTop:5, paddingRight:10}} >   <FontAwesomeIcon icon="file-invoice" size={50} color="black" /></Text>
     
     <Text style={{color: errorms ? 'red' : 'black' , fontSize:18}}>Invoice No</Text>
       </TouchableOpacity>
       <Provider theme={errorms ? theme : null}>
       <View>
      
       <TextInput
         label="Enter Invoice No"
         editable
         multiline
          numberOfLines={1}
          maxLength={10}
         // maxLength={40}
         keyboardType='text'
         onChangeText={value => setinvoice(value)}
         //  onBlur={check_punch}
         value={invoice}
         ref={textInputRef}
         //  returnKeyType="send" 
         // onSubmitEditing={handleSubmit}
         //  style={styles.label}
         mode='outlined'
          style={{ flex: 0, height: 70, width:'93%', marginLeft:0 , marginRight:10, borderColor: 'red',marginTop:15 }}
       />
      
   
   </View>
   <View style={styles.buttonContainer}>
   <TouchableOpacity
     style={[styles.button,{    backgroundColor:'gray',flexDirection: 'row',
     alignItems: 'center', paddingLeft:'15%', position:'absolute', left:'105%', width:80, top:-70}]}
     onPress={ 
        () => {startScanner() }
     }
   >
     
     <FontAwesomeIcon icon="qrcode" size={30} color="white" style={{ marginLeft:15 }} />
   </TouchableOpacity>
       
        </View>
     </Provider>
     
     </View>
  */}
   {/* { errorms && (  <Text style={{color:'red',textAlign:'center', fontSize:20, paddingBottom:20, marginLeft:80}}>Invoice Number Doesn't exist!!!</Text>)} */}
     {/* </View> */}
     {/* {showScanner && (  <View style={styles.container2}>
   
        <View style={styles.cameraContainer}>
          <QRCodeScanner
            onRead={onSuccess}
            reactivate={true}
            reactivateTimeout={2000}
            showMarker={true}
            markerStyle={styles.marker}
            cameraStyle={styles.camera}
            containerStyle={styles.scannerContainer}
            // bottomContent={
            //   <View style={styles.bottomView}>
            //     <Text style={styles.text2}>
            //       {scanned ? qrData : 'Scanning...'}
            //     </Text>
            //   </View>
            // }
          />
          <TouchableOpacity
     style={[styles.button,{    backgroundColor:'red',flexDirection: 'row',
     alignItems: 'center', paddingLeft:'15%', position:'absolute', left:'90%', width:80, top:20}]}
     onPress={ 
        () => {cancelscan() }
     }
   >
     
     <FontAwesomeIcon icon="xmark" size={30} color="white" style={{ marginLeft:15 }} />
   </TouchableOpacity>
        </View>

    </View>)} */}
      <View style={{width:'55%', marginTop:30, marginLeft:'0%', zIndex:1}}>
       
       <TouchableOpacity
     style={[styles.button,{    backgroundColor:(punch_no != 0) ? '#0D8C66':'grey',flexDirection: 'row',
     alignItems: 'center', paddingLeft:'30%'}]}
     onPress={ 
      () => { if(punch_no > 0 ){
        check_punch()
      } }
   }
   >
     <Text style={styles.buttonText}>Login</Text>
     <FontAwesomeIcon icon="arrow-right" size={30} color="white" style={{ marginLeft:15 }} />
   </TouchableOpacity>
   </View>
     
     
    </View>):( <View style={{ alignItems: 'center', margin:'15%' }}>
            <ActivityIndicator size={200} color="green" />
            <Text style={{textAlign:'center'}}>Loading...</Text>
          </View>)}
  </View>
  
  
  {!clicked1 ? (
  <View>
  
  
  
   
            
  </View>
  ):null}
  
  
  
  
  
  
 
       
   
      
     
  </View>
   </View>
   </ScrollView>
   </KeyboardAvoidingView>
  
   
    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({

  maincontainer: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600"
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400"
  },
  highlight: {
    fontWeight: "700"
  },
  container:{
    margin:0
  },
  box:{
  //  margin:50,
    marginTop:10,
    marginLeft:50,
    marginRight:50,
    borderRadius:5,
    borderWidth:1,
  
  },
  subbox:{
    flexDirection: 'row', alignItems: 'center', marginBottom:0, paddingTop:10 , paddingBottom:20, paddingLeft:45
  },
  titlecenter:{
    textAlign:"center"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  body:{
    margin:0,
    position: 'relative',
    zIndex: 1, 
    
  },
  inlabel:{
    marginTop:30,
    color:'black',
    fontSize:20
  },
  dropdown: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor:'white'
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  rowcontainer: {
    // backgroundColor: "#7CA1B4",
    // flex: 1,
    marginLeft:50,
    flexDirection:'row',

    flexWrap: "wrap",
    zIndex:1
  },
  rowcontainerinside:{
    // flex: 1,
    flexDirection:'row',

    flexWrap: "wrap",
    marginLeft:50
  },
  square: {
   backgroundColor: "white",
    width: '31%',
  //  height: 90,
    margin: 10,
    borderWidth:0.5,
    borderRadius:5
  },
  button: {
    backgroundColor: '#0D8C66',
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 25, // Adjust the font size as desired
    color: 'white',
    textAlign:"center"
  },
  dropdownContainer: {
    position: 'absolute',
    top: 20, // Adjust as needed
    left: 20, // Adjust as needed
    zIndex: 2, // Higher value to appear above other div elements
  },
  keyboardc:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 36, // Initial padding
  },
  alertContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backdropOpacity:1,
    backgroundColor:'white'
  },
  alertBox: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor:'#00D9FB'
  },
  messageText: {
    color: 'red', // Change this to customize the text color
    fontSize: 50,
    marginBottom: 10,
  },
  closeButton: {
    color: 'white', // You can customize the color of the close button text here
    fontSize: 25,
    backgroundColor:'grey',
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:30,
    paddingRight:30,
    textAlign:'center',
    alignItems:'center',
    alignContent:'center',
    borderRadius:10
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:2
  },
  buttonContainer: {
    alignItems: 'center',
  },
  cameraContainer: {
    width: windowWidth, // Set the camera container to full screen width
    height: windowHeight, // Set the camera container to full screen height
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor:'gray',
    marginBottom:150
  },
  camera: {
    width: windowWidth * 0.2, // Set the camera width to 80% of the screen width
    height: windowWidth * 0.2, // Set the camera height to 80% of the screen width (to maintain aspect ratio)
  },
  marker: {
    borderColor: 'green', // Set the border color to gray
    borderWidth: 2, // Adjust the border width as needed
    borderRadius: 10, // Adjust the border radius as needed
  },
  scannerContainer: {
    marginBottom:90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
  },
  text2: {
    fontSize: 18,
    color: 'white',
  },
})

export default Home






