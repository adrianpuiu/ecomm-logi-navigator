
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Truck, AlertTriangle, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="glass-card p-10 rounded-lg max-w-md w-full text-center space-y-6 animate-scale-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto mb-2">
          <AlertTriangle size={32} />
        </div>
        
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-xl text-foreground mb-2">Page Not Found</p>
        <p className="text-muted-foreground mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col gap-3">
          <Button asChild className="w-full">
            <Link to="/" className="flex items-center justify-center gap-2">
              <ArrowLeft size={16} />
              Return to Dashboard
            </Link>
          </Button>
          
          <div className="flex items-center justify-center gap-2 mt-8 text-sm text-muted-foreground">
            <Truck size={16} className="text-primary" />
            <span>LogiNav Transportation Management System</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
