import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../schemas/authSchema";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const { mutateAsync, isLoading, error } = useSignup();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await mutateAsync(data);
      alert("Signup successful!");
      navigate("/"); // redirect to login
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Name" />
        <p>{errors.name?.message}</p>

        <input {...register("email")} placeholder="Email" />
        <p>{errors.email?.message}</p>

        <input type="password" {...register("password")} placeholder="Password" />
        <p>{errors.password?.message}</p>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
}