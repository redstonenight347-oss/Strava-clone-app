"use client";

export default function Signup() {
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
      })
    });

    const data = await response.json();

    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-80 h-auto flex flex-col ml-10"
    >
      name:
      <input
        className="mb-5 bg-red-200 w-50"
        type="text"
        name="name"
        autoComplete="name"
        placeholder="Name"
      />

      email:
      <input
        className="mb-5 bg-red-200 w-50"
        name="email"
        autoComplete="email"
        placeholder="example@gmail.com"
      />

      password:
      <input
        className="mb-10 bg-red-200 w-50"
        type="password"
        name="password"
        autoComplete="new-password"
        placeholder="password1234"
      />

      <button
        type="submit"
        className="p-5 bg-red-600 rounded-xl"
      >
        Sign up
      </button>
    </form>
  );
}