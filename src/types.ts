export interface IRace {
  date: string
  raceName: string
  round: string
  season: string
  time: string
  url: string
  Circuit: {
    circuitId: string
    url: string
    circuitName: string
    Location: {
      lat: string
      long: string
      locality: string
      country: string
    }
  }
  FirstPractice: {
    date: string
    time: string
  }
  Sprint?: {
    date: string
    time: string
  }
  Qualifying: {
    date: string
    time: string
  }
  SecondPractice: {
    date: string
    time: string
  }
  ThirdPractice?: {
    date: string
    time: string
  }
}

export interface IConstructor {
  constructorId: string
  url: string
  name: string
  nationality: string
}

export interface IDriver {
  driverId: string
  code: string
  url: string
  givenName: string
  familyName: string
  dateOfBirth: string
  nationality: string
}

export interface IStanding {
  position: string
  positionText: string
  points: string
  wins: string
}

export interface IConstructorStandings extends IStanding {
  Constructor: IConstructor
}

export interface IDriverStandings extends IStanding {
  Driver: IDriver
  Constructors: IConstructor[]
}

export interface IResponse {
  season: string
  round: string
}

export interface IDriverStandingsResponse extends IResponse {
  DriverStandings: IDriverStandings[]
}

export interface IConstructorStandingsResponse extends IResponse {
  ConstructorStandings: IConstructorStandings[]
}

export type IScheduleResponse = IRace[]
