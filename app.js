/* ═══════════════════════════════════════════════════════════════════
   ACTION GROUP TRAINING — app (app.js)

   Runs on the Install Tracker Firebase project. Everything this app
   writes lives under one node, sopTraining/, so it cannot collide with
   the tracker's own data:
     sopTraining/users/<id>            name, username, pw (hashed), division, archived, lastSeen
     sopTraining/progress/<id>/<mod>   sec/<n> reviewed, attempts/<id>, best, passedAt
     sopTraining/presence/<id>         who is signed in right now
     sopTraining/config                passPct, signup, pics/<mod>
   Installers can also sign in with their Install Tracker login
   (installTechLogins). The Manager tab uses the Install Tracker
   manager PIN (installManagerPin, default 1234).
   ═══════════════════════════════════════════════════════════════════ */
(function () {
'use strict';
const CFG = {
  firebase: {
    apiKey: "AIzaSyBdTIdrCajlNM4_BYgJxZwFe0KXKgKw7yM",
    authDomain: "install-tracker-30b1b.firebaseapp.com",
    databaseURL: "https://install-tracker-30b1b-default-rtdb.firebaseio.com",
    projectId: "install-tracker-30b1b",
    storageBucket: "install-tracker-30b1b.firebasestorage.app",
    messagingSenderId: "160965691779",
    appId: "1:160965691779:web:c42baf2dd271a275994eb6"
  },
  ROOT: localStorage.getItem('agtRoot') || 'sopTraining',
  DEFAULT_PIN: '1234',
  PASS_PCT: 90,          // default pass mark; managers can change it in Settings
  QUESTIONS: 20,
  SESSION_HOURS: 12
};
const DIVS = [['hvac', 'HVAC Install'], ['plumbing', 'Plumbing Install'], ['underground', 'Underground'], ['electrical', 'Electrical Install'], ['other', 'Office / Other']];
const DIVNAME = Object.fromEntries(DIVS);
const GROUPS = [['all', 'Every install'], ['hvac', 'HVAC'], ['plumbing', 'Plumbing & Water']];

firebase.initializeApp(CFG.firebase);
const db = firebase.database();
const R = p => db.ref(CFG.ROOT + (p ? '/' + p : ''));
const TS = firebase.database.ServerValue.TIMESTAMP;
const SOP = window.SOP, MODS = SOP.modules, ART = window.SOP_ART;
const mod = id => MODS.find(m => m.id === id);

const st = { me: null, prog: {}, cfg: {}, mgr: sessionStorage.getItem('agtMgr') === '1', users: null, all: null, presence: {}, test: null, result: null, open: {}, mtab: 'team', login: 'in' };
const $ = s => document.querySelector(s);
const view = () => $('#view');
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const passPct = () => Number(st.cfg.passPct) || CFG.PASS_PCT;
const fmtDate = t => t ? new Date(t).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
const ago = t => { if (!t) return 'Never'; const m = Math.floor((Date.now() - t) / 60000); if (m < 2) return 'Just now'; if (m < 60) return m + ' min ago'; const h = Math.floor(m / 60); if (h < 24) return h + ' hr ago'; const d = Math.floor(h / 24); return d < 30 ? d + (d === 1 ? ' day ago' : ' days ago') : fmtDate(t); };
function toast(msg) { const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 2600); }

/* ── password hashing (SHA-256) ── */
function jsSha256(str) {
  const rr = (v, n) => (v >>> n) | (v << (32 - n)), K = [], H = [];
  for (let n = 2, c = 0; c < 64; n++) { let p = true; for (let i = 2; i * i <= n; i++) if (n % i === 0) { p = false; break; } if (p) { if (c < 8) H[c] = (Math.pow(n, .5) % 1 * 4294967296) >>> 0; K[c++] = (Math.pow(n, 1 / 3) % 1 * 4294967296) >>> 0; } }
  const b = Array.from(new TextEncoder().encode(str)), bits = b.length * 8; b.push(0x80); while (b.length % 64 !== 56) b.push(0);
  for (let i = 7; i >= 0; i--) b.push(i > 3 ? 0 : (bits >>> (i * 8)) & 255);
  for (let o = 0; o < b.length; o += 64) {
    const w = []; for (let i = 0; i < 16; i++) w[i] = (b[o + i * 4] << 24 | b[o + i * 4 + 1] << 16 | b[o + i * 4 + 2] << 8 | b[o + i * 4 + 3]) >>> 0;
    for (let i = 16; i < 64; i++) { const a = w[i - 15], e = w[i - 2]; w[i] = (w[i - 16] + (rr(a, 7) ^ rr(a, 18) ^ (a >>> 3)) + w[i - 7] + (rr(e, 17) ^ rr(e, 19) ^ (e >>> 10))) >>> 0; }
    let [a, bb, c, d, e, f, g, h] = H;
    for (let i = 0; i < 64; i++) { const t1 = (h + (rr(e, 6) ^ rr(e, 11) ^ rr(e, 25)) + ((e & f) ^ (~e & g)) + K[i] + w[i]) >>> 0, t2 = ((rr(a, 2) ^ rr(a, 13) ^ rr(a, 22)) + ((a & bb) ^ (a & c) ^ (bb & c))) >>> 0; h = g; g = f; f = e; e = (d + t1) >>> 0; d = c; c = bb; bb = a; a = (t1 + t2) >>> 0; }
    [a, bb, c, d, e, f, g, h].forEach((v, i) => H[i] = (H[i] + v) >>> 0);
  }
  return H.map(v => v.toString(16).padStart(8, '0')).join('');
}
async function sha(s) {
  if (window.crypto && crypto.subtle) { try { const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)); return [...new Uint8Array(d)].map(x => x.toString(16).padStart(2, '0')).join(''); } catch (e) { } }
  return jsSha256(s);
}
const pwHash = (u, p) => sha(u.toLowerCase() + '|' + p + '|agt');

/* ── module helpers ── */
function parts(m) {
  return [{ kind: 'expect', t: 'What is expected of you', sub: 'Read this first' }, ...m.sections.map(s => ({ kind: 'sec', s, t: s.t, sub: s.steps.length + ' steps' })), { kind: 'check', t: 'Final quality-control checklist & records', sub: m.checklist.length + ' checks before you leave' }];
}
const secFor = (m, r) => m.sections.findIndex(s => s.t.toLowerCase().includes(String(r).toLowerCase()));
function status(m, p) {
  p = p || {}; const total = parts(m).length, sec = p.sec || {};
  let reviewed = 0; for (let i = 0; i < total; i++) if (sec[i]) reviewed++;
  const att = p.attempts ? Object.values(p.attempts) : [];
  return { total, reviewed, ready: reviewed >= total, attempts: att.length, best: p.best ? p.best.pct : null, passed: !!p.passedAt, passedAt: p.passedAt, last: att.sort((a, b) => b.at - a.at)[0] };
}
const required = u => { const d = u && u.division; return (d === 'hvac' || d === 'plumbing') ? MODS.filter(m => m.trade === d || m.trade === 'all') : MODS; };
function pic(m) { const p = st.cfg.pics && st.cfg.pics[m.id]; return p ? `<img src="${esc(p)}" alt="">` : ART[m.art](); }

/* ── session ── */
function saveSession(uid) { localStorage.setItem('agtSession', JSON.stringify({ uid, at: Date.now() })); }
function getSession() { try { const s = JSON.parse(localStorage.getItem('agtSession')); if (s && Date.now() - s.at < CFG.SESSION_HOURS * 3600000) return s; } catch (e) { } return null; }
function signOut() { if (st.me) R('presence/' + st.me.uid).set({ on: false, at: TS }); localStorage.removeItem('agtSession'); sessionStorage.removeItem('agtMgr'); location.hash = ''; location.reload(); }

async function findLogin(username, password) {
  const u = username.trim().toLowerCase(); if (!u || !password) throw new Error('Enter your username and password.');
  const users = (await R('users').once('value')).val() || {}, h = await pwHash(u, password);
  let hit = Object.entries(users).find(([, x]) => x.username === u && x.pw && x.pw === h);
  if (!hit) {
    const logins = (await db.ref('installTechLogins').once('value')).val() || {};
    const m = Object.entries(logins).find(([, r]) => r && !r.disabled && r.username && r.username.toLowerCase() === u && r.password === password);
    if (m) {
      const id = 'it_' + m[0]; let rec = users[id];
      if (!rec) {
        let person = null; if (m[1].personId) person = (await db.ref('installPeople/' + m[1].personId).once('value')).val();
        rec = { name: (person && person.name) || m[1].name || m[1].username, username: u, division: (person && DIVNAME[person.group]) ? person.group : 'other', linked: true, createdAt: Date.now() };
        await R('users/' + id).set(rec);
      }
      hit = [id, rec];
    }
  }
  if (!hit) throw new Error('Incorrect username or password.');
  if (hit[1].archived) throw new Error('This login has been archived. See your manager.');
  return hit[0];
}
async function usernameTaken(u) {
  const users = (await R('users').once('value')).val() || {}; if (Object.values(users).some(x => x.username === u)) return true;
  const logins = (await db.ref('installTechLogins').once('value')).val() || {}; return Object.values(logins).some(r => r && r.username && r.username.toLowerCase() === u);
}
async function createUser({ name, username, password, division }, by) {
  name = (name || '').trim(); const u = (username || '').trim().toLowerCase();
  if (name.length < 2) throw new Error('Enter a first and last name.');
  if (!/^[a-z0-9._-]{3,}$/.test(u)) throw new Error('Username: at least 3 letters or numbers, no spaces.');
  if (!password || password.length < 4) throw new Error('Password must be at least 4 characters.');
  if (await usernameTaken(u)) throw new Error('That username is already taken.');
  const ref = R('users').push(); await ref.set({ name, username: u, pw: await pwHash(u, password), division: DIVNAME[division] ? division : 'other', createdAt: Date.now(), createdBy: by || 'self' });
  return ref.key;
}

async function startSession(uid) {
  const rec = (await R('users/' + uid).once('value')).val();
  if (!rec || rec.archived) { localStorage.removeItem('agtSession'); return renderLogin(rec ? 'This login has been archived. See your manager.' : ''); }
  st.me = { uid, ...rec }; saveSession(uid);
  const ov = $('.login'); if (ov) ov.remove(); $('#shell').classList.remove('hide'); $('#tabbar').classList.remove('hide');
  R('users/' + uid).update({ lastLogin: Date.now(), lastSeen: Date.now() });
  const pres = R('presence/' + uid);
  db.ref('.info/connected').on('value', s => { if (s.val()) { pres.onDisconnect().set({ on: false, at: TS }); pres.set({ on: true, at: TS }); } });
  setInterval(() => { R('users/' + uid + '/lastSeen').set(Date.now()); saveSession(uid); }, 5 * 60000);
  R('users/' + uid).on('value', s => { const v = s.val(); if (!v || v.archived) return signOut(); st.me = { uid, ...v }; paintWho(); });
  R('config').on('value', s => { st.cfg = s.val() || {}; render(); });
  R('progress/' + uid).on('value', s => { st.prog = s.val() || {}; render(); });
  paintWho(); render();
}
function paintWho() { $('#who').innerHTML = `<b>${esc(st.me.name)}</b><br>${esc(DIVNAME[st.me.division] || '')}`; }

/* ── login screen ── */
function renderLogin(err) {
  $('#shell').classList.add('hide'); $('#tabbar').classList.add('hide'); let ov = $('.login'); if (!ov) { ov = document.createElement('div'); ov.className = 'login'; document.body.appendChild(ov); }
  const up = st.login === 'up';
  ov.innerHTML = `<div class="login-box"><img src="ag-logo.png" alt="The Action Group"><h1>ACTION GROUP <em>TRAINING</em></h1><p class="s">Installation SOPs &amp; sign-off tests</p>
  <form class="card" id="loginForm" autocomplete="on">
    ${up ? `<label class="f">Your name</label><input name="name" placeholder="First and last name" autocomplete="name">
    <label class="f">Division</label><select name="division">${DIVS.map(([k, n]) => `<option value="${k}">${n}</option>`).join('')}</select>` : ''}
    <label class="f">Username</label><input name="username" autocapitalize="none" autocorrect="off" autocomplete="username">
    <label class="f">Password</label><input name="password" type="password" autocomplete="${up ? 'new-password' : 'current-password'}">
    <div class="err" id="loginErr">${esc(err || '')}</div>
    <button class="btn red" style="width:100%" type="submit">${up ? 'Create my login' : 'Sign in'}</button>
  </form>
  <button class="link" data-act="login-mode" id="modeLink">${up ? 'Already have a login? Sign in' : 'New here? Create your login'}</button>
  <p class="muted" style="font-size:12px;margin-top:10px">${up ? '' : 'Installers: your Install Tracker username and password work here.'}</p></div>`;
  R('config/signup').once('value').then(s => { if (s.val() === false) { const l = $('#modeLink'); if (l && st.login !== 'up') l.remove(); } });
  $('#loginForm').onsubmit = async e => {
    e.preventDefault(); const f = Object.fromEntries(new FormData(e.target)), btn = e.target.querySelector('button'), errEl = $('#loginErr');
    btn.disabled = true; errEl.textContent = '';
    try { const uid = up ? await createUser(f) : await findLogin(f.username, f.password); await startSession(uid); }
    catch (x) { errEl.textContent = x.message || 'Could not sign in. Check your connection.'; btn.disabled = false; }
  };
}

/* ── router ── */
function route() { const p = location.hash.replace(/^#\/?/, '').split('/'); return { name: p[0] || 'home', id: p[1], sub: p[2] }; }
function render() {
  if (!st.me) return; const r = route();
  document.querySelectorAll('.tabbar a').forEach(a => a.classList.toggle('on', a.dataset.tab === (r.name === 'm' ? 'home' : r.name)));
  if (r.name === 'm' && mod(r.id)) return r.sub === 'test' ? renderTest(mod(r.id)) : r.sub === 'result' && st.result ? renderResult(mod(r.id)) : renderModule(mod(r.id));
  if (r.name === 'me') return renderMe();
  if (r.name === 'manager') return renderManager();
  renderHome();
}

/* ── home ── */
function tile(m, opt) {
  const s = status(m, st.prog[m.id]);
  const chip = s.passed ? `<span class="chip ok">✓ Passed ${s.best}%</span>` : s.reviewed || s.attempts ? `<span class="chip go">In progress</span>` : `<span class="chip">Not started</span>`;
  return `<button class="tile${opt ? ' optional' : ''}" data-act="go" data-to="m/${m.id}"><div class="tile-img">${pic(m)}${chip}</div><div class="tile-body">
    <div class="tile-name">${esc(m.title)}</div><div class="tile-desc">${esc(m.desc)}</div>
    <div class="bar${s.passed ? ' ok' : ''}"><i style="width:${s.passed ? 100 : Math.round(s.reviewed / s.total * 100)}%"></i></div>
    <div class="tile-meta"><span>${s.reviewed}/${s.total} sections</span><span>${opt ? 'Optional' : CFG.QUESTIONS + '-question test'}</span></div></div></button>`;
}
function renderHome() {
  const req = required(st.me), reqIds = new Set(req.map(m => m.id));
  const passed = req.filter(m => status(m, st.prog[m.id]).passed).length;
  const going = MODS.filter(m => { const s = status(m, st.prog[m.id]); return !s.passed && (s.reviewed || s.attempts); }).length;
  const bests = MODS.map(m => status(m, st.prog[m.id]).best).filter(b => b != null);
  view().innerHTML = `<div class="stats">
    <div class="stat"><b>${passed}/${req.length}</b><span>Modules passed</span></div>
    <div class="stat"><b>${going}</b><span>In progress</span></div>
    <div class="stat"><b>${bests.length ? Math.round(bests.reduce((a, b) => a + b, 0) / bests.length) + '%' : '—'}</b><span>Average best score</span></div></div>
  ${GROUPS.map(([k, n]) => `<div class="sec-label">${n} — SOP modules</div><div class="grid">${MODS.filter(m => m.trade === k).map(m => tile(m, !reqIds.has(m.id))).join('')}</div>`).join('')}
  <p class="muted" style="margin-top:22px;font-size:12.5px">Open a module, work through every section, then pass the ${CFG.QUESTIONS}-question test at ${passPct()}% or better to be signed off on that SOP.</p>`;
}

/* ── module ── */
function tickStore() { try { return JSON.parse(localStorage.getItem('agtTicks_' + st.me.uid)) || {}; } catch (e) { return {}; } }
function ticks(mid, i) { return tickStore()[mid + ':' + i] || {}; }
function partBody(m, p, i, done) {
  if (p.kind === 'expect') return `<ul class="ticks">${[...(m.expect || []), ...SOP.expect].map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
  if (p.kind === 'check') return `<p class="why">Every item is checked and documented before the job is considered complete.</p><ul class="ticks">${m.checklist.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
    <div class="sub">Record on every job</div><ul class="ticks">${m.record.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
  const s = p.s;
  const tk = ticks(m.id, i);
  return `<p class="why">${esc(s.why)}</p><ol class="steps">${s.steps.map((x, k) => `<li class="tk${done || tk[k] ? ' on' : ''}" data-act="tick" data-id="${m.id}" data-i="${i}" data-s="${k}">${esc(x)}</li>`).join('')}</ol>
    ${s.stop ? `<div class="stop"><b>Stop work</b>${esc(s.stop)}</div>` : ''}
    ${s.tools ? `<div class="sub">Required equipment</div><div class="tools">${s.tools.map(x => `<span class="chip">${esc(x)}</span>`).join('')}</div>` : ''}`;
}
function renderModule(m) {
  const P = parts(m), prog = st.prog[m.id] || {}, sec = prog.sec || {}, s = status(m, prog);
  if (st.open[m.id] === undefined) { const first = P.findIndex((_, i) => !sec[i]); st.open[m.id] = first < 0 ? -1 : first; }
  const steps = m.sections.reduce((a, x) => a + x.steps.length, 0);
  view().innerHTML = `<div class="crumb"><a href="#/">Modules</a> &nbsp;›&nbsp; ${esc(m.short)}</div>
  <div class="card mod-hero"><div class="tile-img">${pic(m)}</div><div>
    <h2>${esc(m.title)}</h2><p>${esc(m.desc)}</p>
    <div class="row" style="margin-bottom:14px">${s.passed ? `<span class="chip ok">✓ Signed off ${fmtDate(s.passedAt)} · best ${s.best}%</span>` : `<span class="chip${s.reviewed ? ' go' : ''}">${s.reviewed}/${s.total} sections reviewed</span>`}
      <span class="chip">${m.sections.length} sections · ${steps} steps</span><span class="chip">${CFG.QUESTIONS} questions · pass ${passPct()}%</span></div>
    <div class="row"><button class="btn red" data-act="start-test" data-id="${m.id}" ${s.ready ? '' : 'disabled'}>${s.passed ? 'Retake the test' : 'Take the test'}</button>
      <a class="link" style="margin:0" href="pdf/${m.id}.pdf" target="_blank" rel="noopener">Printable copy (PDF)</a></div>
    ${s.ready ? '' : `<p class="muted" style="font-size:12.5px;margin:10px 0 0">Open each section below, tap every step as you read it, and mark the section reviewed. The test unlocks when they are all done.</p>`}
  </div></div>
  <div class="sec-label">Step-by-step installation</div>
  ${P.map((p, i) => `<div class="sec${sec[i] ? ' done' : ''}${st.open[m.id] === i ? ' open' : ''}" id="part${i}">
    <button class="sec-h" data-act="toggle" data-id="${m.id}" data-i="${i}"><span class="sec-n">${sec[i] ? '✓' : i + 1}</span><span class="sec-t">${esc(p.t)}<small>${esc(p.sub)}</small></span><span class="sec-c">›</span></button>
    <div class="sec-b">${st.open[m.id] === i ? partBody(m, p, i, !!sec[i]) + `<div class="sec-foot">${sec[i] ? `<span class="chip ok">✓ Reviewed ${fmtDate(sec[i])}</span>` : (() => { const need = p.kind === 'sec' ? p.s.steps.length : 0, got = Object.keys(ticks(m.id, i)).length; return got >= need ? `<button class="btn red" data-act="review" data-id="${m.id}" data-i="${i}">I have read and understand this section</button>` : `<button class="btn" disabled>Tap each step as you read it · ${got} of ${need}</button>`; })()}</div>` : ''}</div></div>`).join('')}
  <div class="card cta"><div><h3>${s.ready ? 'Ready for the test' : 'Finish every section to unlock the test'}</h3>
    <div class="muted" style="font-size:13px">${CFG.QUESTIONS} questions, drawn and shuffled fresh every attempt. ${passPct()}% to pass. Miss it and the sections you got wrong re-open for review.</div></div>
    <button class="btn red" data-act="start-test" data-id="${m.id}" ${s.ready ? '' : 'disabled'}>${s.passed ? 'Retake the test' : 'Take the test'}</button></div>`;
}

/* ── test ── */
function buildTest(m) {
  let qs = (m.quiz || []).slice();
  for (const [k, n] of Object.entries(m.pools || {})) qs.push(...shuffle(SOP.pools[k].filter(q => secFor(m, q.r) >= 0)).slice(0, n));
  return { mid: m.id, i: 0, qs: shuffle(qs).slice(0, CFG.QUESTIONS).map(q => ({ q: q.q, r: q.r, pick: -1, opts: shuffle(q.a.map((t, i) => ({ t, ok: i === 0 }))) })) };
}
function renderTest(m) {
  const T = st.test; if (!T || T.mid !== m.id) { location.hash = '#/m/' + m.id; return; }
  const q = T.qs[T.i], n = T.qs.length, done = T.qs.filter(x => x.pick >= 0).length;
  view().innerHTML = `<div class="quiz"><div class="crumb"><a href="#/m/${m.id}" data-act="quit-test">‹ Leave test</a> &nbsp;·&nbsp; ${esc(m.title)}</div>
    <div class="bar"><i style="width:${Math.round(done / n * 100)}%"></i></div>
    <div class="q-n">Question ${T.i + 1} of ${n}</div><div class="q-t">${esc(q.q)}</div>
    ${q.opts.map((o, i) => `<button class="opt${q.pick === i ? ' on' : ''}" data-act="pick" data-i="${i}"><i>${'ABCD'[i]}</i><span>${esc(o.t)}</span></button>`).join('')}
    <div class="row" style="justify-content:space-between;margin-top:14px"><button class="btn" data-act="q-go" data-i="${T.i - 1}" ${T.i ? '' : 'disabled'}>‹ Back</button>
      ${T.i < n - 1 ? `<button class="btn red" data-act="q-go" data-i="${T.i + 1}" ${q.pick < 0 ? 'disabled' : ''}>Next ›</button>` : `<button class="btn red" data-act="submit-test" ${done < n ? 'disabled' : ''}>Submit test</button>`}</div>
    <div class="dots">${T.qs.map((x, i) => `<button class="${x.pick >= 0 ? 'a' : ''}${i === T.i ? ' c' : ''}" data-act="q-go" data-i="${i}">${i + 1}</button>`).join('')}</div>
    <p class="muted" style="font-size:12.5px;margin-top:14px">${done} of ${n} answered. ${passPct()}% to pass.</p></div>`;
}
async function submitTest() {
  const T = st.test, m = mod(T.mid), n = T.qs.length, wrong = T.qs.filter(q => !q.opts[q.pick].ok), score = n - wrong.length, pct = Math.round(score / n * 100), passed = pct >= passPct();
  const topics = [...new Set(wrong.map(q => { const i = secFor(m, q.r); return i >= 0 ? m.sections[i].t : q.r; }))];
  const base = 'progress/' + st.me.uid + '/' + m.id, prev = st.prog[m.id] || {}, up = {};
  up[base + '/attempts/' + R(base + '/attempts').push().key] = { score, total: n, pct, passed, at: Date.now(), missed: topics };
  if (!prev.best || pct > prev.best.pct) up[base + '/best'] = { pct, score, at: Date.now() };
  if (passed && !prev.passedAt) up[base + '/passedAt'] = Date.now();
  if (!passed) { const all = tickStore(); wrong.forEach(q => { const i = secFor(m, q.r); if (i >= 0) { up[base + '/sec/' + (i + 1)] = null; delete all[m.id + ':' + (i + 1)]; } }); localStorage.setItem('agtTicks_' + st.me.uid, JSON.stringify(all)); }
  st.result = { mid: m.id, score, n, pct, passed, topics, wrong: wrong.map(q => ({ q: q.q, right: q.opts.find(o => o.ok).t })) };
  st.test = null; st.open[m.id] = undefined;
  await db.ref(CFG.ROOT).update(up);
  location.hash = '#/m/' + m.id + '/result'; window.scrollTo(0, 0);
}
function renderResult(m) {
  const r = st.result; if (!r || r.mid !== m.id) return renderModule(m);
  view().innerHTML = `<div class="quiz"><div class="crumb"><a href="#/">Modules</a> &nbsp;›&nbsp; <a href="#/m/${m.id}">${esc(m.short)}</a> &nbsp;›&nbsp; Test result</div>
  <div class="card" style="text-align:center"><div class="score ${r.passed ? 'ok' : 'bad'}">${r.pct}%</div>
    <div style="margin:8px 0 12px"><span class="chip ${r.passed ? 'ok' : 'bad'}">${r.passed ? '✓ Passed — signed off' : 'Not passed'}</span></div>
    <p class="muted">${r.score} of ${r.n} correct. Pass mark ${passPct()}%.</p></div>
  ${r.passed ? (r.wrong.length ? `<div class="sec-label">What you missed</div><div class="card">${r.wrong.map(w => `<div class="miss"><b>${esc(w.q)}</b><span>✓ ${esc(w.right)}</span></div>`).join('')}</div>` : '')
      : `<div class="sec-label">Review before you retake</div><div class="card"><p class="muted" style="margin-bottom:6px">These sections have been re-opened. Read them again, mark them reviewed, then retake the test. The questions and the answer order change every attempt.</p>
        ${r.topics.map(t => `<div class="miss"><b>${esc(t)}</b></div>`).join('')}</div>`}
  <div class="row" style="margin-top:16px"><a class="btn red" href="#/m/${m.id}">${r.passed ? 'Back to the module' : 'Review the sections'}</a><a class="btn" href="#/">All modules</a></div></div>`;
}

/* ── my progress ── */
function renderMe() {
  const req = new Set(required(st.me).map(m => m.id)), hist = [];
  MODS.forEach(m => Object.values((st.prog[m.id] || {}).attempts || {}).forEach(a => hist.push({ m, ...a }))); hist.sort((a, b) => b.at - a.at);
  view().innerHTML = `<div class="sec-label">My progress</div><div class="scroll"><table><tr><th>Module</th><th>Status</th><th>Sections</th><th>Attempts</th><th>Best</th><th>Signed off</th></tr>
  ${MODS.map(m => { const s = status(m, st.prog[m.id]); return `<tr class="clk" data-act="go" data-to="m/${m.id}"><td class="n">${esc(m.title)}${req.has(m.id) ? '' : ' <span class="muted" style="font-weight:400">(optional)</span>'}</td>
    <td>${s.passed ? '<span class="chip ok">Passed</span>' : s.reviewed || s.attempts ? '<span class="chip go">In progress</span>' : '<span class="chip">Not started</span>'}</td>
    <td>${s.reviewed}/${s.total}</td><td>${s.attempts}</td><td>${s.best == null ? '—' : s.best + '%'}</td><td>${fmtDate(s.passedAt)}</td></tr>`; }).join('')}</table></div>
  <div class="sec-label">Test history</div>${hist.length ? `<div class="scroll"><table><tr><th>Date</th><th>Module</th><th>Score</th><th>Result</th></tr>${hist.map(a => `<tr><td>${fmtDate(a.at)}</td><td class="n">${esc(a.m.title)}</td><td>${a.score}/${a.total} · ${a.pct}%</td><td>${a.passed ? '<span class="chip ok">Passed</span>' : '<span class="chip bad">Not passed</span>'}</td></tr>`).join('')}</table></div>` : `<div class="card muted">No tests taken yet.</div>`}`;
}

/* ── manager ── */
function mgrListen() {
  if (st.users) return; st.users = {}; st.all = {};
  R('users').on('value', s => { st.users = s.val() || {}; if (route().name === 'manager') render(); });
  R('progress').on('value', s => { st.all = s.val() || {}; if (route().name === 'manager') render(); });
  R('presence').on('value', s => { st.presence = s.val() || {}; if (route().name === 'manager') render(); });
}
function techRow(uid, u) {
  const req = required(u), reqIds = new Set(req.map(m => m.id)), P = st.all[uid] || {};
  const per = MODS.map(m => ({ m, s: status(m, P[m.id]), req: reqIds.has(m.id) }));
  return { uid, u, per, passed: per.filter(x => x.req && x.s.passed).length, req: req.length, online: !!(st.presence[uid] && st.presence[uid].on) };
}
function cell(x) {
  const s = x.s, c = x.req ? '' : ' x';
  if (s.passed) return `<span class="cell p${c}" title="Passed ${fmtDate(s.passedAt)}">✓ ${s.best}%</span>`;
  if (s.attempts) return `<span class="cell f${c}" title="${s.attempts} attempt(s), not passed">${s.best}%</span>`;
  if (s.reviewed) return `<span class="cell g${c}" title="Sections reviewed">${s.reviewed}/${s.total}</span>`;
  return `<span class="cell z${c}">—</span>`;
}
function renderManager() {
  if (!st.mgr) { view().innerHTML = `<div class="card" style="max-width:380px;margin:30px auto;text-align:center"><div class="sec-label" style="justify-content:center;margin-top:0">Manager access</div>
    <form id="pinForm"><input type="password" inputmode="numeric" name="pin" placeholder="Manager PIN" style="text-align:center;font-size:20px;letter-spacing:.3em" autocomplete="off"><div class="err" id="pinErr"></div><button class="btn red" style="width:100%">Unlock</button></form>
    <p class="muted" style="font-size:12px;margin-top:10px">Same PIN as the Install Tracker manager portal.</p></div>`;
    $('#pinForm').onsubmit = async e => { e.preventDefault(); const pin = (await db.ref('installManagerPin').once('value')).val() || CFG.DEFAULT_PIN; if (String(e.target.pin.value) === String(pin)) { st.mgr = true; sessionStorage.setItem('agtMgr', '1'); render(); } else $('#pinErr').textContent = 'Incorrect PIN.'; };
    return; }
  mgrListen();
  const act = Object.entries(st.users).filter(([, u]) => !u.archived).map(([id, u]) => techRow(id, u)).sort((a, b) => a.u.name.localeCompare(b.u.name));
  const arch = Object.entries(st.users).filter(([, u]) => u.archived);
  const tabs = [['team', 'Team'], ['modules', 'By module'], ['archived', `Archived (${arch.length})`], ['settings', 'Settings']];
  let body = '';
  if (st.mtab === 'team') {
    const done = act.filter(r => r.req && r.passed === r.req).length, since = Date.now() - 7 * 864e5;
    const week = act.reduce((n, r) => n + r.per.reduce((k, x) => k + Object.values((st.all[r.uid] || {})[x.m.id] && (st.all[r.uid][x.m.id].attempts || {}) || {}).filter(a => a.at > since).length, 0), 0);
    body = `<div class="stats" style="grid-template-columns:repeat(auto-fit,minmax(130px,1fr))"><div class="stat"><b>${act.length}</b><span>Active techs</span></div><div class="stat"><b>${act.filter(r => r.online).length}</b><span>Signed in now</span></div>
      <div class="stat"><b>${done}</b><span>Fully signed off</span></div><div class="stat"><b>${week}</b><span>Tests this week</span></div></div>
    <div class="row noprint" style="margin:16px 0 4px"><button class="btn red sm" data-act="add-tech">+ Add tech</button><button class="btn sm" data-act="csv">Export CSV</button><button class="btn sm" data-act="print">Print</button></div>
    <div class="legend"><span><span class="cell p">✓ 95%</span> passed, best score</span><span><span class="cell f">70%</span> tested, not passed</span><span><span class="cell g">4/11</span> sections reviewed</span><span>Faded = outside the tech's division</span></div>
    ${act.length ? `<div class="scroll"><table><tr><th>Tech</th><th>Last seen</th><th>Passed</th>${MODS.map(m => `<th title="${esc(m.title)}">${esc(m.short)}</th>`).join('')}</tr>
    ${act.map(r => `<tr class="clk" data-act="tech" data-uid="${r.uid}"><td class="n"><span class="dot${r.online ? ' on' : ''}"></span>${esc(r.u.name)}<br><span class="muted" style="font-weight:400;font-size:11.5px;margin-left:15px">${esc(DIVNAME[r.u.division] || '')}</span></td>
      <td>${r.online ? '<span style="color:var(--ok)">Online</span>' : ago(r.u.lastSeen)}</td><td><b>${r.passed}/${r.req}</b></td>${r.per.map(x => `<td>${cell(x)}</td>`).join('')}</tr>`).join('')}</table></div>
    <p class="muted noprint" style="font-size:12.5px;margin-top:8px">Tap a tech for attempts, dates, password reset, module reset and archive.</p>` : `<div class="card muted">No techs yet. Add one, or have them create a login on the sign-in screen.</div>`}`;
  } else if (st.mtab === 'modules') {
    body = `<div class="scroll"><table><tr><th>Module</th><th>Passed</th><th>In progress</th><th>Not started</th><th>Avg best</th><th>Most-missed sections</th></tr>${MODS.map(m => {
      const rows = act.filter(r => r.per.find(x => x.m.id === m.id).req), ss = rows.map(r => r.per.find(x => x.m.id === m.id).s), miss = {};
      rows.forEach(r => Object.values(((st.all[r.uid] || {})[m.id] || {}).attempts || {}).forEach(a => (a.missed || []).forEach(t => miss[t] = (miss[t] || 0) + 1)));
      const bests = ss.map(s => s.best).filter(b => b != null), top = Object.entries(miss).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([t, n]) => `${esc(t)} (${n})`).join('<br>');
      return `<tr><td class="n">${esc(m.title)}</td><td><b>${ss.filter(s => s.passed).length}/${rows.length}</b></td><td>${ss.filter(s => !s.passed && (s.reviewed || s.attempts)).length}</td><td>${ss.filter(s => !s.passed && !s.reviewed && !s.attempts).length}</td>
        <td>${bests.length ? Math.round(bests.reduce((a, b) => a + b, 0) / bests.length) + '%' : '—'}</td><td style="white-space:normal;min-width:220px;font-size:12.5px">${top || '<span class="muted">—</span>'}</td></tr>`; }).join('')}</table></div>
      <p class="muted" style="font-size:12.5px;margin-top:8px">Counts only techs whose division includes the module. "Most-missed" shows which sections techs get wrong on the test — good huddle topics.</p>`;
  } else if (st.mtab === 'archived') {
    body = arch.length ? `<div class="scroll"><table><tr><th>Tech</th><th>Division</th><th>Archived</th><th></th></tr>${arch.map(([id, u]) => `<tr><td class="n">${esc(u.name)}</td><td>${esc(DIVNAME[u.division] || '')}</td><td>${fmtDate(u.archivedAt)}</td>
      <td style="text-align:right"><button class="btn sm" data-act="tech" data-uid="${id}">View</button> <button class="btn sm red" data-act="restore" data-uid="${id}">Restore</button></td></tr>`).join('')}</table></div>
      <p class="muted" style="font-size:12.5px;margin-top:8px">Archived techs cannot sign in and drop off the team board. Their training record is kept and comes back when restored.</p>` : `<div class="card muted">Nobody is archived.</div>`;
  } else {
    body = `<div class="card"><div class="sec-label" style="margin-top:0">Test rules</div>
      <label class="f">Pass mark (%)</label><div class="row"><input id="setPass" type="number" min="50" max="100" value="${passPct()}" style="width:120px"><button class="btn sm" data-act="save-pass">Save</button><span class="muted" style="font-size:12.5px">${Math.ceil(CFG.QUESTIONS * passPct() / 100)} of ${CFG.QUESTIONS} correct to pass.</span></div>
      <label class="f">Sign-in screen</label><div class="row"><button class="btn sm" data-act="toggle-signup">${st.cfg.signup === false ? 'Turn on' : 'Turn off'} "Create your login"</button>
        <span class="muted" style="font-size:12.5px">${st.cfg.signup === false ? 'Off: only managers add techs.' : 'On: techs can create their own login.'}</span></div></div>
    <div class="card" style="margin-top:14px"><div class="sec-label" style="margin-top:0">Tile pictures</div><p class="muted" style="font-size:12.5px;margin-bottom:6px">Upload a real job photo for any module. It replaces the drawing on the home screen and the module page.</p>
      ${MODS.map(m => `<div class="picrow"><div class="tile-img">${pic(m)}</div><b>${esc(m.title)}</b><button class="btn sm" data-act="pic" data-id="${m.id}">Upload</button>${st.cfg.pics && st.cfg.pics[m.id] ? `<button class="btn sm ghost" data-act="pic-reset" data-id="${m.id}">Reset</button>` : ''}</div>`).join('')}</div>`;
  }
  view().innerHTML = `<div class="row" style="justify-content:space-between"><div class="sec-label" style="margin:0 0 14px">Manager</div><button class="pill noprint" data-act="lock">Lock</button></div>
    <div class="tabs">${tabs.map(([k, n]) => `<button class="${st.mtab === k ? 'on' : ''}" data-act="mtab" data-k="${k}">${n}</button>`).join('')}</div>${body}`;
}
function modal(html) {
  const el = document.createElement('div'); el.className = 'modal'; el.innerHTML = `<div class="card">${html}</div>`; document.body.appendChild(el);
  el.addEventListener('click', e => { if (e.target === el || e.target.closest('[data-close]')) el.remove(); }); return el;
}
function techModal(uid) {
  const u = st.users[uid]; if (!u) return; const r = techRow(uid, u), pr = st.presence[uid];
  modal(`<h3>${esc(u.name)}</h3><div class="kv"><div><span>Username</span>${esc(u.username)}</div><div><span>Division</span>${esc(DIVNAME[u.division] || '')}</div>
    <div><span>Status</span>${u.archived ? 'Archived ' + fmtDate(u.archivedAt) : r.online ? 'Online now' : 'Last seen ' + ago(u.lastSeen)}</div><div><span>Signed off</span>${r.passed} of ${r.req}</div>
    <div><span>Login type</span>${u.linked ? 'Install Tracker login' : 'Training login'}</div><div><span>Added</span>${fmtDate(u.createdAt)}</div></div>
    <div class="scroll"><table><tr><th>Module</th><th>Sections</th><th>Tries</th><th>Best</th><th>Signed off</th><th></th></tr>${r.per.map(x => `<tr><td class="n" style="min-width:120px">${esc(x.m.short)}${x.req ? '' : ' <span class="muted" style="font-weight:400">(opt.)</span>'}</td><td>${x.s.reviewed}/${x.s.total}</td><td>${x.s.attempts}</td><td>${x.s.best == null ? '—' : x.s.best + '%'}</td><td>${fmtDate(x.s.passedAt)}</td>
      <td>${x.s.reviewed || x.s.attempts ? `<button class="btn sm ghost" data-act="reset-mod" data-uid="${uid}" data-id="${x.m.id}">Reset</button>` : ''}</td></tr>`).join('')}</table></div>
    <label class="f">Division</label><div class="row"><select id="tmDiv" style="flex:1;min-width:160px">${DIVS.map(([k, n]) => `<option value="${k}"${u.division === k ? ' selected' : ''}>${n}</option>`).join('')}</select><button class="btn sm" data-act="set-div" data-uid="${uid}">Save</button></div>
    ${u.linked ? `<p class="muted" style="font-size:12.5px;margin-top:12px">This tech signs in with their Install Tracker login. Change the password there.</p>` : `<label class="f">New password</label><div class="row"><input id="tmPw" type="text" placeholder="At least 4 characters" style="flex:1;min-width:160px" autocomplete="off"><button class="btn sm" data-act="set-pw" data-uid="${uid}">Reset password</button></div>`}
    <div class="row" style="justify-content:space-between;margin-top:18px"><button class="btn ${u.archived ? 'red' : ''}" data-act="${u.archived ? 'restore' : 'archive'}" data-uid="${uid}">${u.archived ? 'Restore tech' : 'Archive tech'}</button><button class="btn ghost" data-close>Close</button></div>`);
}
function addTechModal() {
  const el = modal(`<h3>Add a tech</h3><form id="addForm"><label class="f">Name</label><input name="name" placeholder="First and last name"><label class="f">Division</label><select name="division">${DIVS.map(([k, n]) => `<option value="${k}">${n}</option>`).join('')}</select>
    <label class="f">Username</label><input name="username" autocapitalize="none"><label class="f">Password</label><input name="password" type="text" autocomplete="off"><div class="err" id="addErr"></div>
    <div class="row" style="justify-content:flex-end"><button type="button" class="btn ghost" data-close>Cancel</button><button class="btn red">Add tech</button></div></form>`);
  el.querySelector('#addForm').onsubmit = async e => { e.preventDefault(); try { await createUser(Object.fromEntries(new FormData(e.target)), st.me.name); el.remove(); toast('Tech added'); } catch (x) { el.querySelector('#addErr').textContent = x.message; } };
}
function exportCsv() {
  const q = v => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"', head = ['Name', 'Username', 'Division', 'Status', 'Last seen', 'Passed', 'Required'];
  MODS.forEach(m => head.push(m.short + ' sections', m.short + ' attempts', m.short + ' best %', m.short + ' signed off'));
  const rows = Object.entries(st.users).map(([id, u]) => { const r = techRow(id, u), row = [u.name, u.username, DIVNAME[u.division] || '', u.archived ? 'Archived' : 'Active', u.lastSeen ? new Date(u.lastSeen).toLocaleString() : '', r.passed, r.req];
    r.per.forEach(x => row.push(x.s.reviewed + '/' + x.s.total, x.s.attempts, x.s.best == null ? '' : x.s.best, x.s.passedAt ? new Date(x.s.passedAt).toLocaleDateString() : '')); return row.map(q).join(','); });
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([head.map(q).join(',') + '\n' + rows.join('\n')], { type: 'text/csv' })); a.download = 'action-group-training-' + new Date().toISOString().slice(0, 10) + '.csv'; a.click();
}
function uploadPic(id) {
  const inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/*';
  inp.onchange = () => { const f = inp.files[0]; if (!f) return; const img = new Image(); img.onload = () => { const w = Math.min(900, img.width), h = Math.round(img.height * w / img.width), c = document.createElement('canvas'); c.width = w; c.height = h; c.getContext('2d').drawImage(img, 0, 0, w, h);
    R('config/pics/' + id).set(c.toDataURL('image/jpeg', .8)).then(() => toast('Picture saved')); URL.revokeObjectURL(img.src); }; img.src = URL.createObjectURL(f); };
  inp.click();
}

/* ── actions ── */
const ACT = {
  'go': d => { location.hash = '#/' + d.to; window.scrollTo(0, 0); },
  'login-mode': () => { st.login = st.login === 'up' ? 'in' : 'up'; renderLogin(); },
  'signout': signOut,
  'theme': () => { const l = document.documentElement.classList.toggle('light'); localStorage.setItem('agtTheme', l ? 'light' : 'dark'); },
  'tick': d => { const all = tickStore(), k = d.id + ':' + d.i; if (((st.prog[d.id] || {}).sec || {})[d.i]) return; all[k] = all[k] || {}; if (all[k][d.s]) delete all[k][d.s]; else all[k][d.s] = 1; localStorage.setItem('agtTicks_' + st.me.uid, JSON.stringify(all)); const y = window.scrollY; render(); window.scrollTo(0, y); },
  'toggle': d => { const i = +d.i; st.open[d.id] = st.open[d.id] === i ? -1 : i; render(); },
  'review': async d => { const i = +d.i, m = mod(d.id), base = 'progress/' + st.me.uid + '/' + d.id, up = {}; up[base + '/sec/' + i] = Date.now(); if (!(st.prog[d.id] || {}).startedAt) up[base + '/startedAt'] = Date.now();
    const sec = { ...((st.prog[d.id] || {}).sec || {}), [i]: 1 }, next = parts(m).findIndex((_, k) => !sec[k]); st.open[d.id] = next < 0 ? -1 : next;
    await db.ref(CFG.ROOT).update(up); const el = document.getElementById(next < 0 ? 'view' : 'part' + next); if (el) el.scrollIntoView({ behavior: 'smooth', block: next < 0 ? 'end' : 'start' }); },
  'start-test': d => { const m = mod(d.id); if (!status(m, st.prog[m.id]).ready) return; st.test = buildTest(m); st.result = null; location.hash = '#/m/' + m.id + '/test'; window.scrollTo(0, 0); },
  'pick': d => { const T = st.test; T.qs[T.i].pick = +d.i; render(); },
  'q-go': d => { const T = st.test, i = +d.i; if (i >= 0 && i < T.qs.length) { T.i = i; render(); window.scrollTo(0, 0); } },
  'quit-test': () => { st.test = null; },
  'submit-test': submitTest,
  'mtab': d => { st.mtab = d.k; render(); },
  'lock': () => { st.mgr = false; sessionStorage.removeItem('agtMgr'); render(); },
  'tech': d => techModal(d.uid),
  'add-tech': addTechModal,
  'csv': exportCsv,
  'print': () => window.print(),
  'archive': async d => { await R('users/' + d.uid).update({ archived: true, archivedAt: Date.now(), archivedBy: st.me.name }); closeModals(); toast('Tech archived'); },
  'restore': async d => { await R('users/' + d.uid).update({ archived: false, restoredAt: Date.now() }); closeModals(); toast('Tech restored'); },
  'set-div': async d => { await R('users/' + d.uid + '/division').set($('#tmDiv').value); toast('Division saved'); closeModals(); },
  'set-pw': async d => { const p = $('#tmPw').value; if (p.length < 4) return toast('Password must be at least 4 characters'); await R('users/' + d.uid + '/pw').set(await pwHash(st.users[d.uid].username, p)); $('#tmPw').value = ''; toast('Password reset'); },
  'reset-mod': async (d, el) => { if (el.dataset.sure !== '1') { el.dataset.sure = '1'; el.textContent = 'Sure?'; return; } await R('progress/' + d.uid + '/' + d.id).remove(); closeModals(); toast('Module reset'); techModal(d.uid); },
  'save-pass': async () => { const v = Math.max(50, Math.min(100, Math.round(+$('#setPass').value || CFG.PASS_PCT))); await R('config/passPct').set(v); toast('Pass mark set to ' + v + '%'); },
  'toggle-signup': async () => { await R('config/signup').set(st.cfg.signup === false); },
  'pic': d => uploadPic(d.id),
  'pic-reset': d => R('config/pics/' + d.id).remove()
};
function closeModals() { document.querySelectorAll('.modal').forEach(m => m.remove()); }
document.addEventListener('click', e => { const el = e.target.closest('[data-act]'); if (!el || el.disabled) return; const fn = ACT[el.dataset.act]; if (!fn) return; if (el.tagName !== 'A') e.preventDefault(); Promise.resolve(fn(el.dataset, el)).catch(x => { console.error(x); toast('Could not save. Check your connection.'); }); });
window.addEventListener('hashchange', render);

/* ── boot ── */
if (localStorage.getItem('agtTheme') === 'light') document.documentElement.classList.add('light');
const s0 = getSession(); if (s0) startSession(s0.uid).catch(() => renderLogin('Could not connect. Check your connection.')); else renderLogin();
window.AGT = { jsSha256, sha, st };
})();
