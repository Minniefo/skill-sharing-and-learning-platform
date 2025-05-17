import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginWithEmail, signupWithGoogle } from "../services/authService";
import { registerUserInBackend } from "../services/authApi";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [generalError, setGeneralError] = React.useState<string | null>(null);

  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),

    onSubmit: async (values) => {
      setGeneralError(null);
      try {
        const result = await loginWithEmail(values.email, values.password);
        const user = result.user;
        const idToken = await user.getIdToken();

        localStorage.setItem(
          "user",
          JSON.stringify({
            uid: user.uid,
            name: user.displayName || "",
            email: user.email || "",
          })
        );

        await registerUserInBackend(
          {
            uid: user.uid,
            name: user.displayName || "",
            email: user.email || "",
          },
          idToken
        );

        navigate("/");
      } catch (err: any) {
        setGeneralError(err.message); 
      }
    },
  });

  const handleGoogleLogin = async () => {
    setGeneralError(null); 
    try {
      const result = await signupWithGoogle();
      const user = result.user;
      const idToken = await user.getIdToken();

      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          name: user.displayName || "",
          email: user.email || "",
        })
      );

      await registerUserInBackend(
        {
          uid: user.uid,
          name: user.displayName || "",
          email: user.email || "",
        },
        idToken
      );

      navigate("/");
    } catch (err: any) {
      setGeneralError(err.message); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>

        {/* ✅ Display general form-level error */}
        {generalError && <div className="text-red-600 mb-4 text-sm">{generalError}</div>}

        {/* ✅ Formik form submission */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <input
              id="email" 
              name="email"
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              value={formik.values.email} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {/* ✅ Inline field-level error for email */}
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            )}
          </div>

          <div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              value={formik.values.password} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {/* ✅ Inline field-level error for password */}
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Log In
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-3 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded hover:bg-gray-50"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Continue with Google</span>
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
