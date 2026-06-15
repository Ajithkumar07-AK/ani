import { useState, useEffect } from "react";
import { UserSession } from "@/src/types";
import { BeamsBackground } from "@/src/components/ui/beams-background";
import { LoginCard } from "@/src/components/LoginCard";
import { AnimeDashboard } from "@/src/components/AnimeDashboard";
import { PublicHome } from "@/src/components/PublicHome";

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash || "#");
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  // Load session & track routing hash updates
  useEffect(() => {
    // Read previous authenticated sessions
    const storedUser = localStorage.getItem("anime_portal_session");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser) as UserSession;
        setCurrentUser(parsed);
        // If they are authenticated but on "/" home path, advance them to portal
        if (window.location.hash !== "#anime") {
          window.location.hash = "anime";
        }
      } catch (e) {
        console.error("Failed to parse stored user", e);
        localStorage.removeItem("anime_portal_session");
      }
    }

    // Connect Hash change listener
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || "#");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleLoginSuccess = (userSession: UserSession) => {
    setCurrentUser(userSession);
    localStorage.setItem("anime_portal_session", JSON.stringify(userSession));
    setIsLoginOpen(false);
    window.location.hash = "anime";
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("anime_portal_session");
    window.location.hash = "#";
  };

  // Determine current route rendering view
  const showDashboard = currentUser && currentHash === "#anime";

  return (
    <div id="anime-app-root">
      {showDashboard ? (
        <AnimeDashboard user={currentUser} onLogout={handleLogout} />
      ) : (
        <>
          {/* Default view is the beautiful Public Home */}
          <PublicHome onOpenLogin={() => setIsLoginOpen(true)} />

          {/* If the login portal overlay is active, show the LoginCard modal */}
          {isLoginOpen && (
            <div id="login-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <BeamsBackground className="absolute inset-0 flex items-center justify-center p-4 overflow-y-auto">
                <LoginCard 
                  onLoginSuccess={handleLoginSuccess} 
                  onCancel={() => setIsLoginOpen(false)}
                />
              </BeamsBackground>
            </div>
          )}
        </>
      )}
    </div>
  );
}
