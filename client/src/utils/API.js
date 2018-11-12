import axios from "axios";

const googleURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
const googleAPIKEY = "&key=AIzaSyCZHm522MDtZTsy5gXFX2ni9rsUYdKXCh4"; 

const yelpURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?";

// export default {
//     googleLocation: function(location)
//     {
//         return axios.get(BASEURL + location + APIKEY);
//     }
// };

export default {
    googleLocation: location => axios.get(googleURL + location + googleAPIKEY),
    yelp: (lat, long) => axios.get(yelpURL + "latitude=" + lat + "&longitude=" + long + "&categories=bars", {headers: {Authorization: "Bearer " + "xPu4PdApD7iZEGV1WZoFEnQ19m1bNtl9UO6chw0e8jkzMb4nnqrS-W3Dsoq6DrnCUhk6acWx-cfV-ZkJmhQ6C02O-7a8PcPL5hHgKP2rG-yshyFN_bNVD-VEyInSW3Yx"}})
};