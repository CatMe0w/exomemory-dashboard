"use client";

import { useForm } from "react-hook-form";

import useExomemoryService from "@/app/_services/useExomemoryService";

export default Login;

function Login() {
  const exomemoryService = useExomemoryService();

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const fields = {
    apiUrl: register("apiUrl", { required: "API URL is required" }),
    username: register("username", { required: "Username is required" }),
    password: register("password", { required: "Password is required" })
  };

  async function onSubmit({ apiUrl, username, password }: any) {
    exomemoryService.login(apiUrl, username, password);
  }

  return (
    <>
      <h4>Login</h4>
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label>API URL</label>
            <input {...fields.apiUrl} type="text" defaultValue={exomemoryService.apiUrl}
                   className={`form-control ${errors.apiUrl ? "is-invalid" : ""}`} />
            <div>{errors.apiUrl?.message?.toString()}</div>
          </div>
          <div className="mb-3">
            <label>Username</label>
            <input {...fields.username} type="text" defaultValue={exomemoryService.username}
                   className={`form-control ${errors.username ? "is-invalid" : ""}`} />
            <div>{errors.username?.message?.toString()}</div>
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input {...fields.password} type="password" defaultValue={exomemoryService.password}
                   className={`form-control ${errors.password ? "is-invalid" : ""}`} />
            <div>{errors.password?.message?.toString()}</div>
          </div>
          <button disabled={formState.isSubmitting}>
            {/*{formState.isSubmitting ? '⏳' : 'Login'}*/}
            Login
          </button>
        </form>
      </>
    </>
  );
}
