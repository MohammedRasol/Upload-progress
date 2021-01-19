function now() {
    return window.performance ? performance.now() : +new Date
}

var isFileDialogOpened = false;

var input = document.querySelector('input');

input.addEventListener('click', function (e) {
    console.log('clicked', now())
    StartLoading()
    isFileDialogOpened = true
})

input.addEventListener('blur', function (e) {
    console.log('input blur', now())
    isFileDialogOpened = true
})

window.addEventListener('focus', function (e) {
    if (isFileDialogOpened) {
        {
            console.log("Hiding")
            hideLoading()
        }


        isFileDialogOpened = false
    }
})

var ImgContainer = $('#img_container')

var count = 0
var tmp = ""
var URL = ""
var img = 0
var imgCount = 0
var last_img_count = 1
var deleted = []
var Total_Size = 0
var Images = []
var image_name=""

function StartLoading() {
    $("#loadingDiv").show()
    document.body.style.overflowY = "hidden";
}

function hideLoading() {
    $("#loadingDiv").hide()
    document.body.style.overflowY = "auto";


}

var toBase64Count=1
function toBase64(file) 
{

    return new Promise(function (resolve, reject) {

        var reader = new FileReader();
        reader.onload =  function() {
            resolve(reader.result);

        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function preview(files) {

    if (files.length != 0) {
        $(".info").show()
        $(".close").show()
         StartLoading()

    }
    else {
        $(".info").hide()
    }

    last_img_count = 1

    count = 0
    tmp = ""
    URL = ""
    img = 0
    imgCount = 0
    deleted = []
    images = files
    var div = ""
    var tmp = 1
    var current = 1
    ImgContainer.show()
    imgCount = files.length
    $("#totalImg").text(imgCount)
    $("#progress").attr("aria-valuemax", files.length)
    ImgContainer.html('')

    if (files.length != 0)
        for (var i in files) {
            // image_name=files[count].name
            var promise = toBase64(files[i]);
            promise.then(function (result) {



              

                $("#initializerCount").text(current++ + " / " + imgCount + " Images .")

                // 
                //   div =" <div ><img onload='hideLoading()' class='' height='100' width='100'  src='" + result + "' id='img" + (count) + "'></div>";
                //     else
                // div ="<div><img  class='' height='100' width='100' src='" + result + "' id='img" + (count) + "'></div>" +
                if (tmp == imgCount)
    
               div = "<div   id='div" + (count) + "' class='card'><img onload='hideLoading()'"+
               " src='" + result + "' alt='Avatar' style='width:100%'>"+
               " <div class='progress'  style='width:100%;background-color:white;'>  <div class='progress-bar progress-bar-striped progress-bar-animated' role='progressbar' aria-valuenow='75' id='prog"+count+"' aria-valuemin=0' aria-valuemax='100' style='width: 0%'>Uploading... </div></div>"+
               "<div class='container'><h4><b> Name :<span class='img-name-'> "+files[count].name+"</span></b></h4> "+
               "<p><b >Size : </b> "+(files[count].size / 1048576) . toString().substr(0, 4) +" MB  "+                 
               " <button onclick='removePic(" + count++ + ")' title='Remove This Image' class='btn btn-danger remove' >Remove</button> </p></div></div>"

                 else
                    div = "<div   id='div" + (count) + "' class='card'><img "+
                    " src='" + result + "' alt='Avatar' style='width:100%'>"+
                    " <div class='progress' style='width:100%;background-color:white;'>  <div class='progress-bar progress-bar-striped progress-bar-animated' role='progressbar' aria-valuenow='75' id='prog"+count+"' aria-valuemin=0' aria-valuemax='100' style='width: 0%'>Uploading...</div></div>"+
                    "<div class='container'><h4><b> Name :<span class='img-name-'> "+files[count].name+"</span></b></h4> "+
                    "<p><b >Size : </b> "+(files[count].size / 1048576) . toString().substr(0, 4) +" MB  "+                 
                    " <button onclick='removePic(" + count++ + ")' title='Remove This Image' class='btn btn-danger remove' >Remove</button> </p></div></div>"


                // if (tmp == imgCount)
                //     div = "<div id='div" + (count) + "' class='CARD'>" +
                //         "<button id='ready" + (count) + "' class='btn btn-primary percent' >" +
                //         ' READY ' +
                //         '</button>' +
                //         "<img onload='hideLoading()' class='image' src='" + result + "' id='img" + (count) + "'>" +
                //         "<span class='close' onclick='removePic(" + count++ + ")' title='Delete This Image'> X </span>  " +
                //         "</div>";
                // else

                //     div = "<div id='div" + (count) + "' class='CARD'>" +
                //         "<button id='ready" + (count) + "' class='btn btn-primary percent' >" +
                //         ' READY ' +
                //         '</button>' +
                //         "<img   class='image' src='" + result + "' id='img" + (count) + "'>" +
                //         "<span class='close' onclick='removePic(" + count++ + ")' title='Delete This Image'> X </span>  " +
                //         "</div>";

                ImgContainer.append(div);


                // if (tmp == imgCount)
                //     ImgContainer.append("<div id='div" + (count) + "' class='CARD'> <button id='ready" + (count) + "' class='btn btn-primary percent' >Ready</button>< img onload = 'hideLoading()' class= 'image' src = '" + result + "' id = 'img" + (count) + "' ><span class='close' onclick='removePic(" + count++ + ")' title='Delete This Image'> X </span>  </div > "
                //     );
                // else
                //     ImgContainer.append("<div id='div" + (count) + "' class='CARD'><button id='ready" + (count) + "' class='btn btn-primary percent' >Ready</button><img  class='image' src='" + result + "' id='img" + (count) + "'> <span class='close'   onclick='removePic(" + count++ + ")'  title='Delete This Image'> X </span> </div>");

                tmp++


            })
        }




    TotalSize(files)

}



function uploadajax(ttl, cl) {

    // $(".close").hide()
     $(".remove").hide()



    var percentage = parseInt(((((last_img_count) / imgCount))) * 100) + "%"
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
                       document.getElementById('prog' + cl).style.width =percent + "%"
                        // $('#prog' + cl).css("width" , percent+'%')
          
                        console.log()
                    }, false);
                }
                return xhr;
            },
            success: function (res, status) {
                if (status == 'success') {
                    percent = 0;
                    $("#loaderDiv").slideDown(300)
                    $("#form").slideUp(300)
                    $("#progressPercent").html(percentage)
                    Progress.attr("aria-valuenow", last_img_count)
                    Progress.css("width", percentage)
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
    else {

        uploadajax(ttl, cl + 1);
    }

}

$('#upcvr').click(function () {
    var fileList = $('#multiupload').prop("files");
    var i;
    for (i = 0; i < fileList.length; i++) {

        $("#ready" + i).toggle()
        // $("#div" + i).prepend("<div class='btn btn-primary percent' id='ttt" + i + "' ><span id='spinner" + i + "' class='spinner-border spinner-border-sm spinnerr'></span> <span class='loading-pep' id='prog" + i + "'></span> </div></div>");
        if (i == fileList.length - 1) {
            uploadajax(fileList.length - 1, 0, i);
        }
    }
});

function TotalSize(files, minus = 0) {

    console.log(minus)
    var Size = 0
    for (var i = 0; i < files.length; i++)
        Size += files[i].size

    Size = (Size - minus) / 1048576;
    Total_Size = Size
    Size = Size.toString();

    $("#totalSize").text(Size.substr(0, 4))

}
function removePic(ID) {
    images = $("#multiupload").prop('files')
    deleted[ID] = ID
    imgCount--
    if (imgCount == 0) {
        $(".info").hide()
        $('#img_container').hide()
    }
    Total_Size = (Total_Size - (images[ID].size / 1048576));
    $("#totalSize").text(Total_Size.toString().substr(0, 4))
    $("#totalImg").text(imgCount)
    $("#progress").attr("aria-valuemax", imgCount)
    $("#div" + ID).remove()

}