import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native'
import UploadImage from '../UploadImage'
import SelectionWithText from '../SelectionWithText'
import Button from '../Button'
import { uploadFile } from '../../Utils/UploadFile'

const InstantSquareAndTrailReports = props => {
  const { type, onPress, TrailPrice } = props
  const [measurements, setMeasurements] = useState(null)
  const [delivery, setDelivery] = useState(null)
  const [specialNotes, setSpecialNotes] = useState('')
  const [pitchValue, setPitchValue] = useState('')
  const [alternativeEmail, setAlternativeEmail] = useState('')
  const [deliveryType, setDeliveryType] = useState(null)
  const [uploadDetails, setUploadDetails] = useState({
    name: 'No File Choosen',
    uri: ''
  })

  const validate = () => {
    if (type === 'instantSquares') {
      let errorMessage = null
      measurements
        ? delivery
          ? onPress({
              type,
              price: getPriceWithoutText(),
              measurements:
                measurements === 1
                  ? 'Main Structure + Garage'
                  : 'Main Structure',
              deliveryType:
                delivery === 1
                  ? 'Delivery - 1 Business day or Less'
                  : 'Delivery - 2 Business Hours',
              specialNotes,
              pitchValue,
              alternativeEmail,
              uploadDetails: {
                name: uploadDetails.name,
                uri: uploadDetails.data
              }
            })
          : (errorMessage = 'Please Select Delivery')
        : (errorMessage = 'Please Select Measurements')
      if (errorMessage) {
        Alert.alert('Alert!', errorMessage, [{ style: 'cancel' }])
      }
    } else {
      delivery
        ? onPress({
            type: 'Trial Report',
            price: getPriceWithoutText(),
            deliveryType:
              delivery === 1
                ? 'Delivery - 1 Business day or Less'
                : 'Delivery - 2 Business Hours',
            specialNotes,
            uploadDetails,
            pitchValue,
            alternativeEmail
          })
        : Alert.alert('Alert!', 'Please Select Delivery', [{ style: 'cancel' }])
    }
  }
  const getPriceWithoutText = () => {
    if (type !== 'instantSquares') {
      return delivery === 1 ? TrailPrice * 1 : TrailPrice * 2
    }
    return TrailPrice * 1
  }
  const getPrice = () => {
    return `Price $ ${getPriceWithoutText()}.00`
  }
  const showPrice = () => {
    if (type !== 'instantSquares') {
      return delivery !== null
    }
    return true
  }
  return (
    <View style={styles.mainView}>
      {showPrice() && (
        <Text style={[styles.commonMarginTop, styles.heading]}>
          {getPrice()}
        </Text>
      )}

      {type === 'instantSquares' && (
        <View>
          <Text style={[styles.heading, styles.commonMarginTop]}>
            MeasureMents
          </Text>
          <View style={styles.rowFlexStart}>
            <SelectionWithText
              onSelect={() => {
                setMeasurements(1)
                setDeliveryType
              }}
              isSelected={measurements === 1}
              type={'Circle'}
              title="Main Structure + Garage"
            />
            <SelectionWithText
              onSelect={() => setMeasurements(2)}
              isSelected={measurements === 2}
              type={'Circle'}
              title="Main Structure"
            />
          </View>
        </View>
      )}
      <View>
        <Text style={[styles.commonMarginTop, styles.heading]}>Delivery</Text>
        <View style={styles.rowFlexStart}>
          {type !== 'instantSquares' && (
            <SelectionWithText
              onSelect={() => setDelivery(1)}
              isSelected={delivery === 1}
              type={'Circle'}
              title="Delivery - 1 Business day or Less"
            />
          )}
          <SelectionWithText
            onSelect={() => setDelivery(2)}
            isSelected={delivery === 2}
            type={'Circle'}
            title="Delivery - 2 Business Hours"
          />
        </View>
      </View>
      <View>
        <Text style={[styles.heading, styles.commonMarginTop]}>
          Special Notes
        </Text>
        <TextInput
          value={specialNotes}
          style={styles.specialNotes}
          onChangeText={text => {
            setSpecialNotes(text)
          }}
        />
      </View>
      <Text style={[styles.commonMarginTop, styles.heading]}>Upload Logo</Text>
      <UploadImage
        onPress={() => {
          uploadFile((response, error) => {
            if (error === null) {
              const { name, data } = response
              setUploadDetails({ name, data })
            }
          })
        }}
        title={uploadDetails.name}
        buttonTitle={'Choose File'}
      />
      <Text style={[styles.commonMarginTop, styles.heading]}>
        Enter Pitch value if known
      </Text>
      <TextInput
        style={[styles.commonMarginTop, styles.enterValue]}
        value={pitchValue}
        onChangeText={value => {
          setPitchValue(value)
        }}
      />
      <Text style={[styles.commonMarginTop, styles.heading]}>
        Enter Alternate Email:
      </Text>
      <TextInput
        style={[styles.commonMarginTop, styles.enterValue]}
        value={alternativeEmail}
        onChangeText={value => {
          setAlternativeEmail(value)
        }}
      />
      <Button
        onPress={validate}
        textStyle={styles.orderText}
        style={styles.order}
        text="Order"
      />
    </View>
  )
}
export default InstantSquareAndTrailReports

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 5
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 15
  },
  commonMarginTop: {
    marginTop: 10
  },
  rowFlexStart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: 10
  },
  specialNotes: {
    height: 100,
    borderColor: '#C2C2C2',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10
  },
  enterValue: {
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#C2C2C2'
  },
  order: {
    minWidth: 100,
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
    backgroundColor: '#0485B2'
  },
  orderText: {
    color: '#ffffff'
  }
})
