import React, { useState, useEffect, useRef } from 'react'
import { KeyboardAvoidingView, View, ScrollView } from 'react-native'

import Geocoder from 'react-native-geocoding'
import CardView from 'react-native-cardview'
import { TextField } from 'react-native-material-textfield'
import MapView from 'react-native-maps'
import Button from '../Components/Button'
import ParsedText from 'react-native-parsed-text'
import { styles } from './Styles/SelectAddressStyles'
import { getInitialRegionForMap } from '../Utils/getInitialRegionForMap'

const SearchAddress = props => {
  const { navigation } = props
  const [region, setRegion] = useState(getInitialRegionForMap().region)
  const [place, setPlace] = useState('')
  const [errorSearchPlace, setSearchPlaceError] = useState('')
  const [errorlatitude, setLatitudeError] = useState('')
  const [errorLongitude, setLongitudeError] = useState('')
  const placeRef = useRef(null)
  const latRef = useRef(null)
  const lngRef = useRef(null)

  const searchKeyWord = () => {
    const { navigation } = props
    if (place === '') {
      setSearchPlaceError('Please Enter Valid Place To Search')
      return
    }
    Geocoder.init('AIzaSyCSiNb2QI4HfoA6c7xBjs3UWf8WIPeCmrw', { language: 'en' })
    Geocoder.from(place)
      .then(json => {
        const { formatted_address: address, geometry } = json.results[0]
        let location = geometry.location
        const { lat: latitude, lng: longitude } = location
        const region = {
          ...region,
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }
        setRegion(region)
        setPlace('')
        placeRef.current.clear()
        navigation.navigate('Orders', { region, address })
      })
      .catch(error => {
        console.log(error)
      })
  }
  const searchWithLatAndLang = () => {
    const { navigation } = props
    const { latitude, longitude } = region
    if (latitude === '') {
      setLatitudeError('Please Select Valid Latitude')
      return
    }
    if (longitude === '') {
      setLongitudeError('Please Select Valid Longitude')
      return
    }
    Geocoder.init('AIzaSyCSiNb2QI4HfoA6c7xBjs3UWf8WIPeCmrw', { language: 'en' })
    Geocoder.from(latitude, longitude)
      .then(json => {
        let address = json.results[1].formatted_address
        const regionCopy = region
        setRegion(region => ({ ...region, place: address }))
        latRef.current.clear()
        lngRef.current.clear()
        navigation.push('Orders', { region: regionCopy, address })
      })
      .catch(error => {
        console.log(error)
      })
  }

  const onRegionChange = region => {
    setRegion(region)
  }
  const onBackBtnPress = () => {
    const { navigation } = props
    navigation.push('HomeScreen')
  }
  const getRegionLatandLng = () => ({
    latitude: region.latitude,
    longitude: region.longitude,
    latitudeDelta: region.latitudeDelta,
    longitudeDelta: region.longitudeDelta
  })
  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <KeyboardAvoidingView style={styles.mainView}>
        <ParsedText
          parse={[{ pattern: /video/, style: styles.video }]}
          style={styles.newToOrders}
        >
          New to Orders ? See this video
        </ParsedText>
        <CardView style={styles.cardView}>
          <TextField
            ref={placeRef}
            placeholder="Enter a location"
            onChangeText={place => {
              setSearchPlaceError('')
              setPlace(place)
            }}
            value={place}
            error={errorSearchPlace}
          />
          <Button
            text="Search"
            style={styles.button}
            showSmallText={false}
            textStyle={styles.textStyle}
            onPress={searchKeyWord}
          />
        </CardView>
        <CardView style={styles.cardView}>
          <TextField
            ref={latRef}
            keyboardType="numbers-and-punctuation"
            placeholder="Latitude"
            value={region.latitude === 0.0 ? '' : `${region.latitude}`}
            onChangeText={text => {
              setLatitudeError('')
              setRegion(region => ({
                ...region,
                latitude: parseFloat(text) ? parseFloat(text) : 0
              }))
            }}
            error={errorlatitude}
          />
          <TextField
            ref={lngRef}
            keyboardType="numbers-and-punctuation"
            placeholder="Longitude"
            value={region.longitude === 0.0 ? '' : `${region.longitude}`}
            onChangeText={text => {
              setLongitudeError('')
              setRegion(region => ({
                ...region,
                longitude: parseFloat(text) ? parseFloat(text) : 0
              }))
            }}
            error={errorLongitude}
          />
          <Button
            text="Search"
            style={styles.button}
            showSmallText={false}
            textStyle={styles.textStyle}
            onPress={() => {
              searchWithLatAndLang()
            }}
          />
        </CardView>
        <MapView
          region={
            region.latitude === 0.0
              ? {
                  latitude: 29.6916115,
                  longitude: -95.5545889,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
                }
              : region
          }
          loadingEnabled={true}
          onRegionChangeComplete={onRegionChange}
          style={{ width: '100%', height: 200, marginTop: 20 }}
        />
        <View style={{ marginTop: 10 }}>
          <Button
            onPress={onBackBtnPress}
            textStyle={{ color: '#000000' }}
            style={{
              borderWidth: 1,
              borderColor: '#DCDCDC',
              backgroundColor: '#ffffff'
            }}
            text="Back"
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default SearchAddress
