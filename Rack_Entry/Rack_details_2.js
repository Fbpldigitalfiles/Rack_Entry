import React, { useLayoutEffect, useEffect, useRef, useState } from "react"
import {
  AppState,
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
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback, Keyboard, Dimensions, Picker, ActivityIndicator

} from "react-native"


import { Appbar, FAB, useTheme, TextInput, RadioButton, Provider, DefaultTheme, Menu, Divider, Snackbar, Button } from 'react-native-paper';
// import { Dropdown } from 'react-native-element-dropdown';
import { URL } from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import DropDownPicker from 'react-native-dropdown-picker';
import { SelectList } from 'react-native-select-list';
function Rack_details({ navigation }) {
  const numberInputRef = useRef(null);
  const letterInputRef = useRef(null)
  const [isNumberFocused, setIsNumberFocused] = useState(false);
  const [isLetterFocused, setIsLetterFocused] = useState(false);
  const [currentIndexParamForNumber, setCurrentIndexParamForNumber] = useState('');
  const [currentArrayIndexParamForNumber, setCurrentArrayIndexParamForNumber] = useState('')
  const [currentValueParamForLetter, setCurrentValueParamForLetter] = useState('');
  const [currentKeyParamForLetter, setCurrentKeyParamForLetter] = useState('');
  const [currentAlphabetValue,setCurrentAlphabetValue] = useState('');
  const [currentNumericValue,setCurrentNumericValue] = useState('');
  // const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [value, setValue] = useState(null);
  const [value1, setValue1] = useState(null);
  const [supplier, setsupplier] = useState(null);
  const [materialname, setmaterialname] = useState(null)
  const [inward_data, setinward_data] = useState([])
  const [materiallist, setmateriallist] = useState(null)
  const [rackNumbers, setRackNumbers] = useState({}); // The rack no is with the letter and number ex:- A-12
  const [rackletters, setrackletters] = useState({})
  const [l_wiseweight, setl_remaining_weight] = useState({})
  const [rackinital, setrackinital] = useState({})
  const [rackNumber_ids, setrackNumber_ids] = useState({});
  const [rackNumbers_list, setRackNumbers_list] = useState({}); // Data came from the backend to check if dulicates are available or not
  const [indexwise_racks, setindexwise_racks] = useState([]); // Holds only the indexes(keys/rack_id) of the racks
  const [selectedRackNumbers, setSelectedRackNumbers] = useState([]);
  const [load, setload] = useState(false)
  const [s_name, sets_name] = useState()
  const [punch_no, setpunch_no] = useState()
  const [smaterialname, setsmaterialname] = useState(null)
  const [m_width, setm_width] = useState(null);
  const [rackswidth, setrackswidth] = useState({});
  const [letters, setletters] = useState({})
  const [letterwise_weight, setletterwise_weight] = useState({});
  const searchInputRef = useRef(null);
  const [inputstatus, setinputstatus] = useState([]);
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
  const [tc_num, settc_num] = useState();
  const [invoice, setinvoice] = useState();
  const [coils, setcoils] = useState();
  const [weight, setweight] = useState();
  const [lotid, setlotid] = useState();



  const handleRackNumberChange = (index, letter, number) => {
    
    
    // let Initial = rackinital[index]
    let Initial = letter

    console.log("number")
        //Checks for the condition if number is empty
        if(number==='' ){
            
          console.log('letter........', Initial,'from ifffffffffffff fun')
          let formattedRackNumber;
          console.log('formattedRackNumber', formattedRackNumber )
          if (Initial != null && Initial != undefined) {
            setrackletters((prevRackNumbers) => ({
              ...prevRackNumbers,
              [index]: Initial.toUpperCase(),
            }));
            formattedRackNumber = `${Initial.toUpperCase()}`
            console.log('formattedRackNumber', formattedRackNumber,`${Initial.toUpperCase()}`+number+Initial)
    
          }

          else {
            formattedRackNumber = number
          }
            
          console.log("formateted rack nuber from numberchange ",formattedRackNumber,rackNumbers,index)
          setRackNumbers((prevRackNumbers) => ({
            ...prevRackNumbers,
            [index]: formattedRackNumber,
          }));
        
      }
      // Cheks if the below condition if the number is != ''
    else if (number !== 0 && number !== null) {
    let formattedRackNumber
      console.log('letter........'+Initial,'from elseeeeee if ',number)

      console.log('formattedRackNumber', formattedRackNumber)
      if (Initial != ''&& Initial!=' ' && Initial != null && Initial != undefined) {
        setrackletters((prevRackNumbers) => ({
          ...prevRackNumbers,
          [index]: Initial.toUpperCase(),
        }));
        formattedRackNumber = `${Initial.toUpperCase()} - ${number}`
        console.log('formattedRackNumber'+Initial+ formattedRackNumber,`${Initial.toUpperCase()} - ${number}`+number+Initial)

      }

      else {
        formattedRackNumber = number
      }

      console.log("formateted rack nuber from numberchange"+Initial+formattedRackNumber,rackNumbers,index)
      setRackNumbers((prevRackNumbers) => ({
        ...prevRackNumbers,
        [index]: formattedRackNumber,
      }));
    }
  };

  const handleLetterChange = (index, value) => {
    setCurrentAlphabetValue(value);
    setIsLetterFocused(true)
    setIsNumberFocused(false)
    const letter = value.length <= 1 ? value.toUpperCase() : '';
    console.log('lettersssssss', letter)
    setrackinital((prevRackNumbers) => {
      console.log("index",index,letter)
      return {
      ...prevRackNumbers,
      [index]: letter,
    }});
    if (letter != '' && letter != null && letter != undefined) {
      // setrackletters((prevRackNumbers) => ({
      //   ...prevRackNumbers,
      //   [index]: letter.toUpperCase(),
      // }));
      let rackNumberWithoutAlphabet = rackNumbers[index]
      console.log("rackNumber Without Alphabet----------",rackNumberWithoutAlphabet)
      rackNumberWithoutAlphabet = rackNumberWithoutAlphabet && rackNumberWithoutAlphabet.includes(' - ')?rackNumberWithoutAlphabet.split(' - ')[1] : rackNumberWithoutAlphabet
      rackNumberWithoutAlphabet = rackNumberWithoutAlphabet===undefined ? '':rackNumberWithoutAlphabet
      console.log("rackNumber Without Alphabet",rackNumberWithoutAlphabet)
      handleRackNumberChange(index,letter,currentNumericValue)
      // rackNumberWithoutAlphabet = rackNumberWithoutAlphabet  === undefined ? '' : rackNumberWithoutAlphabet.trim()
      // const formattedRackNumber = rackNumberWithoutAlphabet !== '' && rackNumberWithoutAlphabet !== undefined? `${letter} - ${rackNumberWithoutAlphabet}` : letter 
      // setRackNumbers((prevRackNumbers) => ({
      //   ...prevRackNumbers,
      //   [index]: formattedRackNumber,
      // }));
      console.log("racksnumber of index ",rackNumberWithoutAlphabet,rackNumberWithoutAlphabet!==undefined,'.')
    }



    // const number = rackNumbers[index]?.split(' - ')[1] || rackNumbers[index]?.replace(/[^0-9]/g, '') || '';
    // handleRackNumberChange(index, letter, 0);
  };

  // Function to handle onBlur event
  const handleLetterBlur = (key, value) => {
    console.log("key ", key)
    if (key) {
      let racksavalabelcount = rackswidth[key] / m_width;
      const countA = Object.values(rackletters).filter(value => value === key).length;
      console.log('racksavailablecount', racksavalabelcount, countA,rackletters)
      if (racksavalabelcount < countA) {
        setinputstatus((prevRackNumbers) => ({
          ...prevRackNumbers,
          [value]: false,
        }));
        let rackNumberWithoutAlphabet = rackNumbers[value]
        console.log("rackNumber Without Alphabet----------",rackNumberWithoutAlphabet)
        rackNumberWithoutAlphabet = rackNumberWithoutAlphabet && rackNumberWithoutAlphabet.includes(' - ')?rackNumberWithoutAlphabet.split(' - ')[1] : rackNumberWithoutAlphabet
        console.log("rackNumber Without Alphabet",rackNumberWithoutAlphabet)

        rackNumberWithoutAlphabet = rackNumberWithoutAlphabet===undefined ? '':rackNumberWithoutAlphabet
        handleRackNumberChange(value,currentAlphabetValue,currentNumericValue)
        Alert.alert(`Warning !!!', Rack ${key} Series Filled... There is no space to keep coils!!`);
        return false
      } else {
        setinputstatus((prevRackNumbers) => ({
          ...prevRackNumbers,
          [value]: true,
        }));
      }
    }
    else{
      handleRackNumberChange(value,currentAlphabetValue,currentNumericValue)
      
    }
    console.log("value,currentAlphabetValue,currentNumericValue",value,currentAlphabetValue,currentNumericValue)

  };




  const handleNumberChange = (index, value) => {
    setCurrentNumericValue(value)
    setIsNumberFocused(true)
    setIsLetterFocused(false)
    const value1 = rackNumbers[index] ? rackNumbers[index] : value;
    let hasAlphabetInRackNo = Number.isNaN(Number(value1)) // To check whether the rack number has also alphabet added in it or its just the number, if the alphabet is there then it will give nan and the value will be false according to the ! condition
    
    let letter;
    console.log('hasAlphabetInRackNo',hasAlphabetInRackNo,value1,rackNumbers[index],value)
    // If the rack no only has the numeric value i.e. !hasAlphabetInRackNo the letter should be ''
    if (value1 && !hasAlphabetInRackNo){
      letter = ''
    } 
    else {
      // Else if the value1 has Alphabet in rack no does not have number then letter should be value1
    //   if(value1 && hasAlphabetInRackNo && (!value1.includes(' - '))){
    //     letter = value1
    // }
      // If the value1 has Alphabet in rack no and also has the number in it then letter should be value1.split(' - ')[0]
    // else if(value1 && hasAlphabetInRackNo && value1.includes(' - ')){
    //     letter = value1.split(' - ')[0]
    // }

    // Else if the value1 has Alphabet in rack no and also has the number in it then letter should be value1.split(' - ')[0] and the if rack no doesn't have the number in it then value will be value1 as value contains only alphabet.
    console.log("value1,hasAlphabetInRackNo,value1.includes(' - ')",value1,hasAlphabetInRackNo,value1.includes(' - '))
    letter = value1 && hasAlphabetInRackNo && value1.includes(' - ') ? value1.split(' - ')[0]: value1

    }

    console.log("letter value",letter)
    // const letter = rackNumbers[index]?.split(' - ')[0] || '';
    handleRackNumberChange(index, letter, value);
  };



  const handleNumberBlur = (index, ar_index) => {
    const currentValue = rackNumbers[index];
    console.log('rackNumbers', rackNumbers,currentValue,index)

    if (!currentValue) {
      // Handle empty value case, for example, just return or skip further logic
      console.log('currentValue is empty');
      return;
    }
    const isDuplicate = rackNumbers_list.some(item => item.value === currentValue);
    const key = rackNumbers_list.find(item => {
      return item.value === currentValue
    }
    );

    let rackNumberWithoutAlphabet = currentValue
    let rackLetterWithoutNumber = currentValue
        console.log("rackNumber Without Alphabet----------",rackNumberWithoutAlphabet)
        rackNumberWithoutAlphabet = rackNumberWithoutAlphabet && rackNumberWithoutAlphabet.includes(' - ')?rackNumberWithoutAlphabet.split(' - ')[1] : rackNumberWithoutAlphabet
        console.log("rackNumber Without Alphabet",rackNumberWithoutAlphabet)

        rackNumberWithoutAlphabet = rackNumberWithoutAlphabet===undefined ? '':rackNumberWithoutAlphabet



        console.log("rackNumber Without Alphabet----------",rackLetterWithoutNumber)
        rackLetterWithoutNumber = rackLetterWithoutNumber && rackLetterWithoutNumber.includes(' - ')?rackLetterWithoutNumber.split(' - ')[0] : ''
        console.log("rackNumber Without Alphabet",rackLetterWithoutNumber)

        rackNumberWithoutAlphabet = rackLetterWithoutNumber===undefined ? '':rackLetterWithoutNumber
    //  console.log('is duplicated', isDuplicate1)
    console.log('is currentValue from handlenumberblur function', currentValue, isDuplicate)
    if (!isDuplicate) {
      handleRackNumberChange(index,currentAlphabetValue, currentNumericValue);
      Alert.alert(`Warning !!!', Rack ${rackNumbers[index]} is Busy Or Rack doesn't exist.`);


    } 
    else if (key){
      
      console.log("key from else is", key)
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
      console.log('indexarray[ar_index]', index_array[ar_index])
      // console.log('index3',index )
      setindexwise_racks(index_array)
      console.log("indexwise-racks", index_array)
    }
  };


  useEffect(() => {
    const storedValue = route.params;
    const p_no = storedValue.p_no;
    const lot_id = storedValue.id

    fetch(`${URL}/coil_supplierlistmaterialname_rack_assign`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({})

    })
      .then((response) => response.json())
      .then((responseData1) => {
        fetch(`${URL}/read_rack_number`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({})

        })
          .then((response) => response.json())
          .then((responseData) => {
            fetch(`${URL}/get_rack_width`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({})

            })
              .then((response) => response.json())
              .then((responseData2) => {
                setrackswidth(responseData2.data)
                console.log("from coil_supplierlistmaterialname_rack_assign", responseData1)
                console.log("from read_rack_number", responseData)
                console.log("from get_rack_width", responseData2)

                setsupplier(responseData1.supplier_list)
                setmateriallist(responseData1.materials)
                setmaterialname(responseData1.material_names)
                setRackNumbers_list(responseData.data)
                console.log('responseData1', rackNumbers)
                console.log("\n--------stored value", storedValue, '\n', route)

                getmaterialdata(lot_id)
                settc_num(storedValue.tc)
                setinvoice(storedValue.invoice)
                setweight(storedValue.weight)
                setcoils(storedValue.coils)
                setlotid(storedValue.id)
                setValue1(storedValue.m_id)
                sets_name(storedValue.s_name)
                setpunch_no(p_no)
                setsmaterialname(storedValue.smaterialname)
                setm_width(storedValue.m_width)
              })

          })

      })
  }, []);


  const getmaterialdata = (id) => {
    console.log('id', id)
    setload(true)
    // console.log('selctedOption',selctedOption)
    fetch(`${URL}/coils_inwardlist_materialwise`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lot_id: id })
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('responseData', responseData.data)
        setinward_data(responseData.data)
        setSelectedRackNumbers(new Array(responseData.data.length).fill(null));
        setload(false)
        // setmaterialname(fmaterial_list)
        // console.log('fmaterial_list',fmaterial_list)

      })

  }
 
  const submitData = (e) => {
    let numberInput = rackNumbers[currentIndexParamForNumber]
    numberInput = numberInput && numberInput.includes('-') ? numberInput.split('-')[1].trim():numberInput
    // numberInput = numberInput === undefined ? '': numberInput.trim()
    // if the number input is there then it will run or else it will return
    console.log("inpustaus",inputstatus)
    console.log("numberinput   "+numberInput,rackNumbers,rackNumbers[currentIndexParamForNumber].split('-')[1],inputstatus)
    if(numberInput===''|| numberInput === undefined){
      return
    }
    // Same values settings which were there in numberblur function
   const currentValue = rackNumbers[currentIndexParamForNumber];
    const key = rackNumbers_list.find(item => {
      // console.log("item.value",item)
      return item.value === currentValue
    })
    console.log('currentvalue',rackNumbers_list,currentValue,rackNumbers[currentIndexParamForNumber],rackNumbers,currentIndexParamForNumber,key)
    if(key===undefined){
      Alert.alert(`Warning !!!', Rack ${rackNumbers[currentIndexParamForNumber]} is Busy Or Rack doesn't exist.`);
      return
    }
    else{
    setrackNumber_ids((prevRackNumbers) => ({
      ...prevRackNumbers,
      [currentValue]: key.key,
    }));



    const index_array = [...indexwise_racks];
      // console.log('index1',index_array )

      index_array[currentArrayIndexParamForNumber] = key.key;
      // console.log('indexarray[ar_index]', index_array[currentArrayIndexParamForNumber])
      // console.log('index3',index )
      setindexwise_racks(index_array)
      // console.log("indexwise-racks", index_array)

    }

// Same values settings which were there in letterblur function
console.log("currentKeyParamForLetter",currentKeyParamForLetter)
let updatedRackStatus = {}; // Temporary status object, so that we can change the value and use it directly without the need to wait till the inputstatus state changes. because setting the state takes time
if (currentKeyParamForLetter) {
      let racksavalabelcount = rackswidth[currentKeyParamForLetter] / m_width;
      const countA = Object.values(rackletters).filter(value => value === currentKeyParamForLetter).length;
      console.log('racksavailablecount', racksavalabelcount, countA)
      if (racksavalabelcount < countA) {
         updatedRackStatus = {
          ...inputstatus,
          [currentValueParamForLetter]: false,
        };
        setinputstatus(updatedRackStatus);
        
        Alert.alert(`Warning !!!', Rack ${currentKeyParamForLetter} Series Filled... There is no space to keep coils!!`);
        return false
      } else {
         updatedRackStatus = {
          ...inputstatus,
          [currentValueParamForLetter]:true,
        };
        setinputstatus(updatedRackStatus);
      }
    }







    // Convert the object values to an array
    const valuesArray = Object.values(rackNumbers);
    // Create a map to count occurrences of each value
    const valueCounts = valuesArray.reduce((acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      console.log("acc[value]",acc[value],value)
      return acc;
    }, {});
    console.log('\nvaluesArray', valuesArray, rackNumbers, valueCounts);

    // Filter values that have more than one occurrence
    const duplicates = Object.keys(valueCounts).filter(key => valueCounts[key] > 1);
    const l_wiseweight = {}
    const uniqueLettersList = [...new Set(Object.values(rackletters))];
    uniqueLettersList.map((item) => {
      const countA = Object.values(rackletters).filter(value => value === item).length;
      let t_weight = rackswidth[item] - (countA * m_width);
      l_wiseweight[item] = t_weight;

    })
    setl_remaining_weight(l_wiseweight)
    console.log('remaining weight......................', l_wiseweight)
    const hasFalseValue = Object.values(updatedRackStatus).some(value => value === false);

    if (duplicates.length == 0 && !hasFalseValue) {

      setConfirmModalVisible(true);
      setDuplicateValues([])
    } else {
      setDuplicateValues(duplicates);
      setModalVisible(true);
    }
  }
  const confirmSubmit = () => {
    setConfirmModalVisible(false); // Hide the confirmation modal
    setload(true)

    console.log('ffffffffff', JSON.stringify({
      rackNumbers: rackNumbers,
      rack_ids: rackNumber_ids,
      m_id: value1,
      ic_id: inward_data[0][2],
      indexwise_racks: indexwise_racks,
      lot_id: lotid,
      punch_no: punch_no,
      l_wiseweight: l_wiseweight
    }))
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
        indexwise_racks: indexwise_racks,
        lot_id: lotid,
        punch_no: punch_no,
        l_wiseweight: l_wiseweight
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("responseData from insert_inward_coils_to_rack", responseData);
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










  return (
    <View>

      <View >
        <View style={{ flexDirection: 'row', width: "95%", flex: 0, paddingTop: 10, paddingBottom: 10, paddingLeft: 0, marginLeft: 20, marginTop: 5, zIndex: 999, }}>

          <View style={{ flex: 0.9, flexDirection: 'row', marginLeft: 10, borderStyle: 'solid', borderWidth: 1, borderRadius: 5, }}>
            <View

              style={{
                flexDirection: 'row',
                marginLeft: 0,
                width: '99%',
                // flex:0.5,
                paddingTop: 0,
                flex: 0,
                paddingBottom: 10,
                paddingLeft: 10,
                margin: 5,
                // borderStyle: 'solid',
                // borderWidth: 1,
                // borderColor: 'gray',
                // borderRadius: 5,
                zIndex: 1// Ensure parent container has zIndex
              }}
            >
              <View style={[styles.inputContainer, { flexDirection: 'row' }]}>
                <Text style={[styles.label, { fontSize: 20, fontWeight: '700', marginRight: 20 }]}>

                </Text>
                <View style={{ width: 270 }}>
                  <Text style={[styles.label, { marginTop: 0, textAlign: 'center' }]}>Supplier Name</Text>
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
                        textAlign: 'center'
                      }
                    ]}
                  >
                    {s_name}
                  </Text>
                </View>
                <View style={{ width: 200 }}>
                  <Text style={[styles.label, { marginTop: 0, textAlign: 'center' }]}>TC Number</Text>
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
                        textAlign: 'center'
                      }
                    ]}
                  >
                    {tc_num}
                  </Text>
                </View>
                <View style={{ width: 200 }}>
                  <Text style={[styles.label, { marginTop: 0, marginLeft: 20, textAlign: 'center' }]}>Invoice</Text>
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
                        textAlign: 'center'
                      }
                    ]}
                  >
                    {invoice}
                  </Text>
                </View>
                <View style={{ width: 350 }}>
                  <Text style={[styles.label, { marginTop: 0, marginLeft: 10, textAlign: 'center' }]}>Material</Text>
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
                        textAlign: 'center'
                      }
                    ]}
                  >
                    {smaterialname}
                  </Text>
                </View>
                {/* <View style={{width:170}}>
      <Text style={[styles.label, { marginTop: 0,marginLeft:20,textAlign:'center' }]}>Total Coils</Text>
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
        {coils}
      </Text>
      </View> */}
                {/* <View style={{width:170}}>
      <Text style={[styles.label, { marginTop: 0,marginLeft:20,textAlign:'center' }]}>Total Weight</Text>
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
       {weight} KG
      </Text>
      </View> */}

              </View>

            </View>
          </View>
          <View style={{ flex: 0.1, marginLeft: 20, }}>
            {inward_data.length != 0 && (
              <View style={{ width: '120%', marginTop: 30, zIndex: 0, marginBottom: 0 }}>

                <TouchableOpacity
                  style={[styles.button, {
                    backgroundColor: '#0D8C66', flexDirection: 'row',
                    alignItems: 'center', paddingLeft: '10%'
                  }]}
                  onPress={
                    () => {
                      const input = Object.values(inputstatus).some(value => value === false)
                      if (input) {
                        Alert.alert("Invalid Rack Number Assigned !!!")
                      } else {
                        submitData()
                      }

                    }
                  }
                >
                  <Text style={styles.buttonText}>Submit</Text>
                  {/* <FontAwesomeIcon icon="arrow-right" size={30} color="white" style={{ marginLeft:15 }} /> */}
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        {inward_data && inward_data.length != 0 && (
          <View style={{ width: "68%", flexWrap: 'wrap', paddingTop: 25, flex: 0, paddingBottom: 25, paddingLeft: 25, paddingRight: 0, borderStyle: 'solid', borderWidth: 1, marginLeft: 190, marginRight: 10, marginTop: 10, borderRadius: 5, zIndex: 1 }}>
            <ScrollView scrollEnabled={true} nestedScrollEnabled={true}  >
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', zIndex: 1, marginBottom: 80, flex: 1, paddingBottom: 700 }}>
                {inward_data.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      marginLeft: 20,
                      width: '90%',
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
                      <Text style={[styles.label, { marginTop: 5 }]}>Weight:</Text>
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
                            marginTop: 5
                          }
                        ]}
                      >
                        {item[4]} KG
                      </Text>
                    </View>
                    <View style={[styles.inputContainer, { flexDirection: 'row' }]}>
                      <Text style={[styles.label, { marginLeft: 50, marginTop: 5 }]}>Rack No:</Text>
                      <TextInput
                        style={[styles.input, { width: '40%' }]}
                        // value={rackNumbers[index]?.split(' - ')[0] || ''}
                        onChangeText={(value) => { setCurrentValueParamForLetter(item[3]);
                          setCurrentKeyParamForLetter(value)
                          setCurrentIndexParamForNumber(item[3])
                          setCurrentArrayIndexParamForNumber(index)
                           return handleLetterChange(item[3], value) 
                          }}
                        onBlur={(e) => handleLetterBlur(e._dispatchInstances.memoizedProps.text, item[3])}
                        // placeholder='L'
                        maxLength={2}
                        autoCapitalize='characters'
                        ref={letterInputRef}
                      />

                      <TextInput
                        style={[styles.input, { width: '65%' }]}
                        // value={rackNumbers[index]?.split(' - ')[1] || rackNumbers[index] || ''}
                        onChangeText={(value) =>{
                          setCurrentValueParamForLetter(item[3]);
                          setCurrentKeyParamForLetter(value)
                          setCurrentIndexParamForNumber(item[3])
                          setCurrentArrayIndexParamForNumber(index)
                           return handleNumberChange(item[3], value)}}
                        onBlur={() => handleNumberBlur(item[3], index)}
                        keyboardType='numeric'
                        ref={numberInputRef}
                        // value={rackNumbers[index]?.split(' - ')[1] || rackNumbers[index] || ''} // Set default value

                      // placeholder='Number'
                      />
                    </View>
                  </View>
                ))}


              </View>
            </ScrollView>
          </View>
        )}
        {load && (
          <View style={{ marginTop: 100 }}>
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
            <Text style={{ fontSize: 28, color: 'red', fontWeight: 'bold', marginBottom: 20 }}>Warning!!!</Text>
            <Text style={[styles.modalText, { color: '#c4635c' }]}>Rack Numbers Cant't be duplicated!!</Text>
            <Text style={styles.modalText}>
              The following rack numbers are repeated: <Text style={styles.boldText}>{duplicateValues.join(", ")}</Text>
            </Text>
            <Button title="Close" style={{ backgroundColor: '#67a0d6', width: 150, height: 50, paddingTop: 5, marginTop: 20, borderRadius: 10 }} onPress={() => setModalVisible(false)} >
              <Text style={{ color: 'black', width: 100, fontSize: 20 }}>OK</Text>

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
            <Text style={[styles.modalText, { fontWeight: 'bold', marginBottom: 30 }]}>Confirmation Alert!!</Text>
            {/* <ScrollView>{rackNumbers.length}</ScrollView> */}
            <Text style={styles.modalText}>You have Enterd Total <Text style={{ color: '#29094a', fontSize: 32, fontWeight: 'bold' }}>{Object.keys(rackNumbers).filter((key) =>rackNumbers[key]).length}</Text> Rack Numbers. Please reconfirm before submitting!!.</Text>

            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={() => setConfirmModalVisible(false)} style={{ backgroundColor: '#756e2d', width: 200, height: 60, paddingTop: 10 }}> <Text style={{ color: 'black', fontSize: 20, paddingTop: 5 }}>Re Check</Text> </Button>
              <Button title="Confirm" onPress={confirmSubmit} style={{ backgroundColor: '#366945', width: 200, height: 60, paddingTop: 10 }}> <Text style={{ color: 'black', fontSize: 20, paddingTop: 5 }}>Submit</Text></Button>

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
    width: '65%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    // height:200
  },
  dropDownContainer: {
    backgroundColor: '#fafafa',
    maxHeight: 500,
    zIndex: 999
    // height:200
  },
  item: {
    justifyContent: 'flex-start',
    height: 80, // Increase the height of each item
    marginVertical: 10, // Add space between items,
    marginHorizontal: 10,
    zIndex: 999

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
    paddingVertical: 5,
    height: 70,
    zIndex: 999// Optionally, add horizontal padding
  },
  placeholder: {
    paddingTop: 8,
    fontSize: 20, // Adjust placeholder font size
    color: 'black',
    height: 50,
    paddingLeft: 25// Optionally, customize placeholder text color
  },
  inputContainer: {
    flex: 0.35,
    marginHorizontal: 8,
    fontSize: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black',
    paddingTop: 10
  },
  input: {
    height: 50,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    width: '100%',
    marginLeft: 10,
    fontSize: 20,
    textAlign: 'center'

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
    textAlign: "center",
    paddingLeft: 10
  },
  selectedItemLabel: {
    fontSize: 20, // Adjust the font size as needed
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
    height: 400,
    borderStyle: 'solid',
    borderWidth: 2
  },
  modalText: {
    fontSize: 24, // Font size set to 24
    color: 'black', // Text color set to black
    textAlign: 'center',
    marginBottom: 20,
  },
  boldText: {
    fontWeight: 'bold', // Make numbers bold
    fontSize: 29,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    padding: 5
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

export default Rack_details



{/* <TextInput
              style={[styles.input,{width:'40%'}]}
              // value={rackNumbers[index]?.split(' - ')[0] || ''}
              onChangeText={(value) => handleLetterChange(item[3], value)}
              // placeholder='L'
              maxLength={1}
              autoCapitalize='characters'
            /> 

            <TextInput
              style={[styles.input, {width:'65%'}]}
              // value={rackNumbers[index]?.split(' - ')[1] || rackNumbers[index] || ''}
              onChangeText={(value) => handleNumberChange(item[3], value)}
              // onBlur={() => handleNumberBlur(item[3])}
              keyboardType='numeric'
              // placeholder='Number'
            /> */}

{/* <View style={{flex: 0.3,flexDirection: 'row'}}>
    <View style={{marginLeft:20}}><Text style={{fontSize:20, color:'black', marginTop:20, marginLeft:10}}>Supplier</Text></View>
    
      <View style={styles.container}>
        <DropDownPicker
          open={open}
          value={value}
          items={supplier!= null ?supplier:[]}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setsupplier}
          searchable={true}
          placeholder="Select a Supplier"
          searchPlaceholder="Search..."
          dropDownContainerStyle={styles.dropDownContainer}
        itemStyle={styles.item}
        listItemLabelStyle={styles.listItemLabel}
        listItemContainerStyle={styles.listItemContainer}
        placeholderStyle={styles.placeholder}
        onChangeValue={getmaterialName} 
        />
        </View>
      </View> */}



































































































