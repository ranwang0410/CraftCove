import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupFormModal.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (password !== confirmPassword) {
    //   return setErrors({
    //     confirmPassword:
    //       "Confirm Password field must be the same as the Password field",
    //   });
    // }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <div className="loginmodal-content">
        <div className="loginmodal-header">
          <h1>Sign Up</h1>
          {errors.server && <p>{errors.server}</p>}
        </div>
        <div className="loginmodal-body">
          <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
          <div>Email</div>

              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            {errors.email && <p>{errors.email}</p>}
            </div>

            <div className="form-group">
              <div>Username</div>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

            {errors.username && <p>{errors.username}</p>}
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
            {/* <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>} */}
            <button type="submit" className="btn-submit">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignupFormModal;
