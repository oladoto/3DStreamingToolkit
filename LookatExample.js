import React, { Component } from 'react';
import {
  Button,
  Picker,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  createIdentityMatrix
} from './matrixMath';

const SimpleCameraHandler = require('./SimpleCameraHandler');
const PinchCameraHandler = require('./PinchCameraHandler');

class LookatExample extends Component {
  state = {
    lookat: createIdentityMatrix(),
  }

  _onLookatChanged = matrix => {
    this.setState({
      lookat: matrix,
      handler: 'pan',
    });

    // TODO: send lookat over data channel
  }

  _format(n) {
    return n.toFixed(3);
  }

  render() {
    let mainView = (
      <View style={styles.container}>
        <Text style={styles.text}>
          <Text>|{this._format(this.state.lookat[0])}, {this._format(this.state.lookat[1])}, {this._format(this.state.lookat[2])}, {this._format(this.state.lookat[3])}|{'\n'}</Text>
          <Text>|{this._format(this.state.lookat[4])}, {this._format(this.state.lookat[5])}, {this._format(this.state.lookat[6])}, {this._format(this.state.lookat[7])}|{'\n'}</Text>
          <Text>|{this._format(this.state.lookat[8])}, {this._format(this.state.lookat[9])}, {this._format(this.state.lookat[10])}, {this._format(this.state.lookat[11])}|{'\n'}</Text>
          <Text>|{this._format(this.state.lookat[12])}, {this._format(this.state.lookat[13])}, {this._format(this.state.lookat[14])}, {this._format(this.state.lookat[15])}|{'\n'}</Text>
        </Text>
        <Button onPress={() => _cameraHandler.reset()} title={'Reset!'} />
        <Picker
          style={styles.picker} 
          selectedValue={this.state.handler}
          onValueChange={value => this.setState({handler: value})}>
          <Picker.Item label="Pan to Move" value="pan" />
          <Picker.Item label="Pinch to Move" value="pinch" />
        </Picker>
      </View>
    );

    let _cameraHandler;    
    if (this.state.handler === 'pinch') {
      return (
        <PinchCameraHandler
          ref={(cameraHandler) => { _cameraHandler = cameraHandler; }}
          onLookatChanged={this._onLookatChanged}>
          {mainView}
        </PinchCameraHandler>
      );
    } else {
      return (
        <SimpleCameraHandler
          ref={(cameraHandler) => { _cameraHandler = cameraHandler; }}
          onLookatChanged={this._onLookatChanged}>
          {mainView}
        </SimpleCameraHandler>
      );      
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 25,
  },
  picker: {
    width: 150,
  }
});

module.exports = LookatExample;
