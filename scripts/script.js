const CLIENT_ID = "668414651388-bq1um6i3r3o59vfg8hcg370ft41um44u.apps.googleusercontent.com";
const API_KEY = "AIzaSyDVoW52CA_gXX4uRJfUFRnArPd9KAIAXok";
const DISCOVERY_DOC = "https://sheets.googleapis.com/$discovery/rest?version=v4";
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
const pageParent = document.querySelector("body");
let homeGapiInited = false;

function apiLoad() {
    gapiLoaded();
};
