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
