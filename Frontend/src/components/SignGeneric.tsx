import React, { useRef, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router";

interface signProps {
  type: "signup" | "signin";
}

const typeClass = {
  signup: "Already have an account? SignIn",
  signin: "Don't have an account? SignUp",
};

const SignGeneric = ({ type }: signProps) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function signup() {
    setLoading(true);
    try {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;
      await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
      });
      alert("You have signedUp");
      navigate("/dashboard");
    } catch (e) {
      console.error(e);
      alert("SignUp failed");
    } finally {
      setLoading(false);
    }
  }
  async function signin() {
    setLoading(true);
    try {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password,
      });
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/dashboard");
    } catch (e) {
      console.error(e);
      alert("SignIn failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-200 h-screen w-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded">
        <Input reference={usernameRef} placeholder={"Username"} />
        <Input reference={passwordRef} placeholder={"Password"} />
        <div className="flex justify-center rounded">
          <Button
            loading={false}
            variant={"primary"}
            text={type === "signup" ? "Sign Up" : "Sign In"}
            fullwidth={true}
            onClick={type === "signup" ? () => signup() : () => signin()}
          />
        </div>
        <div className="text-gray-600 pt-4x">
          <div>
            <button
              className="text-blue-500 underline"
              onClick={() => {
                if (type === "signup") {
                  navigate("/signin");
                } else {
                  navigate("/signup");
                }
              }}
            >
              {typeClass[type]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignGeneric;
