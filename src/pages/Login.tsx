import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function loadRegisteredUsers() {
  const savedUsers = localStorage.getItem("registeredUsers");
  if (savedUsers) {
    const parsedUsers = JSON.parse(savedUsers);
    return parsedUsers.map((user: {username:string, password:string}) => ({
      username: user.username,
      password: user.password,
    }));
  }
  return [];
}

export const Login = () => {
  const [registeredUsers, setRegisteredUsers] = useState<{ username: string; password: string }[]>(loadRegisteredUsers());
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  useEffect(() => {
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };
    setRegisteredUsers((prevUsers) => [...prevUsers, newUser]);
    console.log("jebenti boga")
    setRegistrationSuccess(true);
    e.currentTarget.reset();

    setTimeout(() => {
      setRegistrationSuccess(false)
    }, 1500)

  };


  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredUsername = e.currentTarget.username.value;
    const enteredPassword = e.currentTarget.password.value;

    const user = registeredUsers.find(
      (u) => u.username === enteredUsername && u.password === enteredPassword
    );

    if (user) {
      navigate("/Main");
    } else {
      setError("Invalid username or password combination");
    }

    e.currentTarget.reset();
  };

  return (
    <>
    <hr className="line"></hr>
    <h1 className="bigAlert"> Welcome to the gym tracker app! Please register below, or log in if you already have an account!</h1>
      <form onSubmit={handleRegistration}>
        <input type="text" name="username" placeholder="Username..." className="input"/>
        <input type="password" name="password" placeholder="Password" className="input"/>
        <button type="submit" className="submitBtn">Register</button>
        {registrationSuccess && <div><h1 className="green">Registration succesful!</h1></div>}
      </form>

      <form onSubmit={handleLogin}>
        <input type="text" name="username" placeholder="Username..." className="input2"/>
        <input type="password" name="password" placeholder="Password" className="input2"/>
        <button type="submit" className="submitBtn2">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
      <hr className="line"></hr>
    </>
  );
};