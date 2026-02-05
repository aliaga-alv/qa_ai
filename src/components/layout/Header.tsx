import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, User, LogOut, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { ROUTES, HEADER_NAV_LINKS } from '@/constants';

interface HeaderProps {
  variant?: 'default' | 'transparent';
  sticky?: boolean;
  className?: string;
}

export const Header = ({ variant = 'default', sticky = true, className }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    navigate(ROUTES.LOGIN);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Account for fixed header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle scrolling to hash on location change
  useEffect(() => {
    if (location.hash) {
      // Remove the # from the hash
      const sectionId = location.hash.substring(1);
      // Small delay to ensure page content is rendered
      setTimeout(() => scrollToSection(sectionId), 100);
    }
  }, [location]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Check if it's a hash link
    if (href.includes('#')) {
      e.preventDefault();
      const hash = href.split('#')[1];
      const sectionId = hash;

      // If we're already on the home page
      if (location.pathname === '/') {
        scrollToSection(sectionId);
      } else {
        // Navigate to home page with hash - useEffect will handle scrolling
        navigate(`/#${sectionId}`);
      }

      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={cn(
        'z-50 w-full transition-all duration-300',
        sticky && 'sticky top-0',
        variant === 'transparent'
          ? 'bg-white/95 backdrop-blur-sm dark:bg-gray-900/95'
          : 'border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900',
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500">
              <span className="text-lg font-bold text-white">Q</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">QA AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {HEADER_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-semibold text-gray-900 transition-colors hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 md:flex">
            {/* Theme Toggle */}
            <button
              onClick={() => {
                toggleTheme();
              }}
              className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-gray-900 dark:text-gray-100" />
              ) : (
                <Moon className="h-5 w-5 text-gray-900 dark:text-gray-100" />
              )}
            </button>

            {/* Auth Buttons or User Menu */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500">
                    <span className="text-sm font-medium text-white">
                      {user.firstName.charAt(0)}
                      {user.lastName.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.firstName}
                  </span>
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 z-20 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-800 dark:bg-dark-surface">
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        Dashboard
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </Link>
                      <hr className="my-2 border-gray-200 dark:border-gray-800" />
                      <button
                        onClick={handleLogout}
                        className="text-error-600 dark:text-error-400 flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-800"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Menu Content */}
            <div className="absolute left-0 right-0 top-full z-50 border-t border-gray-200 bg-white py-4 shadow-lg dark:border-gray-800 dark:bg-gray-900 md:hidden">
              <div className="container mx-auto px-4">
                <nav className="flex flex-col gap-4">
                  {HEADER_NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-sm font-medium text-gray-700 transition-colors hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400"
                    >
                      {link.label}
                    </Link>
                  ))}

                  <hr className="border-gray-200 dark:border-gray-800" />

                  {/* Mobile Theme Toggle */}
                  <button
                    onClick={() => {
                      toggleTheme();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {isDark ? (
                      <>
                        <Sun className="h-5 w-5" />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="h-5 w-5" />
                        Dark Mode
                      </>
                    )}
                  </button>

                  <hr className="border-gray-200 dark:border-gray-800" />

                  {/* Mobile Auth Actions */}
                  {isAuthenticated && user ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <User className="h-5 w-5" />
                        Dashboard
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Settings className="h-5 w-5" />
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="text-error-600 dark:text-error-400 flex items-center gap-3 text-sm font-medium"
                      >
                        <LogOut className="h-5 w-5" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Link
                        to="/login"
                        className="rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="rounded-lg bg-primary-500 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-primary-600"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </nav>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
