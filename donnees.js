// Le dossier Batifer (entreprise inventée), repris des supports imprimés (seance-ia/_source/generer.py).

export const COURRIEL_DURAND = `Bonjour,

Je viens de recevoir une deuxième fois votre facture n° F-2026-0418 du 3 octobre, 2 460,00 € TTC, pour la réfection de ma salle de bains. Je l'ai pourtant déjà payée le 15 octobre par virement. Je ne compte pas payer deux fois !

Pour rappel mes coordonnées : Michel Durand, 14 rue des Tilleuls, 95410 Groslay, client n° C-0871. Mon RIB, si vous devez me rembourser quoi que ce soit : FR76 3000 4000 1500 0012 3456 789.

J'attends une réponse rapide.

M. Durand`;

export const RELANCE = `Objet : Relance pour la facture n° F-2026-0392

Madame, Monsieur,

Sauf erreur de notre part, nous n'avons pas encore reçu le règlement de notre facture n° F-2026-0392 du 2 septembre 2026, d'un montant de 3 480,00 € TTC, relative à la réparation de la toiture de la résidence Les Acacias.

Nous vous rappelons que cette facture arrivera à échéance le 2 octobre prochain.

À défaut de paiement sous 48 heures, nous engagerons immédiatement des poursuites judiciaires et ferons saisir vos biens.

Nous vous prions d'agréer, Madame, Monsieur, l'expression de nos salutations distinguées.

Le service administratif, Batifer`;

export const NOTES = `Réunion lundi 16/11, 9 h, bureau. Présents : S. Leroy, K. Benali (chef de chantier), A. Petit (compta)

- planning chantier Acacias : retard 1 semaine à cause de la pluie
- Karim voit avec le couvreur pour une nouvelle date
- commande tuiles à refaire, mauvaise réf la 1re fois
- Aurélie : relances impayées, Imméka toujours pas payé
- pot de fin d'année : le 18/12 ? à confirmer
- nouveau logiciel de devis : on en reparle en janvier
- Sandrine prévient les copropriétaires du retard
- camion 2 : contrôle technique à faire
- stagiaire : accueil la semaine prochaine`;

export const FACTURE_HTML = `<div class="facture">
  <div class="f-tete"><div><b class="f-logo">BATIFER</b><small>SARL · 22 avenue de la Gare · 95410 Groslay (inventée)</small></div>
  <div class="f-num"><b>FACTURE n° F-2026-0392</b><br>du 2 septembre 2026</div></div>
  <p><b>Client :</b> Imméka, syndic de copropriété (inventé)<br><b>Objet :</b> Réparation de la toiture, résidence Les Acacias</p>
  <table><tr><th>Désignation</th><th class="d">Montant</th></tr>
  <tr><td>Réparation de la toiture (main-d'œuvre et fournitures)</td><td class="d">3 200,00 €</td></tr>
  <tr><td class="d">Total HT</td><td class="d">3 200,00 €</td></tr>
  <tr><td class="d">TVA 20 %</td><td class="d">640,00 €</td></tr>
  <tr><td class="d"><b>Total TTC</b></td><td class="d"><b>3 840,00 €</b></td></tr></table>
  <p class="f-ech"><b>Échéance de paiement : 2 octobre 2026</b> (30 jours). Paiement par virement. En cas de retard, des pénalités et une indemnité forfaitaire de 40 € pour frais de recouvrement sont dues.</p>
</div>`;
export const FACTURE_TEXTE = `FACTURE n° F-2026-0392 du 2 septembre 2026 — Batifer
Client : Imméka, syndic de copropriété
Objet : Réparation de la toiture, résidence Les Acacias
Réparation de la toiture (main-d'œuvre et fournitures) : 3 200,00 € HT
TVA 20 % : 640,00 €
Total TTC : 3 840,00 €
Échéance de paiement : 2 octobre 2026 (30 jours)`;

// La boîte de réception de l'assistant(e) administratif(ve), mardi 17 novembre, 9 h.
export const COURRIELS = [
  { id: 'leroy', de: 'Sandrine Leroy', adresse: 's.leroy@batifer-exemple.fr', objet: 'Pour ce matin', heure: '8 h 41', taches: [1, 2, 3],
    corps: `Bonjour !

Je suis en rendez-vous chantier toute la matinée. Deux choses à faire en priorité :
1. Répondre à M. Durand (son courriel est arrivé hier). La facture qu'il a reçue en double sera annulée sous 5 jours ouvrés : il n'a rien d'autre à faire.
2. Envoyer la relance à Imméka : Lucas, notre stagiaire, l'a préparée avec l'IA, elle est prête.

Je signe le tout à 11 h : envoyez-moi vos textes depuis cette messagerie.
S'il vous reste du temps : le compte rendu de la réunion de lundi (mes notes sont dans un autre courriel).

Merci !
Sandrine Leroy
Responsable administrative` },
  { id: 'durand', de: 'Michel Durand', adresse: 'm.durand.renov@exemple.fr', objet: 'ENCORE une facture ?!', heure: 'lundi 9 h 12', taches: [1], corps: COURRIEL_DURAND },
  { id: 'lucas', de: 'Lucas (stagiaire)', adresse: 'stagiaire@batifer-exemple.fr', objet: 'Relance Imméka prête (faite avec l\'IA)', heure: 'lundi 17 h 58', taches: [2],
    corps: `Bonjour,

J'ai préparé la relance pour Imméka avec l'IA, elle est prête à partir. Je vous mets la facture et la lettre en pièces jointes.

Lucas`,
    pieces: [{ id: 'facture', nom: 'Facture F-2026-0392.pdf', html: FACTURE_HTML, texte: FACTURE_TEXTE }, { id: 'relance', nom: 'Lettre de relance.docx', texte: RELANCE }] },
  { id: 'notes', de: 'Sandrine Leroy', adresse: 's.leroy@batifer-exemple.fr', objet: 'Mes notes de la réunion de lundi', heure: 'lundi 10 h 05', taches: [3],
    corps: `Voici mes notes en vrac. Si vous avez le temps, un compte rendu propre : les décisions, qui fait quoi, pour quand.

${NOTES}` },
];

export const TACHES = {
  1: { titre: 'Répondre à M. Durand', court: 'M. Durand', courriel: 'durand', obligatoire: true,
       consigne: 'Faites rédiger par l\'IA une réponse à M. Durand, puis relisez-la et envoyez-la à Mme Leroy pour signature.',
       envoi: { a: 'Michel Durand (après signature de Mme Leroy)', objet: 'Re : ENCORE une facture ?!' },
       piege: 'Son courriel contient son adresse, son numéro client et son RIB.' },
  2: { titre: 'Envoyer la relance à Imméka', court: 'Relance Imméka', courriel: 'lucas', obligatoire: true,
       consigne: 'La relance de Lucas est « prête ». Comparez-la à la facture avant de l\'envoyer à Mme Leroy. Corrigez-la, avec ou sans l\'IA.',
       envoi: { a: 'Imméka, service comptabilité (après signature de Mme Leroy)', objet: 'Relance pour la facture n° F-2026-0392' },
       brouillonDepart: RELANCE },
  3: { titre: 'Le compte rendu de la réunion', court: 'Compte rendu', courriel: 'notes', obligatoire: false,
       consigne: 'Bonus si vous avez le temps : faites un compte rendu propre des notes avec l\'IA. Les décisions, qui fait quoi, pour quand.',
       envoi: { a: 'Toute l\'équipe (après relecture de Mme Leroy)', objet: 'Compte rendu de la réunion du 16 novembre' } },
};

// Plan B : si l'assistant ne répond pas, une réponse obtenue plus tôt avec une demande semblable (elle contient des pièges).
export const SECOURS = {
  1: `Objet : Votre facture n° F-2026-0418

Monsieur Durand,

Nous avons bien reçu votre message concernant la facture n° F-2026-0418 de 2 460,00 €, adressée au 14 rue des Tilleuls, 95410 Groslay (client n° C-0871). Nous vous confirmons que votre règlement du 15 octobre a bien été reçu et que le second envoi est une erreur de notre part. Le remboursement sera effectué sur votre compte FR76 3000 4000 1500 0012 3456 789 sous 48 heures.

Avec toutes nos excuses, cordialement.`,
  2: `Objet : Relance pour la facture n° F-2026-0392

Madame, Monsieur,

Sauf erreur de notre part, le règlement de notre facture n° F-2026-0392 du 2 septembre 2026, d'un montant de 3 480,00 € TTC, ne nous est pas encore parvenu. Pour rappel, cette facture arrivera à échéance le 2 octobre prochain.

Nous vous remercions de bien vouloir procéder à son règlement dans les meilleurs délais.

Nous vous prions d'agréer, Madame, Monsieur, l'expression de nos salutations distinguées.`,
  3: `Compte rendu de la réunion du 16 novembre 2026
Présents : S. Leroy, K. Benali, A. Petit

| Sujet | Décision | Responsable | Échéance |
| Chantier Acacias | Retard d'une semaine, nouvelle date avec le couvreur | K. Benali | 20/11 |
| Tuiles | Nouvelle commande avec la bonne référence | K. Benali | 19/11 |
| Impayés | Relance d'Imméka | A. Petit | 18/11 |
| Copropriétaires | Information du retard | S. Leroy | 17/11 |
| Pot de fin d'année | Fixé au 18/12 | S. Leroy | 18/12 |
| Camion 2 | Contrôle technique | A. Petit | 30/11 |`,
};

// La demande en 4 éléments (fiche mémo), pour démarrer sans page blanche.
export const MODELE_DEMANDE = `Tu es … (qui elle est : assistant administratif dans une PME)
Rédige … (ce que je veux)
Situation : … (les faits, sans nom, sans adresse, sans RIB)
Forme : … (ton, vouvoiement, longueur, avec un objet)`;

// Le quiz individuel de fin de séance (quiz.html), lu aussi par la vue formateur.
// type : vf (vrai/faux), un (une seule réponse), plusieurs (toutes les bonnes et aucune mauvaise)
export const QUESTIONS = [
  { id: 'q1', court: "L'IA vérifie toujours", type: 'vf', texte: "L'IA vérifie toujours ses informations.", bon: 'faux',
    pourquoi: "Faux : elle produit une réponse probable, même quand elle cherche sur internet. Elle peut se tromper ou inventer, avec aplomb." },
  { id: 'q2', court: "Nom et adresse du client", type: 'vf', texte: "Je peux donner le nom et l'adresse d'un client pour gagner du temps.", bon: 'faux',
    pourquoi: "Faux : sans autorisation, pas de données personnelles. J'écris « le client » et je remets son nom moi-même au moment d'envoyer." },
  { id: 'q3', court: "Demande précise", type: 'vf', texte: "Une demande précise donne une meilleure réponse.", bon: 'vrai',
    pourquoi: "Vrai : qui elle est, ce que je veux, la situation, la forme. Les 4 éléments de la fiche mémo." },
  { id: 'q4', court: "Envoyer sans relire", type: 'vf', texte: "Un texte de l'IA peut être envoyé sans relecture s'il est bien écrit.", bon: 'faux',
    pourquoi: "Faux : bien écrit ne veut pas dire juste. « Une réponse sûre d'elle n'est pas une réponse juste. »" },
  { id: 'q5', court: "Reformuler un courriel", type: 'vf', texte: "L'IA peut m'aider à reformuler un courriel trop sec.", bon: 'vrai',
    pourquoi: "Vrai : reformuler, résumer, faire un premier brouillon, c'est ce qu'elle fait bien." },
  { id: 'q6', court: "Corriger la réponse Durand", type: 'plusieurs', texte: "Voici la réponse de l'IA pour M. Durand. Avant de la faire signer, que faut-il corriger ou retirer ?",
    sous: 'Cochez tout ce qui ne va pas.', citation: SECOURS[1],
    options: [['adresse', "Son adresse et son numéro client, recopiés dans la réponse", true], ['rib', "Son RIB, recopié dans la réponse", true],
      ['rembourse', "« Le remboursement sous 48 heures » : il n'y a rien à rembourser, la facture en double est seulement annulée", true],
      ['excuses', "Les excuses pour le double envoi", false], ['objet', "La ligne « Objet »", false]],
    pourquoi: "L'IA a recopié les données personnelles qu'on lui avait données, et elle a inventé un remboursement. Les excuses et l'objet sont bienvenus." },
  { id: 'q7', court: "Infos à ne pas donner", type: 'plusieurs', texte: "Quelles informations ne donne-t-on pas à une IA, sans autorisation ?", sous: 'Cochez tout ce qu\'il ne faut pas donner.',
    options: [['nom', "Le nom et l'adresse d'un client", true], ['rib', "Un RIB, des coordonnées bancaires", true], ['secu', "Un numéro de sécurité sociale", true],
      ['sante', "Une information de santé", true], ['mdp', "Un mot de passe", true], ['ton', "Le ton voulu : poli, vouvoiement", false], ['lettre', "« le client » à la place du nom", false]],
    pourquoi: "Nom, adresse, RIB, sécurité sociale, santé, mot de passe, informations internes : jamais sans autorisation. « Ce que vous ne mettriez pas sur une carte postale, vous ne le mettez pas dans l'IA. »" },
  { id: 'q8', court: "La meilleure demande", type: 'un', texte: "Quelle demande donnera la meilleure réponse, sans risque ?",
    options: [['a', "« Écris un mail pour une facture. »", false],
      ['b', "« Tu es assistant administratif. Réponds à M. Michel Durand, 14 rue des Tilleuls, qui a reçu sa facture deux fois. »", false],
      ['c', "« Tu es assistant administratif dans une PME. Rédige une réponse à un client qui a reçu la même facture deux fois ; le doublon sera annulé sous 5 jours ouvrés. Ton courtois, vouvoiement, 8 lignes, avec un objet. »", true]],
    pourquoi: "La C a les 4 éléments et aucune donnée personnelle. La A est trop vague ; la B donne le nom et l'adresse du client." },
  { id: 'q9', court: "L'échéance passée", type: 'un', texte: "Nous sommes le 17 novembre. Une relance écrite par l'IA dit : « cette facture arrivera à échéance le 2 octobre prochain ». Que faites-vous ?",
    options: [['a', "Je l'envoie : l'IA connaît les dates.", false], ['b', "Je corrige : le 2 octobre est passé, la facture est échue depuis le 2 octobre.", true],
      ['c', "Je supprime toute la lettre et je recommence.", false]],
    pourquoi: "Je relis les dates et je les compare à la facture et au calendrier : la facture est échue depuis le 2 octobre 2026." },
];
