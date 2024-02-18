import { BufferGeometry, Line, LineBasicMaterial, Vector3 } from "three";

/**
 * Creates a line that goes through the South pole and the North pole of a planet.
 * @param radius The radius of the planet.
 */
export default function(radius: number, tilt: number): Line {
  const extent = radius + 1;
  const axisPoins = [
    new Vector3(0, extent, 0), // north pole
    new Vector3(0, -extent, 0), // south pole
  ];

  const axis = new Line(
    new BufferGeometry().setFromPoints(axisPoins),
    new LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 1
    })
  );

  axis.rotation.z = tilt;

  return axis;
}