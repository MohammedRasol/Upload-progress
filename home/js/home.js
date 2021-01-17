
var count = 0
var tmp = ""
var URL = ""
var img = 0
var imgCount = 0
var last_img_count = 1
var deleted = []
function toBase64(file) {
    return new Promise(function (resolve, reject) {

        var reader = new FileReader();
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function StartLoading() {
    $("#loadingDiv").fadeIn()
}

function hideLoading() {
    $("#loadingDiv").fadeOut()
    document.body.style.overflowY = "auto";


}
function preview(files) {
    $(".close").show()
    last_img_count = 1
    count = 0
    tmp = ""
    URL = ""
    img = 0
    imgCount = 0
    deleted = []
    images = files
    StartLoading()
    var ImgContainer = $('#img_container')
    var tmp = 1
    var current = 1
    ImgContainer.show()
    imgCount = files.length
    $("#progress").attr("aria-valuemax", files.length)
    ImgContainer.html('')
    for (var i in files) {
        var promise = toBase64(files[i]);
        promise.then(function (result) {
setTimeout(function (){
          $("#initializerCount").text(current++ + " / " + imgCount + " Images .")
            if (tmp == imgCount)
                ImgContainer.append("<div id='div" + (count) + "' class='CARD'> <button id='ready" + (count) + "' class='btn btn-primary percent' >Ready</button><img onload='hideLoading()' class='image' src='" + result + "' id='img" + (count) + "'><span class='close' onclick='removePic(" + count++ + ")' title='Delete This Image'> X </span>  </div>");
            else
                ImgContainer.append("<div id='div" + (count) + "' class='CARD'><button id='ready" + (count) + "' class='btn btn-primary percent' >Ready</button><img  class='image' src='" + result + "' id='img" + (count) + "'> <span class='close'   onclick='removePic(" + count++ + ")'  title='Delete This Image'> X </span> </div>");
            tmp++
},500)
      
        })
    }

}

function uploadajax(ttl, cl) {

    $(".close").hide()

    var percentage=parseInt(((((last_img_count) / imgCount))) * 100)+ "%"
    var Ready = $("#ready" + cl)
    var Progress = $("#progress")
    var fileList = $('#multiupload').prop("files");
    var form_data = "";

    $('#prog' + cl).removeClass('loading-prep').addClass('upload-image');
    form_data = new FormData();
    form_data.append("upload_image", fileList[cl]);

    if (deleted[cl] != cl) {
        $.ajax({
            url: "ajax.php",
            cache: false,
            contentType: false,
            processData: false,
            async: true,
            data: form_data,
            type: 'POST',
            xhr: function () {
                var xhr = $.ajaxSettings.xhr();
                if (xhr.upload) {
                    xhr.upload.addEventListener('progress', function (event) {
                        var percent = 0;
                        if (event.lengthComputable) {
                            percent = Math.ceil(event.loaded / event.total * 100);
                        }
                        $('#prog' + cl).text(percent + '%')
                    }, false);
                }
                return xhr;
            },
            success: function (res, status) {
                if (status == 'success') {
                    percent = 0;
                    $("#loaderDiv").slideDown(300)
                    $("#form").slideUp(300)
                    console.log(percentage)
                    $("#progressPercent").html(percentage)
                    Progress.attr("aria-valuenow", last_img_count)
                    Progress.css("width",percentage)
                    $('#prog' + cl).text('');
                    $("#ttt" + cl).remove()
                    $("#img" + cl).attr("src", "tm.jpg")
                    Ready.css("background-color", "Green")
                    Ready.css("font-size", "20px")
                    Ready.toggle()
                    Ready.html("Success")
                    if (cl < ttl) {
                        uploadajax(ttl, cl + 1);
                    }
                    else
                     $("#up").html(imgCount + " Images Uploaded Successfully :)")
                     last_img_count++
                }
            },
            fail: function (res) {
                alert('Failed');
            }
        })
    }
    else
        uploadajax(ttl, cl + 1);
}

$('#upcvr').click(function () {
    var fileList = $('#multiupload').prop("files");
    var i;
    for (i = 0; i < fileList.length; i++) {

        $("#ready" + i).toggle()
        $("#div" + i).prepend("<div class='btn btn-primary percent' id='ttt" + i + "' ><span id='spinner" + i + "' class='spinner-border spinner-border-sm spinnerr'></span> <span class='loading-pep' id='prog" + i + "'></span> </div></div>");
        if (i == fileList.length - 1) {
            uploadajax(fileList.length - 1, 0, i);
        }
    }
});


function removePic(ID) {
    deleted[ID] = ID
    imgCount--
    $("#progress").attr("aria-valuemax", imgCount)
    $("#div" + ID).fadeOut()

}