// Module commun aux pages de la séance (brise-glace, atelier, quiz, ressources, formateur).
// Base partagée : projet Firebase « maison-vivat », zone murs/{salle}/ (règles : écriture bornée, lecture publique).
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js';
import { getFirestore, doc, setDoc, onSnapshot, serverTimestamp } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';
import { getFunctions, httpsCallable } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-functions.js';

export const app = initializeApp({ apiKey: 'AIzaSyB2xVG8r9ViMPLbs_tgZMK9A98Na6zVPCk', authDomain: 'maison-vivat.firebaseapp.com', projectId: 'maison-vivat' });
export const db = getFirestore(app);
export const assistant = httpsCallable(getFunctions(app, 'europe-west9'), 'assistantSeance', { timeout: 70000 });

const q = new URLSearchParams(location.search);
export const SALLE = (q.get('salle') || 'belle-alliance').replace(/[^a-z0-9-]/gi, '').slice(0, 40) || 'belle-alliance';
export const suffixe = SALLE !== 'belle-alliance' ? '?salle=' + SALLE : '';

export const $ = s => document.getElementById(s);
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
export const slug = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 18);
export const prenomPropre = s => s.trim().replace(/\s+/g, ' ').slice(0, 40).replace(/^./, c => c.toUpperCase());

export function memo(cle, valeur) {
  try {
    if (valeur === undefined) return JSON.parse(localStorage.getItem(cle + '-' + SALLE) || 'null');
    localStorage.setItem(cle + '-' + SALLE, JSON.stringify(valeur));
  } catch { return null; }
}

// Petit message en bas de l'écran (« Copié », « Envoyé »…)
export function toast(texte) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.append(t); }
  t.textContent = texte; t.classList.add('vu');
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('vu'), 2600);
}

export async function copier(texte) {
  try { await navigator.clipboard.writeText(texte); }
  catch {
    const z = document.createElement('textarea'); z.value = texte; document.body.append(z); z.select();
    try { document.execCommand('copy'); } catch {} z.remove();
  }
}

// Données personnelles repérées dans un message avant de l'envoyer à l'IA (règle d'or n° 1).
const MOTIFS = [
  ['un RIB (IBAN)', /\bFR\s?\d{2}(?:\s?[0-9A-Z]{2,4}){4,}/i],
  ['le nom du client', /\bdurand\b/i],
  ['une adresse', /\b\d{1,4}\s*(?:bis|ter)?,?\s*(?:rue|avenue|av\.|boulevard|bd|chemin|allée|place|impasse)\b/i],
  ['un code postal', /\b95\d{3}\b|\b\d{5}\s+[A-ZÉ][a-zéèêë-]+/],
  ['un numéro client', /\bC-\d{3,}\b/i],
  ['une adresse e-mail', /[\w.+-]+@[\w-]+\.[\w.]+/],
  ['un numéro de téléphone', /\b0[1-9](?:[\s.-]?\d{2}){4}\b/],
  ['un numéro de sécurité sociale', /\b[12]\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{3}\s?\d{3}(?:\s?\d{2})?\b/],
];
export function donneesPerso(texte) {
  return MOTIFS.filter(([, m]) => m.test(texte)).map(([nom]) => nom);
}

// ✋ Lever la main : le stagiaire signale qu'il a une question ; le formateur la voit en haut de sa vue et la baisse quand c'est fait.
// murs/{salle}/mains/{prénom} : { prenom, page, active, le }
export function boutonMain(prenomDe, page) {
  if (document.getElementById('main-levee')) return;
  const st = document.createElement('style');
  st.textContent = `#main-levee{position:fixed;right:18px;bottom:18px;z-index:60;display:flex;flex-direction:column;align-items:flex-end;gap:8px;font-family:inherit}
#main-levee button.main{font:inherit;font-size:20px;font-weight:700;border:0;border-radius:999px;padding:14px 22px;background:#18355D;color:#fff;cursor:pointer;box-shadow:0 10px 24px -8px rgba(0,0,0,.45);display:flex;gap:10px;align-items:center}
#main-levee button.main span{font-size:30px;line-height:1}
#main-levee.levee button.main{background:#E8692C;animation:main 1.2s ease-in-out infinite alternate}
@keyframes main{to{transform:translateY(-4px)}}
#main-levee .demande{background:#fff;color:#1b1f2e;border-radius:14px;padding:12px 14px;box-shadow:0 10px 24px -8px rgba(0,0,0,.35);display:grid;gap:8px;font-size:17px;max-width:280px}
#main-levee .demande input{font:inherit;padding:8px 10px;border:2px solid #ccd;border-radius:8px}
#main-levee .demande button{font:inherit;font-weight:700;border:0;border-radius:8px;padding:8px 12px;background:#18355D;color:#fff;cursor:pointer}
#main-levee .baisser{font:inherit;font-size:15px;border:0;background:#fff;color:#18355D;border-radius:999px;padding:6px 12px;cursor:pointer;box-shadow:0 4px 12px -6px rgba(0,0,0,.4)}
@media print{#main-levee{display:none}}`;
  document.head.append(st);
  const z = document.createElement('div'); z.id = 'main-levee'; document.body.append(z);
  if (page === 'atelier') z.style.cssText = 'right:auto;left:18px;align-items:flex-start';   // à droite : la zone de saisie de l'assistant
  let qui = '', arret = null, levee = false;
  const dessiner = (demande = false) => {
    z.classList.toggle('levee', levee);
    z.innerHTML = (demande ? `<div class="demande"><label>Votre prénom<input id="main-prenom" maxlength="40"></label><button type="button" id="main-ok">Lever la main</button></div>` : '')
      + (levee ? '<button type="button" class="baisser" id="main-baisser">Baisser la main</button>' : '')
      + `<button type="button" class="main" id="main-btn" aria-pressed="${levee}"><span aria-hidden="true">✋</span>${levee ? 'Main levée : le formateur arrive' : "J'ai une question"}</button>`;
    z.querySelector('#main-btn').onclick = () => levee ? null : (prenomPropre(prenomDe() || '') ? lever(prenomPropre(prenomDe())) : dessiner(true));
    z.querySelector('#main-ok')?.addEventListener('click', () => { const p = prenomPropre(z.querySelector('#main-prenom').value); if (p) { memo('prenom', p); lever(p); } });
    z.querySelector('#main-prenom')?.focus();
    z.querySelector('#main-baisser')?.addEventListener('click', () => qui && setDoc(doc(db, 'murs', SALLE, 'mains', slug(qui)), { prenom: qui, page, active: false, le: serverTimestamp() }));
  };
  async function lever(p) {
    qui = p; levee = true; dessiner();
    try { await setDoc(doc(db, 'murs', SALLE, 'mains', slug(p)), { prenom: p, page, active: true, le: serverTimestamp() }); }
    catch (e) { console.error(e); levee = false; dessiner(); toast("La main n'a pas pu être levée : levez-la pour de vrai !"); return; }
    arret?.(); arret = onSnapshot(doc(db, 'murs', SALLE, 'mains', slug(p)), s => { const v = s.data()?.active === true; if (v !== levee) { levee = v; dessiner(); } });
  }
  dessiner();
  // page rechargée alors que la main est levée : on la retrouve
  const p0 = prenomPropre(prenomDe() || '');
  if (p0) { qui = p0; arret = onSnapshot(doc(db, 'murs', SALLE, 'mains', slug(p0)), s => { const v = s.data()?.active === true; if (v !== levee) { levee = v; dessiner(); } }); }
}
