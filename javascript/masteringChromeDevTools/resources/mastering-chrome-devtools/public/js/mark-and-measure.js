window.addEventListener("load", thingToMeasure);

function thingToMeasure() {
    const start = new Date().getTime();
    performance.mark('start');
    
  fetch("/api")
    .then(result => result.json())
    .then(json => {
      json.images.forEach(image => console.log(image.name));
      const end = new Date().getTime();
      performance.mark('end');
      performance.measure('Performance API: time elapsed', 'start', 'end');
      const [measurement] = performance.getEntriesByType('measure');
      console.log('Date: time elapsed', end - start);
      console.log('Performance API: time elapsed', measurement.duration, measurement);
    });
}
