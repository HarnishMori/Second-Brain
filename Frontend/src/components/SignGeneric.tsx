import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";

interface signProps {
  type: "signup"|"signin"  
}

const typeClass = {
    signup: "Already have an account? SignIn",
    signin: "Don't have an account? SignUp"
}

const SignGeneric = ({ type }: signProps) => {
  return (
    <div className="bg-gray-200 h-screen w-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded">
        <Input placeholder={"Username"} />
        <Input placeholder={"Password"} />
        <div className="flex justify-center rounded">
          <Button
            loading={false}
            variant={"primary"}
            text = {type === "signup"? "Sign Up" : "Sign In"}
            fullwidth={true}
          /> 
        </div>
        <div className="text-gray-600 pt-4x">{typeClass[type]}</div>
      </div>
    </div>
  );
};

export default SignGeneric;
