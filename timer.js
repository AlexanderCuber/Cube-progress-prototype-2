const scrambleText = document.getElementById('scramble-text');

const PUZZLE_CONFIG = {
    '2x2': {
        moves: ['U','F','R'],
        mods: ["","'","2"], len: 11,
        axis: {U:'y',F:'z',R:'x'}
    },
    '3x3': {
        moves: ['U','D','F','B','L','R'],
        mods: ["","'","2"], len: 20,
        axis: {U:'y',D:'y',F:'z',B:'z',L:'x',R:'x'}
    },
    '4x4': {
        moves: ['U','D','F','B','L','R','Uw','Dw','Fw','Bw','Lw','Rw'],
        mods: ["","'","2"], len: 45,
        axis: {U:'y',D:'y',F:'z',B:'z',L:'x',R:'x',Uw:'y',Dw:'y',Fw:'z',Bw:'z',Lw:'x',Rw:'x'}
    },
    '5x5': {
        moves: ['U','D','F','B','L','R','Uw','Dw','Fw','Bw','Lw','Rw','3Uw','3Dw','3Fw','3Bw','3Lw','3Rw'],
        mods: ["","'","2"], len: 60,
        axis: {U:'y',D:'y',F:'z',B:'z',L:'x',R:'x',Uw:'y',Dw:'y',Fw:'z',Bw:'z',Lw:'x',Rw:'x','3Uw':'y','3Dw':'y','3Fw':'z','3Bw':'z','3Lw':'x','3Rw':'x'}
    },
    '6x6': {
        moves: ['U','D','F','B','L','R','Uw','Dw','Fw','Bw','Lw','Rw','3Uw','3Dw','3Fw','3Bw','3Lw','3Rw'],
        mods: ["","'","2"], len: 80,
        axis: {U:'y',D:'y',F:'z',B:'z',L:'x',R:'x',Uw:'y',Dw:'y',Fw:'z',Bw:'z',Lw:'x',Rw:'x','3Uw':'y','3Dw':'y','3Fw':'z','3Bw':'z','3Lw':'x','3Rw':'x'}
    },
    '7x7': {
        moves: ['U','D','F','B','L','R','Uw','Dw','Fw','Bw','Lw','Rw','3Uw','3Dw','3Fw','3Bw','3Lw','3Rw','4Uw','4Dw','4Fw','4Bw','4Lw','4Rw'],
        mods: ["","'","2"], len: 100,
        axis: {U:'y',D:'y',F:'z',B:'z',L:'x',R:'x',Uw:'y',Dw:'y',Fw:'z',Bw:'z',Lw:'x',Rw:'x','3Uw':'y','3Dw':'y','3Fw':'z','3Bw':'z','3Lw':'x','3Rw':'x','4Uw':'y','4Dw':'y','4Fw':'z','4Bw':'z','4Lw':'x','4Rw':'x'}
    },
    'Skewb': {
        moves: ['R', 'L', 'U', 'B'],
        mods: ["", "'"], len: 9,
        axis: { R: 'r', L: 'l', U: 'u', B: 'b' }
    },
    'Pyraminx':  { generator: generatePyraminxScramble },
    'Megaminx':  { generator: generateMegaminxScramble },
    'Square-1':  { generator: generateSquare1Scramble },
    'Clock':     { generator: generateClockScramble },
    '3x3 OH': {
        moves: ['U','D','F','B','L','R'],
        mods: ["","'","2"], len: 20,
        axis: {U:'y',D:'y',F:'z',B:'z',L:'x',R:'x'}
    },
    '3x3 BLD': {
        moves: ['U','D','F','B','L','R'],
        mods: ["","'","2"], len: 20,
        axis: {U:'y',D:'y',F:'z',B:'z',L:'x',R:'x'}
    },
    '4x4 BLD': {
        moves: ['U','D','F','B','L','R','Uw','Dw','Fw','Bw','Lw','Rw'],
        mods: ["","'","2"], len: 45,
        axis: {U:'y',D:'y',F:'z',B:'z',L:'x',R:'x',Uw:'y',Dw:'y',Fw:'z',Bw:'z',Lw:'x',Rw:'x'}
    },
    '5x5 BLD': {
        moves: ['U','D','F','B','L','R','Uw','Dw','Fw','Bw','Lw','Rw','3Uw','3Dw','3Fw','3Bw','3Lw','3Rw'],
        mods: ["","'","2"], len: 60,
        axis: {U:'y',D:'y',F:'z',B:'z',L:'x',R:'x',Uw:'y',Dw:'y',Fw:'z',Bw:'z',Lw:'x',Rw:'x','3Uw':'y','3Dw':'y','3Fw':'z','3Bw':'z','3Lw':'x','3Rw':'x'}
    }
};

let currentPuzzle = localStorage.getItem('puzzle') || '3x3';

function setPuzzle(p) {
    currentPuzzle = p;
    localStorage.setItem('puzzle', p);
    newScramble();
}

const scrambleHistory = [];
let scrambleIndex = -1;

function generateScramble() {
    const config = PUZZLE_CONFIG[currentPuzzle];
    if (config.generator) return config.generator();
    const { moves, mods, len, axis } = config;
    const result = [];
    let lastAxis = null;
    while (result.length < len) {
        const move = moves[Math.floor(Math.random() * moves.length)];
        if (axis[move] === lastAxis) continue;
        const mod = mods[Math.floor(Math.random() * mods.length)];
        result.push(move + mod);
        lastAxis = axis[move];
    }
    return result.join('  ');
}

function generatePyraminxScramble() {
    const main = ['U', 'L', 'R', 'B'];
    const tips = ['u', 'l', 'r', 'b'];
    const mods = ["", "'"];
    const result = [];
    let last = null;
    while (result.length < 10) {
        const m = main[Math.floor(Math.random() * 4)];
        if (m === last) continue;
        result.push(m + mods[Math.floor(Math.random() * 2)]);
        last = m;
    }
    tips.forEach(t => {
        if (Math.random() > 0.5) result.push(t + mods[Math.floor(Math.random() * 2)]);
    });
    return result.join('  ');
}

function generateMegaminxScramble() {
    const mods = ['++', '--'];
    const rows = [];
    for (let i = 0; i < 7; i++) {
        const row = [];
        for (let j = 0; j < 5; j++) {
            row.push((j % 2 === 0 ? 'R' : 'D') + mods[Math.floor(Math.random() * 2)]);
        }
        row.push('U' + mods[Math.floor(Math.random() * 2)]);
        rows.push(row.join(' '));
    }
    return rows.join('  ');
}

function generateSquare1Scramble() {
    const pairs = [];
    for (let i = 0; i < 11; i++) {
        let x, y;
        do {
            x = Math.floor(Math.random() * 12) - 5;
            y = Math.floor(Math.random() * 12) - 5;
        } while (x === 0 && y === 0);
        pairs.push(`(${x}, ${y})`);
    }
    return pairs.join('/ ') + '/';
}

function generateClockScramble() {
    const pins = ['UR', 'DR', 'DL', 'UL'];
    const faces = ['U', 'R', 'D', 'L', 'ALL'];
    const t = () => (Math.floor(Math.random() * 6) + 1) + (Math.random() > 0.5 ? '+' : '-');
    const front = [...pins, ...faces].map(p => p + t()).join(' ');
    const back = faces.map(f => f + t()).join(' ');
    return `${front} y2 ${back}`;
}

function showScramble() {
    scrambleText.textContent = scrambleHistory[scrambleIndex];
    document.getElementById('prev-btn').disabled = scrambleIndex <= 0;
}

function newScramble() {
    scrambleHistory.splice(scrambleIndex + 1);
    scrambleHistory.push(generateScramble());
    scrambleIndex = scrambleHistory.length - 1;
    showScramble();
}

function nextScramble() {
    if (scrambleIndex < scrambleHistory.length - 1) {
        scrambleIndex++;
        showScramble();
    } else {
        newScramble();
    }
}

function prevScramble() {
    if (scrambleIndex > 0) {
        scrambleIndex--;
        showScramble();
    }
}

newScramble();

const display = document.getElementById('timer');
const timesList = document.getElementById('times-list');
const timesMean = document.getElementById('times-mean');
const currentSingleEl = document.getElementById('current-single');
const currentAo5El = document.getElementById('current-ao5');
const currentAo12El = document.getElementById('current-ao12');
const currentAo50El = document.getElementById('current-ao50');
const currentAo100El = document.getElementById('current-ao100');
const bestSingleEl = document.getElementById('best-single');
const bestAo5El = document.getElementById('best-ao5');
const bestAo12El = document.getElementById('best-ao12');
const bestAo50El = document.getElementById('best-ao50');
const bestAo100El = document.getElementById('best-ao100');

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let times = [];
let timesMs = [];
let solveScrambles = [];
let solvePenalties = [];
let solvePuzzles = [];

let sessions = [];
let currentSessionIndex = 0;

function saveSession() {
    sessions[currentSessionIndex] = {
        name: sessions[currentSessionIndex].name,
        times, timesMs, solveScrambles, solvePenalties, solvePuzzles
    };
    localStorage.setItem('sessions', JSON.stringify(sessions));
    localStorage.setItem('currentSession', String(currentSessionIndex));
}

function loadSessions() {
    const saved = localStorage.getItem('sessions');
    if (saved) {
        sessions = JSON.parse(saved);
        currentSessionIndex = Math.min(
            parseInt(localStorage.getItem('currentSession') || '0', 10),
            sessions.length - 1
        );
    } else {
        const oldTimes = localStorage.getItem('timesMs');
        sessions = [{
            name: 'Session 1',
            times: oldTimes ? JSON.parse(localStorage.getItem('times') || '[]') : [],
            timesMs: oldTimes ? JSON.parse(oldTimes) : [],
            solveScrambles: oldTimes ? JSON.parse(localStorage.getItem('solveScrambles') || '[]') : [],
            solvePenalties: oldTimes ? JSON.parse(localStorage.getItem('solvePenalties') || '[]') : []
        }];
        currentSessionIndex = 0;
    }
    applySession();
}

function applySession() {
    const s = sessions[currentSessionIndex];
    times = s.times;
    timesMs = s.timesMs;
    solveScrambles = s.solveScrambles;
    solvePenalties = s.solvePenalties;
    solvePuzzles = s.solvePuzzles || s.timesMs.map(() => '3x3');
    renderTimes();
    renderSessionSelector();
}

function newSession() {
    saveSession();
    sessions.push({ name: `Session ${sessions.length + 1}`, times: [], timesMs: [], solveScrambles: [], solvePenalties: [], solvePuzzles: [] });
    currentSessionIndex = sessions.length - 1;
    applySession();
    saveSession();
    renderSessionsList();
}

function switchSession(index) {
    saveSession();
    currentSessionIndex = index;
    applySession();
}

function renderSessionSelector() {
    const select = document.getElementById('session-select');
    select.innerHTML = sessions.map((s, i) =>
        `<option value="${i}"${i === currentSessionIndex ? ' selected' : ''}>${s.name}</option>`
    ).join('');
}

function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function openSessionsModal() {
    renderSessionsList();
    document.getElementById('sessions-modal').classList.remove('modal-hidden');
}

function renderSessionsList() {
    document.getElementById('sessions-list').innerHTML = sessions.map((s, i) =>
        `<div class="session-edit-row">
            <div class="session-move-btns">
                <button class="session-move-btn" onclick="moveSession(${i}, -1)"${i === 0 ? ' disabled' : ''}>&#8593;</button>
                <button class="session-move-btn" onclick="moveSession(${i}, 1)"${i === sessions.length - 1 ? ' disabled' : ''}>&#8595;</button>
            </div>
            <input class="session-name-input" type="text" value="${escHtml(s.name)}" data-index="${i}">
            <button class="session-edit-delete" onclick="deleteSessionAt(${i})"${sessions.length === 1 ? ' disabled' : ''}>&#10005;</button>
        </div>`
    ).join('');
}

function moveSession(i, dir) {
    document.querySelectorAll('.session-name-input').forEach(input => {
        const idx = parseInt(input.dataset.index, 10);
        if (idx < sessions.length && input.value.trim()) sessions[idx].name = input.value.trim();
    });
    const j = i + dir;
    if (j < 0 || j >= sessions.length) return;
    [sessions[i], sessions[j]] = [sessions[j], sessions[i]];
    if (currentSessionIndex === i) currentSessionIndex = j;
    else if (currentSessionIndex === j) currentSessionIndex = i;
    saveSession();
    renderSessionSelector();
    renderSessionsList();
}

function closeSessionsModal() {
    document.querySelectorAll('.session-name-input').forEach(input => {
        const i = parseInt(input.dataset.index, 10);
        if (i < sessions.length && input.value.trim()) sessions[i].name = input.value.trim();
    });
    saveSession();
    renderSessionSelector();
    document.getElementById('sessions-modal').classList.add('modal-hidden');
}

function deleteSessionAt(i) {
    if (sessions.length === 1) return;
    document.querySelectorAll('.session-name-input').forEach(input => {
        const idx = parseInt(input.dataset.index, 10);
        if (idx < sessions.length && input.value.trim()) sessions[idx].name = input.value.trim();
    });
    sessions.splice(i, 1);
    if (currentSessionIndex >= sessions.length) currentSessionIndex = sessions.length - 1;
    const s = sessions[currentSessionIndex];
    times = s.times; timesMs = s.timesMs;
    solveScrambles = s.solveScrambles; solvePenalties = s.solvePenalties;
    solvePuzzles = s.solvePuzzles || s.timesMs.map(() => '3x3');
    renderSessionsList();
    renderTimes();
    renderSessionSelector();
}

loadSessions();
document.getElementById('puzzle-select').value = currentPuzzle;

function effectiveMs(i) {
    if (solvePenalties[i] === 'DNF') return Infinity;
    if (solvePenalties[i] === '+2') return timesMs[i] + 2000;
    return timesMs[i];
}

function displayTime(i) {
    if (solvePenalties[i] === 'DNF') return 'DNF';
    if (solvePenalties[i] === '+2') return formatTime(timesMs[i] + 2000) + '+';
    return times[i];
}

function start() {
    if (!isRunning) {
        elapsedTime = 0;
        startTime = Date.now();
        timer = setInterval(update, 10);
        isRunning = true;
    }
}

function stop() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
        times.unshift(formatTime(elapsedTime));
        timesMs.unshift(elapsedTime);
        solveScrambles.unshift(scrambleText.textContent);
        solvePenalties.unshift(null);
        solvePuzzles.unshift(currentPuzzle);
        renderTimes();
        newScramble();
        saveSession();
    }
}

function aoN(i, n) {
    if (i + n > timesMs.length) return '-';
    const effTimes = Array.from({ length: n }, (_, j) => effectiveMs(i + j));
    const sorted = [...effTimes].sort((a, b) => a - b);
    const middle = sorted.slice(1, n - 1);
    if (middle.some(t => t === Infinity)) return 'DNF';
    return formatTime(Math.round(middle.reduce((a, b) => a + b, 0) / (n - 2)));
}

function ao5(i) { return aoN(i, 5); }
function ao12(i) { return aoN(i, 12); }

function renderTimes() {
    const effTimes = timesMs.map((_, i) => effectiveMs(i)).filter(t => t !== Infinity);
    const mean = effTimes.length
        ? effTimes.reduce((a, b) => a + b, 0) / effTimes.length
        : 0;
    timesMean.innerHTML = effTimes.length ? `mean <span>${formatTime(Math.round(mean))}</span>` : `mean <span>-</span>`;
    timesList.innerHTML = times.map((t, i) =>
        `<li onclick="openModal(${i})"><span class="solve-num">${times.length - i}.</span><span class="solve-time">${displayTime(i)}</span><span class="solve-ao5">${ao5(i)}</span><span class="solve-ao12">${ao12(i)}</span></li>`
    ).join('');
    updateBests();
}

function bestOf(values) {
    const nonDash = values.filter(v => v !== '-');
    if (!nonDash.length) return '-';
    const nonDnf = nonDash.filter(v => v !== 'DNF');
    if (!nonDnf.length) return 'DNF';
    return nonDnf.reduce((best, v) => parseFormatted(v) < parseFormatted(best) ? v : best);
}

function updateBests() {
    currentSingleEl.textContent = times.length ? displayTime(0) : '-';
    currentAo5El.textContent = ao5(0);
    currentAo12El.textContent = ao12(0);
    currentAo50El.textContent = aoN(0, 50);
    currentAo100El.textContent = aoN(0, 100);

    const effSingles = timesMs.map((_, i) => effectiveMs(i)).filter(t => t !== Infinity);
    bestSingleEl.textContent = effSingles.length ? formatTime(Math.min(...effSingles)) : '-';

    bestAo5El.textContent = bestOf(timesMs.map((_, i) => ao5(i)));
    bestAo12El.textContent = bestOf(timesMs.map((_, i) => ao12(i)));
    bestAo50El.textContent = bestOf(timesMs.map((_, i) => aoN(i, 50)));
    bestAo100El.textContent = bestOf(timesMs.map((_, i) => aoN(i, 100)));
}

function parseFormatted(str) {
    const parts = str.split(':');
    if (parts.length === 2) {
        return parseInt(parts[0]) * 60000 + parseFloat(parts[1]) * 1000;
    }
    return parseFloat(str) * 1000;
}

function reset() {
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.innerHTML = '<big><b>0.00</b></big>';
}

function formatTime(ms) {
    const minutes = Math.floor(ms / (1000 * 60));
    const seconds = Math.floor((ms / 1000) % 60);
    const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
    if (minutes > 0) {
        return `${minutes}:${String(seconds).padStart(2, '0')}.${milliseconds}`;
    }
    return `${seconds}.${milliseconds}`;
}

function update() {
    elapsedTime = Date.now() - startTime;
    display.innerHTML = `<big><b>${formatTime(elapsedTime)}</b></big>`;
}

let selectedSolve = null;

function openModal(i) {
    selectedSolve = i;
    document.getElementById('modal-scramble').textContent = solveScrambles[i];
    document.getElementById('modal-time').textContent = displayTime(i);
    const penalty = solvePenalties[i];
    document.getElementById('modal-btn-plus2').classList.toggle('active-penalty', penalty === '+2');
    document.getElementById('modal-btn-dnf').classList.toggle('active-penalty', penalty === 'DNF');
    document.getElementById('solve-modal').classList.remove('modal-hidden');
}

function closeModal() {
    document.getElementById('solve-modal').classList.add('modal-hidden');
    selectedSolve = null;
}

function deleteSolve() {
    if (selectedSolve === null) return;
    times.splice(selectedSolve, 1);
    timesMs.splice(selectedSolve, 1);
    solveScrambles.splice(selectedSolve, 1);
    solvePenalties.splice(selectedSolve, 1);
    solvePuzzles.splice(selectedSolve, 1);
    renderTimes();
    saveSession();
    closeModal();
}

function applyPenalty(type) {
    if (selectedSolve === null) return;
    solvePenalties[selectedSolve] = solvePenalties[selectedSolve] === type ? null : type;
    renderTimes();
    openModal(selectedSolve);
    saveSession();
}

document.getElementById('solve-modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

let holdTimeout = null;
let readyToStart = false;
const inputMethod = localStorage.getItem('inputMethod') || 'spacebar';

document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') { closeModal(); return; }
    if (inputMethod === 'manual') return;
    if (e.code === 'Space') {
        e.preventDefault();
        if (isRunning) {
            stop();
            return;
        }
        if (e.repeat) return;
        holdTimeout = setTimeout(() => {
            readyToStart = true;
            display.style.color = 'green';
        }, 300);
    } else if (e.code === 'KeyR') {
        reset();
    }
});

document.addEventListener('keyup', (e) => {
    if (inputMethod === 'manual') return;
    if (e.code === 'Space') {
        clearTimeout(holdTimeout);
        if (readyToStart) {
            readyToStart = false;
            display.style.color = '';
            start();
        }
    }
});

if (inputMethod === 'manual') {
    document.getElementById('manual-input-box').style.display = 'flex';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('manual-time-input').addEventListener('keydown', (e) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') submitManualTime();
    });
    document.getElementById('manual-time-input').focus();
}

function submitManualTime() {
    const input = document.getElementById('manual-time-input').value.trim();
    if (!input) return;
    const cs = parseInt(input, 10);
    if (isNaN(cs) || cs <= 0) return;
    const ms = cs * 10;
    times.unshift(formatTime(ms));
    timesMs.unshift(ms);
    solveScrambles.unshift(scrambleText.textContent);
    solvePenalties.unshift(null);
    solvePuzzles.unshift(currentPuzzle);
    renderTimes();
    newScramble();
    saveSession();
    document.getElementById('manual-time-input').value = '';
    document.getElementById('manual-time-input').focus();
}
