import { useState } from "react";
import { Button } from "./App";

export function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleBillChange(e) {
    const value = e.target.value;
    if (value === "" || /^[0-9]*$/.test(value)) {
      setBill(value);
    }
  }

  function handlePaidByUserChange(e) {
    const value = e.target.value;
    if (value === "" || /^[0-9]*$/.test(value)) {
      setPaidByUser(Number(value) > bill ? paidByUser : value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);

    setBill("");
    setPaidByUser("");
    setWhoIsPaying("user");
  }

  return (
    <form action="" className="form-split-bill" onSubmit={handleSubmit}>
      <h2>split a bill with {selectedFriend.name}</h2>
      <label htmlFor="">💰 bill value</label>
      <input type="text" value={bill} onChange={handleBillChange} />
      <label htmlFor="">🕺 your expense</label>
      <input type="text" value={paidByUser} onChange={handlePaidByUserChange} />
      <label htmlFor="">👯 {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />
      <label htmlFor="">💰 Who is paying the bills</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">you</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
