import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Profile from "./components/Profile";

export default function Send() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const name = searchParams.get('name');
  const [amount, setAmount] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [username, setUsername] = useState(null);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setTimeout(() => {
            navigate('/signin');
          }, 2500);
          return;
        }

        const response = await axios.get('https://minipaymentbackend-api.vercel.app/me', {
          headers: {
            Authorization: token,
          },
        });

        setUsername(response.data.username);
        setBalance(response.data.balance);
      } catch (err) {
        setError(err);
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate('/signin');
      }, 2500);
    }
  }, [error, navigate]);

  const handleTransfer = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setTimeout(() => {
          navigate('/signin');
        }, 2500);
        return;
      }

      await axios.post('https://minipaymentbackend-api.vercel.app/transfer', {
        to: id,
        amount
      }, {
        headers: {
          Authorization: token,
        }
      });

      setSuccessMessage("Transfer successful");

      setTimeout(() => {
        navigate('/dashboard');
      }, 4000);

      console.log("Transfer successful");
    } catch (error) {
      console.error("Transfer failed", error);
    }
  };

  if (error) {
    return <div>ERROR: {error.message}</div>;
  }

  if (!username) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center h-screen border bg-slate-400">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
            <div className="text-center">Current Balance: ₹{balance.toFixed(2)}</div>
          </div>
          <div className="flex items-center ml-4">
            <Profile name={name} />
            <div className="text-xl font-semibold">{name}</div>
          </div>
          <div className="flex flex-col">
            <label className='font-semibold'>Amount In ₹</label>
            <input
              className="border rounded-md px-1 text-sm border-gray-200 h-10 w-full"
              id='amount'
              placeholder="Enter Amount"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button
            onClick={handleTransfer}
            className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
          >
            Initiate Transfer
          </button>
          {successMessage && <div className="text-green-500 mt-4 text-center">{successMessage}</div>}
        </div>
      </div>
    </div>
  );
}
