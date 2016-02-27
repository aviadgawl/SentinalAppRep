//change the gaven element class to active;
function changeToActive(elementId) {

    switch (elementId) {
        case "responceMatric":
            document.getElementById('responceMatricBtn').className = "active";
            document.getElementById('topFaildApiBtn').className = "";
            document.getElementById('overreviewBtn').className = "";
            document.getElementById('snapShotBtn').className = "";
            break;

         case "topFaildApi":
            document.getElementById('responceMatricBtn').className = "";
            document.getElementById('topFaildApiBtn').className = "active";
            document.getElementById('overreviewBtn').className = "";
            document.getElementById('snapShotBtn').className = "";
            break;
            
             case "overreview":
            document.getElementById('responceMatricBtn').className = "";
            document.getElementById('topFaildApiBtn').className = "";
            document.getElementById('overreviewBtn').className = "active";
            document.getElementById('snapShotBtn').className = "";
            break;
            
             case "snapShot":
            document.getElementById('responceMatricBtn').className = "";
            document.getElementById('topFaildApiBtn').className = "";
            document.getElementById('overreviewBtn').className = "";
            document.getElementById('snapShotBtn').className = "active";
            break;

        default:
        document.getElementById('responceMatricBtn').className = "";
            document.getElementById('topFaildApiBtn').className = "";
            document.getElementById('overreviewBtn').className = "";
            document.getElementById('snapShotBtn').className = "";
            break;
    }
}