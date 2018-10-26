import axios from "axios";

const BASEURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
const APIKEY = "&key=AIzaSyCZHm522MDtZTsy5gXFX2ni9rsUYdKXCh4"; 

export default {
    search: function(location)
    {
        return axios.get(BASEURL + location + APIKEY);
    }
};