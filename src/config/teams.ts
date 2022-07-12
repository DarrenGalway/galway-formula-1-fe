export const TEAMS = {
  red_bull: {
    color: '#3671C6',
  },
  ferrari: {
    color: '#F91536',
  },
  mercedes: {
    color: '#6CD3BF',
  },
  mclaren: {
    color: '#F58020',
  },
  alpine: {
    color: '#2293D1',
  },
  alfa: {
    color: '#C92D4B',
  },
  haas: {
    color: '#B6BABD',
  },
  alphatauri: {
    color: '#5E8FAA',
  },
  aston_martin: {
    color: '#358C75',
  },
  williams: {
    color: '#37BEDD',
  },
}

// @ts-ignore
export const getColor = (team: string) => TEAMS[team].color
