# PUP Hymn Karaoke

An interactive web-based karaoke player for the Polytechnic University of the Philippines (PUP) Hymn. Words highlight in real-time as the song plays so you can sing along.

![PUP Seal](https://upload.wikimedia.org/wikipedia/en/c/c2/Polytechnic_University_of_the_Philippines_seal.png)

---

## How to Run

1. Make sure all the files listed below are in the **same folder**
2. Open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari)
3. Press ▶ to start — that's it!

---

## File Structure

```
PUP Hymn/
├── index.html       ← Open this in your browser to run the app
├── style.css        ← Controls colors, layout, and fonts
├── script.js        ← Controls audio playback and lyric highlighting
├── pup-hymn.mp3     ← The PUP Hymn audio file
├── pup logo.png     ← PUP logo shown in the header
└── Background.jpg   ← Background image
```

---

## Controls

| Button / Control | What it does |
|---|---|
| ▶ Play | Start the song |
| ⏸ Pause | Pause the song |
| ↺ Restart | Go back to the beginning |
| ⏮ Rewind | Jump back 10 seconds |
| ⏭ Forward | Jump forward 10 seconds |
| Seek bar | Click or drag to jump to any part of the song |
| Volume slider 🕪 | Drag to adjust how loud the audio is |
| Speed selector ⚡︎ | Change playback speed (0.5x slow → 2x fast) |
| Click a word | Jumps the song to that word's position |

---

## Karaoke Features

- **Word-by-word highlighting** — the current word lights up in gold as it's sung
- **Sung words** stay gold so you can see how far along the song is
- **Upcoming words** are dimmed so focus stays on the current word
- **Auto-scroll** — the lyrics box scrolls automatically to keep the active word in view
- **Top display** — the current word is also shown in large text above the controls

---

## Lyrics

```
Sintang Paaralan
Tanglaw ka ng bayan
Pandayan ng isip ng kabataan
Kami ay dumating nang salat sa yaman
Hanap na dunong ay iyong alay
Ang layunin mong makatao
Dinarangal ang Pilipino
Ang iyong aral, diwa, adhikang taglay
PUP, aming gabay
Paaralang dakila
PUP, pinagpala
```

---

## Built With

- HTML5, CSS3, and plain JavaScript — no frameworks or libraries needed
- HTML5 Audio API for playback

---

*Mabuhay ang PUP!*
