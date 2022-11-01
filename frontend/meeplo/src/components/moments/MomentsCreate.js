import React from 'react';
import {View, Text, Pressable, Button, Image} from 'react-native';
import {WebView} from 'react-native-webview';
import {launchImageLibrary} from 'react-native-image-picker';
import styled from 'styled-components';
import {PermissionsAndroid} from 'react-native';

// npm install react-native-webview --legacy-peer-deps

const maxLength = {
  1: 1,
  2: 2,
  3: 4,
}

const html = `
<div class="upload-control">
<div class="gallary">
  사진 추가하기
  <input
  type="file"
  accept="image/jpeg, image/jpg, image/png"
  multiple
  id="review-upload-input"
  >
</div>
<div id="download" onclick="getImage()">
  저장하기
</div>
<div class="reset" onclick="resetGallery()">
  다시하기
</div>
</div>
<div class="canvas-container">
<canvas id="my-canvas" width="360" height="1300" style="background-color: #000;"></canvas>
</div>

<script>
const getContext = () => document.getElementById('my-canvas').getContext('2d');

const mergePics = (event, index) => {
  const pic = event.target.files[index]
  var reader = new FileReader()
  reader.readAsDataURL(pic);
  
  reader.onload = function (e) {
    var image = new Image();
    image.src = e.target.result;

    image.onload = function() {
      originalWidth = this.width
      originalHeight = this.height

      var picW = 0
      var picH = 0

      if (originalWidth * 0.75 < originalHeight) {
        picW = originalWidth
        picH = originalWidth * 0.75
      } else {
        picW = originalHeight * 1.30
        picH = originalHeight
      }
      const picX = (originalWidth - picW) / 2
      const picY = (originalHeight - picH) / 2

      const resultX = 20
      const resultY = index * (240 + 20) + 20
      document.getElementById('my-canvas').getContext('2d').drawImage(image, picX, picY, picW, picH, resultX, resultY, 320, 240)
    }
  }
}

const picInput = document.getElementById('review-upload-input')

picInput.addEventListener('change', (event) => {
  if (event.target.files.length > ${maxLength[3]}) {
    alert("사진은 최대 ${maxLength[3]}개까지 첨부가 가능합니다.")
  } else if (event.target.files.length < ${maxLength[3]}) {
    alert("사진 ${maxLength[3]}개를 선택해주세요!")
  } else if (event.target.files.length == ${maxLength[3]}) {
    for (let index = 0; index < event.target.files.length; index++) {
      mergePics(event, index)
    }
  }
});

const resetGallery = () => {
  document.getElementById("my-canvas").remove()
  var canvas = document.createElement("canvas")
  canvas.id = "my-canvas"
  canvas.setAttribute("width", "360")
  canvas.setAttribute("height", "1300")
  canvas.setAttribute("style", "background-color: #000;")

  var container = document.querySelector(".canvas-container")
  container.appendChild(canvas)
}

</script>
`;


const MomentsCreate = () => {

  return (
    <View style={{ height: 550 }}>
      <WebView source={{ html: html }} />
    </View>
  );
};

export default MomentsCreate;
