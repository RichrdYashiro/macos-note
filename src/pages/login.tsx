import { TextInput, PasswordInput, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { signin } = useAuth();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { id: "1", name: "Admin" };

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const login = formData.get("login");
    const password = formData.get("password");
    if (login === "Admin" && password === "123") {
      signin(userData, () => navigate("/", { replace: true }));
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <h2>Введите логин и пароль</h2>
      <form onSubmit={handleSubmit}>
        <TextInput placeholder="Введите логин" type="text" name="login" />
        <PasswordInput
          type="password"
          placeholder="Введите пароль"
          name="password"
        />
        <Button fullWidth mt="xl" type="submit">
          Войти
        </Button>
      </form>
    </div>
  );
}

export default Login;
