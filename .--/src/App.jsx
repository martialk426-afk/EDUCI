import { useState, useRef, useEffect } from "react";

const REPONSES = {
  maths: {
    mots: ["dérivée", "intégrale", "probabilité", "équation", "fonction", "limite", "vecteur", "matrice"],
    rep: "📐 **Mathématiques :**\n\nVoici comment aborder ce problème étape par étape :\n\n1. Identifie ce qu'on te demande\n2. Choisis la bonne formule\n3. Applique avec les valeurs\n4. Vérifie ton résultat\n\nTu veux que je t'explique un point précis ?"
  },
  francais: {
    mots: ["dissertation", "commentaire", "résumé", "texte", "auteur", "thème", "plan"],
    rep: "📚 **Français :**\n\nPour réussir cet exercice :\n\n1. **Introduction** : présente le sujet et annonce ton plan\n2. **Développement** : 2 ou 3 parties avec des exemples\n3. **Conclusion** : synthèse et ouverture\n\nQuel type d'exercice tu prépares ?"
  },
  svt: {
    mots: ["cellule", "photosynthèse", "génétique", "ADN", "chromosome", "enzyme", "respiration"],
    rep: "🔬 **SVT :**\n\nLes sciences de la vie sont passionnantes ! \n\nPour bien comprendre :\n- Commence par le schéma\n- Identifie les organes ou mécanismes\n- Relie cause et effet\n\nQuel chapitre tu révises ?"
  },
  histoire: {
    mots: ["guerre", "colonisation", "indépendance", "côte d'ivoire", "afrique", "président", "histoire"],
    rep: "🌍 **Histoire-Géographie :**\n\nLa Côte d'Ivoire a une histoire riche !\n\nPour retenir les dates et événements :\n- Fais une frise chronologique\n- Relie chaque événement à sa cause\n- Utilise des mnémotechniques\n\nQuel période tu étudies ?"
  },
  bac: {
    mots: ["bac", "bepc", "examen", "concours", "épreuve", "sujet", "annale"],
    rep: "🎯 **Préparation BAC/BEPC :**\n\nStratégie pour réussir ton examen :\n\n1. **Révise régulièrement** — 2h par jour minimum\n2. **Fais les annales** — les sujets se répètent souvent\n3. **Dors bien** la veille\n4. **Lis bien les consignes** avant de répondre\n\nQuelle matière te pose problème ?"
  }
};

function getReponse(question, matiere) {
  const q = question.toLowerCase();
  
  for (const [key, val] of Object.entries(REPONSES)) {
    if (val.mots.some(m => q.includes(m))) {
      return val.rep;
    }
  }
  
  const repParMatiere = {
    "Mathématiques": "📐 Bonne question en Maths ! Pour ce type de problème, commence par identifier les données, puis applique la formule adaptée. Montre-moi l'exercice complet pour que je t'aide mieux !",
    "Français": "📚 En Français, la méthode est essentielle. Pour ta question, pense à structurer ta réponse avec une introduction, un développement et une conclusion. Tu veux un exemple ?",
    "SVT": "🔬 En SVT, les schémas sont tes meilleurs amis ! Pour comprendre ce concept, commence par dessiner et légender. Quel chapitre précisément ?",
    "Physique": "⚗️ En Physique, identifie toujours les grandeurs et leurs unités avant de calculer. Quelle formule tu dois utiliser ici ?",
    "Histoire-Géo": "🌍 Pour l'Histoire-Géo, situe toujours dans le temps et l'espace. Quelle période ou région tu étudies ?",
    "Anglais": "🗣️ For English, practice makes perfect! Try to read your question aloud first. What topic are you studying?",
    "Philosophie": "🧠 En Philosophie, définis d'abord tes concepts clés. Quel est le sujet de ta dissertation ?"
  };
  
  return repParMatiere[matiere] || "Je suis là pour t'aider ! Pose-moi ta question sur " + matiere + " et je t'expliquerai clairement. 😊";
}

export default function App() {
  const [page, setPage] = useState("accueil");
  const [messages, setMessages] = useState([
    { role: "ai", text: "Bonjour ! 👋 Je suis Kwame, ton tuteur EduCI.\n\nJe connais tout le programme ivoirien du CP au Master. Pose-moi n'importe quelle question — Maths, Français, SVT, Histoire...\n\nQu'est-ce qu'on révise aujourd'hui ? 🎓" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [niveau, setNiveau] = useState("Terminale D");
  const [matiere, setMatiere] = useState("Mathématiques");
  const [scores, setScores] = useState({ Mathématiques: 78, Français: 62, SVT: 45, "Histoire-Géo": 55, Anglais: 38, Philosophie: 70 });
  const [quizReponse, setQuizReponse] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (texte) => {
    const text = (texte || input).trim();
    if (!text || loading) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text }]);
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const reponse = getReponse(text, matiere);
    setMessages(prev => [...prev, { role: "ai", text: reponse }]);
    setLoading(false);
  };

  const MATIERES = ["Mathématiques", "Français", "SVT", "Physique", "Histoire-Géo", "Anglais", "Philosophie"];
  const NIVEAUX = ["CM2", "6ème", "5ème", "4ème", "3ème", "2nde", "1ère A", "1ère D", "Terminale A", "Terminale D", "Licence 1", "Licence 2"];
  
  const QUIZ = [
    { q: "Si f(x) = 3x² + 2x, quelle est f'(x) ?", choix: ["6x + 2", "3x + 2", "6x", "6x - 2"], bon: 0, explication: "On dérive terme par terme : (3x²)' = 6x et (2x)' = 2. Donc f'(x) = 6x + 2." },
    { q: "Quel est le type du texte qui commence par 'Il était une fois' ?", choix: ["Argumentatif", "Narratif", "Descriptif", "Injonctif"], bon: 1, explication: "'Il était une fois' est la formule du texte narratif (le récit)." },
    { q: "P(rouge) si le sac contient 4 rouges et 6 bleues ?", choix: ["1/4", "2/5", "4/6", "3/5"], bon: 1, explication: "Total = 10. P(rouge) = 4/10 = 2/5." },
  ];
  const [qIdx, setQIdx] = useState(0);

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", minHeight: "100vh", background: "#F0EEF8" }}>
      
      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg, #6C63FF, #9B59B6)", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 12px rgba(108,99,255,0.3)" }}>
        <div>
          <div style={{ color: "white", fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>✦ EduCI</div>
          <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11 }}>Ton assistant scolaire IA 🇨🇮</div>
        </div>
        <select value={niveau} onChange={e => setNiveau(e.target.value)}
          style={{ background: "rgba(255,255,255,0.2)", color: "white", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
          {NIVEAUX.map(n => <option key={n} value={n} style={{ color: "#333" }}>{n}</option>)}
        </select>
      </div>

      {/* NAV */}
      <div style={{ background: "white", display: "flex", borderBottom: "2px solid #F0F0F0", overflowX: "auto" }}>
        {[["accueil","🏠 Accueil"], ["tuteur","🤖 Tuteur IA"], ["exercices","✏️ Exercices"], ["progression","📈 Progression"]].map(([id, label]) => (
          <div key={id} onClick={() => setPage(id)}
            style={{ padding: "13px 20px", fontSize: 13, fontWeight: page === id ? 700 : 500, color: page === id ? "#6C63FF" : "#888", borderBottom: page === id ? "3px solid #6C63FF" : "3px solid transparent", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.15s" }}>
            {label}
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: 16 }}>

        {/* ── ACCUEIL ── */}
        {page === "accueil" && (
          <div>
            <div style={{ background: "linear-gradient(135deg, #6C63FF, #9B59B6)", borderRadius: 20, padding: "24px 20px", color: "white", marginBottom: 16, textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Bienvenue sur EduCI ! 🎓</div>
              <div style={{ fontSize: 13, opacity: 0.9, marginBottom: 20, lineHeight: 1.6 }}>La première application IA éducative de Côte d'Ivoire.<br/>Du CP au Master — BEPC et BAC inclus !</div>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => setPage("tuteur")} style={{ background: "white", color: "#6C63FF", border: "none", borderRadius: 12, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>🤖 Parler à Kwame</button>
                <button onClick={() => setPage("exercices")} style={{ background: "rgba(255,255,255,0.2)", color: "white", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 12, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>✏️ Faire des exercices</button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 16 }}>
              {[["🔥", "12", "Jours streak"], ["⭐", "87%", "Score moyen"], ["📝", "48", "Exercices faits"]].map(([icon, val, label]) => (
                <div key={label} style={{ background: "white", borderRadius: 14, padding: 14, textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                  <div style={{ fontSize: 22 }}>{icon}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#6C63FF" }}>{val}</div>
                  <div style={{ fontSize: 11, color: "#888" }}>{label}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 14, fontWeight: 700, color: "#444", marginBottom: 10 }}>Choisir une matière</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
              {MATIERES.map(m => (
                <div key={m} onClick={() => { setMatiere(m); setPage("tuteur"); }}
                  style={{ background: matiere === m ? "#6C63FF" : "white", color: matiere === m ? "white" : "#333", borderRadius: 14, padding: "16px 14px", cursor: "pointer", border: `2px solid ${matiere === m ? "#6C63FF" : "#EEE"}`, fontWeight: 600, fontSize: 13, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", transition: "all 0.15s" }}>
                  {m === "Mathématiques" ? "📐" : m === "Français" ? "📚" : m === "SVT" ? "🔬" : m === "Physique" ? "⚗️" : m === "Histoire-Géo" ? "🌍" : m === "Anglais" ? "🗣️" : "🧠"} {m}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TUTEUR IA ── */}
        {page === "tuteur" && (
          <div style={{ background: "white", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", height: "78vh", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #F0F0F0", background: "#FAFAFA", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: 20, background: "#6C63FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🤖</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#222" }}>Kwame — Tuteur EduCI</div>
                <div style={{ fontSize: 11, color: "#888" }}>{matiere} · {niveau}</div>
              </div>
              <select value={matiere} onChange={e => setMatiere(e.target.value)}
                style={{ marginLeft: "auto", border: "1px solid #EEE", borderRadius: 8, padding: "5px 8px", fontSize: 12, background: "#FAFAFA" }}>
                {MATIERES.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ alignSelf: msg.role === "user" ? "flex-end" : "flex-start", maxWidth: "82%" }}>
                  <div style={{ padding: "11px 14px", borderRadius: msg.role === "ai" ? "16px 16px 16px 4px" : "16px 16px 4px 16px", background: msg.role === "ai" ? "#F4F3FF" : "#6C63FF", color: msg.role === "ai" ? "#333" : "white", fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ alignSelf: "flex-start", background: "#F4F3FF", padding: "12px 16px", borderRadius: "16px 16px 16px 4px", fontSize: 13, color: "#888" }}>
                  Kwame réfléchit... ⏳
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, padding: "8px 12px", borderTop: "1px solid #F5F5F5" }}>
              {["Explique-moi le cours", "Donne-moi un exercice BAC", "Comment réviser efficacement ?", "Aide-moi avec ma leçon"].map(q => (
                <button key={q} onClick={() => sendMessage(q)}
                  style={{ background: "#F4F3FF", color: "#6C63FF", border: "none", borderRadius: 20, padding: "5px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                  {q}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, padding: "10px 12px", borderTop: "1px solid #F0F0F0" }}>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder={`Ta question sur ${matiere}...`}
                style={{ flex: 1, border: "1.5px solid #E8E8E8", borderRadius: 24, padding: "10px 16px", fontSize: 13, outline: "none", background: "#FAFAFA" }} />
              <button onClick={() => sendMessage()} disabled={loading}
                style={{ width: 42, height: 42, borderRadius: 21, background: loading ? "#CCC" : "#6C63FF", border: "none", color: "white", fontSize: 18, cursor: loading ? "default" : "pointer" }}>
                ➤
              </button>
            </div>
          </div>
        )}

        {/* ── EXERCICES ── */}
        {page === "exercices" && (
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: "#222", marginBottom: 14 }}>✏️ Exercice du jour</div>
            <div style={{ background: "white", borderRadius: 16, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: 12 }}>
              <div style={{ background: "#6C63FF20", color: "#6C63FF", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, display: "inline-block", marginBottom: 10 }}>
                {qIdx === 0 ? "Maths — Dérivées" : qIdx === 1 ? "Français — Types de textes" : "Maths — Probabilités"}
              </div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#222", marginBottom: 14, lineHeight: 1.5 }}>
                {QUIZ[qIdx].q}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {QUIZ[qIdx].choix.map((c, i) => (
                  <button key={i} onClick={() => setQuizReponse(i)} disabled={quizReponse !== null}
                    style={{ padding: "10px 14px", borderRadius: 10, textAlign: "left", fontSize: 13, fontWeight: 500, cursor: quizReponse !== null ? "default" : "pointer", border: "1.5px solid", transition: "all 0.15s",
                      borderColor: quizReponse === null ? "#EEE" : i === QUIZ[qIdx].bon ? "#00C48C" : i === quizReponse ? "#E8445A" : "#EEE",
                      background: quizReponse === null ? "#FAFAFA" : i === QUIZ[qIdx].bon ? "#E8FFF5" : i === quizReponse ? "#FFF0F0" : "#FAFAFA",
                      color: quizReponse === null ? "#444" : i === QUIZ[qIdx].bon ? "#00875A" : i === quizReponse ? "#CC2936" : "#444"
                    }}>
                    {["A","B","C","D"][i]}. {c} {quizReponse !== null && i === QUIZ[qIdx].bon ? "✓" : quizReponse === i && i !== QUIZ[qIdx].bon ? "✗" : ""}
                  </button>
                ))}
              </div>
              {quizReponse !== null && (
                <div style={{ marginTop: 12, padding: "12px 14px", background: "#F4F3FF", borderRadius: 10, fontSize: 12, color: "#444", lineHeight: 1.6 }}>
                  💡 <strong>Explication :</strong> {QUIZ[qIdx].explication}
                </div>
              )}
              {quizReponse !== null && (
                <button onClick={() => { setQIdx((qIdx + 1) % QUIZ.length); setQuizReponse(null); }}
                  style={{ marginTop: 12, width: "100%", padding: "10px", background: "#6C63FF", color: "white", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                  Question suivante →
                </button>
              )}
            </div>
            <button onClick={() => { setInput(`Génère 3 nouveaux exercices de ${matiere} niveau ${niveau}`); setPage("tuteur"); }}
              style={{ width: "100%", padding: 14, background: "#F4F3FF", color: "#6C63FF", border: "2px dashed #6C63FF", borderRadius: 14, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
              ✨ Demander plus d'exercices à Kwame →
            </button>
          </div>
        )}

        {/* ── PROGRESSION ── */}
        {page === "progression" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 16 }}>
              {[["🔥","12","Jours streak"],["⭐","87%","Score moyen"],["📝","48","Exercices"]].map(([icon,val,label]) => (
                <div key={label} style={{ background: "white", borderRadius: 14, padding: 14, textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                  <div style={{ fontSize: 20 }}>{icon}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#6C63FF" }}>{val}</div>
                  <div style={{ fontSize: 11, color: "#888" }}>{label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "white", borderRadius: 16, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 16 }}>📊 Par matière</div>
              {Object.entries(scores).map(([m, pct]) => {
                const colors = { Mathématiques: "#6C63FF", Français: "#E8445A", SVT: "#00C48C", "Histoire-Géo": "#F7B731", Anglais: "#4FC3F7", Philosophie: "#AB47BC" };
                return (
                  <div key={m} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 110, fontSize: 12, fontWeight: 600, color: "#444" }}>{m}</div>
                    <div style={{ flex: 1, height: 8, background: "#F0F0F0", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: colors[m] || "#6C63FF", borderRadius: 4, transition: "width 1s ease" }} />
                    </div>
                    <div style={{ width: 36, fontSize: 13, fontWeight: 800, color: colors[m] || "#6C63FF", textAlign: "right" }}>{pct}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}