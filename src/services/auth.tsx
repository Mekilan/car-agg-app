interface User {
  username: string;
  email: string;
  password: string;
}

const getUsers = (): User[] => {
  const data = localStorage.getItem("users");
  return data ? JSON.parse(data) : [];
};

const saveUsers = (users: User[]) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export function signUp(user: User) {
  const users = getUsers();
  if (users.find((u) => u.email === user.email))
    throw new Error("Email already registered");
  users.push(user);
  saveUsers(users);
  return true;
}

export function login(email: string, password: string) {
  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) throw new Error("Invalid email or password");
  localStorage.setItem("currentUser", JSON.stringify(user)); // store current session
  return user;
}

export function logout() {
  localStorage.removeItem("currentUser");
}

export function getCurrentUser() {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
}
