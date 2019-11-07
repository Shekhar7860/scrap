import {Platform, StyleSheet, Text,Image, TouchableNativeFeedback,Linking,  View, FlatList,ListView,  Button, StatusBar, TouchableHighlight} from 'react-native';
import React, { Component } from 'react';
import {  Card, Divider } from 'react-native-elements';
import Icon from "react-native-vector-icons/Ionicons";
import { db } from './config';
import firebase from 'react-native-firebase';
const advert = firebase.admob().interstitial('ca-app-pub-8707066328646930/8992858119')
const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
request.addKeyword('foobar');
export default class Users extends Component {
  constructor(props){
   super(props)
   const {state} = this.props.navigation;
    console.log(state.params)
    if(state.params)
    {
    console.log(state.params.userdata)
    }
  this.componentDidMount();
}

state = {
  items: [],
  firebaseImage : ""
}
  componentDidMount() {
    var people = ["Bob", "Sally", "Jack"];
    var obj = people.splice(0, 1);
    var obj1 = obj[0];
    var obj2 = people.splice(1, 1);
    var obj3 = obj2[0];
   
    console.log(obj, 'obj')
    var newArray = [];
    newArray.push(obj1);
    newArray.push(obj3);
    console.log('array', newArray);
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
    console.log(dataSnapshot)
    if(dataSnapshot.val())
    {
      let items = Object.values(newdata);
     this.setState({items});
    }
      
     });
  }

  makeRemoteRequest = () => {
   
    
  };

  
  static navigationOptions = function(props) {
    return {
      title: 'Users',
      headerRight: <View  style={{marginRight: 20, paddingTop:5}}><Icon name="ios-add" size={30} onPress={() => props.navigation.navigate('ScreenTwo')}   /></View>
    }
  };
  editUser = (val) => {
    if(val)
    {
    this.props.navigation.navigate('ScreenTwo', { user: val })
    }
    }

    deleteItem = (val) => {
    console.log(val)
     console.log(this.state.items);
     this.state.items.splice(val, 1);
     db.ref('/users').child(val.id).remove();
     this.componentWillReceiveProps();
    }
      
    
    componentWillReceiveProps(nextProps){
      
      db.ref('/users').once('value')
    .then((dataSnapshot) => {
      let newdata = dataSnapshot.val();
      let items = Object.values(newdata);
     this.setState({items});
      
     });
    }
  render() {
    console.log(this.state.items);
    const defaultImg =
      'https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Images-HD-Diamond-Pattern-PIC-WPB009691.jpg';
    return (
     
      <View style={styles.container} >
       <Banner
    size={"LARGE_BANNER"}
  unitId={"ca-app-pub-8707066328646930/7786284317"}
  request={request.build()}
  onAdLoaded={() => {
    console.log('Advert loaded');
  }} />
       {this.state.items !== [] ?
          <FlatList
          data={this.state.items}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
          <TouchableNativeFeedback
        useForeground
        onPress={() => this.editUser(item)}
      >
        <Card
          featuredTitle={item.name}
          featuredTitleStyle={styles.featuredTitleStyle}
          image={{
            uri: item.photo || defaultImg
          }}
        >
          <Text style={{ marginBottom: 10 }}>
            {item.email || 'Read More..'}
          </Text>
          <Divider style={{ backgroundColor: '#dfe6e9' }} />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.noteStyle}>{item.name}</Text>
       
          </View>
        </Card>
      </TouchableNativeFeedback>
          // <View style={styles.flatview} >
          // <View style={{width:'10%'}}></View>
          //  <Image
          //   source={{ uri: item.photo }}
          //   style={{ width: 100, height: 100, borderRadius : 50 }}
          // />
          // <View style={{width:'5%'}}></View>
          //  <View style={{marginTop:5}}>
          //   <Text style={styles.name} onPress={() => this.editUser(item)}>{item.name}</Text>
          //   <Text style={styles.email}>{item.email}</Text>
          //   <Icon name="ios-trash" size={30} onPress={() => this.deleteItem(item)}/>
          //   </View>
          //   <View style={{width:'10%'}}></View>
          // </View>
         
            
         
          }
          keyExtractor={item => item.email}
        />
     : null }

      </View>
    );
  }
};

const styles = StyleSheet.create({
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
    fontSize: 18
  },
  email: {
    color: 'red'
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
  }
  
});