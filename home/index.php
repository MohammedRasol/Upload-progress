<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>File(s) size</title>
</head>
<link rel="stylesheet" href="./css/bootstrap.min.css">
<link rel="stylesheet" href="./css/style.css">
<!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">  -->

<body>

    <div class="loading" id="loadingDiv">
        <!-- <img src="./load.svg"  class="loading-image" alt=""> -->

        <div class="lds-hourglass "></div>
        <div class="initializer ">
            initializing : <span id="initializerCount">sdsd</span>
        </div>
    </div>

    <div id='super-container'>

        <div class="container fixed-top alert alert-info" role="alert" id='loaderDiv'>
            <center id="up">
                <div id='uploader'> Uploading...
                </div>
                <div class="progress">
                    <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" id="progress" style="width:40%">
                        <span id='progressPercent'></span>
                    </div>
                </div>
            </center>
        </div>
        <center>
        <div>
            <div class="form" id="form">
                 <img src="./img.png"  class="img-select" alt="Select Images" onclick="$('#multiupload').trigger('click');" title="Select Images ..* Maximum 150 ">
                     <br>

                <button type="button" id="upcvr" class="btn btn-success">Upload Images</button>


                <input onchange="preview(this.files)" type='file' id="multiupload" accept="image/*" name='files[]' multiple>
            </div>
        </div></center>
        <div class='img_container' id="img_container">
        </div>
    </div>
</body>
<script src="./js/jquery-3.3.1.min.js"></script>
<script src="./js/bootstrap.min.js"></script>
<script src="./js/home.js"></script>

</html>