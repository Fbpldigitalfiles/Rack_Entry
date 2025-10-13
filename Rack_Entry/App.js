import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  LogBox,
  TouchableOpacity,
  View,
  Modal,
  Animated,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { URL } from './constants';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import { FriendsContext } from './FriendsContext';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { faTruck } from '@fortawesome/free-solid-svg-icons/faTruck';
import { faScaleBalanced } from '@fortawesome/free-solid-svg-icons/faScaleBalanced';
import { faBoxesStacked } from '@fortawesome/free-solid-svg-icons/faBoxesStacked';
import { faCopyright } from '@fortawesome/free-solid-svg-icons/faCopyright';
import {faList} from '@fortawesome/free-solid-svg-icons/faList';
import { faRefresh } from '@fortawesome/free-solid-svg-icons/faRefresh';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons/faSquarePlus';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons/faDeleteLeft';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons/faFileInvoice';
import { faQrcode } from '@fortawesome/free-solid-svg-icons/faQrcode';
import { faPerson,faCircleCheck,faWifi,faVideo,faRectangleXmark,faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
library.add(fab, faPerson,faGear,faTruck,faScaleBalanced,faBoxesStacked,faCopyright,faList,faRefresh,faAngleDown,faXmark,faSquarePlus,faDeleteLeft,faArrowLeft,faArrowRight,faFileInvoice,faQrcode,faWifi,faArrowRightLong)
import Home from './Home';
import Rack_details from './Rack_details';
import Lots from './lots';
import NetInfo from '@react-native-community/netinfo';
import VideoPlayerscreen from './VideoPlayer'; // Your video player component
// BackgroundTask.create();
const Stack = createStackNavigator();
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
function App()  {
  const [isNetworkDisconnected, setIsNetworkDisconnected] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [serverDisconnected, setServerDisconnected] = useState(false);
  const [isWifi, setIsWifi] = useState(false);
  const [isRestartDisabled, setIsRestartDisabled] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const [loadingVisible, setoadingVisible] = useState(false)

  const videoSource = require('./assets/wifi.mp4');
  const fadeAnim = useState(new Animated.Value(0))[0];
  const { width, height } = Dimensions.get('window');


  // Fade animation
  useEffect(() => {
    if (isNetworkDisconnected) {
      fadeAnim.setValue(0);
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isNetworkDisconnected]);

  // Listen to device connectivity
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsNetworkDisconnected(!state.isConnected);
      // console.log("is wifi connected ",state.isConnected)
    });

    return () => {
      unsubscribe(); // cleanup
    };
  }, []);


     async function serverstatus(){
    const state = await NetInfo.fetch();
    const wifi = state.type === 'wifi' && state.isConnected;
    // console.log("server disconeneted")
    setIsWifi(wifi);
      if(!wifi) return 
    fetch(`${URL}/check`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
     
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("data",responseData)
        
        if(responseData.error){
          throw new Error("Error in the response");
        }
        handleCloseAlert();
          //  //console.log(responseData)
      }).catch(error => {
        console.log("error",error)
        handleShowAlert();
        // //console.log('Server disconnected:');
      });
  }


  useEffect(() => {
          serverstatus();

          const interval = setInterval(serverstatus, 10000);
      
          return () => clearInterval(interval);

     
  }, []);


  const playVideo = () => setShowVideoPlayer(true);
  const closeVideoPlayer = () => setShowVideoPlayer(false);
  const handleCloseAlert = () => setServerDisconnected(false);
  const handleShowAlert = () => setServerDisconnected(true);

  const restartServer = () =>{   
          setoadingVisible(true) 
          setIsRestartDisabled(true)
          setTimeout(() => {
              setIsRestartDisabled(false)
            }, 60000); 
          fetch(`http://192.168.1.111:9000/restart_all`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({})
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log("data from api",responseData)
          setoadingVisible(false)
          if(responseData.result){
            setSuccessModalOpen(true)
            setTimeout(() => {
              setSuccessModalOpen(false)
            }, 1000);
            handleCloseAlert()
          }
          }).catch((error) =>{
            setoadingVisible(false)
            console.log("error",error)
          })
        }


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
  
    return <Text style={{paddingRight:20, fontWeight:'bold' , color:'black', fontSize:22}}>{formattedDateTime}</Text>;
  };

    return (
     <>
     <Modal visible={loadingVisible}>
             <View style={{flex:1, flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
               <ActivityIndicator size={300}/>
             </View>
           </Modal>

      <Modal
    visible = {successModalOpen}
    animationType="slide"
    style={{backgroundColor:'black',display:'flex',height}}
  >
      {/* <View style={{flex:1, flexDirection:'column',justifyContent:'center',alignItems:'center',position:'absolute',top:'10%',left:'40%',backgroundColor:'white',paddingVertical:40,paddingHorizontal:100,borderRadius:5}}> */}

      <View style={{width:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'white',height:'100%'}}>
      <FontAwesomeIcon icon={faCircleCheck} size={200} color="green"/>
    </View>
    </Modal> 


      {serverDisconnected && (
        <Modal visible={serverDisconnected} transparent animationType="fade">
          <View style={[styles.alertContainer, { marginTop: 'auto', marginBottom: 'auto' }]}>
            <View
              style={[
                styles.alertBox,
                {
                  width: 600,
                  height: 300,
                  gap: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
            >
              <Text style={[styles.messageText, { fontSize: 40 }]}>
                Network Disconnected!!!
              </Text>
              <View style={{ flexDirection: 'row', gap: 60, alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={handleCloseAlert}
                  style={{ backgroundColor: 'red', borderRadius: 5, padding: 10 }}
                >
                  <Text style={[styles.closeButton, { fontSize: 24, color: 'white' }]}>
                    Close
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor:
                        isRestartDisabled || !isWifi ? '#ccc' : 'green',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    },
                  ]}
                  disabled={isRestartDisabled || !isWifi}
                  onPress={restartServer}
                >
                  <Text style={[styles.buttonText, { fontSize: 24 }]}>
                    Repair Server
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      <Modal visible={isNetworkDisconnected} animationType="fade" transparent>
        <View style={styles.modalWrapper}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 30 }}>Wi-Fi is disconnected</Text>
            <FontAwesomeIcon icon={faWifi} size={150} color="red" />
            <View style={{ flexDirection: 'row', gap: 30, marginLeft: '-16%' }}>
              <Animated.View style={{ opacity: fadeAnim }}>
                <FontAwesomeIcon icon={faArrowRightLong} size={80} />
              </Animated.View>
              <TouchableOpacity onPress={playVideo}>
                <FontAwesomeIcon icon={faVideo} size={70} color="blue" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={showVideoPlayer} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton1} onPress={closeVideoPlayer}>
            <Text style={styles.closeButtonText1}>
              <FontAwesomeIcon icon={faRectangleXmark} size={55} color="red" />
            </Text>
          </TouchableOpacity>
          <View style={styles.videoContainer}>
            <VideoPlayerscreen videoSource={videoSource} />
          </View>
        </View>
      </Modal>

        <NavigationContainer
       
        >
          <Stack.Navigator
   
          >
             {/* <Stack.Screen
              name="Readfile"
              component={Readfile}
            />
            <Stack.Screen
              name="Readimage"
              component={Readimage}
            /> */}
              {/* <Stack.Screen
              name="MyComponent"
              component={drop}
                      // screenOptions={{ headerShown: false }}
            /> */}
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerRight: () => <TimeDisplay />,
                // headerLeft: () => <TimeDisplay />,
              }}
                      // screenOptions={{ headerShown: false }}
            />
         
             <Stack.Screen
              name="rack_details"
              component={Rack_details}
              // options={{ headerShown: false }}
              options={({navigation}) =>({
                headerRight: () => <TimeDisplay />,
                headerTitle: 'Coil Rack Assignment',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontSize: 30, // Adjust the font size as desired
                },
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                      <FontAwesomeIcon icon={faArrowLeft} size={30}/>
                      </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="lots"
              component={Lots}
              // options={{ headerShown: false }}
              options={{
                headerRight: () => <TimeDisplay />,
                headerTitle: 'Lot Details',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontSize: 30, // Adjust the font size as desired
                },
            
              }}
            />

           



          </Stack.Navigator>
        </NavigationContainer>
     </>
    );
  
}

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    height: 400,
    width: 600,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  videoContainer: {
    width: '95%',
    height: '80%',
    aspectRatio: 16 / 9,
  },
  closeButton1: {
    position: 'absolute',
    top: 10,
    right: 15,
    zIndex: 10,
  },
  closeButtonText1: {
    color: '#000',
    fontWeight: 'bold',
  },
  alertContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  messageText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    fontWeight: 'bold',
  },
});
export default App
// ...





