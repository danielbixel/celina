
$(document).ready(function(){

  $('.article').hide();
  $('.about').hide();

  $('li').click(function(){
    var articleID = $(this).attr('data-id');
    $('.list').removeClass('list-fadein').addClass('list-fadeout');
    $('.menu').removeClass('is-hidden').addClass('is-visible');
    $('.'+ articleID).delay(300).queue(function (next) {
      $(this).show().removeClass('article-fadeout').addClass('article-fadein');
      next();
    $(window).scrollTop(0);
    $('.list').hide();
    });
  });

  $('.burger').click(function(){
    $('.list').show();
    $('.menu').addClass('is-hidden').removeClass('is-visible');
    $('.list').removeClass('list-fadeout').addClass('list-fadein');
    $('.article, .about').removeClass('article-fadein').addClass('article-fadeout');
    $(window).scrollTop(0);
    $('.article').delay(300).queue(function (next) {
      $(this).hide();
      $('.about').hide();
      next();
    });
  });

  $('.info').click(function(){
    $('.list').removeClass('list-fadein').addClass('list-fadeout');
    $('.menu').removeClass('is-hidden').addClass('is-visible');
    $('.about').delay(300).queue(function (next) {
      $(this).show().removeClass('article-fadeout').addClass('article-fadein');
      next();
    $(window).scrollTop(0);
    $('.article').hide();
    $('.list').hide();
    });
  });

  $('.delete').click(function(){
    var id = $(this).attr("data-id");
    if (confirm("Willst du diese pulizerpreisverdächtige Buchstabensuppe wirklich löschen ?") == true) {
      window.location.href='/backend/deletearticle/' + id;
    }
  });


  $('.postarticle h3').click(function(){
    $(location).attr('href', '/backend/editor');
  });

  tinymce.init({
  selector: 'textarea',
  forced_root_block: false,
  height: 500,
  plugins: [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table contextmenu paste imagetools"
    ],
    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
  imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
  content_css: [
    '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
    '//www.tinymce.com/css/codepen.min.css'
  ],
  // enable title field in the Image dialog
  image_title: true,
  // enable automatic uploads of images represented by blob or data URIs
  automatic_uploads: true,
  // URL of our upload handler (for more details check: https://www.tinymce.com/docs/configure/file-image-upload/#images_upload_url)
  images_upload_url: '/backend/upload',
  // here we add custom filepicker only to Image dialog
  file_picker_types: 'image',
  relative_urls: false,
  // and here's our custom image picker
  file_picker_callback: function(cb, value, meta) {
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('name', 'wixxer');
    input.setAttribute('accept', 'image/*');

    // Note: In modern browsers input[type="file"] is functional without
    // even adding it to the DOM, but that might not be the case in some older
    // or quirky browsers like IE, so you might want to add it to the DOM
    // just in case, and visually hide it. And do not forget do remove it
    // once you do not need it anymore.

    input.onchange = function() {
      var file = this.files[0];

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        // Note: Now we need to register the blob in TinyMCEs image blob
        // registry. In the next release this part hopefully won't be
        // necessary, as we are looking to handle it internally.
        var id = 'blobid' + (new Date()).getTime();
        var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
        var base64 = reader.result.split(',')[1];
        var blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);

        // call the callback and populate the Title field with the file name
        cb(blobInfo.blobUri(), { title: file.name });
      };
    };

    input.click();
  }
  });

});
