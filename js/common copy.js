(function(){
  // curl -X GET --header 'Accept: application/json' --header 'Authorization: hmac username="357ef1ea44234d1c823d64dd419f858f", algorithm="hmac-sha1", headers="x-date", signature="VeK15DGOC3y5ZIX/YZxlgqVu7CQ="' --header 'x-date: Thu, 14 Oct 2021 08:21:39 GMT' --header 'Accept-Encoding: gzip' --compressed  'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON'

  // https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON


  // https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$top=30&$format=JSON

  // curl -X GET --header 'Accept: application/json' --header 'Authorization: hmac username="357ef1ea44234d1c823d64dd419f858f", algorithm="hmac-sha1", headers="x-date", signature="0/T1eZ/oW4a61jWK5odFmWD9dJ8="' --header 'x-date: Thu, 14 Oct 2021 08:23:04 GMT' --header 'Accept-Encoding: gzip' --compressed  'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$top=30&$format=JSON'


  /*
  APP ID：357ef1ea44234d1c823d64dd419f858f
  APP Key：-T4OuGMlwg5zohpazKvoCV28F48
  */



  let app = {
    el: "#app",
    data () {
      return {
        allAttractions: [], //全部景點
        districtAttractions: [], //分縣市景點
        cacheAllAttractions: [],
        cacheDataDistrictAttractions: [],
        msg: "This is my message"
      }
    },
    template: `
    <section>
      <div class="container">
        <h1 class="title">{{ msg }}</h1>
        <div>
          <input type="text" v-model="msg" />
        </div>
      </div>
    </section>
    `,
    methods: {
      getAuthorizationHeader(){
        //  填入自己 ID、KEY 開始
        let AppID = '357ef1ea44234d1c823d64dd419f858f';
        let AppKey = '-T4OuGMlwg5zohpazKvoCV28F48';
        //  填入自己 ID、KEY 結束
        let GMTString = new Date().toGMTString();
        let ShaObj = new jsSHA('SHA-1', 'TEXT');
        ShaObj.setHMACKey(AppKey, 'TEXT');
        ShaObj.update('x-date: ' + GMTString);
        let HMAC = ShaObj.getHMAC('B64');
        let Authorization =
          'hmac username="' +
          AppID +
          '", algorithm="hmac-sha1", headers="x-date", signature="' +
          HMAC +
          '"';
        return { Authorization: Authorization, 'X-Date': GMTString };
      }
    },
    mounted () {
    //   axios
    //   .get(
    //     'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON',
    //     {
    //       headers: this.getAuthorizationHeader()
    //     }
    //   )
    //   .then(function (response) {
    //     this.allAttractions = response.data;
    //     document.querySelector('body').textContent = JSON.stringify(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    }
  };
  new Vue({
    render: h => h(app) //1.產出el-app
  }).$mount("#app"); // 2.掛載到#app(整塊取代)

})();