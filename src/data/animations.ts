const clips: Record<string, number> = {
  "procedural-city/locked-neighbor": 640,
  "procedural-city/street-traffic": 480,
  "rhythm-rider/feedback": 480,
  "ink-vfx/showcase": 640,
  "ink-vfx/melee": 640,
  "ink-vfx/projectile-wide": 640,
  "ink-vfx/area": 640,
  "ink-vfx/projectile-side": 640,
  "oasis-environment/water": 480,
  "oasis-environment/sand": 480,
  "oasis-environment/courtyard": 480,
};

export function getAnimation(slug: string, id: string) {
  const width = clips[`${slug}/${id}`];
  return width
    ? { src: `/media/${slug}/${id}.gif`, width, height: (width * 9) / 16 }
    : undefined;
}
