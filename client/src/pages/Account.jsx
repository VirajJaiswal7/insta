import { useAuth } from "../../hooks/useAuth";
import React, { useState } from "react";

const Account = () => {
  const {
    name,
    email,
    password,
    username,
    setName,
    setEmail,
    setPassword,
    setUsername,
    handleSubmit,
    login,
    setLogin,
  } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="text-center border p-10 mt-3 pb-6 w-[350px] border-black space-y-4"
      >
        <h1 className="text-4xl font-serif font-semibold">Instagram</h1>
        <p className="text-gray-800 text-center">
          Sign up to see photos and videos
          <br /> from your friends.
        </p>
        <div className="space-y-2 mt-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            className="py-1 px-2 border w-full rounded border-black outline-none"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="py-1 px-2 border w-full rounded border-black outline-none"
          />
          {!login && (
            <>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                className="py-1 px-2 border w-full rounded border-black outline-none"
              />
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="Username"
                className="py-1 px-2 border w-full rounded border-black outline-none"
              />
            </>
          )}
        </div>
        {!login && (
          <>
            <p className="text-xs">
              People who use our service may have uploaded your contact
              information to Instagram.{" "}
              <span className="text-blue-800">Learn More</span>
            </p>
            <p className="text-xs">
              By signing up, you agree to our{" "}
              <span className="text-blue-800">Terms</span> ,
              <span className="text-blue-800">Privacy Policy</span> and{" "}
              <span className="text-blue-800">Cookies Policy</span> .
            </p>
          </>
        )}
        <button
          type="submit"
          className="py-1.5 bg-blue-500 w-full rounded-md text-white text-[15px] cursor-pointer"
        >
          {login ? "Log in" : "Sign up"}
        </button>
      </form>
      <div
        className={`text-center border py-6 mt-3 pb-6 w-[350px] border-black ${
          login ? "flex items-center justify-center gap-1" : ""
        }`}
      >
        <p className="text-[15px]">
          {login ? "don't have an account?" : "Have an account?"}
        </p>
        <p
          className="text-blue-700 cursor-pointer"
          onClick={() => setLogin(!login)}
        >
          {login ? "Sign up" : "Log in"}
        </p>
      </div>
    </div>
  );
};

export default Account;
