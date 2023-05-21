function openGallery() {
    document.getElementById("fileInput").click();
  }
  
  document.getElementById("fileInput").addEventListener("change", function(event) {
    var selectedFile = event.target.files[0];
  
    var photoContainer = document.getElementById("photo-container");
    photoContainer.innerHTML = ""; // Clear any existing content
  
    var imgElement = document.createElement("img");
    imgElement.src = URL.createObjectURL(selectedFile);
    imgElement.alt = "Selected Image";
    photoContainer.appendChild(imgElement);
  
    var subheader = document.getElementById("subheader");
    subheader.style.display = "block";
  
    initializeCropper(imgElement);
  });
  
  function initializeCropper(imgElement) {
    var cropper = new Cropper(imgElement, {
      aspectRatio: 1,
      viewMode: 1,
      dragMode: 'move',
      autoCropArea: 0.8,
      restore: false,
      guides: false,
      center: false,
      highlight: false,
      cropBoxMovable: true,
      cropBoxResizable: true,
      toggleDragModeOnDblclick: false,
      ready: function() {
        // Show the cropping box
        cropper.setCropBoxData({ width: 200, height: 200 });
        cropper.crop();
      }
    });
  
    document.getElementById("rotate-button").addEventListener("click", function() {
      // Perform the rotate operation on the selected image
      cropper.rotate(90);
    });
  
    var cropButton = document.querySelector(".crop-button");
    cropButton.addEventListener("click", function() {
      // Perform the crop operation
      var croppedCanvas = cropper.getCroppedCanvas();
      // You can do further processing with the cropped canvas here
      // For example, display it in a separate container or upload it to the server
      displayCroppedImage(croppedCanvas);
    });
  
    document.getElementById("flip-horizontal-button").addEventListener("click", function() {
      flipImage("horizontal", cropper);
    });
  
    document.getElementById("flip-vertical-button").addEventListener("click", function() {
      flipImage("vertical", cropper);
    });
  }

  function flipImage(direction, cropper) {
    var scaleX = cropper.getData().scaleX || 1;
    var scaleY = cropper.getData().scaleY || 1;
  
    if (direction === "horizontal") {
      scaleX = -scaleX;
    } else if (direction === "vertical") {
      scaleY = -scaleY;
    }
  
    cropper.scaleX(scaleX);
    cropper.scaleY(scaleY);
  }
  
  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  
  
  var overlay = document.querySelector('.overlay');
  
  function closeOverlay() {
    overlay.style.display = 'none';
  }
  
  function displayCroppedImage(croppedCanvas) {
    var croppedImageContainer = document.getElementById('cropped-image');
    croppedImageContainer.src = croppedCanvas.toDataURL();
    overlay.style.display = 'flex';
  }
  
  // Hide the overlay initially
  overlay.style.display = 'none';

  function applyFrame(frameShape) {
    var frameOption = document.getElementById('frame-option-' + frameShape);
  
    if (frameOption) {
      var frameImage = frameOption.querySelector('img');
  
      // Remove any previously applied frame classes
      var photoContainer = document.getElementById('photo-container');
      photoContainer.classList.remove('heart-frame', 'square-frame', 'circle-frame', 'rectangle-frame');
  
      // Apply the selected frame class
      photoContainer.classList.add(frameShape + '-frame');
  
      // Update the cropped image with the frame image source
      var croppedImage = document.getElementById('cropped-image');
      croppedImage.src = frameImage.src;
    }
  }

  function useSelectedImage() {
    var selectedImageUrl = document.getElementById('cropped-image').src;
  
    var overlay = document.querySelector('.overlay');
    overlay.style.display = 'none';
  
    var selectedImage = document.createElement('img');
    selectedImage.src = selectedImageUrl;
    selectedImage.alt = 'Selected Image';
  
    var fileInput = document.getElementById('fileInput');
    fileInput.parentNode.insertBefore(selectedImage, fileInput.nextSibling);
  
    var cropperContainer = document.querySelector('.cropper-container');
    cropperContainer.innerHTML = '';
  
    var photoContainer = document.getElementById('photo-container');
    photoContainer.innerHTML = '';
    var subheader = document.getElementById('subheader');
    subheader.style.display = 'none';
  
    fileInput.value = '';
  }
  
  