"use client"


import { useRouter } from "next/navigation";
import { useState } from "react"

type handleSubmitType = (e: React.SyntheticEvent<HTMLFormElement>) => Promise<void>

type FormCardProp = {
  handleSubmit: handleSubmitType;
  form: { name: string; email: string };
  setForm: any;
}


export default function Signup() {

  const [form, setForm] = useState({
    name: "",
    email: ""
  })

  const router = useRouter();

  const handleSubmit: handleSubmitType = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if(response.ok){
        router.push("/dashboard")
      }
    }
    catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="w-full my-8 flex justify-center">
      <div className="border p-2 md:flex md:flex-col md:items-start">
        <h1 className="text-5xl text-stravaorange font-semibold">Get started</h1>
        <div className="mt-8 flex flex-col">
          <OAuth />
          <Separater />
          <FormCard handleSubmit={handleSubmit} form={form} setForm={setForm} />
        </div>
      </div>
    </div>
  );
}

function OAuth() {
  return (
    <div className="w-100 h-40 border md:w-100">
      <p>OAuth coming soon</p>
    </div>
  )
}

function Separater() {
  return (
    <div className="my-8 w-full flex items-center gap-4 md:w-100">
      <div className="h-0 w-27 border"></div>
      <p>Or sign up with email</p>
      <div className="h-0 w-27 border"></div>
    </div>
  )
}


function FormCard({ handleSubmit, form, setForm }: FormCardProp) {

  return (
    <form
      onSubmit={handleSubmit}
      className="h-auto flex flex-col md:items-center"
    >

      Name
      <input
        className="mb-4 p-4 w-100 h-8 rounded-md border"
        type="text"
        name="name"
        autoComplete="name"
        placeholder="name"
        value={form.name}
        onChange={e => setForm((prev: Pick<FormCardProp, "form">) => ({ ...prev, name: e.target.value }))}
      />

      Email
      <input
        className="mb-4 p-4 w-100 h-8 rounded-md border"
        name="email"
        autoComplete="email"
        placeholder="example@gmail.com"
        value={form.email}
        onChange={e => setForm((prev: Pick<FormCardProp, "form">) => ({ ...prev, email: e.target.value }))}
      />

      <button
        type="submit"
        className="mt-4 py-3 w-100 bg-stravaorange font-semibold text-white rounded-md"
      >
        Continue
      </button>
    </form>
  )
}



