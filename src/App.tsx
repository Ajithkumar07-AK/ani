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
            <div 
              id="login-modal-overlay" 
              className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md px-4 py-6 md:p-8"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {/* Background ambient animation canvas */}
              <div className="absolute inset-0 pointer-events-none">
                <BeamsBackground className="w-full h-full" />
              </div>

              {/* Centered Scrollable layout wrapper */}
              <div className="flex min-h-full items-center justify-center relative z-10 w-full max-w-md mx-auto">
                <LoginCard 
                  onLoginSuccess={handleLoginSuccess} 
                  onCancel={() => setIsLoginOpen(false)}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
