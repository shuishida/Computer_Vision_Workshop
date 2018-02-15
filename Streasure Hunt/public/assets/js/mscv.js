function processImage() {
    var imageUrl = getViewUrl();
    var subscriptionKey = MS_CV_KEY;
    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze";
    var params = {
        "visualFeatures": "Description",
        "details": "",
        "language": "en",
    };

    // Perform the REST API call.
    $.ajax({
        url: uriBase + "?" + $.param(params),

        // Request headers.
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        type: "POST",

        // Request body.
        data: '{"url": ' + '"' + imageUrl + '"}',
    })

    .done(function(data) {
        var res = data["description"]["tags"];
        var str = "";
        var i;
        for(i in res){
            str = str + "<a class='btn btn-warning' href='#'>"+res[i]+"</a>";
        }
        var tagCell = document.getElementById("tags");
        tagCell.innerHTML = str;
        findMatch(res, imageUrl);
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
        // Display error message.
        var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
        alert(errorString);
    });
};

function classifyImage(imageUrl) {
    var subscriptionKey = MS_Custom_KEY;
    var request_url = "https://southcentralus.api.cognitive.microsoft.com/customvision/v1.1/Prediction/7cee6b20-c5d1-45bc-8f3f-ccab49d66910/url";

    // Perform the REST API call.
    $.ajax({
        url: request_url,

        // Request headers.
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Prediction-Key", subscriptionKey);
        },

        type: "POST",

        // Request body.
        data: '{"Url": ' + '"' + imageUrl + '"}',
    })

    .done(function(data) {
        var res = data["Predictions"];
        var i;
        var max = 0;
        var tag = "";
        for(i in res){
            var temp = parseFloat(res[i]["Probability"]);
            if(max < temp){
                max = temp;
                tag = res[i]["Tag"];
            }
        }
        addTag(tag);
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
        // Display error message.
        var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
        console.log(errorString);
        addTag("angles");
    });
};