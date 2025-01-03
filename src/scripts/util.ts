export enum Interval {
    Root,
    MinorSecond,
    MajorSecond,
    MinorThird,
    MajorThird,
    PerfectFourth,
    AugmentedFourth,
    DiminishedFifth,
    PerfectFifth,
    AugmentedFifth,
    MinorSixth,
    MajorSixth,
    DiminishedSeventh,
    MinorSeventh,
    MajorSeventh,
    FlatNine,
    MajorNine,
    SharpNine,
    PerfectEleven,
    SharpEleven,
    FlatThirteen,
    MajorThirteen
}

// ♭ ♯ △
export const IntervalCharacters: { [ key in Interval ]: string } = {
    0: 'R',
    1: '♭2',
    2: '2',
    3: '♭3',
    4: '3',
    5: '4',
    6: '♯4',
    7: '♭5',
    8: '5',
    9: '♯5',
    10: '♭6',
    11: '6',
    12: '♭♭7',
    13: '♭7',
    14: '△7',
    15: '♭9',
    16: '9',
    17: '♯9',
    18: '11',
    19: '♯11',
    20: '♭13',
    21: '13'
}

// export const IntervalDistances: { [ key in Interval ]: number } = {
//     0: 0,
//     1: 1,
//     2: 2,
//     3: 3,
//     4: 4,
//     5: 5,
//     6: 6,
//     7: 6,
//     8: 7,
//     9: 8,
//     10: 8,
//     11: 9,
//     12: 9,
//     13: 10,
//     14: 11,
//     15: 1,
//     16: 2,
//     17: 3,
//     18: 5,
//     19: 6,
//     20: 8,
//     21: 9
// }

export const DistanceToIntervalOptions: { [ key: number ]: Interval[] } = {
    0: [Interval.Root],
    1: [Interval.FlatNine, Interval.MinorSecond],
    2: [Interval.MajorNine, Interval.MajorSecond],
    3: [Interval.MinorThird, Interval.SharpNine],
    4: [Interval.MajorThird],
    5: [Interval.PerfectFourth, Interval.PerfectEleven],
    6: [Interval.DiminishedFifth, Interval.SharpEleven, Interval.AugmentedFourth],
    7: [Interval.PerfectFifth],
    8: [Interval.FlatThirteen, Interval.AugmentedFifth, Interval.MinorSixth],
    9: [Interval.MajorSixth, Interval.MajorThirteen, Interval.DiminishedSeventh],
    10: [Interval.MinorSeventh],
    11: [Interval.MajorSeventh]
}

export const roots: { [ key: string ]: number } = {
    'C': 0,
    'D': 2,
    'E': 4,
    'F': 5,
    'G': 7,
    'A': 9,
    'B': 11
}

// modulo function that supports negative numbers: https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
export function mod(n: number, m: number): number {
    return ((n % m) + m) % m
}

export function getRootFromChordName(name: string): number {
    if (name.length <= 0) throw 'empty string'

    let root = roots[name[0]]
    if (root === undefined) throw 'invalid root'

    if (name.length === 1) return root
    
    if (name[1] === 'b') root -= 1
    if (name[1] === '#') root += 1

    return mod(root, 12)
}

export const strings = [4, 9, 2, 7, 11, 4]

export function getNoteFromFret(fret: number, string: number): number {
    return (strings[string] + fret) % 12
}
