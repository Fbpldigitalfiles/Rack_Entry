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
  import DropDownPicker from 'react-native-dropdown-picker';
  import { SelectList } from 'react-native-select-list';
  function Lots({ navigation }) {

    // const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [value, setValue] = useState(null);
    const [value1, setValue1] = useState(null);
    const [supplier, setsupplier] = useState(null);
    const [m_width, setm_width] = useState(null);
    const [materialname, setmaterialname] = useState(null)
    const [smaterialname, setsmaterialname] = useState(null)
    const [smaterialId, setsmaterialId] = useState(null)
    const [inward_data, setinward_data] = useState([])
    const [materiallist, setmateriallist] = useState(null)
    const [rackNumbers, setRackNumbers] = useState({});
    const [rackNumber_ids, setrackNumber_ids] = useState({});
    const [rackNumbers_list, setRackNumbers_list] = useState({});
    const [indexwise_racks, setindexwise_racks] = useState([]);
    const [selectedRackNumbers, setSelectedRackNumbers] = useState([]);
 
    const [load, setload] = useState(false)
    const searchInputRef = useRef(null);
    const route = useRoute();
    const handleSelect = (index, value) => {
      setSelectedRackNumbers(prevState => {
        const newState = [...prevState];
        newState[index] = value;
        return newState;
      });
    };
    const [isModalVisible, setModalVisible] = useState(false);
    const [duplicateValues, setDuplicateValues] = useState([]);
    const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);

    const handleRackNumberChange = (index, letter, number) => {
      console.log('letter', letter)
      const formattedRackNumber = (letter != '' && letter != null && letter != undefined) ? `${letter.toUpperCase()} - ${number}` : number;
      console.log('formattedRackNumber', formattedRackNumber)
      setRackNumbers((prevRackNumbers) => ({
        ...prevRackNumbers,
        [index]: formattedRackNumber,
      }));
     
    };
    useLayoutEffect(() => {
 
      navigation.setOptions({ headerShown: false });
    }, [navigation]);
    const handleLetterChange = (index, value) => {
      const letter = value.length <= 1 ? value.toUpperCase() : '';
      // const number = rackNumbers[index]?.split(' - ')[1] || rackNumbers[index]?.replace(/[^0-9]/g, '') || '';
      handleRackNumberChange(index, letter, 0);
    };
  
    const handleNumberChange = (index, value) => {
      const value1 = rackNumbers[index];
      const letter = value1 && value1.includes(' - ') ? value1.split(' - ')[0] : '';
      // const letter = rackNumbers[index]?.split(' - ')[0] || '';
      console.log('letter1', letter)
      handleRackNumberChange(index, letter, value);
    };
    const handleNumberBlur = (index, ar_index) => {
      console.log('rackNumbers',rackNumbers)
      const currentValue = rackNumbers[index];
     
      if (!currentValue) {
        // Handle empty value case, for example, just return or skip further logic
        console.log('currentValue is empty');
        return;
      }
      const isDuplicate = rackNumbers_list.some(item => item.value === currentValue);
      

    //  console.log('is duplicated', isDuplicate1)
    console.log('is currentValue', currentValue)
      if (!isDuplicate) {
        handleRackNumberChange(index, '', '');
        Alert.alert(`Warning !!!', Rack ${rackNumbers[index]} is Busy Or Rack doesn't exist.`);
         
        
       }
        else{
        const key = rackNumbers_list.find(item => item.value === currentValue);
        setrackNumber_ids((prevRackNumbers) => ({
          ...prevRackNumbers,
          [currentValue]: key.key,
        }));
        if (!key) {
          console.error('No matching key found for currentValue:', currentValue);
          return;
        }
        // console.log('index',indexwise_racks )
        const index_array = [...indexwise_racks];
        // console.log('index1',index_array )
        index_array[ar_index] = key.key;
        // console.log('index3',index )
        setindexwise_racks(index_array)
      }
    };
    
  const refreshpage = ()=>{
    setinward_data([])
    setm_width(null)
    setValue1(null)
    
    fetch(`${URL}/coil_supplierlistmaterialname_rack_assign`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body:  JSON.stringify({})
     
    })
      .then((response) => response.json())
      .then((responseData1) => {
        fetch(`${URL}/read_rack_number`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body:  JSON.stringify({})
         
        })
          .then((response) => response.json())
          .then((responseData) => {
            setsupplier(responseData1.supplier_list)
            setmateriallist(responseData1.materials)
            setmaterialname(responseData1.material_names)
            setRackNumbers_list(responseData.data)
              console.log('responseData1',rackNumbers)
          })
        
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
  
    return <Text style={{paddingRight:20, fontWeight:'bold'}}>{formattedDateTime}</Text>;
  };
    useEffect(() => {
    //   const  storedValue  = route.params;
    //  const p_no = storedValue.punch_no;
    
      fetch(`${URL}/coil_supplierlistmaterialname_rack_assign`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body:  JSON.stringify({})
       
      })
        .then((response) => response.json())
        .then((responseData1) => {
          fetch(`${URL}/read_rack_number`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body:  JSON.stringify({})
           
          })
            .then((response) => response.json())
            .then((responseData) => {
             
                  // setrackswidth(responseData2.data)
                  setsupplier(responseData1.supplier_list)
                  setmateriallist(responseData1.materials)
                  setmaterialname(responseData1.material_names)
                  setRackNumbers_list(responseData.data)
                    console.log('responseData1',responseData1.material_names)
               


            })
          
        })
   }, []);

  
const getmaterialdata =  (e) =>{
  setload(true)
    // console.log('selctedOption',selctedOption)
    fetch(`${URL}/coils_inwardlist_materialwise`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body:  JSON.stringify({m_id:e.value})
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('responseData',responseData.data)
        setinward_data(responseData.data)
        setSelectedRackNumbers(new Array(responseData.data.length).fill(null));
        setload(false)
       // setmaterialname(fmaterial_list)
        // console.log('fmaterial_list',fmaterial_list)

      })

}
const getlotnumdata =  (e) =>{
  setsmaterialname(e.label)
  setsmaterialId(e.value)
  setload(true)
    // console.log('selctedOption',selctedOption)
    fetch(`${URL}/coils_inwardlist_lotwise`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body:  JSON.stringify({m_id:e.value})
    })
      .then((response) => response.json())
      .then((responseData) => {
        // console.log('responseData',responseData.data)
        fetch(`${URL}/get_material_width`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body:  JSON.stringify({m_id:e.value})
        })
          .then((response) => response.json())
          .then((responseData1) => {
            console.log("responseData",responseData)
            let mwidth = parseInt(responseData1.data[0][0]) + 25 
            setm_width(mwidth)
            setinward_data(responseData.data)
            // setSelectedRackNumbers(new Array(responseData.data.length).fill(null));
             setload(false)
           // setmaterialname(fmaterial_list)
            // console.log('fmaterial_list',fmaterial_list)
          })
       

      })
}
const submitData =  (e) =>{
  
  console.log('indexwise_racks',indexwise_racks)
// Convert the object values to an array
const valuesArray = Object.values(rackNumbers);

// Create a map to count occurrences of each value
const valueCounts = valuesArray.reduce((acc, value) => {
  acc[value] = (acc[value] || 0) + 1;
  return acc;
}, {});

// Filter values that have more than one occurrence
const duplicates = Object.keys(valueCounts).filter(key => valueCounts[key] > 1);

// Convert the keys back to numbers (if they were numbers)
// const duplicateValues = duplicates.map(Number);

if(duplicates.length == 0){
  // Alert.alert('hi')
  // fetch(`${URL}/insert_inward_coils_to_rack`, {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   body:  JSON.stringify({rackNumbers:rackNumbers, rack_ids:rackNumber_ids, m_id:value1, ic_id:inward_data[0][2]})
  // })
  //   .then((response) => response.json())
  //   .then((responseData) => {
  //     console.log('responseData',responseData)
  //     if(responseData.result){
  //       Alert.alert('Rack details updated successfully!')
  //       navigation.navigate('Home')
  //     }
     

  //   })
  setConfirmModalVisible(true);
}else {
  setDuplicateValues(duplicates);
  setModalVisible(true);
}
}
const confirmSubmit = () => {
  setConfirmModalVisible(false); // Hide the confirmation modal

  // Proceed with the fetch method
  fetch(`${URL}/insert_inward_coils_to_rack`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rackNumbers: rackNumbers,
      rack_ids: rackNumber_ids,
      m_id: value1,
      ic_id: inward_data[0][2],
      indexwise_racks : indexwise_racks
    }),
  })
    .then((response) => response.json())
    .then((responseData) => {
      console.log("responseData", responseData);
      if (responseData.result) {
        Alert.alert("Rack details updated successfully!");
        navigation.navigate("Home");
      }
    });
};
const renderColumns = (items) => {
  return items.map((item, index) => (
    <View key={index} style={styles.column}>
      <Text style={styles.keyText}>{item.key}</Text>
      <Text style={styles.valueText}>{item.value}</Text>
    </View>
  ));
};

const renderRows = () => {
  const entries = Object.entries(rackNumbers).map(([key, value]) => ({ key, value }));
  const rows = [];

  for (let i = 0; i < entries.length; i += 3) {
    rows.push(
      <View key={i} style={styles.row}>
        {renderColumns(entries.slice(i, i + 3))}
      </View>
    );
  }

  return rows;
};
const proceed = (id, tc, invoice, coils, weight, s_name,tc_date)=>{
      const  storedValue  = route.params;
     const p_no = storedValue.punch_no;
    navigation.navigate('rack_details', {p_no,id, tc, invoice, coils, weight, m_id : value1, s_name,smaterialname,smaterialId,m_width,tc_date})
}
    return (
      <View> 
   <Appbar.Header style={{height:80,backgroundColor:'#A3DAF0'}}>
   <TouchableOpacity onPress={()=> {navigation.goBack()} } style={{paddingLeft:20}}>
      <FontAwesomeIcon icon="arrow-left" size={30} color="black" />
            </TouchableOpacity>
      <TouchableOpacity onPress={refreshpage} style={{paddingLeft:50}}>
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
      <View >
      <View  style={{ flexDirection: 'row', width:"100%",  flex:0 , paddingTop:10 , paddingBottom:10, paddingLeft:0, marginLeft:20, marginTop:20, zIndex:999,}}>
 
      <View style={{flex: 0.6,flexDirection: 'row', marginLeft:10, borderStyle:'solid', borderWidth:1,borderRadius:5,}}>
    <View style={{marginLeft:20}}><Text style={{fontSize:20, color:'black', marginTop:20, marginLeft:10, paddingTop:1}}>Material Name</Text></View>
    
      <View style={styles.container}>
      <DropDownPicker
          open={open1}
          value={value1}
          items={materialname!= null ?materialname:[]}
          setOpen={setOpen1}
          setValue={setValue1}
          setItems={setmaterialname}
          searchable={true}
          onSelectItem={(e)=>getlotnumdata(e)}
          placeholder="Select a Material Name"
          searchPlaceholder="Search..."
          dropDownContainerStyle={styles.dropDownContainer}
          autoFocus={false}
        itemStyle={styles.item}
        listItemLabelStyle={styles.listItemLabel}
        listItemContainerStyle={styles.listItemContainer}
        placeholderStyle={styles.placeholder}
        searchTextInputProps={{
          ref: searchInputRef,
          keyboardType: 'numeric',
          fontSize:20,
          autoFocus:false
        }}
        selectedItemLabelStyle={styles.selectedItemLabel}
        selectedItemContainerStyle={styles.selectedItemLabel}
        textStyle={{
          fontSize: 20,
          paddingLeft:15
        }}
        onOpen={() => {
          setTimeout(() => {
            searchInputRef.current?.focus();
          }, 100);
        }}
        />
        </View>
      </View>
      {/* <View style={{flex: 0.4, marginLeft:50, }}>
      {value1 &&  inward_data.length!= 0 && (
          <View style={{width:'70%', marginTop:10, zIndex:0, marginBottom:0}}>
       
          <TouchableOpacity
        style={[styles.button,{    backgroundColor:'#0D8C66',flexDirection: 'row',
        alignItems: 'center', paddingLeft:'30%'}]}
        onPress={ 
         () => { 
           submitData()
          }
      }
      >
        <Text style={styles.buttonText}>Submit</Text>
        
      </TouchableOpacity>
      </View>
      )}
      </View> */}
      </View>
      {inward_data &&  inward_data.length!= 0 && (
      <View style={{  width:"95%" , flexWrap: 'wrap', paddingTop:15 ,flex:0,  paddingBottom:25, paddingLeft:15, paddingRight:0, borderStyle:'solid', borderWidth:1, marginLeft:30, marginRight:10, marginTop:10, borderRadius:5, zIndex:1}}>
      <ScrollView scrollEnabled={true} nestedScrollEnabled={true}  > 
        <View  style={{ flexDirection: 'row', flexWrap: 'wrap', zIndex:1, marginBottom:80, flex:1,paddingBottom:500}}>
        {inward_data.map((item, index) => (
  <View
    key={index}
    style={{
      flexDirection: 'row',
      marginLeft:0,
      width: '99%',
      // flex:0.5,
      paddingTop: 10,
      flex: 0,
      paddingBottom: 10,
      paddingLeft: 10,
      margin: 5,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      zIndex: 1// Ensure parent container has zIndex
    }}
  >
    <View style={[styles.inputContainer, { flexDirection: 'row' }]}>
      <Text style={[styles.label, { fontSize: 20, fontWeight: '700', marginRight: 20 }]}>
        {index + 1}.
      </Text>
      <View style={{width:270}}>
      <Text style={[styles.label, { marginTop: 5, textAlign:'center' }]}>Supplier Name</Text>
      <Text
        style={[
          styles.label,
          {
            fontWeight: 'bold',
            marginLeft: 5,
            borderStyle: 'solid',
            borderWidth: 1,
            padding: 15,
            borderRadius: 5,
            marginTop: 5,
            textAlign:'center'
          }
        ]}
      >
        {item['s_name']}
      </Text>
      </View>
      <View style={{width:220}}>
      <Text style={[styles.label, { marginTop: 5, textAlign:'center' }]}>TC Number</Text>
      <Text
        style={[
          styles.label,
          {
            fontWeight: 'bold',
            marginLeft: 5,
            borderStyle: 'solid',
            borderWidth: 1,
            padding: 15,
            borderRadius: 5,
            marginTop: 5,
            textAlign:'center'
          }
        ]}
      >
        {item['tc_num']}
      </Text>
      </View>
      <View style={{width:200}}>
      <Text style={[styles.label, { marginTop: 5 , marginLeft:20,textAlign:'center'}]}>TC Date</Text>
      <Text
        style={[
          styles.label,
          {
            fontWeight: 'bold',
            marginLeft: 5,
            borderStyle: 'solid',
            borderWidth: 1,
            padding: 15,
            borderRadius: 5,
            marginTop: 5,
            textAlign:'center'
          }
        ]}
      >
        {item['tc_date']}
      </Text>
      </View>
      <View style={{width:130}}>
      <Text style={[styles.label, { marginTop: 5,marginLeft:10,textAlign:'center' }]}>Total Coils</Text>
      <Text
        style={[
          styles.label,
          {
            fontWeight: 'bold',
            marginLeft: 5,
            borderStyle: 'solid',
            borderWidth: 1,
            padding: 15,
            borderRadius: 5,
            marginTop: 5,
            textAlign:'center'
          }
        ]}
      >
        {item['coils']}
      </Text>
      </View>
      <View style={{width:150}}>
      <Text style={[styles.label, { marginTop: 5,marginLeft:10,textAlign:'center' }]}>Total Weight</Text>
      <Text
        style={[
          styles.label,
          {
            fontWeight: 'bold',
            marginLeft: 5,
            borderStyle: 'solid',
            borderWidth: 1,
            padding: 15,
            borderRadius: 5,
            marginTop: 5,
            textAlign:'center'
          }
        ]}
      >
        {item['weight']} KG
      </Text>
      </View>
      <View style={{width:190,}}>
        <Button style={{backgroundColor:'green', borderStyle:'solid', borderRadius:5, marginLeft:20, height:60, marginTop:50, paddingTop:10 }} onPress={()=> proceed(item['l_id'],item['tc_num'],item['invoice'],item['coils'],item['weight'], item['s_name'],item['tc_date'])}><Text style={{color:'black', fontSize:20}}>Proceed</Text> 
        </Button>
      </View>
    </View>
    
  </View>
))}


      </View>
      </ScrollView>
      </View>
      )}
      {load && (
        <View style={{marginTop:100}}>
        <ActivityIndicator size={200} color="green"></ActivityIndicator></View>
      )}
     
      </View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{fontSize:28, color:'red', fontWeight:'bold', marginBottom:20}}>Warning!!!</Text>
            <Text style={[styles.modalText, {color:'#c4635c'}]}>Rack Numbers Cant't be duplicated!!</Text>
            <Text style={styles.modalText}>
              The following rack numbers are repeated: <Text style={styles.boldText}>{duplicateValues.join(", ")}</Text>
            </Text>
            <Button title="Close" style={{backgroundColor:'#67a0d6', width:150, height:50, paddingTop:5, marginTop:20, borderRadius:10}} onPress={() => setModalVisible(false)} >
              <Text style={{color:'black', width:100, fontSize:20}}>OK</Text>
              
              </Button>
          </View>
        </View>
      </Modal>
      <Modal
        visible={isConfirmModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setConfirmModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={[styles.modalText,{fontWeight:'bold', marginBottom:30}]}>Confirmation Alert!!</Text>
            {/* <ScrollView>{rackNumbers.length}</ScrollView> */}
            <Text style={styles.modalText}>You have Enterd Total <Text style={{color:'#29094a', fontSize:32, fontWeight:'bold'}}>{Object.keys(rackNumbers).length}</Text> Rack Numbers. Please reconfirm before submitting!!.</Text>
          
            <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={() => setConfirmModalVisible(false)} style={{backgroundColor:'#756e2d',width:200, height:60,paddingTop:10}}> <Text style={{color:'black', fontSize:20,paddingTop:5}}>Re Check</Text> </Button>
              <Button title="Confirm" onPress={confirmSubmit} style={{backgroundColor:'#366945', width:200, height:60,paddingTop:10}}> <Text style={{color:'black',fontSize:20,paddingTop:5}}>Submit</Text></Button>
              
            </View>
          </View>
        </View>
      </Modal>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      // flex: 1,
      width:'65%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      // height:200
    },
    dropDownContainer: {
      backgroundColor: '#fafafa',
      maxHeight:500,
      zIndex:999
      // height:200
    },
    item: {
      justifyContent: 'flex-start',
      height: 80, // Increase the height of each item
      marginVertical: 10, // Add space between items,
      marginHorizontal:10,
      zIndex:999
      
    },
    listItemLabel: {
      fontSize: 20 // Increase the font size of the item labels
    },
    listItemContainer: {
      borderWidth: 1, // Add border width
      borderColor: '#ccc', // Set border color
      borderRadius: 5, // Optionally, add border radius for rounded corners
      marginVertical: 5, // Adjust vertical margin to control spacing between borders
      paddingHorizontal: 20,
      paddingVertical:5 ,
      height:70,
      zIndex:999// Optionally, add horizontal padding
    },
    placeholder: {
      paddingTop:8,
      fontSize: 20, // Adjust placeholder font size
      color: 'black',
      height:50 ,
      paddingLeft:25// Optionally, customize placeholder text color
    },
    inputContainer: {
      flex: 0.35,
      marginHorizontal: 8,
      fontSize:20
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
      color:'black',
      paddingTop:10
    },
    input: {
      height: 50,
      backgroundColor:'white',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 4,
      paddingHorizontal: 8,
      width:'100%',
      marginLeft:10,
      fontSize:20,
      textAlign:'center'

    },
    button: {
      backgroundColor: '#0D8C66',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      fontSize: 25, // Adjust the font size as desired
      color: 'white',
      textAlign:"center",
      paddingLeft:10
    },
    selectedItemLabel: {
      fontSize:20, // Adjust the font size as needed
      color: 'green',
      // height:80 , // Optionally, you can set the color
    },
    scrollViewContent: {
      flexGrow: 1, // Ensures ScrollView content expands to fill the container
      justifyContent: 'center', // Optional: Center content vertically
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
      width: 650,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
      height:400,
      borderStyle:'solid',
      borderWidth:2
    },
    modalText: {
      fontSize: 24, // Font size set to 24
      color: 'black', // Text color set to black
      textAlign: 'center',
      marginBottom: 20,
    },
    boldText: {
      fontWeight: 'bold', // Make numbers bold
      fontSize:29,
      borderStyle:'solid',
      borderWidth:1,
      borderColor:'black',
      padding:5
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginBottom: 10,
    },
    column: {
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      marginHorizontal: 10,
    },
    keyText: {
      fontSize: 24,
      color: 'black',
    },
    valueText: {
      fontSize: 24,
      color: 'black',
      fontWeight: 'bold', // Make value bold
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 80,
      width: '100%',
    },
  });
  
  export default Lots



 