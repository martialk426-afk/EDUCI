import { useState, useRef, useEffect } from "react";

// ─── RÉPONSES KWAME ───────────────────────────────────────────────────────────
function getReponse(question, matiere, niveau, prenom) {
  const q = question.toLowerCase();
  const nom = prenom || "toi";

  if (q.includes("dérivée") || q.includes("derivee") || q.includes("f'(x)"))
    return `📐 **Les dérivées — ${niveau}**\n\nRègles essentielles :\n• (xⁿ)' = n·xⁿ⁻¹\n• (ax)' = a\n• (constante)' = 0\n\n**Exemple :** f(x) = 3x² + 2x − 1\n→ f'(x) = 6x + 2\n\nTu veux un exercice ${nom} ? 💪`;
  if (q.includes("probabilité") || q.includes("probabilite"))
    return `🎲 **Probabilités**\n\nP(A) = cas favorables ÷ cas possibles\n\n**Exemple :** 4 rouges, 6 bleues\n→ P(rouge) = 4/10 = **2/5**\n\nOn fait des exercices ${nom} ? 🎯`;
  if (q.includes("dissertation") || q.includes("plan"))
    return `📚 **Dissertation BAC**\n\n1️⃣ Introduction → Accroche + Problématique + Plan\n2️⃣ Développement → Thèse / Antithèse / Synthèse\n3️⃣ Conclusion → Bilan + Ouverture\n\nTu as un sujet ${nom} ? ✍️`;
  if (q.includes("photosynthèse") || q.includes("photosynthese"))
    return `🔬 **Photosynthèse**\n\n6CO₂ + 6H₂O + lumière → C₆H₁₂O₆ + 6O₂\n\nLieu : chloroplastes\n\n2 phases :\n• Phase claire → thylakoïdes\n• Phase sombre → stroma\n\nTu veux des questions BAC ${nom} ? 🎯`;
  if (q.includes("bac") || q.includes("bepc") || q.includes("examen"))
    return `🎯 **Stratégie ${niveau}**\n\n• 2h de révision par jour\n• Fais les annales des 5 dernières années\n• Révise tes points faibles en priorité\n\nCourage ${nom} ! Tu vas réussir ! 💪🇨🇮`;
  if (q.includes("bonjour") || q.includes("salut") || q.includes("bonsoir"))
    return `Bonjour ${nom} ! 😊\n\nOn travaille sur **${matiere}** en **${niveau}** aujourd'hui ?\n\nPose ta première question, je suis prêt ! 🎓`;
  if (q.includes("merci"))
    return `Avec plaisir ${nom} ! 😊 Continue, on est là pour que tu réussisses ! 💪🇨🇮`;

  const rep = {
    "Mathématiques": `📐 Bonne question ${nom} !\n\n1. Identifie les données\n2. Choisis la bonne formule\n3. Calcule étape par étape\n\nMontre-moi l'exercice complet ! 🎯`,
    "Français": `📚 Pour ce type d'exercice ${nom} :\n• Lis bien la consigne\n• Structure ta réponse\n• Cite des exemples\n\nTu veux de l'aide ? ✍️`,
    "SVT": `🔬 En SVT ${nom}, commence par un schéma légendé !\n• Identifie les organes\n• Relie cause → effet\n\nQuel chapitre tu étudies ? 🌿`,
    "Physique": `⚗️ Méthode physique ${nom} :\n1. Identifie les grandeurs + unités\n2. Écris la formule\n3. Calcule et donne l'unité\n\nMontre-moi l'exercice ! ⚡`,
    "Histoire-Géo": `🌍 Pour l'Histoire-Géo ${nom} :\n• Situe dans le temps\n• Situe dans l'espace\n• Cause → événement → conséquence\n\nQuelle période tu étudies ? 🗺️`,
    "Anglais": `🗣️ For English ${nom}:\n• Read aloud first\n• Check the tense\n• Use linking words\n\nWhat topic are you studying? 📖`,
    "Philosophie": `🧠 Pour la philo ${nom} :\n1. Définis les concepts\n2. Problématise\n3. Argumente (thèse/antithèse/synthèse)\n\nQuel est ton sujet ? 💭`
  };
  return rep[matiere] || `Je suis là pour t'aider ${nom} ! 😊 Pose ta question sur ${matiere} ! 💪🇨🇮`;
}

const QUIZ_DATA = [
  { matiere:"Maths — Dérivées", q:"Si f(x) = 3x² + 2x, quelle est f'(x) ?", choix:["6x + 2","3x + 2","6x","6x − 2"], bon:0, explication:"(3x²)' = 6x et (2x)' = 2. Donc f'(x) = 6x + 2." },
  { matiere:"Français — Textes", q:"Quel est le type du texte commençant par 'Il était une fois' ?", choix:["Argumentatif","Narratif","Descriptif","Injonctif"], bon:1, explication:"'Il était une fois' est la formule du texte narratif." },
  { matiere:"Maths — Probabilités", q:"Sac avec 4 rouges et 6 bleues. P(rouge) = ?", choix:["1/4","2/5","4/6","3/5"], bon:1, explication:"Total = 10. P(rouge) = 4/10 = 2/5." },
  { matiere:"SVT — Génétique", q:"La méiose produit des cellules contenant :", choix:["2n chromosomes","4n chromosomes","n chromosomes","3n chromosomes"], bon:2, explication:"La méiose produit 4 cellules haploïdes à n chromosomes." },
  { matiere:"Histoire — CI", q:"Quand la Côte d'Ivoire a-t-elle obtenu son indépendance ?", choix:["7 août 1958","7 août 1960","4 décembre 1960","7 août 1962"], bon:1, explication:"La CI a obtenu son indépendance le 7 août 1960. 🇨🇮" },
];

const MATIERES = ["Mathématiques","Français","SVT","Physique","Histoire-Géo","Anglais","Philosophie"];
const NIVEAUX  = ["CP","CE1","CE2","CM1","CM2","6ème","5ème","4ème","3ème","2nde","1ère A","1ère D","Terminale A","Terminale D","Licence 1","Licence 2","Master 1"];
const COULEURS = { Mathématiques:"#6C63FF", Français:"#E8445A", SVT:"#00C48C", Physique:"#FF6B35", "Histoire-Géo":"#F7B731", Anglais:"#4FC3F7", Philosophie:"#AB47BC" };
const ICONS    = { Mathématiques:"📐", Français:"📚", SVT:"🔬", Physique:"⚗️", "Histoire-Géo":"🌍", Anglais:"🗣️", Philosophie:"🧠" };

// ─── COMPOSANT INSCRIPTION ────────────────────────────────────────────────────
function PageInscription({ onInscrire, onConnexion }) {
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [niveau, setNiveau] = useState("Terminale D");
  const [erreur, setErreur] = useState("");

  const handleInscription = () => {
    if (!prenom || !telephone || !motdepasse) {
      setErreur("Remplis tous les champs !");
      return;
    }
    if (telephone.length < 8) {
      setErreur("Numéro de téléphone invalide !");
      return;
    }
    if (motdepasse.length < 4) {
      setErreur("Mot de passe trop court (minimum 4 chiffres) !");
      return;
    }
    // Sauvegarder dans localStorage
    const utilisateur = { prenom, telephone, motdepasse, niveau };
    localStorage.setItem("educi_user", JSON.stringify(utilisateur));
    onInscrire(utilisateur);
  };

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#6C63FF,#9B59B6)", display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ background:"white", borderRadius:24, padding:28, width:"100%", maxWidth:380, boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ fontSize:40, marginBottom:8 }}>✦</div>
          <div style={{ fontSize:24, fontWeight:800, color:"#6C63FF" }}>EduCI</div>
          <div style={{ fontSize:13, color:"#888", marginTop:4 }}>Crée ton compte gratuit 🇨🇮</div>
        </div>

        {erreur && (
          <div style={{ background:"#FFF0F0", color:"#CC2936", padding:"10px 14px", borderRadius:10, fontSize:13, marginBottom:14, textAlign:"center" }}>
            ⚠️ {erreur}
          </div>
        )}

        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:12, fontWeight:700, color:"#444", marginBottom:6 }}>Prénom</div>
          <input value={prenom} onChange={e => setPrenom(e.target.value)}
            placeholder="Ex: Kofi, Aya, Martial..."
            style={{ width:"100%", border:"1.5px solid #E8E8E8", borderRadius:12, padding:"11px 14px", fontSize:14, outline:"none", boxSizing:"border-box" }} />
        </div>

        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:12, fontWeight:700, color:"#444", marginBottom:6 }}>Numéro de téléphone</div>
          <input value={telephone} onChange={e => setTelephone(e.target.value)}
            placeholder="Ex: 0708123456"
            type="tel"
            style={{ width:"100%", border:"1.5px solid #E8E8E8", borderRadius:12, padding:"11px 14px", fontSize:14, outline:"none", boxSizing:"border-box" }} />
        </div>

        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:12, fontWeight:700, color:"#444", marginBottom:6 }}>Mot de passe</div>
          <input value={motdepasse} onChange={e => setMotdepasse(e.target.value)}
            placeholder="Minimum 4 caractères"
            type="password"
            style={{ width:"100%", border:"1.5px solid #E8E8E8", borderRadius:12, padding:"11px 14px", fontSize:14, outline:"none", boxSizing:"border-box" }} />
        </div>

        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:12, fontWeight:700, color:"#444", marginBottom:6 }}>Niveau scolaire</div>
          <select value={niveau} onChange={e => setNiveau(e.target.value)}
            style={{ width:"100%", border:"1.5px solid #E8E8E8", borderRadius:12, padding:"11px 14px", fontSize:14, outline:"none", background:"white", boxSizing:"border-box" }}>
            {NIVEAUX.map(n => <option key={n}>{n}</option>)}
          </select>
        </div>

        <button onClick={handleInscription}
          style={{ width:"100%", padding:"13px", background:"linear-gradient(135deg,#6C63FF,#9B59B6)", color:"white", border:"none", borderRadius:12, fontSize:15, fontWeight:700, cursor:"pointer", marginBottom:14 }}>
          Créer mon compte gratuit →
        </button>

        <div style={{ textAlign:"center", fontSize:13, color:"#888" }}>
          Déjà un compte ?{" "}
          <span onClick={onConnexion} style={{ color:"#6C63FF", fontWeight:700, cursor:"pointer" }}>Se connecter</span>
        </div>
      </div>
    </div>
  );
}

// ─── COMPOSANT CONNEXION ──────────────────────────────────────────────────────
function PageConnexion({ onConnexion, onInscription }) {
  const [telephone, setTelephone] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [erreur, setErreur] = useState("");

  const handleConnexion = () => {
    if (!telephone || !motdepasse) {
      setErreur("Remplis tous les champs !");
      return;
    }
    const userData = localStorage.getItem("educi_user");
    if (!userData) {
      setErreur("Aucun compte trouvé. Inscris-toi d'abord !");
      return;
    }
    const user = JSON.parse(userData);
    if (user.telephone !== telephone || user.motdepasse !== motdepasse) {
      setErreur("Téléphone ou mot de passe incorrect !");
      return;
    }
    onConnexion(user);
  };

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#6C63FF,#9B59B6)", display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ background:"white", borderRadius:24, padding:28, width:"100%", maxWidth:380, boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ fontSize:40, marginBottom:8 }}>✦</div>
          <div style={{ fontSize:24, fontWeight:800, color:"#6C63FF" }}>EduCI</div>
          <div style={{ fontSize:13, color:"#888", marginTop:4 }}>Content de te revoir ! 👋</div>
        </div>

        {erreur && (
          <div style={{ background:"#FFF0F0", color:"#CC2936", padding:"10px 14px", borderRadius:10, fontSize:13, marginBottom:14, textAlign:"center" }}>
            ⚠️ {erreur}
          </div>
        )}

        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:12, fontWeight:700, color:"#444", marginBottom:6 }}>Numéro de téléphone</div>
          <input value={telephone} onChange={e => setTelephone(e.target.value)}
            placeholder="Ex: 0708123456"
            type="tel"
            style={{ width:"100%", border:"1.5px solid #E8E8E8", borderRadius:12, padding:"11px 14px", fontSize:14, outline:"none", boxSizing:"border-box" }} />
        </div>

        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:12, fontWeight:700, color:"#444", marginBottom:6 }}>Mot de passe</div>
          <input value={motdepasse} onChange={e => setMotdepasse(e.target.value)}
            placeholder="Ton mot de passe"
            type="password"
            onKeyDown={e => e.key === "Enter" && handleConnexion()}
            style={{ width:"100%", border:"1.5px solid #E8E8E8", borderRadius:12, padding:"11px 14px", fontSize:14, outline:"none", boxSizing:"border-box" }} />
        </div>

        <button onClick={handleConnexion}
          style={{ width:"100%", padding:"13px", background:"linear-gradient(135deg,#6C63FF,#9B59B6)", color:"white", border:"none", borderRadius:12, fontSize:15, fontWeight:700, cursor:"pointer", marginBottom:14 }}>
          Se connecter →
        </button>

        <div style={{ textAlign:"center", fontSize:13, color:"#888" }}>
          Pas encore de compte ?{" "}
          <span onClick={onInscription} style={{ color:"#6C63FF", fontWeight:700, cursor:"pointer" }}>S'inscrire gratuitement</span>
        </div>
      </div>
    </div>
  );
}

// ─── APP PRINCIPALE ───────────────────────────────────────────────────────────
export default function App() {
  const [authPage,  setAuthPage]  = useState("connexion");
  const [user,      setUser]      = useState(null);
  const [page,      setPage]      = useState("accueil");
  const [matiere,   setMatiere]   = useState("Mathématiques");
  const [messages,  setMessages]  = useState([]);
  const [input,     setInput]     = useState("");
  const [loading,   setLoading]   = useState(false);
  const [qIdx,      setQIdx]      = useState(0);
  const [quizRep,   setQuizRep]   = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Vérifier si déjà connecté
    const userData = localStorage.getItem("educi_user");
    if (userData) {
      const u = JSON.parse(userData);
      setUser(u);
      initChat(u);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [messages, loading]);

  const initChat = (u) => {
    setMessages([{
      role:"ai",
      text:`Bonjour ${u.prenom} ! 👋 Je suis Kwame, ton tuteur EduCI 🇨🇮\n\nJe suis là pour t'aider avec tout le programme ivoirien.\n\nTu es en **${u.niveau}** — qu'est-ce qu'on révise aujourd'hui ? 🎓`
    }]);
  };

  const handleInscrire = (u) => {
    setUser(u);
    initChat(u);
  };

  const handleConnexion = (u) => {
    setUser(u);
    initChat(u);
  };

  const handleDeconnexion = () => {
    localStorage.removeItem("educi_user");
    setUser(null);
    setMessages([]);
    setPage("accueil");
    setAuthPage("connexion");
  };

  const sendMessage = async (texte) => {
    const text = (texte || input).trim();
    if (!text || loading) return;
    setInput("");
    setMessages(p => [...p, { role:"user", text }]);
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setMessages(p => [...p, { role:"ai", text: getReponse(text, matiere, user?.niveau || "Terminale D", user?.prenom) }]);
    setLoading(false);
  };

  const scores = { Mathématiques:78, Français:62, SVT:45, "Histoire-Géo":55, Anglais:38, Philosophie:70 };

  // ── AFFICHER AUTH SI PAS CONNECTÉ ──
  if (!user) {
    if (authPage === "inscription") {
      return <PageInscription onInscrire={handleInscrire} onConnexion={() => setAuthPage("connexion")} />;
    }
    return <PageConnexion onConnexion={handleConnexion} onInscription={() => setAuthPage("inscription")} />;
  }

  // ── APP PRINCIPALE ──
  return (
    <div style={{ fontFamily:"'Segoe UI',Arial,sans-serif", minHeight:"100vh", background:"#F0EEF8" }}>

      {/* HEADER */}
      <div style={{ background:"linear-gradient(135deg,#6C63FF,#9B59B6)", padding:"12px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", boxShadow:"0 2px 16px rgba(108,99,255,0.35)" }}>
        <div>
          <div style={{ color:"white", fontSize:22, fontWeight:800 }}>✦ EduCI</div>
          <div style={{ color:"rgba(255,255,255,0.75)", fontSize:11 }}>Bonjour {user.prenom} 👋 🇨🇮</div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ background:"rgba(255,255,255,0.2)", color:"white", padding:"5px 12px", borderRadius:20, fontSize:12, fontWeight:700 }}>
            {user.niveau}
          </div>
          <button onClick={handleDeconnexion}
            style={{ background:"rgba(255,255,255,0.15)", color:"white", border:"1px solid rgba(255,255,255,0.3)", borderRadius:20, padding:"5px 12px", fontSize:11, cursor:"pointer" }}>
            Déconnexion
          </button>
        </div>
      </div>

      {/* NAV */}
      <div style={{ background:"white", display:"flex", borderBottom:"2px solid #F0F0F0", overflowX:"auto" }}>
        {[["accueil","🏠 Accueil"],["tuteur","🤖 Tuteur IA"],["exercices","✏️ Exercices"],["progression","📈 Progression"]].map(([id,label]) => (
          <div key={id} onClick={() => setPage(id)}
            style={{ padding:"13px 20px", fontSize:13, fontWeight:page===id?700:500, color:page===id?"#6C63FF":"#888", borderBottom:page===id?"3px solid #6C63FF":"3px solid transparent", cursor:"pointer", whiteSpace:"nowrap" }}>
            {label}
          </div>
        ))}
      </div>

      <div style={{ maxWidth:700, margin:"0 auto", padding:16 }}>

        {/* ACCUEIL */}
        {page === "accueil" && (
          <div>
            <div style={{ background:"linear-gradient(135deg,#6C63FF,#9B59B6)", borderRadius:20, padding:"24px 20px", color:"white", marginBottom:16, textAlign:"center" }}>
              <div style={{ fontSize:26, fontWeight:800, marginBottom:8 }}>Bienvenue {user.prenom} ! 🎓</div>
              <div style={{ fontSize:13, opacity:0.9, marginBottom:20, lineHeight:1.7 }}>
                La première application IA éducative de Côte d'Ivoire.<br/>
                Du CP au Master — BEPC et BAC inclus !
              </div>
              <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
                <button onClick={() => setPage("tuteur")} style={{ background:"white", color:"#6C63FF", border:"none", borderRadius:12, padding:"10px 22px", fontSize:13, fontWeight:700, cursor:"pointer" }}>🤖 Parler à Kwame</button>
                <button onClick={() => setPage("exercices")} style={{ background:"rgba(255,255,255,0.2)", color:"white", border:"1px solid rgba(255,255,255,0.4)", borderRadius:12, padding:"10px 22px", fontSize:13, fontWeight:700, cursor:"pointer" }}>✏️ Faire des exercices</button>
              </div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:16 }}>
              {[["🔥","12","Jours streak"],["⭐","87%","Score moyen"],["📝","48","Exercices"]].map(([icon,val,label]) => (
                <div key={label} style={{ background:"white", borderRadius:14, padding:14, textAlign:"center", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
                  <div style={{ fontSize:24 }}>{icon}</div>
                  <div style={{ fontSize:22, fontWeight:800, color:"#6C63FF" }}>{val}</div>
                  <div style={{ fontSize:11, color:"#888" }}>{label}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize:14, fontWeight:700, color:"#444", marginBottom:10 }}>Choisir une matière</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10, marginBottom:16 }}>
              {MATIERES.map(m => (
                <div key={m} onClick={() => { setMatiere(m); setPage("tuteur"); }}
                  style={{ background:matiere===m?COULEURS[m]:"white", color:matiere===m?"white":"#333", borderRadius:14, padding:"16px 14px", cursor:"pointer", border:`2px solid ${matiere===m?COULEURS[m]:"#EEE"}`, fontWeight:600, fontSize:13, boxShadow:"0 2px 8px rgba(0,0,0,0.05)", display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:22 }}>{ICONS[m]}</span>{m}
                </div>
              ))}
            </div>

            <div style={{ background:"white", borderRadius:16, padding:16, boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
              <div style={{ fontWeight:700, fontSize:14, marginBottom:10 }}>🎯 Préparer les examens</div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {["BEPC","BAC Série A","BAC Série D"].map(ex => (
                  <button key={ex} onClick={() => { setInput(`Prépare-moi pour le ${ex} en ${matiere}`); setPage("tuteur"); }}
                    style={{ background:"#F4F3FF", color:"#6C63FF", border:"1px solid #6C63FF", borderRadius:20, padding:"7px 16px", fontSize:12, fontWeight:700, cursor:"pointer" }}>
                    📝 {ex}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TUTEUR IA */}
        {page === "tuteur" && (
          <div style={{ background:"white", borderRadius:20, overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,0.08)", height:"78vh", display:"flex", flexDirection:"column" }}>
            <div style={{ padding:"12px 16px", borderBottom:"1px solid #F0F0F0", background:"#FAFAFA", display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:42, height:42, borderRadius:21, background:"linear-gradient(135deg,#6C63FF,#9B59B6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>🤖</div>
              <div>
                <div style={{ fontWeight:700, fontSize:14, color:"#222" }}>Kwame — Tuteur EduCI</div>
                <div style={{ fontSize:11, color:"#00C48C", fontWeight:600 }}>● En ligne · {matiere} · {user.niveau}</div>
              </div>
              <select value={matiere} onChange={e => setMatiere(e.target.value)}
                style={{ marginLeft:"auto", border:"1px solid #EEE", borderRadius:8, padding:"5px 8px", fontSize:12 }}>
                {MATIERES.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>

            <div style={{ flex:1, overflowY:"auto", padding:16, display:"flex", flexDirection:"column", gap:12 }}>
              {messages.map((msg,i) => (
                <div key={i} style={{ alignSelf:msg.role==="user"?"flex-end":"flex-start", maxWidth:"82%" }}>
                  <div style={{ padding:"11px 14px", borderRadius:msg.role==="ai"?"16px 16px 16px 4px":"16px 16px 4px 16px", background:msg.role==="ai"?"#F4F3FF":"#6C63FF", color:msg.role==="ai"?"#333":"white", fontSize:13, lineHeight:1.7, whiteSpace:"pre-wrap" }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ alignSelf:"flex-start", background:"#F4F3FF", padding:"12px 16px", borderRadius:"16px 16px 16px 4px", fontSize:13, color:"#888" }}>
                  Kwame réfléchit... ⏳
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div style={{ display:"flex", flexWrap:"wrap", gap:6, padding:"8px 12px", borderTop:"1px solid #F5F5F5" }}>
              {["Explique-moi le cours","Exercice type BAC","Comment réviser ?","Aide pour mon devoir"].map(q => (
                <button key={q} onClick={() => sendMessage(q)}
                  style={{ background:"#F4F3FF", color:"#6C63FF", border:"none", borderRadius:20, padding:"5px 12px", fontSize:11, fontWeight:600, cursor:"pointer" }}>
                  {q}
                </button>
              ))}
            </div>

            <div style={{ display:"flex", gap:8, padding:"10px 12px", borderTop:"1px solid #F0F0F0" }}>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==="Enter" && sendMessage()}
                placeholder={`Ta question sur ${matiere}...`}
                style={{ flex:1, border:"1.5px solid #E8E8E8", borderRadius:24, padding:"10px 16px", fontSize:13, outline:"none" }} />
              <button onClick={() => sendMessage()} disabled={loading}
                style={{ width:44, height:44, borderRadius:22, background:loading?"#CCC":"#6C63FF", border:"none", color:"white", fontSize:20, cursor:loading?"default":"pointer" }}>
                ➤
              </button>
            </div>
          </div>
        )}

        {/* EXERCICES */}
        {page === "exercices" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
              <div style={{ fontWeight:800, fontSize:16, color:"#222" }}>✏️ Exercices du jour</div>
              <div style={{ background:"#E8FFF5", color:"#00875A", padding:"4px 12px", borderRadius:20, fontSize:12, fontWeight:700 }}>{qIdx+1}/{QUIZ_DATA.length}</div>
            </div>

            <div style={{ background:"white", borderRadius:16, padding:20, boxShadow:"0 2px 8px rgba(0,0,0,0.06)", marginBottom:12 }}>
              <div style={{ background:"#6C63FF20", color:"#6C63FF", fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20, display:"inline-block", marginBottom:10 }}>{QUIZ_DATA[qIdx].matiere}</div>
              <div style={{ fontWeight:700, fontSize:14, color:"#222", marginBottom:16, lineHeight:1.5 }}>{QUIZ_DATA[qIdx].q}</div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {QUIZ_DATA[qIdx].choix.map((c,i) => {
                  const estBon = i===QUIZ_DATA[qIdx].bon;
                  const estChoix = i===quizRep;
                  return (
                    <button key={i} onClick={() => quizRep===null && setQuizRep(i)} disabled={quizRep!==null}
                      style={{ padding:"11px 14px", borderRadius:10, textAlign:"left", fontSize:13, fontWeight:500, cursor:quizRep!==null?"default":"pointer",
                        border:`1.5px solid ${quizRep===null?"#EEE":estBon?"#00C48C":estChoix?"#E8445A":"#EEE"}`,
                        background:quizRep===null?"#FAFAFA":estBon?"#E8FFF5":estChoix?"#FFF0F0":"#FAFAFA",
                        color:quizRep===null?"#444":estBon?"#00875A":estChoix?"#CC2936":"#444" }}>
                      {["A","B","C","D"][i]}. {c} {quizRep!==null&&estBon?" ✓":quizRep===i&&!estBon?" ✗":""}
                    </button>
                  );
                })}
              </div>
              {quizRep!==null && (
                <>
                  <div style={{ marginTop:12, padding:"12px 14px", background:"#F4F3FF", borderRadius:10, fontSize:12, color:"#444", lineHeight:1.7 }}>
                    💡 <strong>Explication :</strong> {QUIZ_DATA[qIdx].explication}
                  </div>
                  <button onClick={() => { setQIdx((qIdx+1)%QUIZ_DATA.length); setQuizRep(null); }}
                    style={{ marginTop:12, width:"100%", padding:"11px", background:"#6C63FF", color:"white", border:"none", borderRadius:10, fontSize:13, fontWeight:700, cursor:"pointer" }}>
                    Question suivante →
                  </button>
                </>
              )}
            </div>
            <button onClick={() => { setInput(`Génère 3 exercices de ${matiere} niveau ${user.niveau}`); setPage("tuteur"); }}
              style={{ width:"100%", padding:14, background:"#F4F3FF", color:"#6C63FF", border:"2px dashed #6C63FF", borderRadius:14, fontSize:13, fontWeight:700, cursor:"pointer" }}>
              ✨ Demander plus d'exercices à Kwame →
            </button>
          </div>
        )}

        {/* PROGRESSION */}
        {page === "progression" && (
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:16 }}>
              {[["🔥","12","Jours streak"],["⭐","87%","Score moyen"],["📝","48","Exercices"]].map(([icon,val,label]) => (
                <div key={label} style={{ background:"white", borderRadius:14, padding:14, textAlign:"center", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
                  <div style={{ fontSize:22 }}>{icon}</div>
                  <div style={{ fontSize:22, fontWeight:800, color:"#6C63FF" }}>{val}</div>
                  <div style={{ fontSize:11, color:"#888" }}>{label}</div>
                </div>
              ))}
            </div>
            <div style={{ background:"white", borderRadius:16, padding:20, boxShadow:"0 2px 8px rgba(0,0,0,0.06)", marginBottom:12 }}>
              <div style={{ fontWeight:800, fontSize:15, marginBottom:16 }}>📊 Progression par matière</div>
              {Object.entries(scores).map(([m,pct]) => (
                <div key={m} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                  <div style={{ width:30, fontSize:18, textAlign:"center" }}>{ICONS[m]}</div>
                  <div style={{ width:100, fontSize:12, fontWeight:600, color:"#444" }}>{m}</div>
                  <div style={{ flex:1, height:8, background:"#F0F0F0", borderRadius:4, overflow:"hidden" }}>
                    <div style={{ width:`${pct}%`, height:"100%", background:COULEURS[m], borderRadius:4 }} />
                  </div>
                  <div style={{ width:36, fontSize:13, fontWeight:800, color:COULEURS[m], textAlign:"right" }}>{pct}%</div>
                </div>
              ))}
            </div>
            <div style={{ background:"linear-gradient(135deg,#F7B731,#F0A500)", borderRadius:16, padding:16, textAlign:"center", color:"white" }}>
              <div style={{ fontSize:32, marginBottom:6 }}>🏆</div>
              <div style={{ fontWeight:800, fontSize:15, marginBottom:4 }}>Continue comme ça {user.prenom} !</div>
              <div style={{ fontSize:12, opacity:0.9 }}>Tu es dans le top 20% des élèves EduCI en {user.niveau} 💪</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
