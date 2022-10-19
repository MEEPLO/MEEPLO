# DAY2

## SDK란?

* 소프트웨어 개발 키트 (Software Development Kit)의 약자

* 하드웨어 플랫폼, 운영 체제 또는 프로그래밍 언어 제작사가 제공하는 일련의 툴

* SDK를 활용하여 특정 플랫폼, 시스템 또는 프로그래밍 언어에 따라 애플리케이션을 개발할 수 있다. 
  (조립식 옷장에 포함되어 있는 도구 키트 같다)

* 일반적으로 SDK에는 컴파일러, 디버거, API가 포함되고, 그 외 라이브러리 / 런타임 / 드라이버 등이 포함될 수도 있다.



## Amazon S3란? (Simple Storage Service)

* 객체 스토리지 서비스로 다양한 용례에서 원하는 양의 데이터를 저장하고 보호할 수 있다.

* 파일 서버의 역할을 하는 서비스
  
  * 일반적인 파일서버는 트래픽이 증가함에 따라 장비를 증설하는 작업이 필요한데, S3는 이런 작업을 대행한다. 따라서 트래픽에 따른 시스템적인 문제에 대한 걱정을 덜 수 있다.
  
  * 파일에 대한 접근 권한을 지정할 수 있어 서비스를 호스팅 용도로 사용하는 것을 방지할 수 있다.



### S3의 특징

1. 저장할 수 있는 파일 수의 제한이 없다.

2. 최소 1byte에서 최대 5TB의 데이터를 저장하고 서비스할 수 있다.

3. HTTP와 BitTorrent 프로토콜을 지원한다.

4. REST, SOAP 인터페이스를 제공한다.

5. 버전관리 기능을 통해서 사용자에 의한 실수도 복원이 가능하다.





## ReactNative AWS S3 Image Upload

### `image-picker`를 사용한 사진 업로드

> `image-picker`로 사용자 앨범에서 선택한 사진 S3에 업로드하기

<img title="" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FcpapGC%2FbtrAKjwMtuS%2FL0tZO8KhKcx74MnRwDCkyk%2Fimg.png" alt="">



1. client : image-picker의 launchImageLibrary메소드를 통해 사용자 앨범에 접근하여 사진을 선택하고 객체를 반환한다.

2. 반환 받은 객체를 HTTP 통신으로 서버에 전송하기 위해 Formdata 처리를 해준다.

3. fetch를 사용하여 API 서버에 formdata를 post request 요청한다.

4. 서버: multer과 multer-s3 미들웨어를 사용하여 전달받은 파일(formdata처리 된 사진)을 AWS S3에 이미지 업로드한다

5. S3에 성공적으로 업로드 되면 S3에 업로드된 사진의 url를 반환받는다.

6. 사진의 url을 Mysql DB에 전송한다.



### `react-native-aws3`를 사용한 이미지/파일 업로드


