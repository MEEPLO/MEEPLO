const maxLength = {
  1: 1,
  2: 2,
  3: 4,
};

const mergeAndUpload = `
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
<button class="reset" onclick="sendDataToReactNativeApp()">
  만들기
</button>
</div>
<div class="canvas-container">
<canvas id="my-canvas" width="360" height="1300" style="background-color: #000;"></canvas>
</div>

<script src="https://sdk.amazonaws.com/js/aws-sdk-2.283.1.min.js"></script>

<script>

const mergePics = (event, index) => {

  document.getElementById('my-canvas').getContext('2d').fillStyle = "black"
  document.getElementById('my-canvas').getContext('2d').fillRect(0, 0, 360, 1300)  


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
var imgAToB = []

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

const getImageTitle = (date) => {
  let year = date.getFullYear().toString().substring(2)
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  month = month >= 10 ? month : '0' + month;
  day = day >= 10 ? day : '0' + day;
  hour = hour >= 10 ? hour : '0' + hour;
  minute = minute >= 10 ? minute : '0' + minute;
  second = second >= 10 ? second : '0' + second;

  return "ourmoment" + year + month + day + hour + minute + second + ".jpg";
} 

function dataURItoBlob(dataURI) {
  var binary = atob(dataURI.split(',')[1]);
  var array = [];
  for(var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
  }
  var arr8 = new Uint8Array(array)

  // return new Blob([new Uint8Array(array)], {type: 'image/jpg'});
  return arr8
}


const convertTobase64 = (url) => {
  return url.replace(/^data:image\/(png|jpg);base64,/, "");
}


alert("js running")


const sendDataToReactNativeApp = () => {
  var dataUrl = document.getElementById("my-canvas").toDataURL("image/jpg");
  imgAToB = dataURItoBlob(dataUrl)

  var base64String = convertTobase64(dataUrl)

  window.ReactNativeWebView.postMessage(
    // JSON.stringify(imgAToB)
    base64String
  )
}

</script>
`;

export default mergeAndUpload;
