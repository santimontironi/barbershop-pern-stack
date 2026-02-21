import { useParams } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";

const ConfirmedUser = () => {
  const { token } = useParams<{ token: string }>();

  const auth = useContext(AuthContext);

  if (!auth) return null;

  const { confirmRegister } = auth;

  const [messageResponse, setMessageResponse] = useState<string | null>(null);
  const [messageError, setMessageError] = useState<string | null>(null);

  useEffect(() => {
    const confirmUser = async () => {
      if (token) {
        try {
          const response = await confirmRegister(token);
          setMessageResponse(response.message);
        } catch (error: any) {
          setMessageError(error.response?.data?.message || "Error confirming registration");
          console.error("Error confirming registration:", error);
        }
      }
    };

    confirmUser();
  }, [token, confirmRegister]);

  return (
    <div>
      {messageResponse && <p>{messageResponse}</p>}
      {messageError && <p>{messageError}</p>}
    </div>
  )
}

export default ConfirmedUser