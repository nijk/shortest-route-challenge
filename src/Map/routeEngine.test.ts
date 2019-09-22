import { path, route } from './types';

// SuT
import routeEngine from './routeEngine';

describe('routeEngine', () => {
  it('returns an empty array when no routes provided', () => {
    expect(routeEngine(undefined, undefined, undefined)).toEqual([]);
  });

  it('returns an empty array when no origin provided', () => {
    expect(routeEngine([['foo', 'bar', 1, []]], undefined, undefined)).toEqual([]);
  });

  it('returns an empty array when no destination provided', () => {
    expect(routeEngine([['foo', 'bar', 1, []]], 'foo', undefined)).toEqual([]);
  });

  it('returns an empty array when origin & destination as identical', () => {
    expect(routeEngine([['foo', 'bar', 1, []]], 'foo', 'foo')).toEqual([]);
  });

  it('returns a direct route with a single leg', () => {
    const origin: string = 'foo';
    const destination: string = 'bar';
    const paths: path[] = [
      [origin, destination, 1, []],
    ];

    expect(routeEngine(paths, origin, destination)).toEqual([{
      distance: 1,
      id: `${origin}.${destination}`,
      legs: [[origin, destination]],
      waypoints: [origin, destination],
    }]);
  });

  it('returns a route with a two legs', () => {
    const origin: string = 'foo';
    const waypoint: string = 'bar';
    const destination: string = 'baz';
    const paths: path[] = [
      [origin, waypoint, 1, []],
      [waypoint, destination, 2, []],
    ];

    expect(routeEngine(paths, origin, destination)).toEqual([{
      distance: 3,
      id: `${origin}.${waypoint}.${destination}`,
      legs: [[origin, waypoint], [waypoint, destination]],
      waypoints: [origin, waypoint, destination],
    }]);
  });

  it('returns a route with a two legs, the second of which is reversed', () => {
    const origin: string = 'foo';
    const waypoint: string = 'bar';
    const destination: string = 'baz';
    const paths: path[] = [
      [origin, waypoint, 1, []],
      [destination, waypoint, 2, []],
    ];

    expect(routeEngine(paths, origin, destination)).toEqual([{
      distance: 3,
      id: `${origin}.${waypoint}.${destination}`,
      legs: [[origin, waypoint], [waypoint, destination]],
      waypoints: [origin, waypoint, destination],
    }]);
  });

  it('returns a route with multiple legs from a larger set', () => {
    const origin: string = 'foo';
    const destination: string = 'qux';

    const paths: path[] = [
      ['foo', 'bar', 1, []],
      ['foo', 'quux', 5, []],
      ['corge', 'quux', 5, []],
      ['baz', 'bar', 2, []],
      ['baz', 'qux', 4, []],
    ];

    expect(routeEngine(paths, origin, destination)).toEqual([{
      distance: 7,
      id: 'foo.bar.baz.qux',
      legs: [['foo', 'bar'], ['bar', 'baz'], ['baz', 'qux']],
      waypoints: ['foo', 'bar', 'baz', 'qux'],
    }]);
  });

  it('returns a routes when limited to 0', () => {
    const origin: string = 'foo';
    const destination: string = 'qux';

    const paths: path[] = [
      ['foo', 'bar', 1, []],
      ['foo', 'qux', 8, []],
      ['baz', 'bar', 2, []],
      ['baz', 'qux', 4, []],
    ];

    expect(routeEngine(paths, origin, destination, 0)).toEqual([]);
  });

  it('returns the shortest route when limited to a meaningless negative value', () => {
    const origin: string = 'foo';
    const destination: string = 'qux';

    const paths: path[] = [
      ['foo', 'bar', 1, []],
      ['foo', 'qux', 8, []],
      ['baz', 'bar', 2, []],
      ['baz', 'qux', 4, []],
    ];

    expect(routeEngine(paths, origin, destination, -2)).toEqual([{
      distance: 7,
      id: 'foo.bar.baz.qux',
      legs: [['foo', 'bar'], ['bar', 'baz'], ['baz', 'qux']],
      waypoints: ['foo', 'bar', 'baz', 'qux'],
    }]);
  });

  it('returns no routes when limited to null', () => {
    const origin: string = 'foo';
    const destination: string = 'qux';

    const paths: path[] = [
      ['foo', 'bar', 1, []],
      ['foo', 'qux', 8, []],
      ['baz', 'bar', 2, []],
      ['baz', 'qux', 4, []],
    ];

    expect(routeEngine(paths, origin, destination, null)).toEqual([]);
  });

  it('returns the shortest route when limited to 1', () => {
    const origin: string = 'foo';
    const destination: string = 'qux';

    const paths: path[] = [
      ['foo', 'bar', 1, []],
      ['foo', 'qux', 8, []],
      ['baz', 'bar', 2, []],
      ['baz', 'qux', 4, []],
    ];

    expect(routeEngine(paths, origin, destination, 1)).toEqual([{
      distance: 7,
      id: 'foo.bar.baz.qux',
      legs: [['foo', 'bar'], ['bar', 'baz'], ['baz', 'qux']],
      waypoints: ['foo', 'bar', 'baz', 'qux'],
    }]);
  });

  it('returns the three shortest route when no limit provided', () => {
    const origin: string = 'foo';
    const destination: string = 'qux';

    const paths: path[] = [
      ['bar', 'qux', 3, []],
      ['baz', 'bar', 2, []],
      ['baz', 'qux', 4, []],
      ['foo', 'bar', 1, []],
      ['foo', 'quux', 1, []],
      ['foo', 'qux', 3, []],
      ['quux', 'qux', 1, []],
    ];

    expect(routeEngine(paths, origin, destination)).toEqual([{
      distance: 2,
      id: 'foo.quux.qux',
      legs: [['foo', 'quux'], ['quux', 'qux']],
      waypoints: ['foo', 'quux', 'qux'],
    }, {
      distance: 3,
      id: 'foo.qux',
      legs: [['foo', 'qux']],
      waypoints: ['foo', 'qux'],
    }, {
      distance: 4,
      id: 'foo.bar.qux',
      legs: [['foo', 'bar'], ['bar', 'qux']],
      waypoints: ['foo', 'bar', 'qux'],
    }]);
  });
});
