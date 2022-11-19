const picType = {
  0: {
    maxLength: 1,
    picWidth: 600,
    picHeight: 710,
    heightRatio: 1,
    widthRatio: 1,
    xStart: 30,
    xPower: 0,
    yStart: 30,
    yPower: 0,
    resizedwidth: 540,
    resizedHeight: 540,
    bgColor: 'rgb(255, 255, 255)',
  },
  1: {
    maxLength: 2,
    picWidth: 810,
    picHeight: 630,
    heightRatio: 1.3,
    widthRatio: 0.75,
    xStart: 30,
    xPower: 390,
    yStart: 120,
    yPower: 0,
    resizedwidth: 360,
    resizedHeight: 480,
    bgColor: 'rgb(255, 255, 255)',
  },
  2: {
    maxLength: 4,
    picWidth: 360,
    picHeight: 1300,
    heightRatio: 0.75,
    widthRatio: 1.3,
    xStart: 20,
    xPower: 0,
    yStart: 20,
    yPower: 260,
    resizedwidth: 320,
    resizedHeight: 240,
    bgColor: 'rgb(0, 0, 0)',
  },
};

const mergeAndUpload = type => {
  if (type === 0) {
    const polaroid = `
      <div class="upload-control" style="width: 100%; height: 100%;background-color: rgba(0, 255, 0, 0);position: relative">
        <div id="canvas-container" style="height: 50%;width: 100%;display: flex;justify-content: center;align-items: center;background-color: rgba(0, 0, 0, 0);">
      <canvas id="my-canvas" width="${picType[type].picWidth}" height="${picType[type].picHeight}" style="width: ${picType[type].picWidth}px;height: ${picType[type].picHeight}px;background-color: ${picType[type].bgColor};border: 6px solid #ccc;"></canvas>
      </div>
      <div id="gallary" onclick="openGallary()" style="margin: 130px 0 50px 0;width: calc(100vw - 12px);height: 180px;background-color: rgba(0, 190, 0, 0);border-radius: 45px;position: absolute;bottom: 230px;">
      <input
      type="file"
      accept="image/jpeg, image/jpg, image/png"
      multiple
      id="review-upload-input"
      style="display: none;"
      >
    </div>
    <div onclick="sendDataToReactNativeApp()" style="width: calc(100vw - 12px);height: 180px;background-color: rgba(0, 0, 250, 0);position: absolute;bottom: 70px;"></div>
    </div>
    
    <script>
    const mergePics = (event, index) => {
      document.getElementById('my-canvas').getContext('2d').fillStyle = "${picType[type].bgColor}"
      document.getElementById('my-canvas').getContext('2d').fillRect(0, 0, ${picType[type].picWidth}, ${picType[type].picHeight})
      
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
    
          if (originalWidth * ${picType[type].heightRatio} < originalHeight) {
            picW = originalWidth
            picH = originalWidth * ${picType[type].heightRatio}
          } else {
            picW = originalHeight * ${picType[type].widthRatio}
            picH = originalHeight
          }
          const picX = (originalWidth - picW) / 2
          const picY = (originalHeight - picH) / 2
    
          const resultX = index * (${picType[type].xPower}) + ${picType[type].xStart}
          const resultY = index * (${picType[type].yPower}) + ${picType[type].yStart}
          document.getElementById('my-canvas').getContext('2d').drawImage(image, picX, picY, picW, picH, resultX, resultY, ${picType[type].resizedwidth}, ${picType[type].resizedHeight})
        }
      }
    }
    
    const picInput = document.getElementById('review-upload-input')
    var imgAToB = []
    
    picInput.addEventListener('change', (event) => {
      if (event.target.files.length > ${picType[type].maxLength}) {
        alert("사진은 ${picType[type].maxLength}개까지 첨부가 가능합니다.")
      } else if (event.target.files.length < ${picType[type].maxLength}) {
        alert("사진 ${picType[type].maxLength}개를 선택해주세요!")
      } else if (event.target.files.length == ${picType[type].maxLength}) {
        for (let index = 0; index < event.target.files.length; index++) {
          mergePics(event, index)
        }
      }
      window.ReactNativeWebView.postMessage(
        "input changed"
      )
    });
    
    const openGallary = () => {
      document.getElementById("review-upload-input").click();
    }
    
    const resetGallery = () => {
      document.getElementById("my-canvas").remove()
      var canvas = document.createElement("canvas")
      canvas.id = "my-canvas"
      canvas.setAttribute("width", "${picType[type].picWidth}")
      canvas.setAttribute("height", "${picType[type].picHeight}")
      canvas.setAttribute("style", "background-color: ${picType[type].bgColor};")
    
      var container = document.getElementById("canvas-container")
      container.appendChild(canvas)
    }
    
    function dataURItoBlob(dataURI) {
      var binary = atob(dataURI.split(',')[1]);
      var array = [];
      for(var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
      }
      var arr8 = new Uint8Array(array)
    
      return arr8
    }
    
    const sendDataToReactNativeApp = () => {
      var dataUrl = document.getElementById("my-canvas").toDataURL("image/jpg");
      
      window.ReactNativeWebView.postMessage(
        dataUrl
      )
    }
    
    const listener = (event) => {
      // alert("start")
      // // if (event.data === "open") {
        // // }
        buttonWidth = Math.ceil(event.data * 1)
        // document.getElementById("input-label").style.width = buttonWidth
        alert(buttonWidth)
        // alert("fin")
    };
    
    var buttonWidth = 0
    
    // document.addEventListener("message", function(event) {
    //   alert(event.data)
    // });
    document.addEventListener("message", listener); 
    
    </script>
    `;

    return polaroid;
  } else if (type === 1) {
    const dayfilm = `
    <div class="upload-control" style="width: 100%; height: 100%;background-color: rgba(0, 255, 0, 0);position: relative">
      <div id="canvas-container" style="height: calc(50% + ${
        picType[type].picHeight * 0.5
      }px);width: 100%;display: flex;justify-content: center;align-items: center;background-color: rgba(0, 0, 0, 0);">
        <canvas id="my-canvas" width="${picType[type].picWidth}" height="${picType[type].picHeight}" style="width: ${
      picType[type].picWidth
    }px;height: ${picType[type].picHeight}px;background-color: ${
      picType[type].bgColor
    };border: 6px solid #ccc;"></canvas>
      </div>
      <div id="gallary" onclick="openGallary()" style="margin: 130px 0 50px 0;width: calc(100vw - 12px);height: 180px;background-color: rgba(0, 0, 0, 0);border-radius: 45px;position: absolute;bottom: 230px;">
        <input
        type="file"
        accept="image/jpeg, image/jpg, image/png"
        multiple
        id="review-upload-input"
        style="display: none;"
        >
      </div>
      <div onclick="sendDataToReactNativeApp()" style="width: calc(100vw - 12px);height: 180px;background-color: rgba(0, 0, 250, 0);position: absolute;bottom: 0px;"></div>
    </div>
    
    <script>
    const mergePics = (event, index) => {
      document.getElementById('my-canvas').getContext('2d').fillStyle = "${picType[type].bgColor}"
      document.getElementById('my-canvas').getContext('2d').fillRect(0, 0, ${picType[type].picWidth}, ${
      picType[type].picHeight
    })
      
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
    
          if (originalWidth * ${picType[type].heightRatio} < originalHeight) {
            picW = originalWidth
            picH = originalWidth * ${picType[type].heightRatio}
          } else {
            picW = originalHeight * ${picType[type].widthRatio}
            picH = originalHeight
          }
          const picX = (originalWidth - picW) / 2
          const picY = (originalHeight - picH) / 2
    
          const resultX = index * (${picType[type].xPower}) + ${picType[type].xStart}
          const resultY = index * (${picType[type].yPower}) + ${picType[type].yStart}
          document.getElementById('my-canvas').getContext('2d').drawImage(image, picX, picY, picW, picH, resultX, resultY, ${
            picType[type].resizedwidth
          }, ${picType[type].resizedHeight})
        }
      }
    }
    
    const picInput = document.getElementById('review-upload-input')
    var imgAToB = []
    
    picInput.addEventListener('change', (event) => {
      if (event.target.files.length > ${picType[type].maxLength}) {
        alert("사진은 ${picType[type].maxLength}개까지 첨부가 가능합니다.")
      } else if (event.target.files.length < ${picType[type].maxLength}) {
        alert("사진 ${picType[type].maxLength}개를 선택해주세요!")
      } else if (event.target.files.length == ${picType[type].maxLength}) {
        for (let index = 0; index < event.target.files.length; index++) {
          mergePics(event, index)
        }
      }
      window.ReactNativeWebView.postMessage(
        "input changed"
      )
    });
    
    const openGallary = () => {
      document.getElementById("review-upload-input").click();
    }
    
    const resetGallery = () => {
      document.getElementById("my-canvas").remove()
      var canvas = document.createElement("canvas")
      canvas.id = "my-canvas"
      canvas.setAttribute("width", "${picType[type].picWidth}")
      canvas.setAttribute("height", "${picType[type].picHeight}")
      canvas.setAttribute("style", "background-color: ${picType[type].bgColor};")
    
      var container = document.getElementById("canvas-container")
      container.appendChild(canvas)
    }
    
    function dataURItoBlob(dataURI) {
      var binary = atob(dataURI.split(',')[1]);
      var array = [];
      for(var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
      }
      var arr8 = new Uint8Array(array)
    
      return arr8
    }
    
    const sendDataToReactNativeApp = () => {
      var dataUrl = document.getElementById("my-canvas").toDataURL("image/jpg");
      
      window.ReactNativeWebView.postMessage(
        dataUrl
      )
    }

    </script>
    `;
    return dayfilm;
  } else if (type === 2) {
    const fourcut = `
    <div class="upload-control" style="width: 100%; height: 100%;background-color: rgba(0, 255, 0, 0);position: relative">
    <div id="canvas-container" style="height: 50%width: 100%;display: flex;justify-content: center;align-items: center;background-color: rgba(0, 0, 0, 0);">
    <canvas id="my-canvas" width="${picType[type].picWidth}" height="${picType[type].picHeight}" style="width: ${
      picType[type].picWidth * 0.9
    }px;height: ${picType[type].picHeight * 0.9}px;background-color: ${
      picType[type].bgColor
    };border: 6px solid #ccc;"></canvas>
    </div>
    <div id="gallary" onclick="openGallary()" style="margin: 130px 0 50px 0;width: calc(100vw - 12px);height: 180px;background-color: rgba(0, 0, 0, 0);border-radius: 45px;position: absolute;bottom: 230px;">
    <input
    type="file"
    accept="image/jpeg, image/jpg, image/png"
    multiple
    id="review-upload-input"
    style="display: none;"
    >
    </div>
    <div onclick="sendDataToReactNativeApp()" style="width: calc(100vw - 12px);height: 180px;background-color: rgba(0, 0, 250, 0);position: absolute;bottom: 0px;"></div>
    </div>
    
    <script>
    const mergePics = (event, index) => {
      document.getElementById('my-canvas').getContext('2d').fillStyle = "${picType[type].bgColor}"
      document.getElementById('my-canvas').getContext('2d').fillRect(0, 0, ${picType[type].picWidth}, ${
      picType[type].picHeight
    })
      
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
    
          if (originalWidth * ${picType[type].heightRatio} < originalHeight) {
            picW = originalWidth
            picH = originalWidth * ${picType[type].heightRatio}
          } else {
            picW = originalHeight * ${picType[type].widthRatio}
            picH = originalHeight
          }
          const picX = (originalWidth - picW) / 2
          const picY = (originalHeight - picH) / 2
    
          const resultX = index * (${picType[type].xPower}) + ${picType[type].xStart}
          const resultY = index * (${picType[type].yPower}) + ${picType[type].yStart}
          document.getElementById('my-canvas').getContext('2d').drawImage(image, picX, picY, picW, picH, resultX, resultY, ${
            picType[type].resizedwidth
          }, ${picType[type].resizedHeight})
        }
      }
    }
    
    const picInput = document.getElementById('review-upload-input')
    var imgAToB = []
    
    picInput.addEventListener('change', (event) => {
      if (event.target.files.length > ${picType[type].maxLength}) {
        alert("사진은 ${picType[type].maxLength}개까지 첨부가 가능합니다.")
      } else if (event.target.files.length < ${picType[type].maxLength}) {
        alert("사진 ${picType[type].maxLength}개를 선택해주세요!")
      } else if (event.target.files.length == ${picType[type].maxLength}) {
        for (let index = 0; index < event.target.files.length; index++) {
          mergePics(event, index)
        }
      }
      window.ReactNativeWebView.postMessage(
        "input changed"
      )
    });
    
    const openGallary = () => {
      document.getElementById("review-upload-input").click();
    }
    
    const resetGallery = () => {
      document.getElementById("my-canvas").remove()
      var canvas = document.createElement("canvas")
      canvas.id = "my-canvas"
      canvas.setAttribute("width", "${picType[type].picWidth}")
      canvas.setAttribute("height", "${picType[type].picHeight}")
      canvas.setAttribute("style", "background-color: ${picType[type].bgColor};")
    
      var container = document.getElementById("canvas-container")
      container.appendChild(canvas)
    }
    
    function dataURItoBlob(dataURI) {
      var binary = atob(dataURI.split(',')[1]);
      var array = [];
      for(var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
      }
      var arr8 = new Uint8Array(array)
    
      return arr8
    }
    
    const sendDataToReactNativeApp = () => {
      var dataUrl = document.getElementById("my-canvas").toDataURL("image/jpg");
      
      window.ReactNativeWebView.postMessage(
        dataUrl
      )
    }
    
    const listener = (event) => {
      // alert("start")
      // // if (event.data === "open") {
        // // }
        buttonWidth = Math.ceil(event.data * 1)
        // document.getElementById("input-label").style.width = buttonWidth
        alert(buttonWidth)
        // alert("fin")
    };
    
    var buttonWidth = 0
    
    // document.addEventListener("message", function(event) {
    //   alert(event.data)
    // });
    document.addEventListener("message", listener); 
    
    </script>
    `;

    return fourcut;
  }
};

export default mergeAndUpload;
