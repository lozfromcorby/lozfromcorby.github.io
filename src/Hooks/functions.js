const nameFormat = (val = '') => {
    return val.toLowerCase().split(" ").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ")
  }

// Converts from degrees to radians.
function toRadians(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
function toDegrees(radians) {
  return radians * 180 / Math.PI;
}

const getDistance = (lat1, lon1, lat2, lon2, unit) => {
  if ((lat1 === lat2) && (lon1 === lon2)) {
    return 0;
  }
  else {
    let radlat1 = Math.PI * lat1/180;
    let radlat2 = Math.PI * lat2/180;
    let theta = lon1-lon2;
    let radtheta = Math.PI * theta/180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit==="K") { dist = dist * 1.609344 }
    if (unit==="N") { dist = dist * 0.8684 }
    return dist;
  }
}

const getBearing = (startLat, startLng, destLat, destLng) => {
  startLat = toRadians(startLat);
  startLng = toRadians(startLng);
  destLat = toRadians(destLat);
  destLng = toRadians(destLng);

  let y = Math.sin(destLng - startLng) * Math.cos(destLat);
  let x = Math.cos(startLat) * Math.sin(destLat) -
        Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
  let brng = Math.atan2(y, x);
  brng = toDegrees(brng);
  return (brng + 360) % 360;
}

const tawkTo = (propertyId) => {
  if (!window) {
    throw new Error('DOM is unavailable')
  }

  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();

  const tawk = document.getElementById('tawkId');
  if (tawk) {
      // Prevent TawkTo to create root script if it already exists
      return window.Tawk_API;
  }

  const script = document.createElement("script")
  const script1 = document.getElementsByTagName("script")[0];
  script.id    = 'tawkId';
  script.async = true;
  script.src   = 'https://embed.tawk.to/' + propertyId + '/default';
  script.setAttribute('crossorigin', '*');
  script1.parentNode.insertBefore(script,script1);

  const first_script_tag = document.getElementsByTagName("script")[0];
  if (!first_script_tag || !first_script_tag.parentNode) {
      throw new Error('DOM is unavailable')
  }

  first_script_tag.parentNode.insertBefore(script, first_script_tag)
}

const obj = {
  nameFormat,
  toRadians,
  toDegrees,
  getBearing,
  getDistance,
  tawkTo
}

export default obj