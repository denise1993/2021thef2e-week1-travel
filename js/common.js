(async function(){
  let allCity = [];

  await axios.all([getAllCity(), getAllScenicSpot(),getCurrentScenicSpot()])
  .then(axios.spread((res1, res2, res3)=>{
    allCity = res1.data;
    console.log("res1: ", res1.data);
    console.log("res2: ", res2.data);
    console.log("res3: ", res3.data);
  }));

  // API 驗證用
  function GetAuthorizationHeader() {
    var AppID = '357ef1ea44234d1c823d64dd419f858f';
    var AppKey = '-T4OuGMlwg5zohpazKvoCV28F48';

    var GMTString = new Date().toGMTString();
    var ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    var HMAC = ShaObj.getHMAC('B64');
    var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

    return { 'Authorization': Authorization, 'X-Date': GMTString /*,'Accept-Encoding': 'gzip'*/ }; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
  }

  // 取得縣市
  function getAllCity() {
    return axios({
      method: 'get',
      url: 'https://gist.motc.gov.tw/gist_api/V3/Map/Basic/City?$format=JSON',
      headers: GetAuthorizationHeader()
    });
  }

  // 取得所有觀光景點資料
  function getAllScenicSpot() {
    return axios({
      method: 'get',
      url: 'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON',
      headers: GetAuthorizationHeader()
    });
  }

  // 取得指定[縣市]觀光景點資料
  function getCurrentScenicSpot() {
    return axios({
      method: 'get',
      url: 'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$top=30&$format=JSON',
      headers: GetAuthorizationHeader()
    });
  }


  const allAttractionsUrl = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$format=JSON';
  // const districtAttractionsUrl = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$top=30&$format=JSON';


  let app = {
    data() {
      return {
        allCity: allCity,
        currentCity: 'Taipei',
        allAttractions: [], //全部景點
        districtAttractions: [], //分縣市景點
        cacheAllAttractions: [],
        cacheDataDistrictAttractions: [],
      };
    },
    template: `
    <main id="app">
      <div class="search-content">
        <select name="areaSearch" class="search-content__area" v-model="currentCity" @change="changeCity">
          <option value="null" disabled selected hidden>縣市搜尋</option>
          <option :value="item.City" v-for="(item, index) in allCity">{{item.CityName}}</option>
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