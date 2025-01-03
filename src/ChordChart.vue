<script setup lang='ts'>
import { type ChordChart, IntervalCharacters } from './scripts/util'
import { type PropType, computed } from 'vue'

const FRET_DIST = 4
const STRING_DIST = 2.25
const NOTE_SIZE = 2.5

const props = defineProps({
    chordChart: {
        type: Object as PropType<ChordChart>,
        required: true
    }
})

const numFrets = computed(() => Math.max(4, ...(props.chordChart.frets.filter((fret) => fret !== null))))
</script>

<template>
<div class='ChordShapeContainer'>
    <div class='ChordName' v-html='chordChart.name'></div>
    <div class='ChordShape LeftHanded' :style='{ width: `${FRET_DIST * (numFrets)}rem`, height: `${STRING_DIST * 5 }rem`}'>
        <div class='Fret' v-for='i in numFrets - 1' :style='{ right: `${FRET_DIST * i}rem` }'/>
        <div class='String' v-for='i in 4' :style='{ top: `${STRING_DIST * i}rem` }'/>
        <div class='Note' v-for='(fret, string) in chordChart.frets' >
            <div v-if='fret !== null && fret !== 0' class='Finger' :style='{
                width: `${NOTE_SIZE}rem`,
                height: `${NOTE_SIZE}rem`,
                bottom: `calc(${STRING_DIST * string - NOTE_SIZE / 2}rem - 1.5px)`,
                right: `calc(${FRET_DIST * fret - NOTE_SIZE / 2 - FRET_DIST / 2}rem + 1.5px)`
            }'>{{ IntervalCharacters[chordChart.intervals[string]!] }}</div>
            <div class='Cross' v-if='fret === null' :style='{
                width: `${NOTE_SIZE}rem`,
                height: `${NOTE_SIZE}rem`,
                bottom: `${STRING_DIST * string - NOTE_SIZE / 2}rem`
            }'/>
            <div class='Circle' v-if='fret === 0' :style='{
                width: `${NOTE_SIZE}rem`,
                height: `${NOTE_SIZE}rem`,
                bottom: `${STRING_DIST * string - NOTE_SIZE / 2}rem`
            }'>{{ IntervalCharacters[chordChart.intervals[string]!] }}</div>
        </div>
        <div class='FretNumber' v-for='i in numFrets' :style='{ right: `${i * FRET_DIST - FRET_DIST / 2}rem` }'>{{ chordChart.baseFret + i - 1 }}</div>
    </div>
</div>
</template>

<style scoped>
.ChordShapeContainer {
    display: inline-block;

    padding: 2rem;
    padding-top: .5rem;
    padding-right: 3rem;
    padding-bottom: 3rem;

    box-shadow: 0 0 1rem #DDDDDD;
    border-radius: .5rem;

    user-select: none;
}

.ChordName {
    margin-bottom: .5rem;

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
    bottom: -2rem;

    font-size: 1rem;
    font-weight: bold;

    transform: translate(50%, 50%);

    opacity: .5;
}
</style>
