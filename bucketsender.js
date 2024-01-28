var albumBucketName = "hdbuckettest";
var bucketRegion = "ap-south-1";
var IdentityPoolId = "ap-south-1:f746089a-16b2-4b75-8d74-3fee63d59c02";

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId,
  }),
});

var s3 = new AWS.S3({
  apiVersion: "2012-10-17",
  params: { Bucket: albumBucketName },
});

//function to send file in S3
function addFileToBucket(albumName, file, fileName) {
  // var files = document.getElementById("photoupload").files;
  //   if (!files.length) {
  //     return alert("Please choose a file to upload first.");
  //   }
  //   var file = files[0];
  var albumPhotosKey = albumName + "/";
  var photoKey = albumPhotosKey + fileName;

  // Use S3 ManagedUpload class as it supports multipart uploads
  var upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: albumBucketName,
      Key: photoKey,
      Body: file,
      ACL: "public-read",
    },
  });

  var promise = upload.promise();

  promise.then(
    function (data) {
      // if (file.type != PDF || file.type != pdf) {
      console.log("Successfully uploaded photo.");
      //viewAlbum(albumName);
      // }
    },
    function (err) {
      return alert("There was an error uploading your photo: ", err.message);
    }
  );
}
// Show the photos that exist in an album.
function viewAlbum(albumName) {
  var albumPhotosKey = encodeURIComponent(albumName) + "/";
  s3.listObjects({ Prefix: albumPhotosKey }, function (err, data) {
    var href = this.request.httpRequest.endpoint.href;
    var bucketUrl = href + albumBucketName + "/";
    data.Contents.forEach((element) => {
      var photoKey = element.Key;
      var photoUrl = bucketUrl + encodeURIComponent(photoKey);
      var image_box = document.createElement("div");
      image_box.setAttribute("class", "image-box");
      image_box.setAttribute("data-name", photoKey.split("/")[1]);

      var imgtitle = document.createElement("h6");
      imgtitle.innerHTML = photoKey.split("/")[1];
      var img = document.createElement("img");
      img.src = photoUrl;
      image_box.appendChild(img);

      image_box.appendChild(imgtitle);
      document.getElementById("imagesdiv").appendChild(image_box);

      console.log(element.Key);
    });
  });
  // s3.listObjects({ Prefix: albumPhotosKey }, function (err, data) {
  //   if (err) {
  //     return alert("There was an error viewing your album: " + err.message);
  //   }
  //   // 'this' references the AWS.Request instance that represents the response
  //   var href = this.request.httpRequest.endpoint.href;
  //   var bucketUrl = href + albumBucketName + "/";

  //   var photos = data.Contents.map(function (photo) {
  //     var photoKey = photo.Key;
  //     var photoUrl = bucketUrl + encodeURIComponent(photoKey);
  //     return getHtml([
  //       "<span>",
  //       "<div>",
  //       "<br/>",
  //       '<img style="width:128px;height:128px;" src="' + photoUrl + '"/>',
  //       "</div>",
  //       "<div>",
  //       "<span>",
  //       photoKey.replace(albumPhotosKey, ""),
  //       "</span>",
  //       "</div>",
  //       "</span>",
  //     ]);
  //   });
  //   var message = photos.length
  //     ? "<p>The following photos are present.</p>"
  //     : "<p>There are no photos in this album.</p>";
  //   var htmlTemplate = [
  //     "<div>",
  //     '<button onclick="listAlbums()">',
  //     "Back To Albums",
  //     "</button>",
  //     "</div>",
  //     "<h2>",
  //     "Album: " + albumName,
  //     "</h2>",
  //     message,
  //     "<div>",
  //     getHtml(photos),
  //     "</div>",
  //     "<h2>",
  //     "End of Album: " + albumName,
  //     "</h2>",
  //     "<div>",
  //     '<button onclick="listAlbums()">',
  //     "Back To Albums",
  //     "</button>",
  //     "</div>",
  //   ];
  //   document.getElementById("viewer").innerHTML = getHtml(htmlTemplate);
  //   document
  //     .getElementsByTagName("img")[0]
  //     .setAttribute("style", "display:none;");
  // });
}
