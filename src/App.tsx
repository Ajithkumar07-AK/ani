import { useState, useEffect } from "react";
import { UserSession } from "@/src/types";
import { BeamsBackground } from "@/src/components/ui/beams-background";
import { LoginCard } from "@/src/components/LoginCard";
import { AnimeDashboard } from "@/src/components/AnimeDashboard";

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash || "#");

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
    window.location.hash = "anime";
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("anime_portal_session");
    window.location.hash = "#";
  };

  // Determine current route rendering view
  // Render Dashboard if they are logged in AND on the anime hash
  const showDashboard = currentUser && currentHash === "#anime";

  return (
    <div id="anime-app-root">
      {showDashboard ? (
        <AnimeDashboard user={currentUser} onLogout={handleLogout} />
      ) : (
        <BeamsBackground className="flex items-center justify-center p-4">
          <LoginCard onLoginSuccess={handleLoginSuccess} />
        </BeamsBackground>
      )}
    </div>
  );
}
