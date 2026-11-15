// Module commun aux pages de la séance (brise-glace, atelier, quiz, ressources, formateur).
// Base partagée : projet Firebase « maison-vivat », zone murs/{salle}/ (règles : écriture bornée, lecture publique).
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';
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
