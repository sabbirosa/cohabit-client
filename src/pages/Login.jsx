import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Button from "../components/shared/Button";
import useAuth from "../contexts/AuthContext";

function Login() {
  const { signIn, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-primary/5 rounded-[var(--radius-box)] shadow-xl border border-primary/20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-base-content">Welcome Back!</h2>
          <p className="mt-2 text-base-content/70">
            Please sign in to your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="label">
                <span className="label-text text-base-content">Email address</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input input-bordered w-full rounded-[var(--radius-field)] bg-primary/5 border-primary/20"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="label">
                <span className="label-text text-base-content">Password</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input input-bordered w-full rounded-[var(--radius-field)] bg-primary/5 border-primary/20"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
            >
              Sign in
            </Button>
          </div>
        </form>

        <div className="divider">OR</div>

        <Button
          onClick={handleGoogleSignIn}
          variant="outline"
          fullWidth
          className="gap-2"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </Button>

        <p className="mt-4 text-center text-base-content/70">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;