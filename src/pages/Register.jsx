import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Button from "../components/shared/Button";
import useAuth from "../contexts/AuthContext";
import isStrongPassword from "../utils/isStrongPassword";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { createUser, googleSignIn, updateUserProfile, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, photoURL, password } = formData;

    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    if (!isStrongPassword(password)) {
      setErrorMessage(
        "Password must be at least 6 characters long and include at least one uppercase letter and one lowercase letter."
      );
      return;
    }

    setIsLoading(true);

    try {
      const result = await createUser(email, password);
      const user = result.user;
      
      await updateUserProfile(name, photoURL);
      setUser(user);
      setErrorMessage("");

      toast.success("Registration successful!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error registering:", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user;
      setUser(user);
      toast.success("Registration successful!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-base-100 rounded-[var(--radius-box)] shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-base-content">Create Account</h2>
          <p className="mt-2 text-base-content/70">
            Please fill in your information
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full rounded-[var(--radius-field)]"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="label">
                <span className="label-text">Email address</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full rounded-[var(--radius-field)]"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="photoURL" className="label">
                <span className="label-text">Photo URL (optional)</span>
              </label>
              <input
                id="photoURL"
                name="photoURL"
                type="url"
                value={formData.photoURL}
                onChange={handleChange}
                className="input input-bordered w-full rounded-[var(--radius-field)]"
                placeholder="Enter photo URL"
              />
            </div>
            <div>
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered w-full rounded-[var(--radius-field)]"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="alert alert-error rounded-[var(--radius-box)]">
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
            >
              Create Account
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
          Already have an account?{" "}
          <Link to="/auth/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;