import {Platform, StyleSheet, Text,Image, TouchableOpacity, View, FlatList,ListView,  Button,TouchableNativeFeedback,  StatusBar, TouchableHighlight} from 'react-native';
import React, { Component } from 'react';
import {  Card, Divider, SearchBar, List, ListItem  } from 'react-native-elements';
import { db } from './config';
import firebase from 'react-native-firebase';
import { InterstitialAdManager, NativeAdsManager,  BannerView, AdSettings  } from 'react-native-fbads';
const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const advert = firebase.admob().interstitial('ca-app-pub-7416314702588910/1556520833')
const request = new AdRequest();
request.addKeyword('foobar');
export default class Users extends Component {
  constructor(props){
    super(props)
    this.state = { articles: [], refreshing: true, items: [],
     firebaseImage : ""};
     this.arrayholder = [];
    const {state} = this.props.navigation;
     console.log(state.params)
     if(state.params)
     {
     console.log(state.params.userdata)
     }
 //  this.componentDidMount();
 }
 
 
   componentDidMount() {
       advert.loadAd(request.build());
 
 advert.on('onAdLoaded', () => {
   console.log('Advert ready to show.');
 });
 
 setTimeout(() => {
   if (advert.isLoaded()) {
     console.log('working')
     advert.show();
   } else {
     console.log('error occured')
   }
 }, 1000);
     db.ref('/images').child('army').once('value')
     .then((dataSnapshot) => {
       
    console.log('value', dataSnapshot.val().photo)
     this.setState({firebaseImage: dataSnapshot.val().photo})
       
      });
    
     db.ref('/users').once('value')
     .then((dataSnapshot) => {
       let newdata = dataSnapshot.val();
     //  console.log(dataSnapshot)
     if(dataSnapshot.val())
     {
       let items = Object.values(newdata);
       this.arrayholder = items;
      this.setState({items});
      this.setState({refreshing : false})
     }
       
      });
   }
  

  goBack = () => {
    this.props.navigation.navigate('Join')
  }
  searchFilterFunction = text => {
    this.setState({
       value: text,
     });
 
     const newData = this.arrayholder.filter(item => {
       console.log(item, 'item');
       const itemData = `${item.name}`;
       const textData = text;
 
       return itemData.indexOf(textData) > -1;
     });
     this.setState({
       items : newData,
     });
   };
  
  static navigationOptions = function(props) {
    return {
      title: 'Products'
     // headerRight: <View  style={{marginRight: 20, paddingTop:5}}><Icon name="ios-add" size={30} onPress={() => props.navigation.navigate('ScreenTwo')}   /></View>
    }
  };
  editUser = (val) => {
  //   AdSettings.addTestDevice(AdSettings.currentDeviceHash);
  //   InterstitialAdManager.showAd("434555400602082_434557547268534")
  // .then(didClick => {
  //   console.log('working')
  // })
  // .catch(error => {
  //   console.log(error, 'rror')
  // });
    if(val)
    {
    this.props.navigation.navigate('ScreenTwo', { user: val })
    }
    }

    handleRefresh() {
      this.setState(
        {
          refreshing: true
        },
        () => this.componentDidMount()
      );
    }
    
    _ItemLoadMore = () => {
  
   
    db.ref('/users')
     .orderByKey()
     .once('value')
     .then((snapshot) => {
         console.log('snap1', snapshot.val());
         let newdata = snapshot.val();
         //  console.log(dataSnapshot)
         if(snapshot.val())
         {
           let items = Object.values(newdata);
           this.arrayholder = items;
          this.setState({items});
          this.setState({refreshing : false})
         }
       // changing to reverse chronological order (latest first)
       // & removing duplicate
       let arrayOfKeys = Object.keys(snapshot.val())
           .sort()
           .reverse()
           .slice(1);
        // transforming to array
        let results = arrayOfKeys
           .map((key) => snapshot.val()[key]);
        // updating reference
        referenceToOldestKey = arrayOfKeys[arrayOfKeys.length-1];
        console.log('lastKey', referenceToOldestKey);
    this.setState({referenceToOldestKey : referenceToOldestKey})
    console.log('key', this.state.referenceToOldestKey);
        // Do what you want to do with the data, i.e.
        // append to page or dispatch({ … }) if using redux
     })
     .catch((error) => { } );
   
   
  // db.ref('/users').limitToLast(10).once('value')
  // .then((dataSnapshot) => {
  //   let newdata = dataSnapshot.val();
  // //  console.log(dataSnapshot)
  // if(dataSnapshot.val())
  // {
  //   let items = Object.values(newdata);
  //   this.arrayholder = items;
  //  this.setState({items});
  //  this.setState({refreshing : false})
  // }
    
  //  });
    }
    componentWillReceiveProps(nextProps){
      
      db.ref('/users').limit(10).once('value')
    .then((dataSnapshot) => {
      let newdata = dataSnapshot.val();
      let items = Object.values(newdata);
     this.setState({items});
      
     });
    }
    renderHeader = () => {
      return (
        <SearchBar
          placeholder="Search Products..."
          lightTheme
          round
          onChangeText={text => this.searchFilterFunction(text)}
          autoCorrect={false}
          value={this.state.value}
        />
      );
    };
  render() {
    console.log(this.state.items);
    
    return (
     
      <View style={styles.container} >
       <View style={styles.toolbar}>
       <TouchableOpacity onPress={() => this.goBack()}>
                    <Image style={{width:30,marginLeft:5,  height:30}}source={require('../images/back.png')}></Image>
                    </TouchableOpacity>
                    <Text style={styles.toolbarTitle}>What We Do (हम क्या करते हैं)</Text>
                    <Text style={styles.toolbarButton}></Text>
                </View>
                <View style={styles.content}>
                <View style={styles.messageBox}>
                       
                       <Text style={styles.topText}>Information (जानकारी)</Text>
                       <Text style={styles.messageBoxBodyText}>We provide scrap selling services at your doorstep. If you have cables, plastic, old materials, wires, bottles, you can drop your address, contact number (Mohali, Chandigarh), we will come and get all the stuff (हम आपके दरवाजे पर स्क्रैप बिक्री सेवाएं प्रदान करते हैं। यदि आपके पास केबल, प्लास्टिक, पुरानी सामग्री, तार, बोतलें हैं, तो आप अपना पता, संपर्क नंबर (मोहाली, चंडीगढ़) छोड़ सकते हैं, हम आकर सारा सामान ले लेंगे)</Text>
                       <Text style={styles.messageBoxBodyText}>If you are busy and dont have time to sell your old goods, e-waste, you can fill the form. So, enjoy the services</Text>
               </View>
               </View>
      
     <View style={styles.footer}>
       <Banner
       style={{alignSelf:'center',marginLeft:20}}
    size={"SMALL_BANNER"}
  unitId={"ca-app-pub-7416314702588910/6310648905"}
  request={request.build()}
  onAdLoaded={() => {
    console.log('Advert loaded');
  }} />
  </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  toolbar:{
    backgroundColor:'#f39c12',
    paddingBottom:10,
    flexDirection:'row' ,
    paddingTop:20   //Step 1
},
toolbarButton:{           //Step 2
    color:'#fff',
    textAlign:'center'
},
toolbarTitle:{
    color:'#fff',
    textAlign:'center',
    fontWeight:'bold',
    flex:1,
    fontSize:20                //Step 3
},
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
    
  },
  h2text: {
    marginTop: 10,
    fontFamily: 'Helvetica',
    fontSize: 36,
    fontWeight: 'bold',
  },
  flatview: {
   
    paddingTop: 30,
    borderRadius: 2,
    flexDirection: 'row'
  },
  name: {
    fontFamily: 'Verdana',
    fontSize: 18,
    width:200,
    flex: 1, flexWrap: 'wrap'
  },
  email: {
    
  },
  button: {
    textAlign: 'right',
    marginTop:  -10,
    alignSelf: 'stretch'
  },
  noteStyle: {
    margin: 5,
    fontStyle: 'italic',
    color: '#b2bec3',
    fontSize: 10
  },
  featuredTitleStyle: {
    marginHorizontal: 5,
    textShadowColor: '#00000f',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 3
  },
  content:{
    backgroundColor:'#ebeef0',
    flex:1                //Step 2
},
messageBox:{
  alignItems : 'center'
},
  messageBoxBodyText:{
    margin:10,
    fontSize:18
  },
  messageBoxBodyText2:{
    margin:10,
    fontSize:18,
    fontWeight : 'bold'
  },
  topText:{
    fontSize:25,
    marginTop : 10,
    fontWeight : 'bold'
  },
});