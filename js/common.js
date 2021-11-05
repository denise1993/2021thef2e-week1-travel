(function(){
  // curl -X GET --header 'Accept: application/json' --header 'Authorization: hmac username="357ef1ea44234d1c823d64dd419f858f", algorithm="hmac-sha1", headers="x-date", signature="VeK15DGOC3y5ZIX/YZxlgqVu7CQ="' --header 'x-date: Thu, 14 Oct 2021 08:21:39 GMT' --header 'Accept-Encoding: gzip' --compressed  'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON'

  // https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON


  // https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$top=30&$format=JSON

  // curl -X GET --header 'Accept: application/json' --header 'Authorization: hmac username="357ef1ea44234d1c823d64dd419f858f", algorithm="hmac-sha1", headers="x-date", signature="0/T1eZ/oW4a61jWK5odFmWD9dJ8="' --header 'x-date: Thu, 14 Oct 2021 08:23:04 GMT' --header 'Accept-Encoding: gzip' --compressed  'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$top=30&$format=JSON'
  

  /*
  APP ID：357ef1ea44234d1c823d64dd419f858f
  APP Key：-T4OuGMlwg5zohpazKvoCV28F48
  */
  const allAttractionsUrl = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$format=JSON';
  // const districtAttractionsUrl = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$top=30&$format=JSON';
  const allCity = [
    { 
      enName: "Taipei",
      cnName: "臺北市"
    },
    { 
      enName: "NewTaipei",
      cnName: "新北市"
    },
    { 
      enName: "Keelung",
      cnName: "基隆市"
    },
    { 
      enName: "YilanCounty",
      cnName: "宜蘭縣"
    },
    { 
      enName: "Taoyuan",
      cnName: "桃園市"
    },
    { 
      enName: "Hsinchu",
      cnName: "新竹市"
    },
    { 
      enName: "HsinchuCounty",
      cnName: "新竹縣"
    },
    { 
      enName: "MiaoliCounty",
      cnName: "苗栗縣"
    },
    { 
      enName: "Chiayi",
      cnName: "嘉義市"
    },
    { 
      enName: "Taichung",
      cnName: "臺中市"
    },
    { 
      enName: "ChanghuaCounty",
      cnName: "彰化縣"
    },
    { 
      enName: "NantouCounty",
      cnName: "南投縣"
    },
    { 
      enName: "YunlinCounty",
      cnName: "雲林縣"
    },
    { 
      enName: "ChiayiCounty",
      cnName: "嘉義縣"
    },
    { 
      enName: "Tainan",
      cnName: "臺南市"
    },
    { 
      enName: "Kaohsiung",
      cnName: "高雄市"
    },
    { 
      enName: "PingtungCounty",
      cnName: "屏東縣"
    },
    { 
      enName: "HualienCounty",
      cnName: "花蓮縣"
    },
    { 
      enName: "TaitungCounty",
      cnName: "臺東縣"
    },
    { 
      enName: "KinmenCounty",
      cnName: "金門縣"
    },
    { 
      enName: "PenghuCounty",
      cnName: "澎湖縣"
    },
    { 
      enName: "LienchiangCounty",
      cnName: "連江縣"
    }
  ];


  let app = {
    data() {
      return {
        allCity: allCity,
        currentCity: "Taipei",
        allAttractions: [], //全部景點
        districtAttractions: [], //分縣市景點
        cacheAllAttractions: [],
        cacheDataDistrictAttractions: [],
      };
    },
    template: `
    <main>
      <div class="search-content">
        <select name="areaSearch" class="search-content__area" v-model="currentCity" @change="changeCity">
          <option value="縣市搜尋" disabled selected hidden>縣市搜尋</option>
          <option :value="item.enName" v-for="(item, index) in allCity">{{item.cnName}}</option>
        </select>
        <input type="text" class="search-content__keyword" placeholder="搜尋">
      </div>
      <ul class="travel-card">
        <li class="travel-card__item" v-for="(item, index) in districtAttractions">
          <div class="travel-card__title">{{item.Name}}</div>          
          <figure class="travel-card__img" v-if="item.Picture.PictureUrl1">
            <img :src="item.Picture.PictureUrl1" alt="">
            <div class="travel-card__tag">{{item.City}}</div>
          </figure>
          <div class="travel-card__info">
            <div class="travel-card__description"><span>景點介紹：</span>{{item.DescriptionDetail}}</div>
            <div class="travel-card__open-time"><span>開放時間：</span>{{item.OpenTime}}</div>
            <div class="travel-card__Website"><span>網站：</span>
            <a v-if="item.WebsiteUrl" :href="item.WebsiteUrl">{{item.WebsiteUrl}}</a>
            <p v-else="!item.WebsiteUrl">無官方網站</p>
            </div>
          </div>          
        </li>
      </ul>
    </main>
    `,
    computed: {
      
    },
    methods: {
      getAuthorizationHeader() {
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
      },
      async changeCity(){
        this.districtAttractions = await axios
        .get( `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${this.currentCity}?$top=30&$format=JSON`,
          {
            headers: this.getAuthorizationHeader(),
          }
        )
        .then((response) => response.data)
        .catch(function (error) {
          console.log(error);
        }); 
      }
    },
    async mounted() {
      // this.allAttractions = await axios
      //   .get( allAttractionsUrl,
      //     {
      //       headers: this.getAuthorizationHeader(),
      //     }
      //   )
      //   .then((response) => response.data)
      //   .catch(function (error) {
      //     console.log(error);
      //   });  

        this.districtAttractions = await axios
        .get( `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${this.currentCity}?$top=30&$format=JSON`,
          {
            headers: this.getAuthorizationHeader(),
          }
        )
        .then((response) => response.data)
        .catch(function (error) {
          console.log(error);
        });    
    },
  };

  new Vue({
    el: "#app", // 2.掛載到#app(整塊取代)
    render: h => h(app) //1.產出el-app
  });

})();