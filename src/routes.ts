export const RouteNames = ['Routes', 'Home'] as const;

export type Routes = Record<(typeof RouteNames)[number], undefined>;
