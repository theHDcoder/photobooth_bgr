const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");
const redirect_uri = "";
const client_secret = "";
const scope = "https://www.googleapis.com/auth/drive";
var access_token = "";
var client_id = "";

$.ajax({
  type: "POST",
  url: "https://www.googleapis.com/oauth2/v4/token",
  data: {
    code: code,
    redirect_uri: redirect_uri,
    client_secret: client_secret,
    client_id: client_id,
    scope: scope,
    grant_type: "authorization_code",
  },
  dataType: "json",
  success: function (resultData) {
    localStorage.setItem("accessToken", resultData.access_token);
    localStorage.setItem("refreshToken", resultData.refreshToken);
    localStorage.setItem("express_in", resultData.expires_in);
    window.history.pushState({}, document.title);
  },
});
