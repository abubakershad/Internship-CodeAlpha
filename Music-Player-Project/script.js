/* ====== Music Player Script ====== */
const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const seek = document.getElementById('seek');
const curTime = document.getElementById('curTime');
const durTime = document.getElementById('durTime');
const volume = document.getElementById('volume');
const uploadInput = document.getElementById('uploadInput');
const playlistNode = document.getElementById('playlist');
const searchInput = document.getElementById('searchInput');
const coverImg = document.getElementById('coverImg');
const trackTitle = document.getElementById('trackTitle');
const trackArtist = document.getElementById('trackArtist');
const statusPill = document.getElementById('statusPill');
const trackCount = document.getElementById('trackCount');
const coverArt = document.querySelector('.cover-art');

const miniPlay = document.getElementById('miniPlay');
const miniPrev = document.getElementById('miniPrev');
const miniNext = document.getElementById('miniNext');
const miniTitle = document.getElementById('miniTitle');
const miniArtist = document.getElementById('miniArtist');
const miniCover = document.getElementById('miniCover');

let tracks = [];
let filtered = [];
let current = -1;
let isShuffle = false;
let isRepeat = false;

function id(){ return Math.random().toString(36).slice(2,9); }
function fmt(s){ if(!s||isNaN(s)) return '0:00'; const m=Math.floor(s/60); const sec=Math.floor(s%60).toString().padStart(2,'0'); return `${m}:${sec}`; }

/* sample */
tracks.push({ id:id(), title:'Sample Song', artist:'Demo Artist', src:'assets/music/music1.mp3', cover:'assets/cover.jpg' });
tracks.push({ id:id(), title:'Ambient Loop', artist:'Studio Beats', src:'assets/music/music2.mp3', cover:'assets/cover.jpg' });
tracks.push({ id:id(), title:'Chill Vibes', artist:'LoFi Crew', src:'assets/music/music3.mp3', cover:'assets/cover.jpg' });
tracks.push({ id:id(), title:'Dreamscape', artist:'Night Sky', src:'assets/music/music4.mp3', cover:'assets/cover.jpg' });
tracks.push({ id:id(), title:'Morning Energy', artist:'Sunrise Band', src:'assets/music/music5.mp3', cover:'assets/cover.jpg' });
tracks.push({ id:id(), title:'Deep Focus', artist:'Study Beats', src:'assets/music/music6.mp3', cover:'assets/cover.jpg' });
tracks.push({ id:id(), title:'Ocean Waves', artist:'Nature Sounds', src:'assets/music/music7.mp3', cover:'assets/cove.jpg' });
tracks.push({ id:id(), title:'Retro Funk', artist:'Groove Masters', src:'assets/music/music8.mp3', cover:'assets/cover.jpg' });
tracks.push({ id:id(), title:'Calm Piano', artist:'Relax Tunes', src:'assets/music/music9.mp3', cover:'assets/cover.jpg' });
tracks.push({ id:id(), title:'Night Drive', artist:'Synth Flow', src:'assets/music/music10.mp3', cover:'assets/cover.jpg' });
tracks.push({ id:id(), title:'Summer Beats', artist:'DJ Fresh', src:'assets/music/music11.mp3', cover:'assets/cover.jpg' });
tracks.push({ id:id(), title:'Lost in Space', artist:'Cosmic Sound', src:'assets/music/music12.mp3', cover:'assets/cover.jpg' });
tracks.push({ id:id(), title:'Jazz Mood', artist:'Blue Note', src:'assets/music/music13.mp3', cover:'assets/cover.jpg' });
tracks.push({ id:id(), title:'Healing Rain', artist:'Nature Calm', src:'assets/music/music14.mp3', cover:'assets/cover.jpg' });
tracks.push({ id:id(), title:'Epic Journey', artist:'Cinematic Crew', src:'assets/music/music15.mp3', cover:'assets/cover.jpg' });
tracks.push({ id:id(), title:'Acoustic Love', artist:'Guitar Souls', src:'assets/music/music16.mp3', cover:'assets/cover.jpg' });
tracks.push({ id:id(), title:'Street Vibes', artist:'Urban Flow', src:'assets/music/music17.mp3', cover:'assets/cover.jpg' });
tracks.push({ id:id(), title:'Meditation Bliss', artist:'Zen Master', src:'assets/music/music18.mp3', cover:'assets/cover.jpg' });
tracks.push({ id:id(), title:'Tech Groove', artist:'Electro Lab', src:'assets/music/music19.mp3', cover:'assets/cover.jpg' });
tracks.push({ id:id(), title:'Happy Ukulele', artist:'Sunny Tunes', src:'assets/music/music20.mp3', cover:'assets/cover.jpg' });
tracks.push({ id:id(), title:'Drum & Bass Flow', artist:'Beat Riders', src:'assets/music/music21.mp3', cover:'assets/cover.jpg' });
tracks.push({ id:id(), title:'Peaceful Mind', artist:'Calm Studio', src:'assets/music/music22.mp3', cover:'assets/cover.jpg' });
tracks.push({ id:id(), title:'Funky Night', artist:'Groove Squad', src:'assets/music/music23.mp3', cover:'assets/cover.jpg' });
tracks.push({ id:id(), title:'Café Jazz', artist:'Coffee Beats', src:'assets/music/music24.mp3', cover:'assets/cover.jpg' });
tracks.push({ id:id(), title:'Galaxy Lights', artist:'Stellar Sound', src:'assets/music/music25.mp3', cover:'assets/cover.jpg' });
filtered = tracks.slice();
renderPlaylist(); updateCount();

function load(i){
  if(i < 0 || i >= filtered.length) return;
  current = i;
  const t = filtered[i];
  audio.src = t.src;
  trackTitle.textContent = t.title;
  trackArtist.textContent = t.artist;
  coverImg.src = t.cover;
  miniCover.src = t.cover;
  miniTitle.textContent = t.title;
  miniArtist.textContent = t.artist;
  highlightActive();
  statusPill.textContent = 'Loaded';
}
function play(){ audio.play(); playBtn.textContent='⏸'; miniPlay.textContent='⏸'; coverArt.classList.add('rotate'); statusPill.textContent='Playing'; }
function pause(){ audio.pause(); playBtn.textContent='▶️'; miniPlay.textContent='▶️'; coverArt.classList.remove('rotate'); statusPill.textContent='Paused'; }
function togglePlay(){ if(!audio.src && filtered.length) load(0); if(audio.paused) play(); else pause(); }

function next(){ if(isShuffle) current=Math.floor(Math.random()*filtered.length); else current=(current+1)%filtered.length; load(current); play(); }
function prev(){ if(isShuffle) current=Math.floor(Math.random()*filtered.length); else current=(current-1+filtered.length)%filtered.length; load(current); play(); }

playBtn.addEventListener('click',togglePlay);
miniPlay.addEventListener('click',togglePlay);
nextBtn.addEventListener('click',next);
miniNext.addEventListener('click',next);
prevBtn.addEventListener('click',prev);
miniPrev.addEventListener('click',prev);

shuffleBtn.addEventListener('click',()=>{isShuffle=!isShuffle; shuffleBtn.style.opacity=isShuffle?'1':'0.5';});
repeatBtn.addEventListener('click',()=>{isRepeat=!isRepeat; repeatBtn.style.opacity=isRepeat?'1':'0.5';});

audio.addEventListener('timeupdate',()=>{ if(audio.duration) seek.value=(audio.currentTime/audio.duration)*100; curTime.textContent=fmt(audio.currentTime); durTime.textContent=fmt(audio.duration); });
seek.addEventListener('input',()=>{ if(audio.duration) audio.currentTime=(seek.value/100)*audio.duration; });
audio.addEventListener('ended',()=>{ if(isRepeat){audio.currentTime=0; play();} else next(); });

volume.addEventListener('input',()=>{audio.volume=volume.value;});

uploadInput.addEventListener('change',(e)=>{
  const files=[...e.target.files];
  files.forEach(f=>{
    if(!f.type.startsWith('audio')) return;
    const url=URL.createObjectURL(f);
    tracks.push({id:id(),title:f.name.replace(/\.[^/.]+$/,''),artist:'Local',src:url,cover:'assets/cover.jpg',blob:true});
  });
  filtered=tracks.slice(); renderPlaylist(); updateCount();
  if(current===-1) load(0);
  uploadInput.value='';
});

function renderPlaylist(){
  playlistNode.innerHTML='';
  filtered.forEach((t,idx)=>{
    const el=document.createElement('div');
    el.className='track'+(idx===current?' active':'');
    el.innerHTML=`<img src="${t.cover}"><div class="tmeta"><p class="title">${t.title}</p><p class="sub">${t.artist}</p></div>`;
    el.addEventListener('click',()=>{load(idx); play();});
    playlistNode.appendChild(el);
  });
}
function highlightActive(){document.querySelectorAll('.track').forEach((n,i)=>n.classList.toggle('active',i===current));}

searchInput.addEventListener('input',(e)=>{
  const q=e.target.value.toLowerCase();
  filtered=tracks.filter(t=>(t.title||'').toLowerCase().includes(q)||(t.artist||'').toLowerCase().includes(q));
  renderPlaylist();
});
function updateCount(){trackCount.textContent='Tracks: '+tracks.length;}

audio.addEventListener('loadedmetadata',()=>{const cur=filtered[current]; if(cur){cur.duration=audio.duration; renderPlaylist();}});
