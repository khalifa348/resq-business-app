// Day/night switching for the background video.
// "Night" = after Maghrib (sunset) until sunrise — uses the NOAA solar
// position algorithm, so the switch follows the real sun in the UAE
// (Dubai coords; accurate to ~1–2 min). No API, no network.

const LAT = 25.2048; // Dubai latitude (deg N)
const LON = 55.2708; // Dubai longitude (deg E)
// Times are returned as absolute instants (UTC-based Date objects), so
// comparisons work in any device timezone.

function toRad(d) {
  return (d * Math.PI) / 180;
}
function toDeg(r) {
  return (r * 180) / Math.PI;
}

// Returns { sunrise, sunset } as Date objects for the given date,
// local UAE time.
export function getSunTimes(date = new Date()) {
  const d = new Date(date);
  const start = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const next = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate() + 1));
  const fracYear = (2 * Math.PI) / 365 * (dayOfYear(start) - 1);

  const eqtime =
    229.18 *
    (0.000075 +
      0.001868 * Math.cos(fracYear) -
      0.032077 * Math.sin(fracYear) -
      0.014615 * Math.cos(2 * fracYear) -
      0.040849 * Math.sin(2 * fracYear));
  const decl =
    0.006918 -
    0.399912 * Math.cos(fracYear) +
    0.070257 * Math.sin(fracYear) -
    0.006758 * Math.cos(2 * fracYear) +
    0.000907 * Math.sin(2 * fracYear) -
    0.002697 * Math.cos(3 * fracYear) +
    0.00148 * Math.sin(3 * fracYear);

  const ha = toDeg(
    Math.acos(
      Math.cos(toRad(90.833)) / (Math.cos(toRad(LAT)) * Math.cos(decl)) -
        Math.tan(toRad(LAT)) * Math.tan(decl)
    )
  );

  // Minutes since UTC midnight
  const sunriseUTC = 720 - 4 * (LON + ha) - eqtime;
  const sunsetUTC = 720 - 4 * (LON - ha) - eqtime;

  return {
    sunrise: new Date(start.getTime() + sunriseUTC * 60000),
    sunset: new Date(start.getTime() + sunsetUTC * 60000),
  };
}

function dayOfYear(d) {
  return Math.floor(
    (d - new Date(Date.UTC(d.getUTCFullYear(), 0, 0))) / 86400000
  );
}

// isNight: true from Maghrib (sunset) until sunrise next morning.
export function isNightNow(now = new Date()) {
  const { sunrise, sunset } = getSunTimes(now);
  return now >= sunset || now < sunrise;
}
