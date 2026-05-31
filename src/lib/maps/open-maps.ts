type MapLocation = {
  name: string;
  latitude: number;
  longitude: number;
};

function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

function isAndroid(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android/.test(navigator.userAgent);
}

/** Opens native maps on mobile; Google Maps in browser on desktop */
export function openMaps(location: MapLocation): void {
  const { latitude, longitude, name } = location;
  const label = encodeURIComponent(name);
  const coords = `${latitude},${longitude}`;

  let url: string;

  if (isIOS()) {
    url = `https://maps.apple.com/?ll=${coords}&q=${label}`;
  } else if (isAndroid()) {
    url = `geo:${coords}?q=${coords}(${label})`;
  } else {
    url = `https://www.google.com/maps/search/?api=1&query=${coords}`;
  }

  window.open(url, "_blank", "noopener,noreferrer");
}
