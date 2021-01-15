
    var count = 0
    var tmp = ""
    var URL = ""
    var img = 0
    var imgCount = 0

    function toBase64(file) {
        return new Promise(function(resolve, reject) {

            var reader = new FileReader();
            reader.onload = function() {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    function preview(files) {


        $(".img_container").show()
        imgCount = files.length
        $("#progress").attr("aria-valuemax", files.length)
        $('.img_container').html('')
        for (var i in files) {


            var promise = toBase64(files[i]);
            promise.then(function(result) {



                // $('.img_container').append('<div class="imgCard" id="loading" <img class="image" src="loading.gif" ></div>');



                // $("#loading").remove()
                console.log(count)
                $('.img_container').append("<div id='div" + (count) + "' class='CARD'><button id='ready" + (count) + "' class='btn btn-primary percent' >Ready</button><img class='image' src='" + result + "' id='img" + (count++) + "'> </div>");




            })

        }

        //    $("#loaderDiv").hide()

    }

    function uploadajax(ttl, cl, count) {
        // $("#img"+cl).attr('src',"loading.gif")

        var fileList = $('#multiupload').prop("files");
        $('#prog' + cl).removeClass('loading-prep').addClass('upload-image');

        var form_data = "";

        form_data = new FormData();
        form_data.append("upload_image", fileList[cl]);


        var request = $.ajax({
            url: "ajax.php",
            cache: false,
            contentType: false,
            processData: false,
            async: true,
            data: form_data,
            type: 'POST',
            xhr: function() {
                var xhr = $.ajaxSettings.xhr();
                if (xhr.upload) {
                    xhr.upload.addEventListener('progress', function(event) {
                        var percent = 0;
                        if (event.lengthComputable) {
                            percent = Math.ceil(event.loaded / event.total * 100);
                        }
                        $('#prog' + cl).text(percent + '%')
                    }, false);
                }
                return xhr;
            },
            success: function(res, status) {
                if (status == 'success') {

                    percent = 0;
                    $("#loaderDiv").slideDown(300)
                    $(".form").slideUp(300)
                    // $("#progressPercent").html(cl + 1 + " From " + imgCount)
                    $("#progressPercent").html(parseInt((cl + 1) / imgCount * 100) + "%")
                    $("#progress").attr("aria-valuenow", cl + 1)
                    $("#progress").css("width", parseInt(((cl + 1) / imgCount) * (100)) + "%")
                    $('#prog' + cl).text('');
                    $("#ttt" + cl).remove()
                    $("#img" + cl).attr("src", "tm.jpg")
                    console.log(cl)
                    $("#ready" + cl).css("background-color", "Green")
                    $("#ready" + cl).css("font-size", "20px")
                    $("#ready" + cl).toggle()
                    $("#ready" + cl).html("Success")
                    if (cl + 1 == imgCount)
                        $("#up").html(imgCount + " Images Uploaded Successfully :)")

                    if (cl < ttl) {
                        uploadajax(ttl, cl + 1);
                    }
                }
            },
            fail: function(res) {
                alert('Failed');
            }
        })
    }

    $('#upcvr').click(function() {
        var fileList = $('#multiupload').prop("files");

        var i;
        for (i = 0; i < fileList.length; i++) {

            $("#ready" + i).toggle()

            $("#div" + i).prepend("<div class='btn btn-primary percent' id='ttt" + i + "' ><span id='spinner" + i + "' class='spinner-border spinner-border-sm spinnerr'></span> <span class='loading-pep' id='prog" + i + "'></span> </div></div>");
            //  $("#div"+i).html("<span class='percent' id='per'><span class='loading-pep' id='prog" + i + "'></span></span>");

            if (i == fileList.length - 1) {
                uploadajax(fileList.length - 1, 0, i);
            }
        }
    });