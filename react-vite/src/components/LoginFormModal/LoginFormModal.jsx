import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import { useNavigate } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse && serverResponse.errors) {
      setErrors(serverResponse.errors);

    } else {
      setErrors({});
      closeModal();
      navigate('/')
    }
  };
  const handleRegisterClick = () => {
    setShowSignupModal(true);
  };
  if (showSignupModal) {
    return <SignupFormModal />;
  }
  return (
    <>
      <div className="loginmodal-content">
        <div className="loginmodal-header">
          <h2>Sign in</h2>
          <button className="register-button" onClick={handleRegisterClick}>Register</button>

        </div>

        <div className="loginmodal-body">

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <div>Email</div>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {errors.email && <p>{errors.email}</p>}
            </div>

            <div className="form-group">
              <div>Password</div>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {errors.password && <p>{errors.password}</p>}
            </div>

            <button type="submit" className="btn-submit">Sign In</button>
            <button className="demo-button" onClick={() => { dispatch(thunkLogin({ email: 'demo@aa.io', password: 'password' })); closeModal() }}>Demo User</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginFormModal;
