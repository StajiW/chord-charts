<script setup lang="ts">
import { computed, ref } from 'vue'
import { Interval, IntervalCharacters } from './scripts/util'

type shape = { frets: (number | null)[], baseFret: number }

const FRET_DIST = 4
const STRING_DIST = 2
const NOTE_SIZE = 2.5

const currentShape = computed(() => shapeFromInput(shapeInput.value))
const intervals = [null, Interval.Root, Interval.PerfectFifth, Interval.MinorSeventh, Interval.MinorThird, null]
const name = computed(() => { return nameInput })
const numFrets = computed(() => Math.max(4, ...(currentShape.value.frets.filter((fret) => fret !== null))))

const shapeInput = ref('')
const nameInput = ref('')

function shapeFromInput(input: string): shape {
    let chars = input.split(' ')
    chars = chars.slice(0, 6)
    while (chars.length < 6) chars.push('x') // Pad the array up to 6 nulls

    const frets = chars.map((char) => {
        const num = parseInt(char)
        if (isNaN(num)) return null
        if (num < 0 || num > 24) return null
        return num
    })

    // Double filter to make the linter happy (???)
    let baseFret = Math.min(...(frets.filter(fret => (fret !== null)).filter(fret => fret !== 0)))
    if (isNaN(baseFret) || !isFinite(baseFret)) baseFret = 1

    return {
        frets: frets.map((fret) => {
            if (fret === null || fret === 0) return fret
            return fret - baseFret + 1
        }),
        baseFret: baseFret
    }
}
</script>

<template>
<div class='ChordShapeContainer'>
    <div class='ChordName'>{{ name }}</div>
    <div class='ChordShape LeftHanded' :style='{ width: `${FRET_DIST * (numFrets)}rem`, height: `${STRING_DIST * 5 }rem`}'>
        <div class='Fret' v-for='i in numFrets - 1' :style='{ right: `${FRET_DIST * i}rem` }'/>
        <div class='String' v-for='i in 4' :style='{ top: `${STRING_DIST * i}rem` }'/>
        <div class='Note' v-for='(fret, string) in currentShape.frets' >
            <div v-if='fret !== null && fret !== 0' class='Finger' :style='{
                width: `${NOTE_SIZE}rem`,
                height: `${NOTE_SIZE}rem`,
                bottom: `calc(${STRING_DIST * string - NOTE_SIZE / 2}rem - 1.5px)`,
                right: `calc(${FRET_DIST * fret - NOTE_SIZE / 2 - FRET_DIST / 2}rem + 1.5px)`
            }'>{{ IntervalCharacters[intervals[string]!] }}</div>
            <div class='Cross' v-if='fret === null' :style='{
                width: `${NOTE_SIZE}rem`,
                height: `${NOTE_SIZE}rem`,
                bottom: `${STRING_DIST * string - NOTE_SIZE / 2}rem`
            }'/>
            <div class='Circle' v-if='fret === 0' :style='{
                width: `${NOTE_SIZE}rem`,
                height: `${NOTE_SIZE}rem`,
                bottom: `${STRING_DIST * string - NOTE_SIZE / 2}rem`
            }'>{{ IntervalCharacters[intervals[string]!] }}</div>
        </div>
        <div class='FretNumber' v-for='i in numFrets' :style='{ right: `${i * FRET_DIST - FRET_DIST / 2}rem` }'>{{ currentShape.baseFret + i - 1 }}</div>
    </div>
</div>

<form>
    <input type='text' placeholder='frets' v-model='shapeInput'/>
    <input type='text' placeholder='name' v-model='nameInput'/>
</form>
</template>

<style scoped>
.ChordShapeContainer {
    display: inline-block;

    padding: 2rem;
    padding-top: .5rem;
    padding-right: 3rem;

    box-shadow: 0 0 1rem #DDDDDD;
    border-radius: .5rem;

    user-select: none;
}

.ChordName {
    font-size: 2rem;
    text-align: center;
    font-weight: bold;
}

.ChordShape.LeftHanded {
    position: relative;

    border: 3px solid black;
    border-right: 8px solid black;
    border-radius: .4rem;
}

.ChordShape.LeftHanded .String {
    position: absolute;
    width: 100%;
    border-top: 3px solid black;
}

.ChordShape.LeftHanded .Fret {
    position: absolute;
    height: 100%;
    border-right: 3px solid black;
}

.Finger {
    box-sizing: border-box;
    position: absolute;

    text-align: center;
    line-height: 2rem;
    font-weight: bold;
    color: white;

    background-color: black;

    border: .25rem solid white;
    border-radius: 50%;
}

.Cross {
    position: absolute;
    right: -3.25rem;

    background-image: url('./assets/cross.svg');
    background-size: contain;

    opacity: .5;
}

.Circle {
    position: absolute;
    right: -3.25rem;

    text-align: center;
    line-height: 2.5rem;
    font-weight: bold;
    color: black;

    background-image: url('./assets/circle.svg');
    background-size: contain;
}

.FretNumber {
    position: absolute;
    bottom: -1rem;

    font-size: 1rem;
    font-weight: bold;

    transform: translate(50%, 50%);

    opacity: .5;
}
</style>
