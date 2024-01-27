var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { removeBackground } from "remove-background.js";
var displayImage = document.getElementById("nobgimg");
document.getElementById("bgsel2").addEventListener("onclick", () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const imageBlob = yield removeBackground(
        document.getElementById("snapimage")
      ); // 👈 API call is here
      const objectURL = URL.createObjectURL(imageBlob);
      displayImage.src = objectURL;
      finalResult();
    } catch (error) {
      console.error("Error:", error);
    }
  })
);

function finalResult() {
  $(".secondpage").hide();
  var canvas = document.getElementById("imageCanvas");
  var ctx = canvas.getContext("2d");
  $("#bgimg").attr(
    "src",
    " assets/image_mercedes" + localStorage.getItem("bgid") + ".jpg"
  );
  ctx.drawImage(document.getElementById("bgimg"), 0, 0);
  destX = 370;
  destY = 235;
  ctx.drawImage(displayImage, 0, 0, 960, 1280, destX, destY, 217, 289);

  canvas.setAttribute("style", "transform:rotateZ(90deg)");

  $(".thirdpage").show();
}
function download() {
  var link = document.createElement("a");
  link.download = "filename.png";
  link.href = document.getElementById("imageCanvas").toDataURL();
  link.click();
}
