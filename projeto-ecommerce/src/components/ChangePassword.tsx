import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { API_URL } from "../API_URL";

export const useUpdatePassword = () => {
  const [userPassword, setUserPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setconfirmNewPassword] = useState<string>("");

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setconfirmNewPassword(e.target.value);
  };

  const handleUserPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value);
  };

  const { mutate: handleNewPassword } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/me/update-password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userPassword, newPassword }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to post data");
      }

      return await response.json();
    },
    onSuccess: () => {
      setUserPassword("");
      setNewPassword("");
      setconfirmNewPassword("");
    },
  });

  const handleNewPasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("As passwords não coincidem!");
      return;
    }

    handleNewPassword();
  };

  return {
    userPassword,
    setUserPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setconfirmNewPassword,
    handleUserPasswordChange,
    handleNewPasswordChange,
    handleConfirmNewPasswordChange,
    handleNewPasswordSubmit,
  };
};
