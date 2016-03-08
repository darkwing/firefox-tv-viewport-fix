function metaViewportShim(showReport) {
  // The "container" argument is the element that houses the entire app
  // And sets its width/height to a standard TV size
  // The "showReport" argument is a boolean as to whether or not to show scaling information

  var container = document.body;
  var containerWidth = container.clientWidth;
  var containerHeight = container.clientHeight;

  // Start by looking for a meta viewport tag to see the desired size
  var desiredViewportWidth = (function() {
    var metaViewport = document.querySelector('meta[name=viewport]');
    if(metaViewport) {
      var matches = metaViewport.getAttribute('content').match('width=([0-9]+|device\-width)');
      if(matches && matches[1]) {
        if(String(matches[1]).toLowerCase() !== 'device-width') {
          return Number(matches[1]);
        }
      }
    }
    return false;
  })();

  // Get available dimensions of device
  var availableWidth = window.innerWidth;
  var availableHeight = window.innerHeight;

  // Calculates an approximate scale factor for a needed transform
  var scaleFactor = (availableWidth / desiredViewportWidth).toFixed(2);

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
      'Desired width: ' + desiredViewportWidth,
      'Available height: ' + availableHeight,
      'Container height: ' + containerHeight,
      'Scale Factor: ' + scaleFactor,
      'Scaled Width: ' + container.getBoundingClientRect().width,
      'Scaled Height: ' + container.getBoundingClientRect().height,
      'Scaled? ' + performedScale
    ].join('<br>');
  }
}
