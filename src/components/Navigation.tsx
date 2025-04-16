import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Settings, Users as UsersIcon, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
      
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="bg-white shadow-sm mb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link to="/">
              <Button
                variant={location.pathname === "/" ? "default" : "ghost"}
                className="flex items-center gap-2"
              >
                <Calendar size={16} />
                Schedule
              </Button>
            </Link>
            <Link to="/activities">
              <Button
                variant={location.pathname === "/activities" ? "default" : "ghost"}
                className="flex items-center gap-2"
              >
                <Settings size={16} />
                Manage Activities
              </Button>
            </Link>
            <Link to="/users">
              <Button
                variant={location.pathname === "/users" ? "default" : "ghost"}
                className="flex items-center gap-2"
              >
                <UsersIcon size={16} />
                Users
              </Button>
            </Link>
          </div>
          <div className="flex items-center">
            <span className="mr-4 text-sm text-gray-600">
              {user?.email}
            </span>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 