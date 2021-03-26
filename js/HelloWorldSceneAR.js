'use strict';

import React, { Component } from 'react';

import {Alert, StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  ViroAmbientLight,
  ViroSpotLight,
  Viro3DObject,
  ViroARPlaneSelector,
  ViroNode,
  ViroARImageMarker,
  ViroARTrackingTargets,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR...",
      runAnimation: false
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  };

  handleTap = () =>  {
    Alert.alert('asdas')
    console.log('sasd')
    this.setState({
      runAnimation: true
    })
  }
  
  onAnchorFound = () => {
    
  }

  render() {

    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        {/* <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        <ViroBox position={[0, -0.5, -1]} scale={[0.3,0.3,0.1]} materials={"grid"}/> */}
        <ViroAmbientLight color={"#aaaaaa"}/>
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0, -1, -0.2]} position={[0,3,1]} color="#ffffff" castsShadow={true} />
        <ViroARImageMarker target={"targetOne"} onAnchorFound={this.onAnchorFound}>
          <Viro3DObject
          source={require('./res/Zombie.vrx')}
          resources={[require('./res/Zombie.fbm/Zombie_diffuse.png'), require('./res/Zombie.fbm/Zombie_normal.png'), require('./res/Zombie.fbm/Zombie_specular.png') ]}
          position={[0, 0, 0] }
          scale={[0.001,0.001,0.001]}
          type="VRX"
          animation={{name:"mixamo.com", run:this.state.runAnimation, loop:true,}}
          onClick={this.handleTap}
          onTouch={this.handleTap}
          />
        </ViroARImageMarker>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello Worlds!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }


}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

ViroARTrackingTargets.createTargets({
  "targetOne": {
    source: require('./res/target.png'),
    orientation: "Up",
    physicalWidth: 0.165
  }
})





ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
})

module.exports = HelloWorldSceneAR;
