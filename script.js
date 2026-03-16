/* =============================================
   PUP HYMN KARAOKE — JAVASCRIPT
   Handles: lyrics building, audio controls,
   seek/volume bars, word highlighting,
   and the custom speed dropdown.
   ============================================= */


/* ---------- LYRICS DATA ----------
   Each word has a `time` (in seconds) that tells us
   when it should light up during the song.
   ---------------------------------- */
var words = [
    {time:12.3,  word:"Sintang"},    {time:13.3,  word:"Paaralan"},
    {time:14.8,  word:"Tanglaw"},    {time:15.7,  word:"ka"},
    {time:16.4,  word:"ng"},         {time:16.9,  word:"bayan"},
    {time:18.5,  word:"Pandayan"},   {time:19.7,  word:"ng"},
    {time:20.3,  word:"isip"},       {time:21.5,  word:"ng"},
    {time:22.0,  word:"kabataan"},   {time:24.0,  word:"Kami"},
    {time:25.0,  word:"ay"},         {time:25.6,  word:"dumating"},
    {time:26.6,  word:"nang"},       {time:27.1,  word:"salat"},
    {time:27.9,  word:"sa"},         {time:28.2,  word:"yaman"},
    {time:29.0,  word:"Hanap"},      {time:29.8,  word:"na"},
    {time:30.5,  word:"dunong"},     {time:32.6,  word:"ay"},
    {time:32.9,  word:"iyong"},      {time:33.5,  word:"alay"},
    {time:35.0,  word:"Ang"},        {time:36.0,  word:"layunin"},
    {time:37.8,  word:"mong"},       {time:38.8,  word:"makatao"},
    {time:41.5,  word:"Dinarangal"}, {time:44.2,  word:"ang"},
    {time:44.9,  word:"Pilipino"},   {time:47.6,  word:"Ang"},
    {time:48.2,  word:"iyong"},      {time:48.5,  word:"aral,"},
    {time:49.6,  word:"diwa,"},      {time:50.8,  word:"adhikang"},
    {time:52.0,  word:"taglay"},     {time:53.5,  word:"PUP,"},
    {time:54.2,  word:"aming"},      {time:55.0,  word:"gabay"},
    {time:56.0,  word:"Paaralang"},  {time:58.8,  word:"dakila"},
    {time:61.8,  word:"PUP,"},       {time:63.6,  word:"pinagpala"}
];

/* The lyrics grouped into lines (each inner array = one line) */
var lines = [
    ["Sintang", "Paaralan"],
    ["Tanglaw", "ka", "ng", "bayan"],
    ["Pandayan", "ng", "isip", "ng", "kabataan"],
    ["Kami", "ay", "dumating", "nang", "salat", "sa", "yaman"],
    ["Hanap", "na", "dunong", "ay", "iyong", "alay"],
    ["Ang", "layunin", "mong", "makatao"],
    ["Dinarangal", "ang", "Pilipino"],
    ["Ang", "iyong", "aral,", "diwa,", "adhikang", "taglay"],
    ["PUP,", "aming", "gabay"],
    ["Paaralang", "dakila"],
    ["PUP,", "pinagpala"]
];


/* ---------- BUILD THE LYRICS IN THE PAGE ----------
   We create each word as a clickable <span> element
   and add it to the lyrics box in index.html.
   Clicking a word jumps the song to that word's timestamp.
   -------------------------------------------------------- */
var lyricsBox = document.getElementById("lyrics-box");
var wordIndex = 0;

for (var i = 0; i < lines.length; i++) {
    var p = document.createElement("p");  // One <p> tag per line

    for (var j = 0; j < lines[i].length; j++) {
        var span = document.createElement("span");
        span.className = "word upcoming";          // All words start as "upcoming"
        span.textContent = lines[i][j];
        span.id = "word-" + wordIndex;

        // Clicking a word jumps to its timestamp in the song
        // (We wrap this in a function to correctly capture the index value)
        span.onclick = (function(idx) {
            return function() {
                audio.currentTime = words[idx].time;
                audio.play();
            };
        })(wordIndex);

        p.appendChild(span);

        // Add a space between words (but not after the last word on a line)
        if (j < lines[i].length - 1) {
            p.appendChild(document.createTextNode(" "));
        }
        wordIndex++;
    }
    lyricsBox.appendChild(p);
}


/* ---------- AUDIO & UI ELEMENTS ---------- */
var audio        = document.getElementById("hymn-audio");
var progressBar  = document.getElementById("progress-bar");
var volumeSlider = document.getElementById("volume-slider");
var lastActiveWord = -1;  // Tracks which word was last highlighted (avoids unnecessary re-renders)


/* ---------- SHOW TOTAL SONG DURATION ----------
   Fires once the audio file has loaded its metadata (length, etc.)
   ----------------------------------------------------------------- */
audio.addEventListener("loadedmetadata", function() {
    document.getElementById("total-time").textContent = formatTime(audio.duration);
});


/* ---------- PLAYBACK CONTROL FUNCTIONS ----------
   These are called directly by the buttons in index.html
   ------------------------------------------------------- */
function startSong()   { audio.play(); }
function pauseSong()   { audio.pause(); }

function restartSong() {
    audio.currentTime = 0;
    audio.play();
    lastActiveWord = -1;
    document.getElementById("lyric-display").textContent = "~ PUP Hymn ~";
}

function forwardSong() {
    // Skip forward 10 seconds, but don't go past the end
    audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
}

function rewindSong() {
    // Rewind 10 seconds, but don't go before the start
    audio.currentTime = Math.max(audio.currentTime - 10, 0);
}

function changeVolume(v) { audio.volume = v; }
function changeSpeed(v)  { audio.playbackRate = parseFloat(v); }

/* Converts a number of seconds into "m:ss" format (e.g. 75 → "1:15") */
function formatTime(seconds) {
    var mins = Math.floor(seconds / 60);
    var secs = Math.floor(seconds % 60);
    return mins + ":" + (secs < 10 ? "0" : "") + secs;
}


/* ---------- SEEK BAR (let user drag to any position) ----------
   Uses "input" event so it responds while dragging, not just on release.
   ---------------------------------------------------------------------- */
progressBar.addEventListener("input", function() {
    if (audio.duration) {
        audio.currentTime = (this.value / 100) * audio.duration;
    }
});


/* ---------- VOLUME SLIDER WITH GOLD FILL ----------
   Updates the gold fill on the volume bar to match the current volume.
   -------------------------------------------------------------------- */
function updateVolumeFill(val) {
    var pct = val * 100;
    volumeSlider.style.background =
        "linear-gradient(to right, gold " + pct + "%, #5a0000 " + pct + "%)";
}
updateVolumeFill(1);  // Start at full volume (100% gold fill)

volumeSlider.addEventListener("input", function() {
    changeVolume(this.value);
    updateVolumeFill(parseFloat(this.value));
});


/* ---------- CUSTOM SPEED DROPDOWN ----------
   Opens/closes the dropdown and updates the selected speed.
   ---------------------------------------------------------- */
var speedSelected = document.getElementById("speed-selected");
var speedOptions  = document.getElementById("speed-options");

// Toggle the dropdown open/closed when clicking the button
speedSelected.addEventListener("click", function(e) {
    e.stopPropagation();  // Prevent the click from bubbling up to document (which closes it)
    speedOptions.classList.toggle("open");
});

// When a speed option is clicked, apply it and close the dropdown
speedOptions.querySelectorAll(".custom-option").forEach(function(option) {
    option.addEventListener("click", function() {
        var val = this.getAttribute("data-value");

        speedSelected.textContent = this.textContent;  // Update button label
        changeSpeed(val);                               // Apply new speed to audio

        // Remove "selected" highlight from all options, then add to this one
        speedOptions.querySelectorAll(".custom-option").forEach(function(o) {
            o.classList.remove("selected");
        });
        this.classList.add("selected");

        speedOptions.classList.remove("open");  // Close the dropdown
    });
});

// Clicking anywhere outside the dropdown closes it
document.addEventListener("click", function() {
    speedOptions.classList.remove("open");
});


/* ---------- MAIN TIME UPDATE LOOP ----------
   Fires repeatedly as the song plays.
   Handles: seek bar fill, current time display, word highlighting.
   ----------------------------------------------------------------- */
audio.addEventListener("timeupdate", function() {
    var currentTime = audio.currentTime;

    /* Update seek bar fill and current time display */
    if (audio.duration) {
        var pct = (currentTime / audio.duration) * 100;
        progressBar.value = pct;
        progressBar.style.background =
            "linear-gradient(to right, gold " + pct + "%, #5a0000 " + pct + "%)";
        document.getElementById("current-time").textContent = formatTime(currentTime);
    }

    /* Find which word should be highlighted right now */
    var activeWord = -1;
    for (var i = 0; i < words.length; i++) {
        if (currentTime >= words[i].time) {
            activeWord = i;  // Keep advancing until we pass the current time
        }
    }

    /* Update the top marquee display with the current word */
    if (activeWord >= 0) {
        document.getElementById("lyric-display").textContent = "~ " + words[activeWord].word + " ~";
    } else {
        document.getElementById("lyric-display").textContent = "~ PUP Hymn ~";
    }

    /* Only re-render word highlights if the active word has changed
       (avoids unnecessary DOM updates on every timeupdate tick) */
    if (activeWord !== lastActiveWord) {
        lastActiveWord = activeWord;

        for (var i = 0; i < words.length; i++) {
            var el = document.getElementById("word-" + i);
            if (!el) continue;

            if (i < activeWord)        { el.className = "word sung"; }     // Already sung
            else if (i === activeWord) { el.className = "word active"; }   // Currently singing
            else                       { el.className = "word upcoming"; } // Not yet
        }

        /* Auto-scroll so the active word stays visible in the lyrics box */
        var activeEl = document.querySelector(".word.active");
        if (activeEl) {
            activeEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }
});


/* ---------- SONG ENDED ---------- */
audio.addEventListener("ended", function() {
    document.getElementById("lyric-display").textContent = "~ Mabuhay ang PUP! ~";
    progressBar.style.background = "linear-gradient(to right, gold 100%, #5a0000 100%)";
});
