<script setup lang='ts'>
import ChordChartVue from './ChordChart.vue'
import { type Shape, Interval, getRootFromChordName, getNoteFromFret, DistanceToIntervalOptions, mod } from './scripts/util'
import { ref, computed } from 'vue'

const nameInput = ref('')
const shapeInput = ref('')

const name = computed(() => replaceChordNameCharacters(nameInput.value))
const shape = computed(() => shapeFromInput(shapeInput.value))
const intervals = computed(() => computeIntervals(shape.value, name.value))

const chordChart = computed(() => { return {
    name: name.value,
    frets: shape.value.frets,
    baseFret: shape.value.baseFret,
    intervals: intervals.value
}})

function shapeFromInput(input: string): Shape {
    console.log('we in here now')
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
    if (baseFret === 2) baseFret = 1

    return {
        frets: frets.map((fret) => {
            if (fret === null || fret === 0) return fret
            return fret - baseFret + 1
        }),
        baseFret: baseFret
    }
}

function computeIntervals(currentShape: Shape, name: string): (Interval | null)[] {
    try {
        const root = getRootFromChordName(name)
        return currentShape.frets.map((fret, string) => {
            if (fret === null) return null
            if (fret !== 0) fret += currentShape.baseFret - 1
            const note = getNoteFromFret(fret, string)
            return DistanceToIntervalOptions[mod(note - root, 12)][0] 
        })
    } catch (err) {
        return [null, null, null, null, null, null]
    }
}

// Replacing with HTML seems like a bad idea
function replaceChordNameCharacters(name: string): string {
    console.log('no we in here')
    // return name.replace('b', '<sub>♭</sub>')
    // .replace('#', '<sup>♯</sup>')
    // .replace('^', '<sup>△</sup>')
    // .replace('0', '<sup>ø</sup>')
    // .replace('o', '°')
    return name
}
</script>

<template>
<ChordChartVue :chordChart='chordChart'/>

<form>
    <input type='text' placeholder='shape' v-model='shapeInput'/>
    <input type='text' placeholder='name' v-model='nameInput'/>
</form>
</template>

<style scoped>
input {
    box-sizing: border-box;
    display: block;

    padding: .5rem;
    margin-bottom: 1rem;
    
    font-size: 1rem;

    border: 1px solid #BBBBBB;
    border-radius: .25rem;

    font-family: inherit;
	font-optical-sizing: inherit;
	font-weight: inherit;
	font-style: inherit;
}

input:focus {
    outline: 1px solid #BBBBBB;
}
</style>