function fixViewportForFirefoxOsTv(container, showReport) {
  // The "container" argument is the element that houses the entire app
  // And sets its width/height to a standard TV size
  // The "showReport" argument is a boolean as to whether or not to show scaling information

  // Get available dimensions of device
  var availableWidth = window.innerWidth;
  var availableHeight = window.innerHeight;

  // `getBoundingClientRect` gives us dimensions after transformations
  var containerWidth = container.getBoundingClientRect().width;
  var containerHeight = container.getBoundingClientRect().height;

  // Calculates an approximate scale factor for a needed transform
  var scaleFactor = (availableWidth / containerWidth).toFixed(2);

  var performedScale = false;
  if(scaleFactor != '1.00') {
    container.style.transform = 'scale(' + scaleFactor + ')';
    container.style.transformOrigin = '0 0';
    container.style.margin = '0';
    performedScale = true;
  }

  // Reporting
  if(showReport) {
    var report = document.createElement('div');
    report.setAttribute('style', 'position:absolute;top:10px;left:10px;padding:10px;background:rgba(255, 255, 255, 0.5);');
    document.body.appendChild(report);
    report.innerHTML = [
      'Available width: ' + availableWidth,
      'Container width: ' + containerWidth,
      'Available height: ' + availableHeight,
      'Container height: ' + containerHeight,
      'Scale Factor: ' + scaleFactor,
      'Scaled Width: ' + container.getBoundingClientRect().width,
      'Scaled Height: ' + container.getBoundingClientRect().height,
      'Scaled? ' + performedScale
    ].join('<br>');
  }
}
