import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../utils/db";
import { User } from "../../utils/schema";
import { eq } from "drizzle-orm";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const user = await db
        .select()
        .from(User)
        .where(eq(User.username, username))
        .where(eq(User.password, password))
        .execute();

      if (user.length > 0) {
        // Login berhasil, simpan userId di localStorage
        localStorage.setItem("userId", user[0].id);
        // Redirect ke halaman utama
        navigate("/");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("An error occurred while logging in");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign In</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSignIn}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await db
        .select()
        .from(User)
        .where(eq(User.username, username))
        .where(eq(User.password, password))
        .execute();

      if (user.length > 0) {
        // Login berhasil, simpan userId di localStorage
        localStorage.setItem("userId", user[0].id);
        // Redirect ke halaman utama
        navigate("/home");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("An error occurred while logging in");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

const AuthPage = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      // Jika userId tidak ada, arahkan pengguna ke halaman sign-in atau login
      navigate("/login"); // Ganti dengan "/signin" jika memakai halaman sign-in
    }
  }, [userId, navigate]);

  return (
    <div>
      <h1>Protected Page</h1>
      {/* Konten halaman yang dilindungi */}
    </div>
  );
};

export { SignIn, Login, AuthPage };
