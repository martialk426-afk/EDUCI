import { useState, useRef, useEffect } from "react";

// ─── RÉPONSES KWAME ───────────────────────────────────────────────────────────
function getReponse(question, matiere, niveau, prenom) {
  const q = question.toLowerCase();
  const nom = prenom || "toi";
  if (q.includes("dérivée") || q.includes("derivee") || q.includes("f'(x)"))
    return `📐 **Les dérivées — ${niveau}**\n\nRègles :\n• (xⁿ)' = n·xⁿ⁻¹\n• (ax)' = a\n• (constante)' = 0\n\n**Exemple :** f(x) = 3x² + 2x − 1\n→ f'(x) = 6x + 2\n\nTu veux un exercice ${nom} ? 💪`;
  if (q.includes("probabilité") || q.includes("probabilite"))
    return `🎲 **Probabilités**\n\nP(A) = cas favorables ÷ cas possibles\n\n**Exemple :** 4 rouges, 6 bleues → P(rouge) = 4/10 = **2/5**\n\nOn s'entraîne ${nom} ? 🎯`;
  if (q.includes("dissertation") || q.includes("plan"))
    return `📚 **Dissertation BAC**\n\n1️⃣ Introduction → Accroche + Problématique + Plan\n2️⃣ Développement → Thèse / Antithèse / Synthèse\n3️⃣ Conclusion → Bilan + Ouverture\n\nTu as un sujet ${nom} ? ✍️`;
  if (q.includes("photosynthèse") || q.includes("photosynthese"))
    return `🔬 **Photosynthèse**\n\n6CO₂ + 6H₂O + lumière → C₆H₁₂O₆ + 6O₂\n\nLieu : chloroplastes\n2 phases : claire + sombre\n\nTu veux des questions BAC ${nom} ? 🎯`;
  if (q.includes("bac") || q.includes("bepc") || q.includes("examen"))
    return `🎯 **Stratégie ${niveau}**\n\n• 2h de révision par jour\n• Fais les annales des 5 dernières années\n• Révise tes points faibles\n\nCourage ${nom} ! Tu vas réussir ! 💪🇨🇮`;
  if (q.includes("bonjour") || q.includes("salut"))
    return `Bonjour ${nom} ! 😊\n\nOn travaille sur **${matiere}** en **${niveau}** ?\nPose ta question, je suis prêt ! 🎓`;
  if (q.includes("merci"))
    return `Avec plaisir ${nom} ! 😊 Continue, tu vas réussir ! 💪🇨🇮`;
  const rep = {
    "Mathématiques": `📐 Bonne question ${nom} !\n\n1. Identifie les données\n2. Choisis la formule\n3. Calcule étape par étape\n\nMontre-moi l'exercice ! 🎯`,
    "Français": `📚 Pour cet exercice ${nom} :\n• Lis la consigne\n• Structure ta réponse\n• Cite des exemples\n\nTu veux de l'aide ? ✍️`,
    "SVT": `🔬 En SVT ${nom}, commence par un schéma !\n• Identifie les organes\n• Relie cause → effet\n\nQuel chapitre ? 🌿`,
    "Physique": `⚗️ Méthode ${nom} :\n1. Grandeurs + unités\n2. Formule\n3. Calcul + unité\n\nMontre-moi l'exercice ! ⚡`,
    "Histoire-Géo": `🌍 Pour l'Histoire-Géo ${nom} :\n• Situe dans le temps\n• Situe dans l'espace\n• Cause → événement → conséquence\n\nQuelle période ? 🗺️`,
    "Anglais": `🗣️ For English ${nom}:\n• Read aloud\n• Check the tense\n• Use linking words\n\nWhat topic? 📖`,
    "Philosophie": `🧠 Pour la philo ${nom} :\n1. Définis les concepts\n2. Problématise\n3. Thèse/Antithèse/Synthèse\n\nTon sujet ? 💭`
  };
  return rep[matiere] || `Je suis là ${nom} ! 😊 Pose ta question sur ${matiere} ! 💪🇨🇮`;
}

const QUIZ_DATA = [
  { matiere:"Maths — Dérivées", q:"Si f(x) = 3x² + 2x, quelle est f'(x) ?", choix:["6x + 2","3x + 2","6x","6x − 2"], bon:0, explication:"(3x²)' = 6x et (2x)' = 2. Donc f'(x) = 6x + 2." },
  { matiere:"Français", q:"Quel est le type du texte commençant par 'Il était une fois' ?", choix:["Argumentatif","Narratif","Descriptif","Injonctif"], bon:1, explication:"'Il était une fois' est la formule du texte narratif." },
  { matiere:"Maths — Probabilités", q:"Sac avec 4 rouges et 6 bleues. P(rouge) = ?", choix:["1/4","2/5","4/6","3/5"], bon:1, explication:"Total = 10. P(rouge) = 4/10 = 2/5." },
  { matiere:"SVT — Génétique", q:"La méiose produit des cellules contenant :", choix:["2n chromosomes","4n chromosomes","n chromosomes","3n chromosomes"], bon:2, explication:"La méiose produit 4 cellules haploïdes à n chromosomes." },
  { matiere:"Histoire — CI", q:"Quand la Côte d'Ivoire a obtenu son indépendance ?", choix:["7 août 1958","7 août 1960","4 décembre 1960","7 août 1962"], bon:1, explication:"La CI a obtenu son indépendance le 7 août 1960. 🇨🇮" },
];

const MATIERES = ["Mathématiques","Français","SVT","Physique","Histoire-Géo","Anglais","Philosophie"];
const NIVEAUX  = ["CP","CE1","CE2","CM1","CM2","6ème","5ème","4ème","3ème","2nde","1ère A","1ère D","Terminale A","Terminale D","Licence 1","Licence 2","Master 1"];
const COULEURS = { Mathématiques:"#6C63FF", Français:"#E8445A", SVT:"#00C48C", Physique:"#FF6B35", "Histoire-Géo":"#F7B731", Anglais:"#4FC3F7", Philosophie:"#AB47BC" };
const ICONS    = { Mathématiques:"📐", Français:"📚", SVT:"🔬", Physique:"⚗️", "Histoire-Géo":"🌍", Anglais:"🗣️", Philosophie:"🧠" };

const PROJETS_DEFAULT = [
  { id:1, nom:"Révision BAC Maths", matiere:"Mathématiques", niveau:"Terminale D", couleur:"#6C63FF", icon:"📐" },
  { id:2, nom:"Préparer BEPC Français", matiere:"Français", niveau:"3ème", couleur:"#E8445A", icon:"📚" },
  { id:3, nom:"Programme SVT Terminale", matiere:"SVT", niveau:"Terminale D", couleur:"#00C48C", icon:"🔬" },
];

// ─── PAGE INSCRIPTION ─────────────────────────────────────────────────────────
function PageInscription({ onInscrire, onConnexion }) {
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [niveau, setNiveau] = useState("Terminale D");
  const [erreur, setErreur] = useState("");

  const handleInscription = () => {
    if (!prenom || !telephone || !motdepasse) { setErreur("Remplis tous les champs !"); return; }
    if (telephone.length < 8) { setErreur("Numéro invalide !"); return; }
    if (motdepasse.length < 4) { setErreur("Mot de passe trop court !"); return; }
    const user = { prenom, telephone, motdepasse, niveau };
    localStorage.setItem("educi_user", JSON.stringify(user));
    onInscrire(user);
  };

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#6C63FF,#9B59B6)", display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ background:"white", borderRadius:24, padding:28, width:"100%", maxWidth:380, boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ fontSize:40 }}>✦</div>
          <div style={{ fontSize:24, fontWeight:800, color:"#6C63FF" }}>EduCI</div>
          <div style={{ fontSize:13, color:"#888", marginTop:4 }}>Crée ton compte gratuit 🇨🇮</div>
        </div>
        {erreur && <div style={{ background:"#FFF0F0", color:"#CC2936", padding:"10px 14px", borderRadius:10, fontSize:13, marginBottom:14, textAlign:"center" }}>⚠️ {erreur}</div>}
        {[["Prénom","text",prenom,setPrenom,"Ex: Kofi, Aya, Martial..."],["Téléphone","tel",telephone,setTelephone,"Ex: 0708123456"],["Mot de passe","password",motdepasse,setMotdepasse,"Minimum 4 caractères"]].map(([label,type,val,set,ph]) => (
          <div key={label} style={{ marginBottom:14 }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#444", marginBottom:6 }}>{label}</div>
            <input value={val} onChange={e => set(e.target.value)} placeholder={ph} type={type}
              style={{ width:"100%", border:"1.5px solid #E8E8E8", borderRadius:12, padding:"11px 14px", fontSize:14, outline:"none", boxSizing:"border-box" }} />
          </div>
        ))}
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
          Déjà un compte ? <span onClick={onConnexion} style={{ color:"#6C63FF", fontWeight:700, cursor:"pointer" }}>Se connecter</span>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE CONNEXION ───────────────────────────────────────────────────────────
function PageConnexion({ onConnexion, onInscription }) {
  const [telephone, setTelephone] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [erreur, setErreur] = useState("");

  const handleConnexion = () => {
    if (!telephone || !motdepasse) { setErreur("Remplis tous les champs !"); return; }
    const userData = localStorage.getItem("educi_user");
    if (!userData) { setErreur("Aucun compte trouvé. Inscris-toi !"); return; }
    const user = JSON.parse(userData);
    if (user.telephone !== telephone || user.motdepasse !== motdepasse) { setErreur("Téléphone ou mot de passe incorrect !"); return; }
    onConnexion(user);
  };

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#6C63FF,#9B59B6)", display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ background:"white", borderRadius:24, padding:28, width:"100%", maxWidth:380, boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ fontSize:40 }}>✦</div>
          <div style={{ fontSize:24, fontWeight:800, color:"#6C63FF" }}>EduCI</div>
          <div style={{ fontSize:13, color:"#888", marginTop:4 }}>Content de te revoir ! 👋</div>
        </div>
        {erreur && <div style={{ background:"#FFF0F0", color:"#CC2936", padding:"10px 14px", borderRadius:10, fontSize:13, marginBottom:14, textAlign:"center" }}>⚠️ {erreur}</div>}
        {[["Téléphone","tel",telephone,setTelephone,"Ex: 0708123456"],["Mot de passe","password",motdepasse,setMotdepasse,"Ton mot de passe"]].map(([label,type,val,set,ph]) => (
          <div key={label} style={{ marginBottom:14 }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#444", marginBottom:6 }}>{label}</div>
            <input value={val} onChange={e => set(e.target.value)} placeholder={ph} type={type}
              onKeyDown={e => e.key==="Enter" && handleConnexion()}
              style={{ width:"100%", border:"1.5px solid #E8E8E8", borderRadius:12, padding:"11px 14px", fontSize:14, outline:"none", boxSizing:"border-box" }} />
          </div>
        ))}
        <button onClick={handleConnexion}
          style={{ width:"100%", padding:"13px", background:"linear-gradient(135deg,#6C63FF,#9B59B6)", color:"white", border:"none", borderRadius:12, fontSize:15, fontWeight:700, cursor:"pointer", marginBottom:14, marginTop:8 }}>
          Se connecter →
        </button>
        <div style={{ textAlign:"center", fontSize:13, color:"#888" }}>
          Pas de compte ? <span onClick={onInscription} style={{ color:"#6C63FF", fontWeight:700, cursor:"pointer" }}>S'inscrire gratuitement</span>
        </div>
      </div>
    </div>
  );
}

// ─── APP PRINCIPALE ───────────────────────────────────────────────────────────
export default function App() {
  const [authPage,      setAuthPage]      = useState("connexion");
  const [user,          setUser]          = useState(null);
  const [page,          setPage]          = useState("accueil");
  const [matiere,       setMatiere]       = useState("Mathématiques");
  const [messages,      setMessages]      = useState([]);
  const [input,         setInput]         = useState("");
  const [loading,       setLoading]       = useState(false);
  const [qIdx,          setQIdx]          = useState(0);
  const [quizRep,       setQuizRep]       = useState(null);
  const [projets,       setProjets]       = useState(PROJETS_DEFAULT);
  const [projetActif,   setProjetActif]   = useState(null);
  const [sidebarOpen,   setSidebarOpen]   = useState(false);
  const [showNewProjet, setShowNewProjet] = useState(false);
  const [nouveauProjet, setNouveauProjet] = useState({ nom:"", matiere:"Mathématiques" });
  const [historique,    setHistorique]    = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const userData = localStorage.getItem("educi_user");
    if (userData) { const u = JSON.parse(userData); setUser(u); initChat(u); }
    const hist = JSON.parse(localStorage.getItem("educi_historique") || "[]");
    setHistorique(hist);
    const proj = JSON.parse(localStorage.getItem("educi_projets") || "null");
    if (proj) setProjets(proj);
  }, []);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, loading]);

  const initChat = (u) => {
    setMessages([{ role:"ai", text:`Bonjour ${u.prenom} ! 👋 Je suis Kwame, ton tuteur EduCI 🇨🇮\n\nTu es en **${u.niveau}**. Qu'est-ce qu'on révise aujourd'hui ? 🎓` }]);
  };

  const handleInscrire = (u) => { setUser(u); initChat(u); };
  const handleConnexion = (u) => { setUser(u); initChat(u); };
  const handleDeconnexion = () => { localStorage.removeItem("educi_user"); setUser(null); setMessages([]); };

  const sendMessage = async (texte) => {
    const text = (texte || input).trim();
    if (!text || loading) return;
    setInput("");
    const newMsg = { role:"user", text };
    setMessages(p => [...p, newMsg]);
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    const reply = getReponse(text, matiere, user?.niveau || "Terminale D", user?.prenom);
    setMessages(p => [...p, { role:"ai", text: reply }]);
    setLoading(false);
    // Sauvegarder dans l'historique
    const hist = JSON.parse(localStorage.getItem("educi_historique") || "[]");
    const newHist = [{ id:Date.now(), question:text, matiere, date:new Date().toLocaleDateString("fr-FR") }, ...hist].slice(0,20);
    localStorage.setItem("educi_historique", JSON.stringify(newHist));
    setHistorique(newHist);
  };

  const creerProjet = () => {
    if (!nouveauProjet.nom) return;
    const proj = { id:Date.now(), nom:nouveauProjet.nom, matiere:nouveauProjet.matiere, couleur:COULEURS[nouveauProjet.matiere], icon:ICONS[nouveauProjet.matiere] };
    const newProjets = [proj, ...projets];
    setProjets(newProjets);
    localStorage.setItem("educi_projets", JSON.stringify(newProjets));
    setNouveauProjet({ nom:"", matiere:"Mathématiques" });
    setShowNewProjet(false);
  };

  const ouvrirProjet = (projet) => {
    setProjetActif(projet);
    setMatiere(projet.matiere);
    setPage("tuteur");
    setSidebarOpen(false);
    setMessages([{ role:"ai", text:`📁 Projet : **${projet.nom}**\n\nOn travaille sur **${projet.matiere}** !\nPose ta question, je suis prêt ${user?.prenom} ! 🎯` }]);
  };

  const scores = { Mathématiques:78, Français:62, SVT:45, "Histoire-Géo":55, Anglais:38, Philosophie:70 };

  if (!user) {
    if (authPage === "inscription") return <PageInscription onInscrire={handleInscrire} onConnexion={() => setAuthPage("connexion")} />;
    return <PageConnexion onConnexion={handleConnexion} onInscription={() => setAuthPage("inscription")} />;
  }

  // ── SIDEBAR CONTENU ──
  const SidebarContent = () => (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", padding:"16px 12px", overflowY:"auto" }}>
      {/* Logo */}
      <div style={{ padding:"8px 4px 20px", borderBottom:"1px solid #2A2A3E" }}>
        <div style={{ color:"white", fontSize:20, fontWeight:800 }}>✦ EduCI</div>
        <div style={{ color:"rgba(255,255,255,0.5)", fontSize:11, marginTop:2 }}>{user.prenom} · {user.niveau}</div>
      </div>

      {/* Nouvelle question */}
      <button onClick={() => { setPage("tuteur"); setProjetActif(null); setSidebarOpen(false); initChat(user); }}
        style={{ display:"flex", alignItems:"center", gap:10, background:"rgba(108,99,255,0.3)", border:"1px solid rgba(108,99,255,0.5)", borderRadius:10, padding:"10px 12px", color:"white", fontSize:13, fontWeight:600, cursor:"pointer", marginTop:16, marginBottom:20 }}>
        <span style={{ fontSize:18 }}>+</span> Nouvelle question
      </button>

      {/* MES PROJETS */}
      <div style={{ marginBottom:6 }}>
        <div style={{ color:"rgba(255,255,255,0.5)", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:8, paddingLeft:4 }}>
          📁 Mes Projets
        </div>
        {projets.map(p => (
          <div key={p.id} onClick={() => ouvrirProjet(p)}
            style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 10px", borderRadius:8, cursor:"pointer", marginBottom:4, background:projetActif?.id===p.id?"rgba(108,99,255,0.3)":"transparent", color:"white", fontSize:13 }}>
            <span>{p.icon}</span>
            <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.nom}</span>
          </div>
        ))}
        <button onClick={() => setShowNewProjet(!showNewProjet)}
          style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 10px", borderRadius:8, cursor:"pointer", background:"transparent", border:"1px dashed rgba(255,255,255,0.2)", color:"rgba(255,255,255,0.5)", fontSize:12, width:"100%", marginTop:4 }}>
          + Nouveau projet
        </button>
        {showNewProjet && (
          <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:10, padding:10, marginTop:8 }}>
            <input value={nouveauProjet.nom} onChange={e => setNouveauProjet(p => ({...p, nom:e.target.value}))}
              placeholder="Nom du projet..." style={{ width:"100%", background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:8, padding:"8px 10px", color:"white", fontSize:12, marginBottom:8, boxSizing:"border-box", outline:"none" }} />
            <select value={nouveauProjet.matiere} onChange={e => setNouveauProjet(p => ({...p, matiere:e.target.value}))}
              style={{ width:"100%", background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:8, padding:"8px 10px", color:"white", fontSize:12, marginBottom:8, boxSizing:"border-box" }}>
              {MATIERES.map(m => <option key={m} style={{ color:"#333" }}>{m}</option>)}
            </select>
            <button onClick={creerProjet} style={{ width:"100%", background:"#6C63FF", color:"white", border:"none", borderRadius:8, padding:"8px", fontSize:12, fontWeight:700, cursor:"pointer" }}>
              Créer ✓
            </button>
          </div>
        )}
      </div>

      {/* NAVIGATION */}
      <div style={{ marginTop:16, marginBottom:6 }}>
        <div style={{ color:"rgba(255,255,255,0.5)", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:8, paddingLeft:4 }}>
          Navigation
        </div>
        {[["accueil","🏠","Accueil"],["tuteur","🤖","Tuteur IA"],["exercices","✏️","Exercices"],["progression","📈","Progression"]].map(([id,icon,label]) => (
          <div key={id} onClick={() => { setPage(id); setSidebarOpen(false); }}
            style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 10px", borderRadius:8, cursor:"pointer", marginBottom:2, background:page===id?"rgba(108,99,255,0.3)":"transparent", color:page===id?"white":"rgba(255,255,255,0.7)", fontSize:13, fontWeight:page===id?700:400 }}>
            <span>{icon}</span><span>{label}</span>
          </div>
        ))}
      </div>

      {/* HISTORIQUE RÉCENT */}
      {historique.length > 0 && (
        <div style={{ marginTop:16 }}>
          <div style={{ color:"rgba(255,255,255,0.5)", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:8, paddingLeft:4 }}>
            Récents
          </div>
          {historique.slice(0,5).map(h => (
            <div key={h.id} onClick={() => { setInput(h.question); setMatiere(h.matiere); setPage("tuteur"); setSidebarOpen(false); }}
              style={{ padding:"7px 10px", borderRadius:8, cursor:"pointer", marginBottom:2, color:"rgba(255,255,255,0.6)", fontSize:12 }}>
              <div style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>💬 {h.question}</div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", marginTop:2 }}>{h.matiere} · {h.date}</div>
            </div>
          ))}
        </div>
      )}

      {/* DÉCONNEXION */}
      <div style={{ marginTop:"auto", paddingTop:16, borderTop:"1px solid #2A2A3E" }}>
        <button onClick={handleDeconnexion}
          style={{ width:"100%", background:"transparent", border:"1px solid rgba(255,255,255,0.2)", borderRadius:8, padding:"8px", color:"rgba(255,255,255,0.5)", fontSize:12, cursor:"pointer" }}>
          Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily:"'Segoe UI',Arial,sans-serif", minHeight:"100vh", background:"#F0EEF8", display:"flex" }}>

      {/* ── SIDEBAR DESKTOP (>768px) ── */}
      <div style={{ width:240, background:"#1A1A2E", flexShrink:0, display:"flex", flexDirection:"column", position:"sticky", top:0, height:"100vh" }}
        className="sidebar-desktop">
        <SidebarContent />
      </div>

      {/* ── SIDEBAR MOBILE (overlay) ── */}
      {sidebarOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:1000, display:"flex" }}>
          <div style={{ width:260, background:"#1A1A2E", height:"100%", overflowY:"auto" }}>
            <SidebarContent />
          </div>
          <div style={{ flex:1, background:"rgba(0,0,0,0.5)" }} onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* ── CONTENU PRINCIPAL ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>

        {/* HEADER MOBILE */}
        <div style={{ background:"linear-gradient(135deg,#6C63FF,#9B59B6)", padding:"12px 16px", display:"flex", alignItems:"center", gap:12, boxShadow:"0 2px 16px rgba(108,99,255,0.35)" }}>
          <button onClick={() => setSidebarOpen(true)}
            style={{ background:"rgba(255,255,255,0.2)", border:"none", color:"white", borderRadius:8, width:36, height:36, fontSize:18, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            ☰
          </button>
          <div style={{ flex:1 }}>
            <div style={{ color:"white", fontSize:16, fontWeight:800 }}>
              {projetActif ? `📁 ${projetActif.nom}` : page==="accueil"?"🏠 Accueil":page==="tuteur"?"🤖 Tuteur IA":page==="exercices"?"✏️ Exercices":"📈 Progression"}
            </div>
            <div style={{ color:"rgba(255,255,255,0.7)", fontSize:11 }}>Bonjour {user.prenom} 👋</div>
          </div>
          <div style={{ background:"rgba(255,255,255,0.2)", color:"white", padding:"4px 10px", borderRadius:20, fontSize:11, fontWeight:700 }}>{user.niveau}</div>
        </div>

        <div style={{ flex:1, overflowY:"auto", padding:16, maxWidth:700, width:"100%", margin:"0 auto", boxSizing:"border-box" }}>

          {/* ACCUEIL */}
          {page === "accueil" && (
            <div>
              <div style={{ background:"linear-gradient(135deg,#6C63FF,#9B59B6)", borderRadius:20, padding:"24px 20px", color:"white", marginBottom:16, textAlign:"center" }}>
                <div style={{ fontSize:24, fontWeight:800, marginBottom:6 }}>Bienvenue {user.prenom} ! 🎓</div>
                <div style={{ fontSize:13, opacity:0.9, marginBottom:16, lineHeight:1.7 }}>La première app IA éducative de Côte d'Ivoire.<br/>Du CP au Master — BEPC et BAC inclus !</div>
                <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
                  <button onClick={() => setPage("tuteur")} style={{ background:"white", color:"#6C63FF", border:"none", borderRadius:12, padding:"10px 20px", fontSize:13, fontWeight:700, cursor:"pointer" }}>🤖 Parler à Kwame</button>
                  <button onClick={() => setPage("exercices")} style={{ background:"rgba(255,255,255,0.2)", color:"white", border:"1px solid rgba(255,255,255,0.4)", borderRadius:12, padding:"10px 20px", fontSize:13, fontWeight:700, cursor:"pointer" }}>✏️ Exercices</button>
                </div>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:16 }}>
                {[["🔥","12","Jours streak"],["⭐","87%","Score"],["📝","48","Exercices"]].map(([icon,val,label]) => (
                  <div key={label} style={{ background:"white", borderRadius:14, padding:12, textAlign:"center", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
                    <div style={{ fontSize:22 }}>{icon}</div>
                    <div style={{ fontSize:20, fontWeight:800, color:"#6C63FF" }}>{val}</div>
                    <div style={{ fontSize:10, color:"#888" }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* MES PROJETS */}
              <div style={{ background:"white", borderRadius:16, padding:16, boxShadow:"0 2px 8px rgba(0,0,0,0.06)", marginBottom:16 }}>
                <div style={{ fontWeight:700, fontSize:14, marginBottom:12, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  📁 Mes Projets
                  <button onClick={() => { setSidebarOpen(true); setShowNewProjet(true); }}
                    style={{ background:"#F4F3FF", color:"#6C63FF", border:"none", borderRadius:8, padding:"5px 12px", fontSize:12, fontWeight:700, cursor:"pointer" }}>+ Nouveau</button>
                </div>
                {projets.slice(0,3).map(p => (
                  <div key={p.id} onClick={() => ouvrirProjet(p)}
                    style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 12px", borderRadius:12, cursor:"pointer", border:"1.5px solid #F0F0F0", marginBottom:8, background:"#FAFAFA" }}>
                    <div style={{ width:36, height:36, borderRadius:10, background:p.couleur+"20", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{p.icon}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:600, fontSize:13, color:"#222" }}>{p.nom}</div>
                      <div style={{ fontSize:11, color:"#888", marginTop:2 }}>{p.matiere}</div>
                    </div>
                    <span style={{ color:"#CCC", fontSize:16 }}>›</span>
                  </div>
                ))}
              </div>

              <div style={{ fontSize:14, fontWeight:700, color:"#444", marginBottom:10 }}>Choisir une matière</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10 }}>
                {MATIERES.map(m => (
                  <div key={m} onClick={() => { setMatiere(m); setPage("tuteur"); }}
                    style={{ background:matiere===m?COULEURS[m]:"white", color:matiere===m?"white":"#333", borderRadius:14, padding:"14px 12px", cursor:"pointer", border:`2px solid ${matiere===m?COULEURS[m]:"#EEE"}`, fontWeight:600, fontSize:13, boxShadow:"0 2px 8px rgba(0,0,0,0.05)", display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:20 }}>{ICONS[m]}</span>{m}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TUTEUR IA */}
          {page === "tuteur" && (
            <div style={{ background:"white", borderRadius:20, overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,0.08)", height:"calc(100vh - 140px)", display:"flex", flexDirection:"column" }}>
              <div style={{ padding:"12px 16px", borderBottom:"1px solid #F0F0F0", background:"#FAFAFA", display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:40, height:40, borderRadius:20, background:"linear-gradient(135deg,#6C63FF,#9B59B6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>🤖</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, fontSize:14, color:"#222" }}>Kwame — Tuteur EduCI</div>
                  <div style={{ fontSize:11, color:"#00C48C", fontWeight:600 }}>● En ligne · {matiere}</div>
                </div>
                <select value={matiere} onChange={e => setMatiere(e.target.value)}
                  style={{ border:"1px solid #EEE", borderRadius:8, padding:"5px 8px", fontSize:12, background:"white" }}>
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
                  style={{ width:44, height:44, borderRadius:22, background:loading?"#CCC":"#6C63FF", border:"none", color:"white", fontSize:18, cursor:loading?"default":"pointer" }}>
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
                    <div style={{ width:28, fontSize:16, textAlign:"center" }}>{ICONS[m]}</div>
                    <div style={{ width:90, fontSize:12, fontWeight:600, color:"#444" }}>{m}</div>
                    <div style={{ flex:1, height:8, background:"#F0F0F0", borderRadius:4, overflow:"hidden" }}>
                      <div style={{ width:`${pct}%`, height:"100%", background:COULEURS[m], borderRadius:4 }} />
                    </div>
                    <div style={{ width:34, fontSize:13, fontWeight:800, color:COULEURS[m], textAlign:"right" }}>{pct}%</div>
                  </div>
                ))}
              </div>
              <div style={{ background:"linear-gradient(135deg,#F7B731,#F0A500)", borderRadius:16, padding:16, textAlign:"center", color:"white" }}>
                <div style={{ fontSize:32, marginBottom:6 }}>🏆</div>
                <div style={{ fontWeight:800, fontSize:15, marginBottom:4 }}>Continue {user.prenom} !</div>
                <div style={{ fontSize:12, opacity:0.9 }}>Top 20% des élèves EduCI en {user.niveau} 💪</div>
              </div>
            </div>
          )}
        </div>

        {/* ── NAV BAS MOBILE ── */}
        <div style={{ background:"white", borderTop:"1px solid #F0F0F0", display:"flex", justifyContent:"space-around", padding:"8px 0", position:"sticky", bottom:0 }}>
          {[["accueil","🏠","Accueil"],["tuteur","🤖","Tuteur"],["exercices","✏️","Exercices"],["progression","📈","Stats"]].map(([id,icon,label]) => (
            <div key={id} onClick={() => setPage(id)}
              style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, cursor:"pointer", color:page===id?"#6C63FF":"#AAA", flex:1 }}>
              <span style={{ fontSize:20 }}>{icon}</span>
              <span style={{ fontSize:10, fontWeight:page===id?700:400 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .sidebar-desktop { display: flex !important; }
        }
        @media (max-width: 767px) {
          .sidebar-desktop { display: none !important; }
        }
      `}</style>
    </div>
  );
}
