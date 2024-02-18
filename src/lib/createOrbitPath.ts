import { BufferGeometry, EllipseCurve, LineBasicMaterial, Line } from "three";
import { AU, BARYCENTER_OFFSET } from "./constants";

/**
 * Gets the elliptical orbit of a planet as a line and a curve.
 * @param semiMajorAxis Half the longest diamater of the ellipse. It's the average distance between the planet and the celestial body it's orbiting around.
 * @param eccentricity The eccentricity of an orbit is a measure of how elongated the orbit is. It's a number between 0 and 1 where 0 would be a perfect circle.
 * @param lineColor The color of the orbit's line.
 */
export default function(
  {
    lineColor = 0x33333,
    semiMajorAxis,
    eccentricity,
    radiusX = 0,
    radiusY = 0
  }: EllipseData = {}
): { orbitLine: Line, curve: EllipseCurve } {
  let curve: EllipseCurve;
  if (semiMajorAxis != undefined && eccentricity != undefined) {
    const minorAxis = semiMajorAxis * Math.sqrt(1 - eccentricity ** 2); // height of the ellipse in real AU, which is the shortest distance from the center of the orbit.
    curve = new EllipseCurve(
      BARYCENTER_OFFSET, 0, // center x, y
      semiMajorAxis * AU, minorAxis * AU, // radius x, radius y
    );
  } else {
    curve = new EllipseCurve(
      0, 0, // center x, y
      radiusX, radiusY, // radius x, radius y
    );
  }

  const p = curve.getSpacedPoints(200);
  const geometry = new BufferGeometry().setFromPoints(p);
  const material = new LineBasicMaterial({
    color: lineColor,
    transparent: true,
    opacity: 1
  });

  const orbitLine = new Line(geometry, material);
  orbitLine.rotateX(-Math.PI/2); // rotate -90 degrees to orbit around y axis
  return {
    orbitLine,
    curve
  };
}